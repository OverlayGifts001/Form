function doPost(e) {
  try {
    var data = e.parameter.fileContent;
    var filename = e.parameter.filename;
    var targetFolderName = e.parameter.folderName; // New parameter from form
    
    // Parent folder where all your dynamic folders will live
    var parentFolderId = "1ocHSoWCKAiB9CnLBlhBfqgyXk5qARaKN"; 
    var parentFolder = DriveApp.getFolderById(parentFolderId);
    
    // Check if the sub-folder already exists
    var folders = parentFolder.getFoldersByName(targetFolderName);
    var targetFolder;
    
    if (folders.hasNext()) {
      targetFolder = folders.next();
    } else {
      // Create the folder if it doesn't exist
      targetFolder = parentFolder.createFolder(targetFolderName);
    }
    
    var contentType = data.substring(5, data.indexOf(';'));
    var bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,') + 7));
    var blob = Utilities.newBlob(bytes, contentType, filename);
    
    targetFolder.createFile(blob);
    
    return ContentService.createTextOutput("Success: Saved in " + targetFolderName).setMimeType(ContentService.MimeType.TEXT);
  } catch (f) {
    return ContentService.createTextOutput("Error: " + f.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}