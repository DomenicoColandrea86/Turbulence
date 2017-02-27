/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

const { join } = require('path');
const webpack = require('webpack');
const pkg = require(join(process.cwd(), 'package.json'));
const config = require('../../config');

process.noDeprecation = true; // see https://github.com/webpack/loader-utils/issues/56

if (!pkg.dllPlugin) { process.exit(0); }

const dllConfig = pkg.dllPlugin;
const outputPath = join(process.cwd(), dllConfig.path);

module.exports = require('./webpack.base.babel')({
  context: process.cwd(),
  entry: config.entry(pkg),
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({ name: '[name]', path: join(outputPath, '[name].json') }), // eslint-disable-line no-new
  ],
  performance: {
    hints: false,
  },
});
