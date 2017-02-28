
const chalk = require('chalk');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const ip = require('ip');
const config = require('../../../config');
const divider = chalk.gray('\n-----------------------------------');
mongoose.Promise = global.Promise; // https://github.com/Automattic/mongoose/issues/4291

/**
 * Turbulence Class
 * Handles the creation of an HTTP Server for Turbulence
 */
class TurbulenceServer {

  constructor(rootApp) {
    this.rootApp = rootApp;
    this.httpServer = null;
    this.db = null;
    this.host = config.get('app:host');
    this.port = config.get('app:port');
    this.dbURI = `${config.get('db:dialect')}://${config.get('db:username')}:${config.get('db:password')}@${config.get('db:host')}:${config.get('db:port')}/${config.get('db:database')}`;
  }

  /**
   * Public API methods
   *
   * # Start
   * Starts the TurbulenceServer listening on the configured port.
   * Alternatively you can pass in your own express instance and let TurbulenceServer
   * start listening for you.
   * @param  {Object} externalApp - Optional express app instance.
   * @return {Promise} Resolves once TurbulenceServer has started
   */
  start(externalApp) {
    const rootApp = externalApp || this.rootApp;

    return new Promise((resolve) => {
      // Connect to MongoDB
      this.db = mongoose.connect(this.dbURI, (err) => {
        if (err) {
          this.stop();
          throw new Error(`${chalk.red(err)}`);
        } else {
          // Listen on provided host:port
          this.httpServer = rootApp.listen(this.port, this.host, () => {
            // provide feedback
            console.log(`Connected to MongoDB ${chalk.green('✓')}`);
            console.log(`Turbulence Server started ${chalk.green('✓')}`);
            console.log(`\n${chalk.bold('Access URLs:')}${divider}`);
            console.log(`Localhost: ${chalk.magenta(`http://${this.host}:${this.port}`)}`);
            console.log(`LAN: ${chalk.magenta(`http://${ip.address()}:${this.port}`)}`);
            console.log(`Database: ${chalk.magenta(this.dbURI)}${divider}`);
            console.log(`${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}`);
          });

          // handle errors
          this.httpServer.on('error', (error) => {
            // handle specific listen errors with friendly messages
            if (error.errno === 'EADDRINUSE') {
              console.error(
                '(EADDRINUSE) Cannot start Turbulence.',
                `Port ${this.port} is already in use by another program.`
              );
            } else {
              console.error(
                `(Code: '${error.errno})`,
                'There was an error starting your server.',
                'Please use the error code above to search for a solution.'
              );
            }

            process.exit(-1);
          });

          this.httpServer.on('listening', () => {
            this.addListeners();
            resolve(this);
          });
        }
      });
    });
  }

  /**
   * # Stop
   * Returns a promise that will be fulfilled when the server stops. If the server has not been started,
   * the promise will be fulfilled immediately
   * @returns {Promise} Resolves once TurbulenceServer has stopped
   */
  stop() {
    return new Promise((resolve) => {
      if (this.httpServer === null) {
        resolve(this);
      } else {
        this.httpServer.close(() => {
          this.httpServer = null;
          this.logShutdownMessages();
          resolve(this);
        });
      }
    });
  }

  /**
   * # Restart
   * Restarts the TurbulenceServer application
   * @returns {Promise} Resolves once TurbulenceServer has restarted
   */
  restart() {
    return this.stop().then(this.start.bind(this));
  }

  // Log Start Messages
  addListeners() {
    function shutdown() {
      console.log(chalk.red('\n Turbulence Server has shut down'));
      console.log(
        '\n Turbulence was running for',
        Math.round(process.uptime()),
        'seconds'
      );
      process.exit(0);
    }

    // ensure service exits correctly on Ctrl+C and SIGTERM
    process
      .removeAllListeners('SIGINT').on('SIGINT', shutdown)
      .removeAllListeners('SIGTERM').on('SIGTERM', shutdown);
  }

  // Log Shutdown Messages
  logShutdownMessages() {
    console.log(chalk.red('Turbulence is closing connections'));
  }
}

module.exports = TurbulenceServer;
