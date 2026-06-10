# Frontend Coding Exam Platform

This repository contains a simple, client-side frontend coding examination platform. It evaluates HTML, CSS, and JS answers within the browser using iframes and sandboxes, tracks anti-cheat metrics, and submits scores via Google Apps Script (GAS) to Google Sheets. It also includes academic tools for pairing students and assigning projects based on exam results.

## Codebase Index

### Core Exam Application
* **`index.html`**
  The main entry point for the exam platform. Contains the layout and UI for the Login Screen, Exam Screen, Result Screen, and Anti-Cheat overlays. Also contains embedded CSS for styling the application.
* **`app.js`**
  The core engine of the exam portal. Key modules include:
  * **AntiCheat**: Detects tab switches, DevTools opening, disables right-click, and blocks keyboard shortcuts.
  * **ExamState & Timer**: Manages the exam session data and the countdown timer.
  * **Evaluator**: Dynamically runs student-provided HTML/JS/CSS inside a hidden iframe sandbox to safely execute and validate the code against predefined rules.
  * **Submission**: Sends exam results, including anti-cheat logs, to a Google Apps Script URL using a hidden form POST to bypass CORS.
  * **UI Rendering**: Dynamically generates question cards, code editors, live previews, and the final score breakdown.
* **`questions.js`**
  Contains the question bank organized into sets (A, B, C, D). Each question includes its ID, title, description, starter code, and a custom `validate(doc)` function which inspects the sandboxed DOM to verify if the student's solution is correct.
* **`config.js`**
  Configuration file for the exam. Defines constants such as exam duration, marks per question, the Google Apps Script endpoint URL, and a set of valid SHA-256 token hashes used for authentication.

### Administrative / Academic Tools
* **`assign-tool-final.html`**
  A standalone utility for instructors. It acts as an "Exam Result Analyser". It allows instructors to paste student roll numbers and scores, randomly pairs them into teams, and assigns projects to each team with a polished UI.
* **`assign-tool.html` & `assign-tool1.html`**
  Earlier iterations or alternative versions of the `assign-tool-final.html` team pairing and project assignment tool.

## Architecture Highlights
* **Client-side Evaluation**: No backend is required to run the code. Student code is injected into `<iframe>` elements to isolate execution and prevent interference with the main exam application.
* **Serverless Submission**: Final scores and logs are pushed directly to Google Sheets via Google Apps Script.
* **Anti-Cheat Measures**: Tab visibility API tracking, generic DevTools size-based detection, and keyboard/mouse restrictions.
