// @flow weak

const path = require('path');
const glob = require('glob');

function runTest(testFn) {
  function tests(testPath) {
    return function regressions(browser) {
      browser
        .url(`${browser.launch_url}/#/${testPath}`)
        .waitForElementVisible('[data-reactroot]', 6000)
        .perform((client, done) => testFn(client, testPath, done));
    };
  }

  function reduceTests(res, n) {
    const testPath = n.replace(/^.*?tests\/(.*).js$/i, '$1');
    res[testPath] = tests(testPath);
    return res;
  }

  return glob
    .sync(path.resolve(__dirname, 'site/src/tests/**/*.js'))
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
}

module.exports = runTest;
