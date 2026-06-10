const ExamConfig = {
  EXAM_DURATION_MINUTES: 60,
  // 20 MCQs (1 mark each) + 2 Code Questions (15 marks each) = 50 total marks
  QUESTIONS_PER_SET: 22, 
  BEST_N_QUESTIONS: 22, // Count all questions

  // Time Window Constraints (9th June 2026, 9:30am to 10:30am)
  ENFORCE_TIME_WINDOW: true,
  EXAM_DATE: "2026-06-09",
  EXAM_START_TIME: "09:30",
  EXAM_END_TIME: "10:30",
  BYPASS_TIME_CHECK: true, // Set to false in production

  APPS_SCRIPT_URL:
    "https://script.google.com/macros/library/d/1wglre603gkUKmwTgnvh9qAO0V9zY8NouTTvlALDuKYBIJKg8cH_ZNsM-/3",

  VALID_TOKEN_HASHES: new Set([
    "992ef3a32f841333f2efb3fa8e98bbc6c64012306ff82428629a9a8e7c03c5b2", // EXAM-RYQDQB
    "fb38d38f8bbf7fc82b6a4accf8c4897ed91d932c9fcebf234bdc6feedbe04c6f", // EXAM-16JFOW
    "91ea412c532b526e6d6a89b3b00210e5b38d007f7b076da461190b83170ffc4d", // EXAM-CXF73K
    "2e177f06ac97254ab11e83a0bd9bb2a1d59c4df2421896016b67ca82397f5518", // EXAM-3R7NVZ
    "e9c1ec720ad21f41431eab10b303e4035c5b12cf28b627bedb27781922fdcdc3", // EXAM-4QYODB
    "68ed0dfdfea4cd6f53d5038f09fb90b135e3fe3cfbd244ad1803b0d35cc0492b", // EXAM-B8DRK0
    "9a344ef1ab999dd15dce8daf0727d007da25900dc362d38f5befb5ad13960507", // EXAM-F9M8FX
    "564f51cf3c5ffdc9c6acdf41bcbf8d469b259ce2b36537c369c19567c8eb7ae6", // EXAM-YAFDYR
    "491de950c702051f2ec1988c0fc4c4c9327e8c535d1b52914d6a292ed4804cbf", // EXAM-L44ZXG
    "cd65e4352f60b43ba89f441b8c50fe78e5e3e0ef95cc39add0da96062151d54c", // EXAM-FG76RO
    "11834417d27fb3b39acb9b89de31c6c0ab4faaf85b1bfdd2f5f3e45d18208dc8", // EXAM-9EMXHI
    "8c43255bd6655b29213ceefe11109bc26ddd072b9578ff64317aa3930ac3615d", // EXAM-I8YV2I
    "5590608dc8a6a62b8460b4a3ca48fbe914edbde5892e72a96e7b57d79cae65c8", // EXAM-ROWQ3O
    "7f5ba4290a908d4aca8dca524b7ec4b57badf089cefa73f16efb9d2a667bb297", // EXAM-IRCEM7
    "83aafdeb4f7d6093927855ebae1653917eb12619635d70a64efa106c696bcf72", // EXAM-5SC39A
    "5c6125a0f2388bfdac1d68999259f81b4f59e37f81c2af601b5021c8183cc246", // EXAM-CMVVOP
    "1443d6ed09721a414f74f88c1c091e44e92de10a5f555001ceed21a34f06a555", // EXAM-LORAXU
    "154412db37226ef2748b56cdc2e3f73df5704a372d102a22a9a840b5ebd1ebc4", // EXAM-8X7RBV
    "96d6613e04f3a471a5f7a432978ee54d7668a6e9bfc1e4de5c96e82880ca7b65", // EXAM-T8UEN1
    "c00902ac2bb464294dbafefddcd003f86203baa2d30ccf449e4146e3dcb890d3", // EXAM-GTMZP5
    "2e65a5f85400bc6aae2fe85099a185c2a185f02ec1e89688e6b998ebcd1f092a", // EXAM-MLPE7H
    "3e319325fcff99b877363b09eef766eb63c00bdc7d387f8454ebeaa373995900", // EXAM-E4DBP9
    "dcfc1af551cf052a5329d225e4fe91c87c76f570ec2d76489f40f9d3fcda218e", // EXAM-E596F2
    "61a1114b281d37039d17030452cc98d21bdaed4b91876bf5933f6301efd867e3", // EXAM-IC8LLB
    "4a95ca710858c680b77a901f4bc0df55cec37530e9d6d5175547f93b47cc137e", // EXAM-PBWI1K
    "94eae861915386d70748b30b1ac4d637574715ed82f0c7936f771ce214412615", // EXAM-UBT4JZ
    "77ff9233a7a737cbbdde0f684f67ad6b33fd9b03b0db1112a69eb81fcb48708b", // EXAM-0YKZVN
    "f5be9a8b0f31fac397875233c881108d59143e0317ee98c2cc6a218ed2154a6b", // EXAM-QSM9IC
    "076d6f68f81f184ecb51e6d35804b154f69212f8c1f3a5c421be083c4196acfe", // EXAM-MYGCHG
    "38c6b431947e47f307750a1a4b894d0e844f06c2226836d6f465877765b3b45d", // EXAM-TPZEFY
  ]),

  MAX_TAB_SWITCHES: 3,
  DISABLE_RIGHTCLICK: true,
  DISABLE_COPY: false,
  DETECT_DEVTOOLS: true,

  async hashToken(raw) {
    const enc = new TextEncoder().encode(raw.trim().toUpperCase());
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  },

  async validateToken(raw) {
    const hash = await this.hashToken(raw);
    return {
      valid: this.VALID_TOKEN_HASHES.has(hash),
      hash,
    };
  },
};
