# Infosys 2026 Batch Pseudo-Code Assessment Platform

A lightweight, high-performance, client-side assessment platform tailored for Infosys 2026 campus placement recruitment preparation.

**Live Assessment Link:** [https://kumarreddy7.github.io/frontend-exam/](https://kumarreddy7.github.io/frontend-exam/)

---

## Key Features

1. **Pure Multiple-Choice Assessment (Choose the Correct Answers)**
   - 15 authentic Infosys recruitment test pseudocode questions.
   - 3 core technical sections:
     - **Nested Loops** (Questions 1 – 5)
     - **Recursion** (Questions 6 – 10)
     - **Bitwise Operations** (Questions 11 – 15)
   - Zero difficulty labels shown to candidates (maintains standard assessment environment).

2. **Frictionless Candidate Access**
   - No access tokens or passwords needed.
   - Candidates enter their Full Name and Roll Number / Registration ID to begin.

3. **Combined 30-Minute Shared Countdown Timer**
   - Single 30:00 timer across all three sections.
   - No artificial section time cutoffs: solving quickly in one section automatically carries remaining time over to subsequent sections.
   - Full question palette navigation allows candidates to move between questions and sections freely.

4. **Granular Time & Answer Tracking**
   - Continuously records time spent on each individual question.
   - Aggregates section-wise time expenditure and accuracy metrics.

5. **Instant In-Depth Solutions & Diagnostic Feedback**
   - Immediate review screen upon exam submission (or timer expiration).
   - Shows candidate's selected answer vs. verified correct answer.
   - Complete step-by-step mathematical & algorithmic trace tables for all 15 questions.
   - Diagnostic analysis highlighting weak topics with actionable Infosys preparation tips (operator precedence, recursion tree tracing, loop boundary conditions, and bit manipulation shortcuts).

6. **Clean, Distraction-Free Interface**
   - Displays only the candidate's name and roll number.
   - No external marketing, no AI watermarks/branding, and no clutter.

---

## Structure
- `index.html`: Portal UI (Registration, Instructions, Live Test with Palette, and Comprehensive Results Review).
- `questions.js`: 15 mathematically verified Infosys 2026 pseudocode questions, options, and step-by-step traces.
- `app.js`: State manager, 30-minute timer, time tracker, palette controller, and diagnostic engine.
- `config.js`: Assessment parameters and section configuration.
- `answer-key.html`: Standalone official instructor solution sheet.
