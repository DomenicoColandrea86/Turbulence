const express = require('express');
const Turbulence = require('./config/loader');
const parentApp = express();

// Call Turbulence to get an instance of TurbulenceServer
Turbulence()
  .then((TurbulenceServer) => {
    // Mount our Turbulence instance
    parentApp.use('/', TurbulenceServer.rootApp);

    // Let Turbulence handle starting our server instance.
    return TurbulenceServer.start(parentApp).then(() => {
      // if IPC messaging is enabled, ensure ghost sends message to parent
      // process on successful start
      if (process.send) {
        process.send({ started: true });
      }
    });
  })
  .catch((err) => {
    if (process.send) {
      process.send({ started: false, error: err.message });
    }

    console.error('There was an error: ', err);
    process.exit(-1);
  });
