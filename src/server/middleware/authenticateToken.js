/* eslint-disable global-require */
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const authenticateToken = function authenticate(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    // verifies secret and checks exp
    return jwt.verify(token, config.get('jwt:secret'), (err, decoded) => {
      // failed verification.
      if (err) return res.status(401).send({ status: res.statusCode, msg: err.message });
      req.decoded = decoded; // eslint-disable-line no-param-reassign
      return next();
    });
  }
  // forbidden without token
  return res.sendStatus(403);
};

module.exports = authenticateToken;
