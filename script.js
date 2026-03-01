function doPost(e) {
  try {
    // 1. Extract and trim parameters to prevent naming errors
    var data = e.parameter.fileContent;
    var filename = e.parameter.filename;
    var targetFolderName = e.parameter.folderName.trim(); // Removes accidental spaces
    
    // 2. Reference your main Parent Folder (ID confirmed: 1ocHSoWCKAiB9CnLBlhBfqgyXk5qARaKN)
    var parentFolderId = "1ocHSoWCKAiB9CnLBlhBfqgyXk5qARaKN"; 
    var parentFolder = DriveApp.getFolderById(parentFolderId);
    
    // 3. Find or Create the specific customer sub-folder
    // We search by name; if it doesn't exist, we create it
    var folders = parentFolder.getFoldersByName(targetFolderName);
    var targetFolder = folders.hasNext() ? folders.next() : parentFolder.createFolder(targetFolderName);
    
    // 4. Process the video data from Base64
    var contentType = data.substring(5, data.indexOf(';'));
    var bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,') + 7));
    var blob = Utilities.newBlob(bytes, contentType, filename);
    
    // 5. Save the file to the sub-folder
    targetFolder.createFile(blob);
    
    // Log the success for your records in the 'Executions' tab
    console.log("Success: " + filename + " uploaded to folder: " + targetFolderName);
    
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    
  } catch (f) {
    console.error("Upload Error: " + f.toString());
    return ContentService.createTextOutput("Error: " + f.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}