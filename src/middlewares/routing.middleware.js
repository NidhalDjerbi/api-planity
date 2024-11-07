// Load modules
const status = require('http-status');

// Load helpers
const ApiError = require('../helpers/error.helper');
const Errors = require('../helpers/custom-errors.helper');

module.exports = class RoutingMiddleware {
  // Handle route not found
  static notFound(req, res, next) {
    next(new ApiError(Errors.EXPRESS.ROUTE_NOT_FOUND, status.NOT_FOUND));
  }
};