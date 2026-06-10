/**
 * app.js
 * ─────────────────────────────────────────────────────────
 * Exam Engine · Anti-Cheat · Evaluator · Submission
 * ─────────────────────────────────────────────────────────
 */

"use strict";

// ═══════════════════════════════════════════════════════════
// ANTI-CHEAT MODULE
// ═══════════════════════════════════════════════════════════
const AntiCheat = (() => {
  let tabSwitches = 0;
  let examStarted = false;
  let dismissed = false;

  function init() {
    examStarted = true;

    // Right-click
    if (ExamConfig.DISABLE_RIGHTCLICK) {
      document.addEventListener("contextmenu", (e) => e.preventDefault());
    }

    // Copy/paste
    if (ExamConfig.DISABLE_COPY) {
      document.addEventListener("copy", (e) => e.preventDefault());
      document.addEventListener("paste", (e) => e.preventDefault());
      document.addEventListener("cut", (e) => e.preventDefault());
    }

    // Tab visibility
    document.addEventListener("visibilitychange", () => {
      if (!examStarted || document.visibilityState !== "hidden") return;
      tabSwitches++;
      _updateTabWarn();
      if (tabSwitches >= ExamConfig.MAX_TAB_SWITCHES) {
        _showOverlay();
      }
      // Log switch
      ExamState.tabSwitches = tabSwitches;
    });

    // DevTools heuristic (size-based)
    if (ExamConfig.DETECT_DEVTOOLS) {
      setInterval(_detectDevtools, 3000);
    }

    // Keyboard shortcuts block
    document.addEventListener("keydown", (e) => {
      // Block F12
      if (e.key === "F12") e.preventDefault();
      // Block Ctrl+Shift+I/J/C
      if (
        e.ctrlKey &&
        e.shiftKey &&
        ["I", "J", "C", "i", "j", "c"].includes(e.key)
      )
        e.preventDefault();
      // Block Ctrl+U (view source)
      if (e.ctrlKey && ["u", "U"].includes(e.key)) e.preventDefault();
    });
  }

  function _detectDevtools() {
    const threshold = 160;
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      ExamState.devtoolsOpened = true;
    }
  }

  function _updateTabWarn() {
    const el = document.getElementById("tab-warn");
    if (!el) return;
    el.textContent = `Tab switches: ${tabSwitches}/${ExamConfig.MAX_TAB_SWITCHES}`;
    el.style.color =
      tabSwitches >= ExamConfig.MAX_TAB_SWITCHES - 1 ? "#ff3366" : "#555";
  }

  function _showOverlay() {
    document.getElementById("cheat-overlay").classList.add("show");
  }

  function dismiss() {
    document.getElementById("cheat-overlay").classList.remove("show");
  }

  return { init, dismiss };
})();

// ═══════════════════════════════════════════════════════════
// EXAM STATE
// ═══════════════════════════════════════════════════════════
const ExamState = {
  studentName: "",
  token: "",
  tokenHash: "",
  setId: "",
  questions: [],
  startTime: null,
  endTime: null,
  submitted: false,
  timerHandle: null,
  tabSwitches: 0,
  devtoolsOpened: false,
  scores: {}, // { qId: 10|0 }
};

// ═══════════════════════════════════════════════════════════
// TIMER MODULE
// ═══════════════════════════════════════════════════════════
const Timer = (() => {
  let endAt = 0;

  function start(minutes, onExpiry) {
    endAt = Date.now() + minutes * 60 * 1000;
    ExamState.timerHandle = setInterval(() => {
      const remaining = endAt - Date.now();
      if (remaining <= 0) {
        clearInterval(ExamState.timerHandle);
        _render(0);
        onExpiry();
        return;
      }
      _render(remaining);
    }, 500);
    _render(minutes * 60 * 1000);
  }

  function stop() {
    clearInterval(ExamState.timerHandle);
  }

  function _render(ms) {
    const el = document.getElementById("timer");
    const s = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    el.textContent = `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    el.className = s > 300 ? "" : s > 60 ? "warn" : "danger";
  }

  return { start, stop };
})();

// ═══════════════════════════════════════════════════════════
// EVALUATION ENGINE
// ═══════════════════════════════════════════════════════════
const Evaluator = (() => {
  // Run all questions and compute score
  async function evaluateAll() {
    const qs = ExamState.questions;
    const results = [];
    let totalScore = 0;

    for (const q of qs) {
      let result = { pass: false, feedback: "" };
      let marks = 0;

      if (q.type === 'mcq') {
        const selected = document.querySelector(`input[name="q-${q.id}"]:checked`);
        if (selected && selected.value === q.correctAnswer) {
          result = { pass: true, feedback: "Correct" };
          marks = 1;
        } else if (selected) {
          result = { pass: false, feedback: `Incorrect. (Ans: ${q.correctAnswer})` };
          marks = 0;
        } else {
          result = { pass: false, feedback: "Not Answered" };
          marks = 0;
        }
      } else if (q.type === 'code') {
        const editor = window.monacoEditors ? window.monacoEditors[q.id] : null;
        const code = editor ? editor.getValue() : "";
        result = { pass: true, feedback: "Submitted for manual review" };
        marks = 0; // Manual grading will evaluate these
      }

      ExamState.scores[q.id] = marks;
      totalScore += marks;
      results.push({ q, result });
    }

    return { results, total: totalScore, marks: Object.values(ExamState.scores) };
  }

  return { evaluateAll };
})();

// ═══════════════════════════════════════════════════════════
// GOOGLE SHEETS SUBMISSION
// ═══════════════════════════════════════════════════════════
const Submission = (() => {
  async function submit(total, results) {
    const payload = {
      name: ExamState.studentName,
      token: ExamState.token,
      tokenHash: ExamState.tokenHash,
      score: total,
      setId: ExamState.setId,
      details: JSON.stringify(
        results.map((r) => ({
          id: r.q.id,
          pass: r.result.pass,
          marks: ExamState.scores[r.q.id],
        })),
      ),
      tabSwitches: ExamState.tabSwitches,
      devtools: ExamState.devtoolsOpened,
      timestamp: new Date().toISOString(),
      duration: Math.round((Date.now() - ExamState.startTime) / 1000),
    };

    // GAS requires the data sent as a URL query string via GET,
    // OR as a form POST. We use an invisible form POST (no-cors safe).
    try {
      // Method 1: form submission via hidden iframe (most reliable with GAS)
      await _formPost(ExamConfig.APPS_SCRIPT_URL, payload);
      return { ok: true };
    } catch (err) {
      console.error("Submission failed:", err);
      // Method 2: fallback GET with data in URL params
      try {
        await _getRequest(ExamConfig.APPS_SCRIPT_URL, payload);
        return { ok: true };
      } catch (err2) {
        return { ok: false, error: err2.message };
      }
    }
  }

  // Send data via a hidden form POST into a hidden iframe
  // This bypasses CORS entirely — browser posts, GAS receives
  function _formPost(url, data) {
    return new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.name = "hidden_submit_" + Date.now();
      iframe.style.cssText = "display:none;position:absolute;";
      document.body.appendChild(iframe);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;
      form.target = iframe.name;
      form.style.display = "none";

      // Add each field as a hidden input
      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // GAS processes async — wait 4s then resolve
      setTimeout(() => {
        try {
          document.body.removeChild(form);
        } catch (e) {}
        try {
          document.body.removeChild(iframe);
        } catch (e) {}
        resolve({ ok: true });
      }, 4000);
    });
  }

  // Fallback: GET request with params (GAS doGet must handle this)
  function _getRequest(url, data) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(data).toString();
      const img = new Image();
      img.onload = img.onerror = () => resolve({ ok: true });
      img.src = `${url}?${params}`;
      setTimeout(() => resolve({ ok: true }), 5000);
    });
  }

  return { submit };
})();

// ═══════════════════════════════════════════════════════════
// SCREEN MANAGER
// ═══════════════════════════════════════════════════════════
function showScreen(id) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("screen-" + id).classList.add("active");
}

// ═══════════════════════════════════════════════════════════
// EXAM RENDERER
// ═══════════════════════════════════════════════════════════
function renderQuestions(questions) {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";
  window.monacoEditors = {};

  questions.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `qcard-${q.id}`;

    if (q.type === 'mcq') {
      let optionsHtml = '';
      q.options.forEach(opt => {
        optionsHtml += `
          <label style="display:flex; align-items:center; gap:8px; font-family:var(--sans); font-size:14px; text-transform:none; margin:8px 0; color:var(--text); cursor:pointer;">
            <input type="radio" name="q-${q.id}" value="${opt}" style="width:auto; margin:0; cursor:pointer;">
            ${opt}
          </label>`;
      });

      card.innerHTML = `
        <div class="q-header">
          <div class="q-num">Q${i + 1}</div>
          <div class="q-title" style="white-space: pre-wrap;">${q.title}</div>
          <div class="q-marks">1 mark</div>
        </div>
        <div class="q-desc" style="border-bottom:none;">
          ${optionsHtml}
        </div>
      `;
    } else if (q.type === 'code') {
      card.innerHTML = `
        <div class="q-header">
          <div class="q-num">Q${i + 1}</div>
          <div class="q-title">${q.title}</div>
          <div class="q-marks">15 marks</div>
        </div>
        <div class="q-desc" style="white-space: pre-wrap;">${q.description}</div>
        <div class="q-workspace" style="display:block; min-height:400px; padding: 10px;">
          <div class="pane-label" style="margin-bottom: 10px;">C# Editor (Monaco)</div>
          <div id="editor-${q.id}" style="height:350px; width:100%; border: 1px solid var(--border);"></div>
        </div>
      `;
    }

    container.appendChild(card);

    if (q.type === 'code') {
      const initMonaco = () => {
        if (window.monaco) {
          window.monacoEditors[q.id] = monaco.editor.create(document.getElementById(`editor-${q.id}`), {
            value: q.starterCode || "// Write your C# code here\n",
            language: 'csharp',
            theme: 'vs-dark',
            minimap: { enabled: false },
            automaticLayout: true
          });
        } else {
          setTimeout(initMonaco, 500);
        }
      };
      initMonaco();
    }
  });
}

// ═══════════════════════════════════════════════════════════
// RESULT RENDERER
// ═══════════════════════════════════════════════════════════
function renderResult(total, results) {
  document.getElementById("final-score").textContent = total;

  const bd = document.getElementById("score-breakdown");
  let html = "";
  results.forEach((r, i) => {
    const m = ExamState.scores[r.q.id];
    html += `
      <div class="breakdown-row">
        <span class="label">Q${i + 1}: ${r.q.title}</span>
        <span class="val ${r.result.pass ? "green" : "red"}">${m} / 10 — ${r.result.feedback}</span>
      </div>`;
  });

  // Show which questions were counted
  const sortedIds = [...ExamState.questions]
    .sort(
      (a, b) => (ExamState.scores[b.id] || 0) - (ExamState.scores[a.id] || 0),
    )
    .slice(0, ExamConfig.BEST_N_QUESTIONS)
    .map((q) => q.id);

  html += `
    <div class="breakdown-row" style="margin-top:8px;border-top:1px solid #333;padding-top:8px;">
      <span class="label">Best ${ExamConfig.BEST_N_QUESTIONS} counted</span>
      <span class="val">${sortedIds.join(", ")}</span>
    </div>
    <div class="breakdown-row">
      <span class="label">Tab switches</span>
      <span class="val ${ExamState.tabSwitches > 0 ? "red" : "green"}">${ExamState.tabSwitches}</span>
    </div>`;

  bd.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════
// MAIN EXAM APP
// ═══════════════════════════════════════════════════════════
const ExamApp = {
  // ── Start Exam ────────────────────────────────────────
  async startExam() {
    const nameEl = document.getElementById("inp-name");
    const tokenEl = document.getElementById("inp-token");
    const errEl = document.getElementById("login-error");
    const btn = document.getElementById("btn-start");

    const name = nameEl.value.trim();
    const token = tokenEl.value.trim();

    errEl.style.display = "none";

    if (!name) return _loginError("Please enter your full name.");
    if (!token) return _loginError("Please enter your access token.");

    if (ExamConfig.ENFORCE_TIME_WINDOW && !ExamConfig.BYPASS_TIME_CHECK) {
      const now = new Date();
      const localDateStr = now.getFullYear() + "-" + String(now.getMonth()+1).padStart(2,'0') + "-" + String(now.getDate()).padStart(2,'0');
      
      if (localDateStr !== ExamConfig.EXAM_DATE) {
        return _loginError(`Exam is only available on ${ExamConfig.EXAM_DATE}.`);
      }
      
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const startParts = ExamConfig.EXAM_START_TIME.split(":");
      const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
      const endParts = ExamConfig.EXAM_END_TIME.split(":");
      const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
      
      if (currentMinutes < startMinutes) {
        return _loginError(`Exam starts at ${ExamConfig.EXAM_START_TIME}.`);
      }
      if (currentMinutes > endMinutes) {
        return _loginError(`Exam ended at ${ExamConfig.EXAM_END_TIME}.`);
      }
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Verifying...';

    // Hash & validate token
    const { valid, hash } = await ExamConfig.validateToken(token);

    if (!valid) {
      btn.disabled = false;
      btn.textContent = "Verify & Start Exam";
      return _loginError("Invalid token. Contact your instructor.");
    }

    // Check if already submitted (localStorage guard)
    const usedKey = `exam_used_${hash}`;
    if (localStorage.getItem(usedKey)) {
      btn.disabled = false;
      btn.textContent = "Verify & Start Exam";
      return _loginError(
        "This token has already been used. Duplicate submissions are not allowed.",
      );
    }

    // Optional: server-side token check
    // Uncomment to enable server validation before exam starts
    /*
    try {
      const check = await fetch(ExamConfig.APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check_token', tokenHash: hash })
      });
      // With no-cors we can't read response — use localStorage as primary guard
    } catch(e) { console.warn('Server check skipped:', e); }
    */

    // Assign state
    ExamState.studentName = name;
    ExamState.token = token.toUpperCase();
    ExamState.tokenHash = hash;
    ExamState.startTime = Date.now();

    // Pick random set
    const sets = QuestionSets.SETS;
    ExamState.setId = sets[Math.floor(Math.random() * sets.length)];
    ExamState.questions = QuestionSets[ExamState.setId];

    // Update header
    document.getElementById("hdr-name").textContent = name;
    document.getElementById("hdr-token").textContent =
      token.slice(0, 8) + "···";
    document.getElementById("set-label").textContent =
      `Set ${ExamState.setId} · ${ExamState.questions.length} Questions`;

    // Render
    renderQuestions(ExamState.questions);
    showScreen("exam");

    // Start anti-cheat & timer
    AntiCheat.init();
    Timer.start(ExamConfig.EXAM_DURATION_MINUTES, () => this._autoSubmit());

    function _loginError(msg) {
      errEl.textContent = msg;
      errEl.style.display = "block";
    }
  },

  // ── Manual submit ─────────────────────────────────────
  confirmSubmit() {
    if (ExamState.submitted) return;
    if (!confirm("Submit your exam now? This cannot be undone.")) return;
    this._doSubmit();
  },

  // ── Auto submit (timer expired) ───────────────────────
  _autoSubmit() {
    if (ExamState.submitted) return;
    this._doSubmit(true);
  },

  // ── Core submit logic ─────────────────────────────────
  async _doSubmit(auto = false) {
    if (ExamState.submitted) return;
    ExamState.submitted = true;
    ExamState.endTime = Date.now();

    // Lock all textareas
    document.querySelectorAll("textarea.code-input").forEach((ta) => {
      ta.disabled = true;
    });

    // Disable submit button
    const submitBtn = document.getElementById("btn-submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitted";
    }
    Timer.stop();

    showScreen("result");
    document.getElementById("submit-status").textContent =
      "Evaluating your answers...";
    document.getElementById("submit-status").className = "status-msg";

    // Evaluate
    const { results, total } = await Evaluator.evaluateAll();

    // Render result
    renderResult(total, results);
    document.getElementById("final-score").textContent = total;

    // Mark question cards
    results.forEach((r) => {
      const card = document.getElementById(`qcard-${r.q.id}`);
      if (card) card.classList.add(r.result.pass ? "correct" : "wrong");
    });

    // Mark token used locally
    const usedKey = `exam_used_${ExamState.tokenHash}`;
    localStorage.setItem(usedKey, Date.now().toString());

    // Submit to Google Sheets
    document.getElementById("submit-status").textContent =
      "Submitting results to server...";
    const submitResult = await Submission.submit(total, results);

    const statusEl = document.getElementById("submit-status");
    if (submitResult.ok) {
      statusEl.textContent = "✓ Results submitted successfully.";
      statusEl.className = "status-msg ok";
    } else {
      statusEl.textContent =
        "⚠ Could not reach server. Screenshot this page and send to instructor.";
      statusEl.className = "status-msg err";
    }
  },
};

// ── Global error for login  ───────────────────────────────
function _loginError(msg) {
  const errEl = document.getElementById("login-error");
  errEl.textContent = msg;
  errEl.style.display = "block";
  const btn = document.getElementById("btn-start");
  btn.disabled = false;
  btn.textContent = "Verify & Start Exam";
}
