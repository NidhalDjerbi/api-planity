const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

function createZip(fileName) {
  console.log("Creating ZIP file:                                                                                                                                           ", fileName);
  
  const outputZipPath = path.join(uploadDir, fileName);

  return new Promise((resolve, reject) => {
    console.log("Starting to create ZIP file:", outputZipPath);
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    // Pipe the archive data to the output file
    archive.pipe(output);

    // Add files to the archive
    archive.file(path.join(uploadDir, "males.csv"), { name: "males.csv" });
    archive.file(path.join(uploadDir, "females.csv"), { name: "females.csv" });

    // Finalize the archive after all files are added
    archive.finalize();

    // Event listeners
    output.on("close", () => {
      console.log("ZIP file created successfully:", outputZipPath);
      resolve(outputZipPath);
    });

    output.on("error", (err) => {
      console.error("Error creating ZIP file (output):", err);
      reject(err);
    });

    archive.on("error", (err) => {
      console.error("Error during archiving process:", err);
      reject(err);
    });
  });
}

module.exports = { createZip };
