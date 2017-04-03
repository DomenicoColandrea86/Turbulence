const express = require('express');
const api = require('../api');

// API routes
const apiRoutes = function apiRoutes(middleware) { // eslint-disable-line no-unused-vars
  // create router instance
  const router = express.Router();

  // User Routes
  router.route('/user')
    .post(api.user.create);
  router.route('/user/authenticate')
    .post(api.user.authenticate);
  router.route('/user/reauthenticate')
    .post(api.user.reauthenticate);
  router.route('/user/createTempUserSendVerifyEmail')
    .post(api.user.createTempUserSendVerifyEmail);
  router.route('/user/authenticateConfirmAccountToken')
    .post(api.user.authenticateConfirmAccountToken);
  router.route('/user/forgotPassword')
    .post(api.user.forgotPassword);
  router.route('/user/resetPassword')
    .post(api.user.resetPassword);
  router.route('/user/authenticateResetPasswordToken')
    .post(api.user.authenticateResetPasswordToken);
  router.route('/user/logout')
    .post(api.user.logout);

  return router;
};

module.exports = apiRoutes;
