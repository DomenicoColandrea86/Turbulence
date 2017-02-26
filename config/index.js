
const path = require('path');
const nconf = require('nconf');
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

class Config {

  constructor() {
    nconf.argv().env();
    const environment = nconf.get('NODE_ENV') || 'development';
    nconf.file(environment, path.join(process.cwd(), `config/env/${environment.toLowerCase()}.json`));
  }

  get(key) {
    return nconf.get(key);
  }

  entry(pkg) {
    const dependencyNames = Object.keys(pkg.dependencies);
    const exclude = pkg.dllPlugin.exclude;
    const include = pkg.dllPlugin.include;
    const includeDependencies = uniq(dependencyNames.concat(include));

    return {
      dependencies: pullAll(includeDependencies, exclude),
    };
  }
}

module.exports = new Config();
