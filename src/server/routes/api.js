const express = require('express');
const api = require('../api');

// API routes
const apiRoutes = function apiRoutes(middleware) {
  console.log('middleware ', middleware);

  // create router instance
  const router = express.Router();

  // User Routes
  router.route('/user')
    .post(api.user.create);

  // User Auth Routes
  router.route('/user/authenticate')
    .post(api.user.authenticate);
  router.route('/user/reauthenticate')
    .post(api.user.reauthenticate);

  return router;
};

module.exports = apiRoutes;
