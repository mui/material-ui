// @flow weak

const path = require('path');
const webpackConfig = require('../docs/site/webpack.prod.config');
const runSeleniumTests = require('./selenium');

function runE2ETests(options = {}) {
  return runSeleniumTests({
    webpackConfig,
    serverRoot: path.resolve(__dirname, '../docs/site'),
    ...options,
  });
}

module.exports = runE2ETests;
