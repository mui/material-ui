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
  const unexpectedCalls = [];

  function logUnexpectedConsoleCalls(format, ...args) {
    const message = formatUtil(format, ...args);
    // Safe stack so that test dev can track where the unexpected console message was created.
    const { stack } = new Error();

    unexpectedCalls.push([
      // first line includes the (empty) error message
      // i.e. Remove the `Error:` line
      // second line is this frame
      stack.split('\n').slice(2).join('\n'),
      message,
    ]);
  }
  // eslint-disable-next-line no-console
  console[methodName] = logUnexpectedConsoleCalls;

  mochaHooks.beforeEach.push(function resetUnexpectedCalls() {
    unexpectedCalls.length = 0;
  });

  mochaHooks.afterEach.push(function flushUnexpectedCalls() {
    const hadUnexpectedCalls = unexpectedCalls.length > 0;
    const formattedCalls = unexpectedCalls.map(([stack, message]) => `${message}\n${stack}`);
    unexpectedCalls.length = 0;

    // eslint-disable-next-line no-console
    if (console[methodName] !== logUnexpectedConsoleCalls) {
      throw new Error(`Did not tear down spy or stub of console.${methodName} in your test.`);
    }
    if (hadUnexpectedCalls) {
      const location = this.currentTest.file;
      const message =
        `Expected test not to call console.${methodName}()\n\n` +
        'If the warning is expected, test for it explicitly by ' +
        `using the ${expectedMatcher}() matcher.`;

      throw new Error(`${location}: ${message}\n\n${formattedCalls.join('\n\n')}`);
    }
  });
}

throwOnUnexpectedConsoleMessages('warn', 'toWarnDev');
throwOnUnexpectedConsoleMessages('error', 'toErrorDev');

module.exports = { mochaHooks };
