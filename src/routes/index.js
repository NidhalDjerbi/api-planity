// Load modules
const express = require("express");

// Config router
const router = express.Router();

// Load routes
const uploadFileRoutes = require("./file.routes");

// Define routes
router.use("/file", uploadFileRoutes);

module.exports = router;
