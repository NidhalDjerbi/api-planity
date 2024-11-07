// Load modules
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const archiver = require("archiver");

// Load helpers
const { writeCsvFile } = require("../helpers/write-csv.helper");

const uploadDir = path.join(".", "uploads");

async function separateByGender(inputFilePath) {
  return new Promise((resolve, reject) => {
    const males = [];
    const females = [];

    // Read and parse the CSV file
    fs.createReadStream(inputFilePath)
      .pipe(csv())
      .on("data", (row) => {
        if (row.gender === "male") {
          males.push(row);
        } else if (row.gender === "female") {
          females.push(row);
        }
      })
      .on("end", async () => {
        try {
          console.log("Done Reading CSV");
          const maleFilePath = path.join(uploadDir, "males.csv");
          const femaleFilePath = path.join(uploadDir, "females.csv");

          // Write males to males.csv and females to females.csv
          await writeCsvFile(maleFilePath, males);
          await writeCsvFile(femaleFilePath, females);
          resolve();
        } catch (error) {
          console.error("Error writing gender-separated files:", error);
          reject(error);
        }
      })
      .on("error", (err) => {
        console.error("Error reading input CSV:", err);
        reject(err);
      });
  });
}

// function createZip(fileName) {
//   const outputZipPath = path.join(uploadDir, fileName);

//   return new Promise((resolve, reject) => {
//     console.log("Starting to create ZIP file:", outputZipPath);
//     const output = fs.createWriteStream(outputZipPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     // Pipe the archive data to the output file
//     archive.pipe(output);

//     // Add files to the archive
//     archive.file(path.join(uploadDir, "males.csv"), { name: "males.csv" });
//     archive.file(path.join(uploadDir, "females.csv"), { name: "females.csv" });

//     // Finalize the archive after all files are added
//     archive.finalize();

//     // Event listeners
//     output.on("close", () => {
//       console.log("ZIP file created successfully:", outputZipPath);
//       resolve(outputZipPath);
//     });

//     output.on("error", (err) => {
//       console.error("Error creating ZIP file (output):", err);
//       reject(err);
//     });

//     archive.on("error", (err) => {
//       console.error("Error during archiving process:", err);
//       reject(err);
//     });
//   });
// }

async function ensureFileExists(filePath) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
  } catch (error) {
    throw new Error(`File does not exist: ${filePath}`);
  }
}

async function createZip(fileName) {
  const outputZipPath = path.join(uploadDir, fileName);
  const maleFilePath = path.join(uploadDir, "males.csv");
  const femaleFilePath = path.join(uploadDir, "females.csv");

  // Check that both files exist
  await ensureFileExists(maleFilePath);
  await ensureFileExists(femaleFilePath);

  return new Promise((resolve, reject) => {
    console.log("Starting to create ZIP file:", outputZipPath);

    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    // Pipe the archive data to the output file
    archive.pipe(output);

    // Add both files to the archive
    archive.file(maleFilePath, { name: "males.csv" });
    archive.file(femaleFilePath, { name: "females.csv" });

    // Finalize the archive after all files are added
    archive.finalize();

    // Event listeners for ZIP creation
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

module.exports = {
  uploadDir,
  separateByGender,
  createZip,
};
