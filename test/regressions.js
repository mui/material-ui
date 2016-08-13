// @flow weak
const path = require('path');
const webpackConfig = require('./regressions/site/webpack.prod.config');
const runSeleniumTests = require('./selenium');

module.exports = runRegressionsTests;

function runRegressionsTests(options = {}) {
  const { createBaseline, ...other } = options;
  return runSeleniumTests({
    webpackConfig,
    serverRoot: path.resolve(__dirname, 'regressions/site'),
    tests: createBaseline ? 'test/regressions/createBaseline.js' : 'test/regressions/test.js',
    ...other,
  });
}
