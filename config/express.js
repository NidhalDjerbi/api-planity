// Load modules
const express = require('express');
const cors = require('cors');

// Load middlewares
const RoutingMiddleware = require('../src/middlewares/routing.middleware');
const ErrorMiddleware = require('../src/middlewares/error.middleware');

// Load routes
const routes = require('../src/routes');

// Create express app
const app = express();
// Handle json body request body
app.use(express.json());

// Handle urlencoded request body
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Load api routes
app.use('/api', routes);

// Catch 404 and forward to error handler
app.use(RoutingMiddleware.notFound);

// Error handler
app.use(ErrorMiddleware.handler);

module.exports = app;