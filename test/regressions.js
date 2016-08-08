// @flow weak
const path = require('path');
const webpackConfig = require('./regressions/site/webpack.prod.config');
const runSeleniumTests = require('./selenium');

module.exports = runRegressionsTests;

function runRegressionsTests(options = {}) {
  return runSeleniumTests({
    webpackConfig,
    serverRoot: path.resolve(__dirname, 'regressions/site'),
    tests: 'test/regressions/test.js',
    ...options,
  });
}
