const fs = require('fs');
const { Explanations, CodingSolutions } = require('./explanations');

// Load Questions
const questionsCode = fs.readFileSync('./questions.js', 'utf-8');
// Safely evaluate questions.js
const sandbox = {};
require('vm').createContext(sandbox);
require('vm').runInContext(questionsCode + '\nvar QS = QuestionSets;', sandbox);
const QuestionSets = sandbox.QS;

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Instructor Answer Key</title>
  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --text: #f1f5f9;
      --accent: #3b82f6;
      --success: #10b981;
      --border: #334155;
      --muted: #94a3b8;
    }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0; padding: 20px;
    }
    header { text-align: center; margin-bottom: 30px; }
    h1 { color: var(--accent); }
    .tabs {
      display: flex; justify-content: center; gap: 10px; margin-bottom: 20px;
    }
    .tab-btn {
      background: var(--card-bg); border: 1px solid var(--border);
      color: var(--text); padding: 10px 20px; border-radius: 8px;
      cursor: pointer; font-size: 16px; transition: 0.2s;
    }
    .tab-btn:hover, .tab-btn.active {
      background: var(--accent); border-color: var(--accent);
    }
    .set-content { display: none; max-width: 1000px; margin: 0 auto; }
    .set-content.active { display: block; }
    
    .question-card {
      background: var(--card-bg); border: 1px solid var(--border);
      border-radius: 12px; padding: 20px; margin-bottom: 20px;
    }
    .q-title { font-size: 18px; margin: 0 0 15px 0; font-weight: 600; }
    .mcq-option {
      padding: 10px 15px; background: rgba(0,0,0,0.2);
      border-radius: 6px; margin-bottom: 8px; display: flex; align-items: center;
    }
    .mcq-option.correct {
      background: rgba(16, 185, 129, 0.2);
      border-left: 4px solid var(--success);
      font-weight: 600; color: #34d399;
    }
    .explanation {
      margin-top: 15px; padding: 15px; background: rgba(59, 130, 246, 0.1);
      border-radius: 8px; color: #bfdbfe; font-size: 14px; line-height: 1.5;
    }
    .badge {
      display: inline-block; padding: 3px 8px; border-radius: 4px;
      font-size: 12px; font-weight: bold; margin-bottom: 10px;
    }
    .badge-mcq { background: #475569; color: white; }
    .badge-code { background: #8b5cf6; color: white; }
    
    pre {
      background: #000 !important; border-radius: 8px;
      padding: 15px !important; overflow-x: auto;
    }
    code { font-family: "Fira Code", "Consolas", monospace; }
    .stats {
      display: flex; gap: 15px; margin: 15px 0;
    }
    .stat { background: #334155; padding: 5px 10px; border-radius: 5px; font-size: 13px; }
  </style>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
</head>
<body>
  <header>
    <h1>.NET Fullstack Exam - Official Answer Key</h1>
    <p>Detailed explanations and optimal approaches for Sets A, B, C, and D</p>
  </header>

  <div class="tabs">
    <button class="tab-btn active" onclick="showTab('A')">Set A</button>
    <button class="tab-btn" onclick="showTab('B')">Set B</button>
    <button class="tab-btn" onclick="showTab('C')">Set C</button>
    <button class="tab-btn" onclick="showTab('D')">Set D</button>
  </div>
`;

['A', 'B', 'C', 'D'].forEach((setId) => {
  html += `  <div id="set-${setId}" class="set-content ${setId === 'A' ? 'active' : ''}">\n`;
  html += `    <h2>Question Set ${setId}</h2>\n`;

  QuestionSets[setId].forEach((q) => {
    html += `    <div class="question-card">\n`;
    if (q.type === 'mcq') {
      html += `      <span class="badge badge-mcq">MCQ</span>\n`;
      html += `      <p class="q-title">${q.id}. ${q.title}</p>\n`;
      
      q.options.forEach((opt) => {
        const isCorrect = opt === q.correctAnswer;
        html += `      <div class="mcq-option ${isCorrect ? 'correct' : ''}">${isCorrect ? '✓ ' : ''}${opt}</div>\n`;
      });
      
      const expl = Explanations[q.id] || "No explanation available.";
      html += `      <div class="explanation"><strong>Explanation:</strong> ${expl}</div>\n`;

    } else if (q.type === 'code') {
      html += `      <span class="badge badge-code">CODE (${q.title})</span>\n`;
      html += `      <p class="q-title">${q.id}. ${q.description}</p>\n`;
      
      const sol = CodingSolutions[q.id];
      if (sol) {
        html += `      <pre><code class="language-csharp">${sol.optimal.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>\n`;
        html += `      <div class="stats">
        <div class="stat">⏱ Time: ${sol.time}</div>
        <div class="stat">💾 Space: ${sol.space}</div>
      </div>\n`;
        html += `      <div class="explanation">
        <strong>Optimal Approach:</strong> ${sol.explanation}<br><br>
        <strong>Alternative Approach:</strong> ${sol.alternative}
      </div>\n`;
      } else {
        html += `      <div class="explanation">Solution pending.</div>\n`;
      }
    }
    html += `    </div>\n`;
  });

  html += `  </div>\n`;
});

html += `
  <script>
    function showTab(set) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.set-content').forEach(div => div.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('set-' + set).classList.add('active');
    }
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-csharp.min.js"></script>
</body>
</html>
`;

fs.writeFileSync('./answer-key.html', html);
console.log('Successfully generated answer-key.html');
