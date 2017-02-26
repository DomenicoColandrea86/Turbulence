
const express = require('express');
const methodOverride = require('method-override');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('../routes');
const middleware = require('../middleware');
const TurbulenceServer = require('./server');

const init = function init() {
  return new Promise((resolve) => {
    // Create express app
    const app = express();

    // In production we need to pass these values in instead of relying on webpack
    middleware.frontendMiddleware(app, {
      outputPath: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
    });

    // CORS headers
    app.all('/*', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      // Set custom headers for CORS
      res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      return next();
    });

    // Body parsing
    app.use(bodyParser.json({ limit: '1mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

    app.use(methodOverride());

    // Use helmet to secure Express headers
    app.use(helmet());
    app.disable('x-powered-by');

    // set up API routes
    app.use(routes.apiBaseUri, routes.api(middleware));

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    });

    // error handler
    app.use((error, req, res, next) => {
      res.status(error.status || 500);
      console.error(error, error.message);
      return res.send({ message: error.message, error });
    });
    return resolve(new TurbulenceServer(app));
  });
};

module.exports = init;
