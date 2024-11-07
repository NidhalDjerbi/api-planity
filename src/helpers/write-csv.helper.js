// Load modules
const fs = require("fs");

function writeCsvFile(filePath, data) {
  const fileStream = fs.createWriteStream(filePath);

  // Write headers
  fileStream.write(Object.keys(data[0]).join(",") + "\n");

  // Write data rows
  data.forEach((row) => {
    fileStream.write(Object.values(row).join(",") + "\n");
  });

  fileStream.end();
}

module.exports = { writeCsvFile };
