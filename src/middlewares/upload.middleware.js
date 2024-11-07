// Load modules
const multer = require("multer");
const fs = require("fs");

// Load helpers
const { uploadDir } = require("../helpers/utils.helper");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });


module.exports = upload;