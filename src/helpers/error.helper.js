// Load modules
const httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(error, status) {
    super(error);
    this.name = this.constructor.name;
    this.message = error.message || error;
    this.errorCode = error.code || status;
    this.status = status;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor(error, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(error, status);
  }
}

module.exports = APIError;