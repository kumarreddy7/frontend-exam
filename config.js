/**
 * config.js
 * ─────────────────────────────────────────────────────────
 * EXAM CONFIGURATION — Edit before each exam session.
 * ─────────────────────────────────────────────────────────
 *
 * TOKEN SECURITY NOTE:
 *   Tokens are hashed (SHA-256) so raw tokens are never in source.
 *   Generate hashes using: ExamConfig.hashToken("RAW_TOKEN")
 *   in browser console, then paste the hash here.
 *
 *   Raw tokens you distribute to students (examples):
 *     ALPHA-2024-001  →  hash below
 *     ALPHA-2024-002  →  hash below
 *   Replace with your real hashed tokens before deployment.
 */

const ExamConfig = {

  // ── Exam settings ──────────────────────────────────────
  EXAM_DURATION_MINUTES: 30,
  QUESTIONS_PER_SET: 5,
  MARKS_PER_QUESTION: 10,
  BEST_N_QUESTIONS: 3,          // Best 3 of 5 counted

  // ── Google Apps Script endpoint ────────────────────────
  // Replace with your deployed Apps Script Web App URL
VALID_TOKEN_HASHES: new Set([
    '6026f9bf9a6ec39abf9fe1cfa785e0e4119169efe8a6b3516c3d86c0161e4307',
    '71d5925972a25effca9caa76a2a90c2cf560652e4157d02c68a3eb0202c94b8e',
    // ... all 50 hashes ...
]),

  // ── Hashed token list (SHA-256 hex, lowercase) ─────────
  // To generate: open browser console → ExamConfig.hashToken("TOKEN")
  // Format: { hash: true/false }  (false = already used, set via GAS)
  VALID_TOKEN_HASHES: new Set([
    // paste SHA-256 hashes of your tokens here, one per line
    // example (hash of "ALPHA-2024-001"):
    'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
    'b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3',
    'c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
    // ... add more hashes for all students
  ]),

  // ── Anti-cheat settings ────────────────────────────────
  MAX_TAB_SWITCHES: 3,          // Warn after N switches, then lock
  DISABLE_RIGHTCLICK: true,
  DISABLE_COPY: false,          // Set true to block copy/paste
  DETECT_DEVTOOLS: true,

  // ── Utility: hash a raw token (run in console) ─────────
  async hashToken(raw) {
    const enc = new TextEncoder().encode(raw.trim().toUpperCase());
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
  },

  // ── Validate token against hash set ───────────────────
  async validateToken(raw) {
    const hash = await this.hashToken(raw);
    return {
      valid: this.VALID_TOKEN_HASHES.has(hash),
      hash
    };
  }
};
