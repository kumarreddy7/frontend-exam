/**
 * app.js
 * Assessment Engine for Infosys 2026 Batch Pseudo-Code Exam
 * Features:
 * - 30-min shared timer (time carry-over across sections)
 * - Section-wise & per-question time tracking
 * - Real-time question palette with status tracking
 * - In-depth post-exam review with step-by-step explanations
 * - Diagnostic focus area recommendations & preparation tips
 */

"use strict";

const ExamState = {
  name: "",
  rollNo: "",
  currentQIndex: 0,
  answers: {},       // { [qId]: 'A' | 'B' | 'C' | 'D' }
  reviewed: {},      // { [qId]: boolean }
  visited: {},       // { [qId]: boolean }
  timeSpent: {},     // { [qId]: seconds }
  activeQuestionStartTime: null,
  startTime: null,
  endTime: null,
  submitted: false,
  tabSwitches: 0,
  timerInterval: null,
  questionTimerInterval: null,
  remainingSeconds: 30 * 60, // 30 minutes
};

// ═══════════════════════════════════════════════════════════
// SCREEN MANAGEMENT
// ═══════════════════════════════════════════════════════════
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById("screen-" + screenId);
  if (target) {
    target.classList.add("active");
    window.scrollTo(0, 0);
  }
}

// ═══════════════════════════════════════════════════════════
// ANTI-CHEAT MODULE
// ═══════════════════════════════════════════════════════════
const AntiCheat = (() => {
  let active = false;

  function init() {
    active = true;

    if (ExamConfig.DISABLE_RIGHTCLICK) {
      document.addEventListener("contextmenu", (e) => e.preventDefault());
    }

    if (ExamConfig.DISABLE_COPY) {
      document.addEventListener("copy", (e) => e.preventDefault());
      document.addEventListener("paste", (e) => e.preventDefault());
      document.addEventListener("cut", (e) => e.preventDefault());
    }

    // Keyboard shortcut prevention (F12, Ctrl+U, etc.)
    document.addEventListener("keydown", (e) => {
      if (e.key === "F12") e.preventDefault();
      if (e.ctrlKey && e.shiftKey && ["I", "J", "C", "i", "j", "c"].includes(e.key)) e.preventDefault();
      if (e.ctrlKey && ["u", "U"].includes(e.key)) e.preventDefault();
    });

    // Tab visibility detection
    document.addEventListener("visibilitychange", () => {
      if (!active || ExamState.submitted) return;
      if (document.visibilityState === "hidden") {
        ExamState.tabSwitches++;
        updateTabWarning();
        if (ExamState.tabSwitches >= ExamConfig.MAX_TAB_SWITCHES) {
          showTabOverlay();
        }
      }
    });
  }

  function updateTabWarning() {
    const el = document.getElementById("tab-warn-badge");
    if (!el) return;
    if (ExamState.tabSwitches > 0) {
      el.style.display = "inline-flex";
      el.textContent = `Tab Switches: ${ExamState.tabSwitches}/${ExamConfig.MAX_TAB_SWITCHES}`;
      if (ExamState.tabSwitches >= ExamConfig.MAX_TAB_SWITCHES) {
        el.className = "warning-badge danger";
      } else {
        el.className = "warning-badge";
      }
    }
  }

  function showTabOverlay() {
    const overlay = document.getElementById("cheat-overlay");
    if (overlay) overlay.classList.add("show");
  }

  function dismissOverlay() {
    const overlay = document.getElementById("cheat-overlay");
    if (overlay) overlay.classList.remove("show");
  }

  return { init, dismissOverlay };
})();

// ═══════════════════════════════════════════════════════════
// EXAM APP CONTROLLER
// ═══════════════════════════════════════════════════════════
const ExamApp = {
  // Step 1: Validate login and move to instructions
  proceedToInstructions() {
    const nameInput = document.getElementById("input-name");
    const rollInput = document.getElementById("input-roll");
    const errorEl = document.getElementById("login-error");

    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();

    if (!name || !roll) {
      errorEl.textContent = "Please enter both your Full Name and Roll Number.";
      errorEl.style.display = "block";
      return;
    }

    errorEl.style.display = "none";
    ExamState.name = name;
    ExamState.rollNo = roll;

    // Update candidate details on instructions screen
    document.getElementById("instr-candidate-name").textContent = name;
    document.getElementById("instr-candidate-roll").textContent = roll;

    showScreen("instructions");
  },

  backToLogin() {
    showScreen("login");
  },

  // Step 2: Start the Exam
  startExam() {
    ExamState.startTime = Date.now();
    ExamState.submitted = false;
    ExamState.currentQIndex = 0;
    ExamState.remainingSeconds = ExamConfig.EXAM_DURATION_MINUTES * 60;

    // Initialize tracking tables
    ExamQuestions.forEach((q) => {
      ExamState.timeSpent[q.id] = 0;
    });

    // Update candidate info in exam header
    document.getElementById("hdr-candidate-name").textContent = ExamState.name;
    document.getElementById("hdr-candidate-roll").textContent = ExamState.rollNo;

    // Render Section Tabs & Question Palette
    this.renderSectionTabs();
    this.renderPalette();

    // Start Timer
    this.startGlobalTimer();

    // Show Exam Screen and load Q1
    showScreen("exam");
    this.loadQuestion(0);

    // Initialize AntiCheat
    AntiCheat.init();
  },

  // Global Timer (30 minutes shared)
  startGlobalTimer() {
    const timerEl = document.getElementById("exam-timer");

    this.updateTimerDisplay();

    ExamState.timerInterval = setInterval(() => {
      ExamState.remainingSeconds--;

      this.updateTimerDisplay();

      if (ExamState.remainingSeconds <= 0) {
        clearInterval(ExamState.timerInterval);
        this.autoSubmit();
      }
    }, 1000);
  },

  updateTimerDisplay() {
    const timerEl = document.getElementById("exam-timer");
    if (!timerEl) return;

    const mins = Math.floor(ExamState.remainingSeconds / 60);
    const secs = ExamState.remainingSeconds % 60;

    timerEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    if (ExamState.remainingSeconds <= 120) {
      timerEl.className = "timer-pill danger";
    } else if (ExamState.remainingSeconds <= 300) {
      timerEl.className = "timer-pill warn";
    } else {
      timerEl.className = "timer-pill normal";
    }
  },

  // Flush and track time spent on the active question
  flushActiveQuestionTime() {
    if (ExamState.activeQuestionStartTime !== null) {
      const now = Date.now();
      const deltaSec = Math.floor((now - ExamState.activeQuestionStartTime) / 1000);
      const activeQ = ExamQuestions[ExamState.currentQIndex];
      if (activeQ && deltaSec > 0) {
        ExamState.timeSpent[activeQ.id] = (ExamState.timeSpent[activeQ.id] || 0) + deltaSec;
      }
    }
    ExamState.activeQuestionStartTime = Date.now();
  },

  // Load a question by index (0 to 14)
  loadQuestion(index) {
    if (index < 0 || index >= ExamQuestions.length) return;

    // Track elapsed time from previous question
    this.flushActiveQuestionTime();

    ExamState.currentQIndex = index;
    const q = ExamQuestions[index];

    // Mark as visited
    ExamState.visited[q.id] = true;

    // Render Question Content
    this.renderQuestionCard(q, index);

    // Update Palette active states
    this.updatePaletteUI();

    // Update Section Tabs
    this.updateSectionTabs();

    // Scroll to top of question
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  renderQuestionCard(q, index) {
    const container = document.getElementById("current-question-container");
    const isAnswered = !!ExamState.answers[q.id];
    const isReviewed = !!ExamState.reviewed[q.id];

    // Generate options HTML
    let optionsHtml = "";
    q.options.forEach((opt) => {
      const isSelected = ExamState.answers[q.id] === opt.key;
      optionsHtml += `
        <label class="option-item ${isSelected ? "selected" : ""}" onclick="ExamApp.selectOption('${opt.key}')">
          <input type="radio" name="opt-choice" value="${opt.key}" ${isSelected ? "checked" : ""} />
          <span class="opt-badge">${opt.key}</span>
          <span class="opt-text">${this.escapeHtml(opt.text)}</span>
        </label>
      `;
    });

    container.innerHTML = `
      <div class="question-header">
        <div class="q-meta-left">
          <span class="section-tag">${q.sectionTitle}</span>
          <span class="q-number-pill">Question ${index + 1} of ${ExamQuestions.length}</span>
        </div>
        <div class="q-meta-right">
          <span class="marks-pill">+1.0 Mark</span>
        </div>
      </div>

      <div class="q-prompt">${this.escapeHtml(q.prompt)}</div>

      <div class="code-wrapper">
        <div class="code-header">
          <span>PSEUDOCODE</span>
          <span class="lang-tag">Infosys Standard</span>
        </div>
        <pre class="pseudocode-block"><code>${this.syntaxHighlight(q.pseudocode)}</code></pre>
      </div>

      <div class="options-container">
        ${optionsHtml}
      </div>

      <div class="question-footer">
        <div class="footer-left">
          <button class="btn btn-outline" onclick="ExamApp.prevQuestion()" ${index === 0 ? "disabled" : ""}>
            &larr; Previous
          </button>
          <button class="btn btn-subtle" onclick="ExamApp.clearResponse()">
            Clear Response
          </button>
          <button class="btn ${isReviewed ? "btn-review-active" : "btn-review"}" onclick="ExamApp.toggleReview()">
            ${isReviewed ? "&#9733; Marked for Review" : "&#9734; Mark for Review"}
          </button>
        </div>
        <div class="footer-right">
          ${
            index < ExamQuestions.length - 1
              ? `<button class="btn btn-primary" onclick="ExamApp.nextQuestion()">Next &rarr;</button>`
              : `<button class="btn btn-success" onclick="ExamApp.confirmSubmit()">Submit Assessment</button>`
          }
        </div>
      </div>
    `;
  },

  selectOption(key) {
    const q = ExamQuestions[ExamState.currentQIndex];
    ExamState.answers[q.id] = key;
    this.renderQuestionCard(q, ExamState.currentQIndex);
    this.updatePaletteUI();
    this.updateSectionTabs();
  },

  clearResponse() {
    const q = ExamQuestions[ExamState.currentQIndex];
    delete ExamState.answers[q.id];
    this.renderQuestionCard(q, ExamState.currentQIndex);
    this.updatePaletteUI();
    this.updateSectionTabs();
  },

  toggleReview() {
    const q = ExamQuestions[ExamState.currentQIndex];
    ExamState.reviewed[q.id] = !ExamState.reviewed[q.id];
    this.renderQuestionCard(q, ExamState.currentQIndex);
    this.updatePaletteUI();
  },

  nextQuestion() {
    if (ExamState.currentQIndex < ExamQuestions.length - 1) {
      this.loadQuestion(ExamState.currentQIndex + 1);
    }
  },

  prevQuestion() {
    if (ExamState.currentQIndex > 0) {
      this.loadQuestion(ExamState.currentQIndex - 1);
    }
  },

  // Section Tabs Navigation
  renderSectionTabs() {
    const container = document.getElementById("section-tabs-bar");
    container.innerHTML = "";

    ExamConfig.SECTIONS.forEach((sec, idx) => {
      const tab = document.createElement("button");
      tab.className = `sec-tab-btn ${idx === 0 ? "active" : ""}`;
      tab.id = `sec-tab-${sec.id}`;
      tab.onclick = () => this.switchSection(sec.id);
      tab.innerHTML = `
        <span class="sec-name">${sec.title}</span>
        <span class="sec-count" id="sec-badge-${sec.id}">0/${sec.count}</span>
      `;
      container.appendChild(tab);
    });
  },

  switchSection(sectionId) {
    const sec = ExamConfig.SECTIONS.find((s) => s.id === sectionId);
    if (sec) {
      this.loadQuestion(sec.start);
    }
  },

  updateSectionTabs() {
    const currentQ = ExamQuestions[ExamState.currentQIndex];

    ExamConfig.SECTIONS.forEach((sec) => {
      const tab = document.getElementById(`sec-tab-${sec.id}`);
      if (tab) {
        if (sec.id === currentQ.sectionId) {
          tab.classList.add("active");
        } else {
          tab.classList.remove("active");
        }
      }

      // Count answered
      let answeredCount = 0;
      for (let i = sec.start; i < sec.start + sec.count; i++) {
        const qId = ExamQuestions[i].id;
        if (ExamState.answers[qId]) answeredCount++;
      }
      const badge = document.getElementById(`sec-badge-${sec.id}`);
      if (badge) badge.textContent = `${answeredCount}/${sec.count}`;
    });
  },

  // Question Palette
  renderPalette() {
    const grid = document.getElementById("palette-grid");
    grid.innerHTML = "";

    ExamQuestions.forEach((q, idx) => {
      const btn = document.createElement("button");
      btn.className = "palette-btn not-visited";
      btn.id = `pal-btn-${q.id}`;
      btn.textContent = idx + 1;
      btn.onclick = () => this.loadQuestion(idx);
      grid.appendChild(btn);
    });

    this.updatePaletteUI();
  },

  updatePaletteUI() {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let notVisited = 0;

    ExamQuestions.forEach((q, idx) => {
      const btn = document.getElementById(`pal-btn-${q.id}`);
      if (!btn) return;

      const isCurrent = idx === ExamState.currentQIndex;
      const isAns = !!ExamState.answers[q.id];
      const isRev = !!ExamState.reviewed[q.id];
      const isVis = !!ExamState.visited[q.id];

      btn.className = "palette-btn";

      if (isCurrent) btn.classList.add("current");

      if (isRev && isAns) {
        btn.classList.add("reviewed-answered");
        marked++;
        answered++;
      } else if (isRev) {
        btn.classList.add("reviewed");
        marked++;
      } else if (isAns) {
        btn.classList.add("answered");
        answered++;
      } else if (isVis) {
        btn.classList.add("not-answered");
        notAnswered++;
      } else {
        btn.classList.add("not-visited");
        notVisited++;
      }
    });

    // Update palette legend counts
    const countAns = document.getElementById("pal-count-ans");
    const countNotAns = document.getElementById("pal-count-notans");
    const countRev = document.getElementById("pal-count-rev");
    const countNotVis = document.getElementById("pal-count-notvis");

    if (countAns) countAns.textContent = answered;
    if (countNotAns) countNotAns.textContent = notAnswered;
    if (countRev) countRev.textContent = marked;
    if (countNotVis) countNotVis.textContent = notVisited;
  },

  // Submission Flow
  confirmSubmit() {
    this.flushActiveQuestionTime();

    let answeredCount = Object.keys(ExamState.answers).length;
    let totalCount = ExamQuestions.length;
    let unattempted = totalCount - answeredCount;

    const modal = document.getElementById("submit-confirm-modal");
    document.getElementById("modal-ans-count").textContent = answeredCount;
    document.getElementById("modal-unans-count").textContent = unattempted;
    modal.classList.add("show");
  },

  closeModal() {
    const modal = document.getElementById("submit-confirm-modal");
    modal.classList.remove("show");
  },

  autoSubmit() {
    alert("Time is up! Your assessment is being submitted automatically.");
    this.executeSubmit();
  },

  executeSubmit() {
    this.closeModal();

    if (ExamState.submitted) return;
    ExamState.submitted = true;
    ExamState.endTime = Date.now();

    // Flush current question timer
    this.flushActiveQuestionTime();

    // Stop global timer
    if (ExamState.timerInterval) clearInterval(ExamState.timerInterval);

    // Calculate Scores & Diagnostics
    const evaluation = this.evaluateExam();

    // Render Detailed Results
    this.renderResultScreen(evaluation);

    // Background submit to Google Apps Script if reachable
    this.sendBackgroundSubmission(evaluation);

    showScreen("result");
  },

  evaluateExam() {
    let totalScore = 0;
    const questionResults = [];

    // Section breakdown buckets
    const sectionStats = {
      nested_loops: { id: "nested_loops", title: "Nested Loops", total: 0, attempted: 0, correct: 0, wrong: 0, timeSec: 0 },
      recursion: { id: "recursion", title: "Recursion", total: 0, attempted: 0, correct: 0, wrong: 0, timeSec: 0 },
      bitwise: { id: "bitwise", title: "Bitwise Operations", total: 0, attempted: 0, correct: 0, wrong: 0, timeSec: 0 }
    };

    ExamQuestions.forEach((q) => {
      const selectedKey = ExamState.answers[q.id] || null;
      const isCorrect = selectedKey === q.correctAnswer;
      const timeSpentSec = ExamState.timeSpent[q.id] || 0;

      const sec = sectionStats[q.sectionId];
      if (sec) {
        sec.total++;
        sec.timeSec += timeSpentSec;
        if (selectedKey) {
          sec.attempted++;
          if (isCorrect) {
            sec.correct++;
          } else {
            sec.wrong++;
          }
        }
      }

      if (isCorrect) totalScore += ExamConfig.MARKS_PER_QUESTION;

      questionResults.push({
        q,
        selectedKey,
        isCorrect,
        isAttempted: !!selectedKey,
        timeSpentSec
      });
    });

    const totalTimeSec = Math.floor((ExamState.endTime - ExamState.startTime) / 1000);

    return {
      totalScore,
      maxScore: ExamConfig.TOTAL_MARKS,
      percentage: Math.round((totalScore / ExamConfig.TOTAL_MARKS) * 100),
      totalTimeSec,
      sectionStats,
      questionResults
    };
  },

  renderResultScreen(evaluation) {
    // Header candidate display
    document.getElementById("res-candidate-name").textContent = ExamState.name;
    document.getElementById("res-candidate-roll").textContent = ExamState.rollNo;

    // Scorecard
    document.getElementById("res-score-num").textContent = evaluation.totalScore;
    document.getElementById("res-score-total").textContent = `out of ${evaluation.maxScore}`;
    document.getElementById("res-percentage").textContent = `${evaluation.percentage}%`;
    document.getElementById("res-total-time").textContent = this.formatTime(evaluation.totalTimeSec);

    // Section-wise Table
    const tbody = document.getElementById("res-section-tbody");
    tbody.innerHTML = "";

    const weakSections = [];

    Object.values(evaluation.sectionStats).forEach((sec) => {
      const accuracy = sec.attempted > 0 ? Math.round((sec.correct / sec.attempted) * 100) : 0;
      const scoreRatio = sec.correct / sec.total;

      if (scoreRatio < 0.6) {
        weakSections.push({ title: sec.title, id: sec.id, accuracy, correct: sec.correct, total: sec.total });
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="sec-col"><strong>${sec.title}</strong></td>
        <td>${sec.attempted} / ${sec.total}</td>
        <td class="text-success"><strong>${sec.correct}</strong></td>
        <td class="text-danger">${sec.wrong}</td>
        <td class="text-muted">${sec.total - sec.attempted}</td>
        <td>${this.formatTime(sec.timeSec)}</td>
        <td>
          <span class="acc-badge ${accuracy >= 70 ? "acc-high" : accuracy >= 40 ? "acc-mid" : "acc-low"}">
            ${accuracy}%
          </span>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Render Diagnostic & Focus Areas
    this.renderDiagnosticTips(weakSections, evaluation);

    // Render Question Review Cards
    this.renderQuestionReviews(evaluation.questionResults);
  },

  renderDiagnosticTips(weakSections, evaluation) {
    const diagBox = document.getElementById("res-diagnostic-box");

    let focusHtml = "";
    if (weakSections.length > 0) {
      focusHtml += `
        <div class="diag-alert">
          <div class="diag-alert-title">&#9888; Priority Focus Areas Identified</div>
          <p>Based on your performance, the following topic(s) need immediate practice:</p>
          <ul>
            ${weakSections
              .map(
                (w) =>
                  `<li><strong>${w.title}</strong> &mdash; Scored ${w.correct}/${w.total} (${w.accuracy}% accuracy). ${this.getTopicAdvice(w.id)}</li>`
              )
              .join("")}
          </ul>
        </div>
      `;
    } else {
      focusHtml += `
        <div class="diag-alert success">
          <div class="diag-alert-title">&#10004; Outstanding Performance!</div>
          <p>You demonstrated consistent accuracy across all three topics (Nested Loops, Recursion, and Bitwise Operations). Review the speed tips below to maintain your edge.</p>
        </div>
      `;
    }

    diagBox.innerHTML = `
      ${focusHtml}
      <div class="infosys-tips-grid">
        <div class="tip-card">
          <div class="tip-title">1. Bitwise Operator Precedence</div>
          <p>In Infosys pseudocodes, operator precedence is the most common trap:</p>
          <div class="tip-formula">Arithmetic (+, -) &gt; Shifts (&lt;&lt;, &gt;&gt;) &gt; Relational &gt; &amp; &gt; ^ &gt; |</div>
          <p class="tip-sub">Never evaluate left-to-right! Always calculate additions before bitwise AND/XOR.</p>
        </div>

        <div class="tip-card">
          <div class="tip-title">2. Recursion Tree Methodology</div>
          <p>Trace recursive calls from the bottom up on rough paper:</p>
          <ul class="tip-list">
            <li>Identify the base condition return values first.</li>
            <li>Draw branches for each call; don't calculate mentally.</li>
            <li>Track in-function variable mutations before recursive calls.</li>
          </ul>
        </div>

        <div class="tip-card">
          <div class="tip-title">3. Nested Loop Boundary Traps</div>
          <p>Always verify the start, end, and step increments:</p>
          <ul class="tip-list">
            <li>Check if inner loop limits depend on the outer variable (e.g., <code>n from m to 4</code>).</li>
            <li>Look out for <code>break</code> or <code>continue</code> conditions that truncate loop cycles.</li>
            <li>Notice variable re-initialization (e.g. <code>q = 3</code> inside the outer while loop).</li>
          </ul>
        </div>

        <div class="tip-card">
          <div class="tip-title">4. Bit Manipulation Fast Tricks</div>
          <p>Key shortcuts for instant solving:</p>
          <ul class="tip-list">
            <li><code>n &amp; (n - 1)</code> clears the lowest set bit.</li>
            <li><code>x ^ x = 0</code> and <code>x ^ 0 = x</code>.</li>
            <li><code>(a &amp; b) ^ (a | b)</code> is mathematically equal to <code>a ^ b</code>.</li>
            <li><code>x &lt;&lt; 1</code> doubles <code>x</code>; <code>x &gt;&gt; 1</code> performs integer halving.</li>
          </ul>
        </div>
      </div>
    `;
  },

  getTopicAdvice(topicId) {
    switch (topicId) {
      case "nested_loops":
        return "Focus on step values (step 2, down to), conditional break statements, and tracking variable accumulation across outer loop resets.";
      case "recursion":
        return "Practice drawing recursion trees on paper and tracking stack unwinding values rather than trying to solve recursively in your head.";
      case "bitwise":
        return "Strictly memorize operator precedence: Arithmetic (+) evaluates before Bitwise AND (&), which evaluates before XOR (^).";
      default:
        return "Review core fundamentals and trace code line by line.";
    }
  },

  renderQuestionReviews(questionResults) {
    const list = document.getElementById("res-questions-list");
    list.innerHTML = "";

    questionResults.forEach((item, index) => {
      const q = item.q;
      const card = document.createElement("div");
      card.className = `review-qcard ${item.isCorrect ? "card-correct" : item.isAttempted ? "card-wrong" : "card-skipped"}`;
      card.id = `rev-card-${q.id}`;
      card.dataset.status = item.isCorrect ? "correct" : item.isAttempted ? "incorrect" : "skipped";

      const selectedOptObj = q.options.find((o) => o.key === item.selectedKey);
      const correctOptObj = q.options.find((o) => o.key === q.correctAnswer);

      const statusBadge = item.isCorrect
        ? `<span class="res-badge badge-correct">&#10004; Correct</span>`
        : item.isAttempted
        ? `<span class="res-badge badge-wrong">&#10008; Incorrect</span>`
        : `<span class="res-badge badge-skipped">&#8722; Unattempted</span>`;

      card.innerHTML = `
        <div class="review-header">
          <div class="review-meta">
            <span class="q-tag">${q.sectionTitle}</span>
            <span class="q-title">Question ${index + 1}: ${q.title}</span>
          </div>
          <div class="review-status">
            ${statusBadge}
            <span class="time-spent-tag">&#9201; Time: ${this.formatTime(item.timeSpentSec)}</span>
          </div>
        </div>

        <div class="q-prompt">${this.escapeHtml(q.prompt)}</div>

        <div class="code-wrapper">
          <div class="code-header">
            <span>PSEUDOCODE</span>
          </div>
          <pre class="pseudocode-block"><code>${this.syntaxHighlight(q.pseudocode)}</code></pre>
        </div>

        <div class="answers-comparison">
          <div class="ans-box ${item.isCorrect ? "ans-box-correct" : "ans-box-selected"}">
            <span class="ans-label">Your Answer:</span>
            <span class="ans-value">
              ${
                selectedOptObj
                  ? `<strong>Option ${selectedOptObj.key}:</strong> ${this.escapeHtml(selectedOptObj.text)}`
                  : `<em class="text-muted">Not Answered</em>`
              }
            </span>
          </div>
          <div class="ans-box ans-box-correct">
            <span class="ans-label">Correct Answer:</span>
            <span class="ans-value">
              <strong>Option ${correctOptObj.key}:</strong> ${this.escapeHtml(correctOptObj.text)}
            </span>
          </div>
        </div>

        <div class="explanation-box">
          <div class="exp-title">&#128214; Step-by-Step Explanation &amp; Trace:</div>
          <div class="exp-content">${q.explanation}</div>
        </div>
      `;

      list.appendChild(card);
    });
  },

  filterReview(type) {
    document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`filter-btn-${type}`);
    if (activeBtn) activeBtn.classList.add("active");

    const cards = document.querySelectorAll(".review-qcard");
    cards.forEach((c) => {
      if (type === "all") {
        c.style.display = "block";
      } else {
        c.style.display = c.dataset.status === type ? "block" : "none";
      }
    });
  },

  printResult() {
    window.print();
  },

  retakeExam() {
    if (confirm("Are you sure you want to retake the assessment? Your current scores will be cleared.")) {
      ExamState.answers = {};
      ExamState.reviewed = {};
      ExamState.visited = {};
      ExamState.timeSpent = {};
      ExamState.submitted = false;
      ExamState.tabSwitches = 0;
      showScreen("login");
    }
  },

  // Background Submission (Google Apps Script)
  async sendBackgroundSubmission(evaluation) {
    if (!ExamConfig.APPS_SCRIPT_URL) return;

    const payload = {
      name: ExamState.name,
      rollNo: ExamState.rollNo,
      score: evaluation.totalScore,
      maxScore: evaluation.maxScore,
      percentage: evaluation.percentage,
      totalTimeSec: evaluation.totalTimeSec,
      tabSwitches: ExamState.tabSwitches,
      answers: evaluation.questionResults.map((r) => ({
        qId: r.q.id,
        section: r.q.sectionTitle,
        selected: r.selectedKey,
        correct: r.q.correctAnswer,
        isCorrect: r.isCorrect,
        timeSec: r.timeSpentSec
      })),
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(ExamConfig.APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      // Non-blocking catch
      console.log("Background report sync:", e);
    }
  },

  // Helpers
  formatTime(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    if (m === 0) return `${sec}s`;
    return `${m}m ${sec}s`;
  },

  escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  syntaxHighlight(code) {
    if (!code) return "";
    let safe = this.escapeHtml(code);

    // Keywords
    const keywords = [
      "Integer", "Set", "for", "from", "to", "down", "step", "end for",
      "while", "end while", "if", "then", "else", "else if", "end if",
      "break", "function", "end function", "return", "print", "mod", "or", "and"
    ];

    keywords.forEach((kw) => {
      const reg = new RegExp(`\\b(${kw})\\b`, "g");
      safe = safe.replace(reg, '<span class="kw">$1</span>');
    });

    // Numbers
    safe = safe.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');

    // Operators
    safe = safe.replace(/(\^|&amp;|\||&lt;&lt;|&gt;&gt;)/g, '<span class="op">$1</span>');

    return safe;
  }
};
