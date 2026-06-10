function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet() ? SpreadsheetApp.getActiveSpreadsheet().getActiveSheet() : null;
  // If no active spreadsheet (e.g. standalone script), we can create one or just rely on Drive
  if (!sheet) {
    var files = DriveApp.getFilesByName("Exam Backend Logs");
    var ss;
    if (files.hasNext()) {
      ss = SpreadsheetApp.open(files.next());
    } else {
      ss = SpreadsheetApp.create("Exam Backend Logs");
    }
    sheet = ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Token", "Score", "Set", "Folder Link", "TabSwitches", "DevTools"]);
    }
  }

  var params = e.parameter || {};
  var details = [];
  
  try {
    if (params.details) details = JSON.parse(params.details);
  } catch(err) {}

  // 1. Find or create the master "Exam Submissions" folder in your Drive
  var folders = DriveApp.getFoldersByName("Exam Submissions");
  var masterFolder = folders.hasNext() ? folders.next() : DriveApp.createFolder("Exam Submissions");
  
  // 2. Create a specific folder for this student
  var studentFolderName = (params.name || "Unknown") + " (" + (params.token || "NoToken") + ") - Set " + (params.setId || "?");
  var studentFolder = masterFolder.createFolder(studentFolderName);
  
  // 3. Parse their answers and create files
  var mcqSummary = "MCQ Answers for " + (params.name || "Unknown") + "\nScore: " + (params.score || 0) + "/50\n\n";
  
  for (var i = 0; i < details.length; i++) {
    var item = details[i];
    var isCode = String(item.id).indexOf("Code") !== -1;
    
    if (isCode) {
      // Save C# code as a proper .cs file
      var fileName = String(item.title).replace(/[^a-zA-Z0-9 ]/g, "") + ".cs";
      studentFolder.createFile(fileName, item.answer || "// No code submitted");
    } else {
      // Append MCQ results to the summary text
      var status = item.pass ? "[CORRECT]" : "[WRONG]";
      mcqSummary += item.id + " | " + status + " | Answer: " + item.answer + "\n";
    }
  }
  
  // Save the MCQ summary as a text file
  studentFolder.createFile("MCQ_Results.txt", mcqSummary);

  // 4. Still log the basic details to the Spreadsheet row
  sheet.appendRow([
    params.timestamp || new Date().toISOString(),
    params.name || "Unknown",
    params.token || "NoToken",
    params.score || 0,
    params.setId || "?",
    studentFolder.getUrl(),
    params.tabSwitches || 0,
    params.devtools || false
  ]);
  
  return ContentService.createTextOutput("Success");
}

function doGet(e) {
  return doPost(e);
}
