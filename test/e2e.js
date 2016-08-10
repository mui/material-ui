// @flow weak
const path = require('path');
const webpackConfig = require('../docs/site/webpack.prod.config');
const runSeleniumTests = require('./selenium');

module.exports = runE2ETests;

function runE2ETests(options = {}) {
  return runSeleniumTests({
    webpackConfig,
    serverRoot: path.resolve(__dirname, '../docs/site'),
    ...options,
  });
}
