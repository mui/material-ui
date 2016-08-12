/* eslint-disable flowtype/require-valid-file-annotation,no-console */
const path = require('path');
const glob = require('glob');

module.exports = function runTest(testFn) {
  function reduceTests(res, n) {
    const testPath = n.replace(/^.*?tests\/(.*).js$/i, '$1');
    res[testPath] = tests(testPath);
    return res;
  }

  function tests(testPath) {
    return function regressions(browser) {
      browser
        .url(`${browser.launch_url}/#/${testPath}`)
        .waitForElementVisible('[data-reactroot]', 6000)
        .perform(
          (client, done) => testFn(client, testPath, done)
        );
    };
  }

  return glob.sync(path.resolve(__dirname, 'site/src/tests/**/*.js'))
    .reduce(reduceTests, {
      beforeEach(browser) {
        browser
          .setWindowPosition(0, 0)
          .resizeWindow(1200, 1000);
      },
      after(browser) {
        browser.end();
      },
    });
};
