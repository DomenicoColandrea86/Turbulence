
const config = require('../../../config');
const api = require('./api');

module.exports = {
  apiBaseUri: config.get('api:BaseUrl'),
  api,
};
