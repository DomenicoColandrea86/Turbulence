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

  // User Forgot Password Routes
  router.route('/user/forgotPassword')
    .post(api.user.forgotPassword);
  router.route('/user/authenticateResetPasswordToken')
    .post(api.user.authenticateResetPasswordToken);
  router.route('/user/resetPassword')
    .post(api.user.resetPassword);

  return router;
};

module.exports = apiRoutes;
