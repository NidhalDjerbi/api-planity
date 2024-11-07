// Load modules
const express = require("express");

// Config router
const router = express.Router();

// Load controllers
const { downloadFile } = require("../controllers/file.controller");

const upload = require("../middlewares/upload.middleware");

// Setup routes
router.post("/upload", upload.single("file"), downloadFile);

module.exports = router;
