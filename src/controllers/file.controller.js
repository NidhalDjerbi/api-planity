// Load modules
const fs = require("fs");
const httpStatus = require("http-status");

// Load helpers
const ApiError = require("../helpers/error.helper");
const Errors = require("../helpers/custom-errors.helper");
// Load services
const { processFile, cleanUpFiles } = require("../services/file.service");

const downloadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(httpStatus.BAD_REQUEST, Errors.UPLOAD.FILE_REQUIRED);
    }

    if (req.file.mimetype !== "text/csv") {
      throw new ApiError(httpStatus.BAD_REQUEST, Errors.UPLOAD.FILE_TYPE_INVALID);
    }
    
    const zipFilePath = await processFile(req.file.path);
    // Stream ZIP file to client
    const fileStream = fs.createReadStream(zipFilePath);
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="separated_files.zip"'
    );

    fileStream.pipe(res);
    
    fileStream.on("end", () => {
      cleanUpFiles(req.file.path, zipFilePath);
    });

    fileStream.on("error", (err) => {
      console.error("Error streaming file:", err);
      throw new APIError(httpStatus.INTERNAL_SERVER_ERROR, Errors.UPLOAD.FILE_STREAM_ERROR);
    });
  } catch (err) {
    console.error("Error processing the file:", err);
    next(err);
  }
};

module.exports = { downloadFile };
