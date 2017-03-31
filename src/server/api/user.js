
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Promise = require('bluebird');
const sgTransport = require('nodemailer-sendgrid-transport');
const Models = require('../models');
const config = require('../../../config');

const User = {
  create: (req, res, next) => {
    const password = req.body.password;
    const authToken = req.body.token;
    const isAuthorized = true;

    return new Promise((resolve, reject) => {
      // forbidden without token
      if (!authToken) return resolve({ success: false, message: 'Authentication failed. Forbidden without token' });
      // find temp user
      return Models.TempUser.findOne({ confirmAccountToken: authToken, confirmAccountTokenExpires: { $gt: Date.now() } }, (err, tempUser) => {
        // Confirm account token is invalid or has expired.
        if (err || !tempUser) return reject({ success: false, message: err });
        // Resolve tempUser
        return resolve(tempUser);
      });
    }).then((tempUser) => {
      const { email, firstName, lastName } = tempUser;
      // create account user
      const user = new Models.User({
        email,
        password,
        isAuthorized,
        firstName,
        lastName,
      });

      // save user to db
      user.save((err, usr) => {
        if (err) return res.status(409).json({ success: false, message: err.message });
        // if no errors delete temp user
        tempUser.remove();
        // create JWT
        const token = jwt.sign(usr, config.get('jwt:secret'), {
          expiresIn: config.get('jwt:expires'),
        });
        // return JWT and user
        return res.status(200).json({ success: true, token, user: usr });
      });
    });
  },

  authenticate: (req, res, next) => {
    Models.User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return next(err);
      // if user doesn't exist return 404
      if (!user) {
        res.status(401);
        res.statusMessage = 'Authentication failed. User not found.'; // eslint-disable-line no-param-reassign
        return res.send({ success: false, message: 'Authentication failed. User not found.' });
      }
      // check if password matches
      return user.comparePassword(req.body.email, req.body.password, (error, isMatch) => {
        if (isMatch && !error) {
          // if user is found and password is right create a token
          const token = jwt.sign(user, config.get('jwt:secret'), {
            expiresIn: config.get('jwt:expires'),
          });
          // return the information including token
          res.status(200);
          return res.send({ success: true, token, user, message: 'Successfully logged in.' });
        }
        // if user is unauthorized return 401
        res.status(401);
        res.statusMessage = 'Authentication failed. Password is incorrect.'; // eslint-disable-line no-param-reassign
        return res.send({ success: false, message: 'Authentication failed. Password is incorrect.' });
      });
    });
  },

  reauthenticate: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      // verifies secret and checks exp
      return jwt.verify(token, config.get('jwt:secret'), (err, decoded) => {
        // failed verification.
        if (err) return res.status(401).send({ success: false, message: err.message });
        // return user
        return Models.User.findById({ _id: mongoose.Types.ObjectId(decoded._doc._id) }, (error, user) => { // eslint-disable-line no-underscore-dangle
          if (error) return res.status(401).json({ success: false, message: error.message });
          return res.status(200).json({ success: true, token, user });
        });
      });
    }
    // forbidden without token
    return res.status(403).send({ success: false, message: 'Authentication failed.' });
  },

  createTempUserSendVerifyEmail: (req, res, next) =>
    new Promise((resolve, reject) => {
      // create temp user
      const tempUser = new Models.TempUser({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        confirmAccountToken: crypto.randomBytes(64).toString('hex'),
        confirmAccountTokenExpires: Date.now() + config.get('mailer:tokenExpires'),
      });
      // save temp user to db
      tempUser.save((err, user) => {
        if (err) return reject({ success: false, message: err.message });
        return resolve(user);
      });
    }).then(({ email, isAuthorized, confirmAccountToken }) => {
      const options = {
        auth: {
          api_key: config.get('mailer:sendGrid:api_key'),
        },
      };
      const client = nodemailer.createTransport(sgTransport(options));
      const emailObj = {
        from: config.get('mailer:emailFrom'),
        to: email,
        subject: config.get('mailer:confirmAccountEmailSubject'),
        text: `Thanks for signing up with Turbulence! You must follow this link to activate your account:\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/account/accept/${confirmAccountToken}\n\n
          Have fun, and don't hesitate to contact us with your feedback.\n\n
          The Turbulence Team\n`,
      };
      return client.sendMail(emailObj, (err) => {
        if (err) return next(err);
        return res.status(200).json({ success: true, user: { email, isAuthorized } });
      });
    }).catch((error) => res.status(403).send(error)),

  authenticateConfirmAccountToken: (req, res, next) => {
    const token = req.body.token;
    // forbidden without token
    if (!token) return res.status(403).send({ success: false, message: 'Authentication failed.' });
    // authenticate temp user
    return Models.TempUser.findOne({ confirmAccountToken: token, confirmAccountTokenExpires: { $gt: Date.now() } }, (err, user) => {
      // Confirm account token is invalid or has expired.
      if (err || !user) return res.status(401).json({ success: false, message: err || 'Invalid Token.' });
      // Return success
      return res.status(200).json({ success: true });
    });
  },

  forgotPassword: (req, res, next) =>
    new Promise((resolve, reject) =>
      Models.User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) return resolve({ success: false, message: 'Authentication failed. No account with that email address exists.' });
        user.resetPasswordToken = crypto.randomBytes(64).toString('hex'); // eslint-disable-line no-param-reassign
        user.resetPasswordExpires = Date.now() + config.get('mailer:tokenExpires'); // eslint-disable-line no-param-reassign
        return user.save((error) => {
          if (error) return reject({ success: false, message: error.message });
          return resolve(user);
        });
      })).then((user) => {
        const options = {
          auth: {
            api_key: config.get('mailer:sendGrid:api_key'),
          },
        };
        const client = nodemailer.createTransport(sgTransport(options));
        const email = {
          from: config.get('mailer:emailFrom'),
          to: user.email,
          subject: config.get('mailer:resetPasswordEmailSubject'),
          text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${user.resetPasswordToken}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        return client.sendMail(email, (err) => {
          if (err) return next(err);
          return res.status(200).json({ success: true, message: `An e-mail has been sent to ${user.email} with further instructions.` });
        });
      }),

  authenticateResetPasswordToken: (req, res, next) => {
    const token = req.body.token;
    // forbidden without token
    if (!token) return res.status(403).send({ success: false, message: 'Authentication failed.' });
    // find user
    return Models.User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
      // Password reset token is invalid or has expired.
      if (err || !user) return res.status(401).json({ success: false, message: err });
      // Return success
      return res.status(200).json({ success: true });
    });
  },

  resetPassword: (req, res, next) =>
    new Promise((resolve) => {
      const password = req.body.password;
      const token = req.body.token;

      // forbidden without token
      if (!token) return resolve({ success: false, message: 'Authentication failed. Forbidden without token' });

      return Models.User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        // Password reset token is invalid or has expired.
        if (err || !user) return resolve({ success: false, message: err });

        // set new password
        user.password = password; // eslint-disable-line no-param-reassign
        // unset reset password fields
        user.resetPasswordToken = undefined; // eslint-disable-line no-param-reassign
        user.resetPasswordExpires = undefined; // eslint-disable-line no-param-reassign

        return user.save((error, usr) => {
          if (error) return resolve({ success: false, message: error.message });
          return resolve(usr);
        });
      });
    }).then((user) => {
      const options = {
        auth: {
          api_key: config.get('mailer:sendGrid:api_key'),
        },
      };
      const client = nodemailer.createTransport(sgTransport(options));
      const email = {
        from: config.get('mailer:emailFrom'),
        to: user.email,
        subject: config.get('mailer:changePasswordEmailSubject'),
        text: `Hello,\n\n
        This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
      };
      return client.sendMail(email, (err) => {
        if (err) return next(err);
        return res.status(200).json({ success: true, message: `Successfully updated ${user.email}'s password.` });
      });
    }),
};

module.exports = User;
