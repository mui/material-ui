const chalk = require('chalk');
const formatUtil = require('format-util');
const createDOM = require('./createDOM');

process.browser = true;

createDOM();
require('./init');

const mochaHooks = {
  beforeEach: [],
  afterEach: [],
};

function throwOnUnexpectedConsoleMessages(methodName, expectedMatcher) {
  /* eslint-disable no-console */
  const unexpectedCalls = [];

  function fakeConsole(format, ...args) {
    const message = formatUtil(format, ...args);
    // Safe stack so that test dev can track where the unexpected console message was created.
    const { stack } = new Error();

    unexpectedCalls.push([stack, message]);
  }
  console[methodName] = fakeConsole;

  mochaHooks.beforeEach.push(function resetUnexpectedCalls() {
    unexpectedCalls.length = 0;
  });

  mochaHooks.afterEach.push(function flushUnexpectedCalls() {
    if (console[methodName] !== fakeConsole) {
      throw new Error(`Did not tear down spy or stub of console.${methodName} in your test.`);
    }
    if (unexpectedCalls.length > 0) {
      const messages = unexpectedCalls.map(
        ([stack, message]) =>
          `${chalk.red(message)}\n` +
          `${stack
            .split('\n')
            .map((line) => chalk.gray(line))
            .join('\n')}`,
      );

      const message =
        `Expected test not to call ${chalk.bold(`console.${methodName}()`)}.\n\n` +
        'If the warning is expected, test for it explicitly by ' +
        `using the ${chalk.bold(`.${expectedMatcher}()`)} matcher.`;

      throw new Error(`${message}\n\n${messages.join('\n\n')}`);
    }

    unexpectedCalls.length = 0;
  });
  /* eslint-enable no-console */
}

throwOnUnexpectedConsoleMessages('warn', 'toWarnDev');
throwOnUnexpectedConsoleMessages('error', 'toErrorDev');

module.exports = { mochaHooks };
