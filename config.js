/**
 * config.js
 * Examination Configuration for Infosys 2026 Batch Assessment
 */

const ExamConfig = {
  EXAM_TITLE: "Infosys Pseudo-Code Assessment 2026",
  EXAM_DURATION_MINUTES: 30, // 30 minutes combined
  TOTAL_QUESTIONS: 15,
  MARKS_PER_QUESTION: 1,
  TOTAL_MARKS: 15,

  // Sections definition
  SECTIONS: [
    { id: "nested_loops", title: "Nested Loops", start: 0, count: 5 },
    { id: "recursion", title: "Recursion", start: 5, count: 5 },
    { id: "bitwise", title: "Bitwise Operations", start: 10, count: 5 }
  ],

  // Anti-cheat controls
  MAX_TAB_SWITCHES: 3,
  DISABLE_RIGHTCLICK: true,
  DISABLE_COPY: true,
  DETECT_DEVTOOLS: true,

  // Optional background submission endpoint (Google Sheets via Apps Script)
  APPS_SCRIPT_URL:
    "https://script.google.com/macros/s/AKfycbwfSJTecVuJ3JhihguoiyV2jCyqrvqi65pGZ_MUIYz80UyWwsFl5VF6U35i8lnHs_yG/exec"
};
