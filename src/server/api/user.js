
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Models = require('../models');
const config = require('../../../config');

const User = {
  create: (req, res, next) => {
    const user = new Models.User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    user.save((err) => {
      if (err) return res.status(409).json({ success: false, msg: err.message });
      return res.status(200).json({ success: true, msg: 'Successfully created new user.' });
    });
  },

  authenticate: (req, res, next) => {
    Models.User.findOne({ email: req.body.email }, (err, user) => {
      // if error throw error
      if (err) throw err;
      // if user doesn't exist return 404
      if (!user) return res.status(404).json({ success: false, msg: 'Authentication failed. User not found.' });
      // check if password matches
      return user.comparePassword(req.body.email, req.body.password, (error, isMatch) => {
        if (isMatch && !error) {
          // if user is found and password is right create a token
          const token = jwt.sign(user, config.get('jwt:secret'), {
            expiresIn: config.get('jwt:expires'),
          });
          // return the information including token as JSON
          return res.status(200).json({ success: true, token, user });
        }
        return res.status(401).json({ success: false, msg: 'Authentication failed. Password is incorrect.' });
      });
    });
  },

  reauthenticate: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      // verifies secret and checks exp
      return jwt.verify(token, config.get('jwt:secret'), (err, decoded) => {
        // failed verification.
        if (err) return res.status(401).send({ success: false, msg: err.message });
        // return user
        return Models.User.findById({ _id: mongoose.Types.ObjectId(decoded._doc._id) }, (error, user) => { // eslint-disable-line no-underscore-dangle
          if (error) return res.status(401).json({ success: false, msg: error.message });
          return res.status(200).json({ success: true, token, user });
        });
      });
    }
    // forbidden without token
    return res.status(403).send({ success: false, msg: 'Authentication failed.' });
  },
};

module.exports = User;
