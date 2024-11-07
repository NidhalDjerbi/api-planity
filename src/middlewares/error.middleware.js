// Load modules
const httpStatus = require('http-status');


module.exports = class ErrorMiddleware {
  // Api global error handler
  static handler(error, req, res, next) {
    let { message } = error;

    const _status = error.status || httpStatus.INTERNAL_SERVER_ERROR;

    res.status(_status).json({
      error: message,
      code: error.errorCode || _status,
      status: _status,
    });
  }
};