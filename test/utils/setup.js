const formatUtil = require('format-util');
const Mocha = require('mocha');
const createDOM = require('./createDOM');

process.browser = true;

// Enable missing act warnings: https://github.com/facebook/react/blob/v16.13.1/packages/react-reconciler/src/ReactFiberHooks.js#L965
// TODO: Revisit once https://github.com/facebook/react/issues/15439 is resolved.
global.jest = null;

createDOM();
require('./init');

const mochaHooks = {
  beforeEach: [],
  afterEach: [],
};

function throwOnUnexpectedConsoleMessages(methodName, expectedMatcher) {
  const unexpectedCalls = [];
  const stackTraceFilter = Mocha.utils.stackTraceFilter();

  function logUnexpectedConsoleCalls(format, ...args) {
    const message = formatUtil(format, ...args);
    // Safe stack so that test dev can track where the unexpected console message was created.
    const { stack } = new Error();

    unexpectedCalls.push([
      // first line includes the (empty) error message
      // i.e. Remove the `Error:` line
      // second line is this frame
      stackTraceFilter(stack.split('\n').slice(2).join('\n')),
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
      const testPath = `"${this.currentTest.parent
        .titlePath()
        .concat(this.currentTest.title)
        .join('" -> "')}"`;
      const message =
        `Expected test not to call console.${methodName}()\n\n` +
        'If the warning is expected, test for it explicitly by ' +
        `using the ${expectedMatcher}() matcher.`;

      const error = new Error(
        `${location}: ${message}\n\n${formattedCalls.join('\n\n')}\n\n` +
          `in ${testPath} (${location})`,
      );
      // The stack of `flushUnexpectedCalls` is irrelevant.
      // It includes no clue where the test was triggered
      error.stack = '';
      throw error;
    }
  });
}

throwOnUnexpectedConsoleMessages('warn', 'toWarnDev');
throwOnUnexpectedConsoleMessages('error', 'toErrorDev');

module.exports = { mochaHooks };
