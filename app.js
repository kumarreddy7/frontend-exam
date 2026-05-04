/**
 * app.js
 * ─────────────────────────────────────────────────────────
 * Exam Engine · Anti-Cheat · Evaluator · Submission
 * ─────────────────────────────────────────────────────────
 */

'use strict';

// ═══════════════════════════════════════════════════════════
// ANTI-CHEAT MODULE
// ═══════════════════════════════════════════════════════════
const AntiCheat = (() => {
  let tabSwitches = 0;
  let examStarted = false;
  let dismissed   = false;

  function init() {
    examStarted = true;

    // Right-click
    if (ExamConfig.DISABLE_RIGHTCLICK) {
      document.addEventListener('contextmenu', e => e.preventDefault());
    }

    // Copy/paste
    if (ExamConfig.DISABLE_COPY) {
      document.addEventListener('copy',  e => e.preventDefault());
      document.addEventListener('paste', e => e.preventDefault());
      document.addEventListener('cut',   e => e.preventDefault());
    }

    // Tab visibility
    document.addEventListener('visibilitychange', () => {
      if (!examStarted || document.visibilityState !== 'hidden') return;
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
    document.addEventListener('keydown', e => {
      // Block F12
      if (e.key === 'F12') e.preventDefault();
      // Block Ctrl+Shift+I/J/C
      if (e.ctrlKey && e.shiftKey && ['I','J','C','i','j','c'].includes(e.key)) e.preventDefault();
      // Block Ctrl+U (view source)
      if (e.ctrlKey && ['u','U'].includes(e.key)) e.preventDefault();
    });
  }

  function _detectDevtools() {
    const threshold = 160;
    if (window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold) {
      ExamState.devtoolsOpened = true;
    }
  }

  function _updateTabWarn() {
    const el = document.getElementById('tab-warn');
    if (!el) return;
    el.textContent = `Tab switches: ${tabSwitches}/${ExamConfig.MAX_TAB_SWITCHES}`;
    el.style.color = tabSwitches >= ExamConfig.MAX_TAB_SWITCHES - 1 ? '#ff3366' : '#555';
  }

  function _showOverlay() {
    document.getElementById('cheat-overlay').classList.add('show');
  }

  function dismiss() {
    document.getElementById('cheat-overlay').classList.remove('show');
  }

  return { init, dismiss };
})();


// ═══════════════════════════════════════════════════════════
// EXAM STATE
// ═══════════════════════════════════════════════════════════
const ExamState = {
  studentName:   '',
  token:         '',
  tokenHash:     '',
  setId:         '',
  questions:     [],
  startTime:     null,
  endTime:       null,
  submitted:     false,
  timerHandle:   null,
  tabSwitches:   0,
  devtoolsOpened: false,
  scores:        {},   // { qId: 10|0 }
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
    const el  = document.getElementById('timer');
    const s   = Math.max(0, Math.floor(ms / 1000));
    const m   = Math.floor(s / 60);
    const sec = s % 60;
    el.textContent = `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    el.className = s > 300 ? '' : s > 60 ? 'warn' : 'danger';
  }

  return { start, stop };
})();


// ═══════════════════════════════════════════════════════════
// EVALUATION ENGINE
// ═══════════════════════════════════════════════════════════
const Evaluator = (() => {

  // Run student code inside a sandboxed iframe and evaluate
  async function evaluateQuestion(q, studentCode) {
    return new Promise((resolve) => {
      try {
        // Create a hidden iframe sandbox
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:800px;height:600px;';
        iframe.sandbox = 'allow-scripts allow-same-origin';
        document.body.appendChild(iframe);

        const iDoc = iframe.contentDocument || iframe.contentWindow.document;
        iDoc.open();
        iDoc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${studentCode}</body></html>`);
        iDoc.close();

        // Small delay to allow scripts to run
        setTimeout(() => {
          let result;
          try {
            result = q.validate(iDoc);
          } catch(err) {
            result = { pass: false, feedback: 'Validation error: ' + err.message };
          }
          document.body.removeChild(iframe);
          resolve(result);
        }, 150);

      } catch(err) {
        resolve({ pass: false, feedback: 'Sandbox error: ' + err.message });
      }
    });
  }

  // Run all questions and compute score
  async function evaluateAll() {
    const qs = ExamState.questions;
    const results = [];

    for (const q of qs) {
      const ta = document.getElementById(`code-${q.id}`);
      const code = ta ? ta.value.trim() : '';
      const result = await evaluateQuestion(q, code);
      ExamState.scores[q.id] = result.pass ? ExamConfig.MARKS_PER_QUESTION : 0;
      results.push({ q, result });
    }

    // Best N of 5
    const marks = Object.values(ExamState.scores);
    const sorted = [...marks].sort((a,b) => b - a);
    const bestN  = sorted.slice(0, ExamConfig.BEST_N_QUESTIONS);
    const total  = bestN.reduce((s,v) => s+v, 0);

    return { results, total, marks };
  }

  return { evaluateQuestion, evaluateAll };
})();


// ═══════════════════════════════════════════════════════════
// GOOGLE SHEETS SUBMISSION
// ═══════════════════════════════════════════════════════════
const Submission = (() => {

  async function submit(total, results) {
    const payload = {
      name:        ExamState.studentName,
      token:       ExamState.token,
      tokenHash:   ExamState.tokenHash,
      score:       total,
      setId:       ExamState.setId,
      details:     JSON.stringify(
        results.map(r => ({ id: r.q.id, pass: r.result.pass, marks: ExamState.scores[r.q.id] }))
      ),
      tabSwitches: ExamState.tabSwitches,
      devtools:    ExamState.devtoolsOpened,
      timestamp:   new Date().toISOString(),
      duration:    Math.round((Date.now() - ExamState.startTime) / 1000),
    };

    try {
      const res = await fetch(ExamConfig.APPS_SCRIPT_URL, {
        method: 'POST',
        mode:   'no-cors',       // GAS requires no-cors for cross-origin POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return { ok: true };
    } catch(err) {
      console.error('Submission failed:', err);
      return { ok: false, error: err.message };
    }
  }

  return { submit };
})();


// ═══════════════════════════════════════════════════════════
// SCREEN MANAGER
// ═══════════════════════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}


// ═══════════════════════════════════════════════════════════
// EXAM RENDERER
// ═══════════════════════════════════════════════════════════
function renderQuestions(questions) {
  const container = document.getElementById('questions-container');
  container.innerHTML = '';

  questions.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `qcard-${q.id}`;

    card.innerHTML = `
      <div class="q-header">
        <div class="q-num">Q${i+1}</div>
        <div class="q-title">${q.title}</div>
        <div class="q-marks">10 marks</div>
      </div>
      <div class="q-desc">${q.description}</div>
      <div class="q-workspace">
        <div class="q-editor-pane">
          <div class="pane-label">Your Code</div>
          <textarea class="code-input" id="code-${q.id}" spellcheck="false" autocorrect="off" autocapitalize="off">${q.starterCode}</textarea>
        </div>
        <div class="q-preview-pane">
          <div class="pane-label">Preview</div>
          <iframe class="preview-frame" id="preview-${q.id}" sandbox="allow-scripts allow-same-origin"></iframe>
        </div>
      </div>
      <div class="q-footer">
        <button class="btn-run" onclick="ExamApp.runPreview('${q.id}')">▶ Run Preview</button>
        <div class="q-result" id="result-${q.id}"></div>
      </div>
    `;

    container.appendChild(card);

    // Auto-run initial preview
    setTimeout(() => ExamApp.runPreview(q.id), 200);
  });
}


// ═══════════════════════════════════════════════════════════
// RESULT RENDERER
// ═══════════════════════════════════════════════════════════
function renderResult(total, results) {
  document.getElementById('final-score').textContent = total;

  const bd = document.getElementById('score-breakdown');
  let html = '';
  results.forEach((r, i) => {
    const m = ExamState.scores[r.q.id];
    html += `
      <div class="breakdown-row">
        <span class="label">Q${i+1}: ${r.q.title}</span>
        <span class="val ${r.result.pass ? 'green' : 'red'}">${m} / 10 — ${r.result.feedback}</span>
      </div>`;
  });

  // Show which questions were counted
  const sortedIds = [...ExamState.questions]
    .sort((a,b) => (ExamState.scores[b.id]||0) - (ExamState.scores[a.id]||0))
    .slice(0, ExamConfig.BEST_N_QUESTIONS)
    .map(q => q.id);

  html += `
    <div class="breakdown-row" style="margin-top:8px;border-top:1px solid #333;padding-top:8px;">
      <span class="label">Best ${ExamConfig.BEST_N_QUESTIONS} counted</span>
      <span class="val">${sortedIds.join(', ')}</span>
    </div>
    <div class="breakdown-row">
      <span class="label">Tab switches</span>
      <span class="val ${ExamState.tabSwitches > 0 ? 'red' : 'green'}">${ExamState.tabSwitches}</span>
    </div>`;

  bd.innerHTML = html;
}


// ═══════════════════════════════════════════════════════════
// MAIN EXAM APP
// ═══════════════════════════════════════════════════════════
const ExamApp = {

  // ── Start Exam ────────────────────────────────────────
  async startExam() {
    const nameEl  = document.getElementById('inp-name');
    const tokenEl = document.getElementById('inp-token');
    const errEl   = document.getElementById('login-error');
    const btn     = document.getElementById('btn-start');

    const name  = nameEl.value.trim();
    const token = tokenEl.value.trim();

    errEl.style.display = 'none';

    if (!name) return _loginError('Please enter your full name.');
    if (!token) return _loginError('Please enter your access token.');

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Verifying...';

    // Hash & validate token
    const { valid, hash } = await ExamConfig.validateToken(token);

    if (!valid) {
      btn.disabled = false;
      btn.textContent = 'Verify & Start Exam';
      return _loginError('Invalid token. Contact your instructor.');
    }

    // Check if already submitted (localStorage guard)
    const usedKey = `exam_used_${hash}`;
    if (localStorage.getItem(usedKey)) {
      btn.disabled = false;
      btn.textContent = 'Verify & Start Exam';
      return _loginError('This token has already been used. Duplicate submissions are not allowed.');
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
    ExamState.token       = token.toUpperCase();
    ExamState.tokenHash   = hash;
    ExamState.startTime   = Date.now();

    // Pick random set
    const sets = QuestionSets.SETS;
    ExamState.setId = sets[Math.floor(Math.random() * sets.length)];
    ExamState.questions = QuestionSets[ExamState.setId];

    // Update header
    document.getElementById('hdr-name').textContent  = name;
    document.getElementById('hdr-token').textContent = token.slice(0,8) + '···';
    document.getElementById('set-label').textContent = `Set ${ExamState.setId} · ${ExamState.questions.length} Questions`;

    // Render
    renderQuestions(ExamState.questions);
    showScreen('exam');

    // Start anti-cheat & timer
    AntiCheat.init();
    Timer.start(ExamConfig.EXAM_DURATION_MINUTES, () => this._autoSubmit());

    function _loginError(msg) {
      errEl.textContent = msg;
      errEl.style.display = 'block';
    }
  },

  // ── Run live preview ──────────────────────────────────
  runPreview(qId) {
    const ta     = document.getElementById(`code-${qId}`);
    const iframe = document.getElementById(`preview-${qId}`);
    if (!ta || !iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:8px;font-family:sans-serif;font-size:13px;}</style></head><body>${ta.value}</body></html>`);
    doc.close();
  },

  // ── Manual submit ─────────────────────────────────────
  confirmSubmit() {
    if (ExamState.submitted) return;
    if (!confirm('Submit your exam now? This cannot be undone.')) return;
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
    ExamState.endTime   = Date.now();

    // Lock all textareas
    document.querySelectorAll('textarea.code-input').forEach(ta => {
      ta.disabled = true;
    });

    // Disable submit button
    const submitBtn = document.getElementById('btn-submit');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitted'; }
    Timer.stop();

    showScreen('result');
    document.getElementById('submit-status').textContent = 'Evaluating your answers...';
    document.getElementById('submit-status').className = 'status-msg';

    // Evaluate
    const { results, total } = await Evaluator.evaluateAll();

    // Render result
    renderResult(total, results);
    document.getElementById('final-score').textContent = total;

    // Mark question cards
    results.forEach(r => {
      const card = document.getElementById(`qcard-${r.q.id}`);
      if (card) card.classList.add(r.result.pass ? 'correct' : 'wrong');
    });

    // Mark token used locally
    const usedKey = `exam_used_${ExamState.tokenHash}`;
    localStorage.setItem(usedKey, Date.now().toString());

    // Submit to Google Sheets
    document.getElementById('submit-status').textContent = 'Submitting results to server...';
    const submitResult = await Submission.submit(total, results);

    const statusEl = document.getElementById('submit-status');
    if (submitResult.ok) {
      statusEl.textContent = '✓ Results submitted successfully.';
      statusEl.className = 'status-msg ok';
    } else {
      statusEl.textContent = '⚠ Could not reach server. Screenshot this page and send to instructor.';
      statusEl.className = 'status-msg err';
    }
  }
};

// ── Global error for login  ───────────────────────────────
function _loginError(msg) {
  const errEl = document.getElementById('login-error');
  errEl.textContent = msg;
  errEl.style.display = 'block';
  const btn = document.getElementById('btn-start');
  btn.disabled = false;
  btn.textContent = 'Verify & Start Exam';
}
