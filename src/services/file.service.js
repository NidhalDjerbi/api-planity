// Load modules
const fs = require("fs");
const path = require("path");

// Load helpers
const {
  uploadDir,
  separateByGender,
  createZip,
} = require("../helpers/utils.helper");

async function processFile(filePath) {
    
  // Separate the file by gender
  await separateByGender(filePath);

  // Create ZIP file of separated files
  const zipFilePath = await createZip("separated_files.zip");

  return zipFilePath;
}

async function cleanUpFiles(filePath, zipFilePath) {
  fs.unlinkSync(filePath); // Remove uploaded file
  fs.unlinkSync(path.join(uploadDir, "males.csv")); // Remove males file
  fs.unlinkSync(path.join(uploadDir, "females.csv")); // Remove females file
  fs.unlinkSync(zipFilePath); // Remove zip file
}

module.exports = { processFile, cleanUpFiles };
