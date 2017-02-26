
// Server Loader
const server = require('./express');

// Set the default environment to be `development`
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function makeTurbulence() {
  // Init the boot process and get a server instance back
  return server();
}

module.exports = makeTurbulence;
