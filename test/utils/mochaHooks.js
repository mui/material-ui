const formatUtil = require('format-util');

const isKarma = Boolean(process.env.KARMA);

function createUnexpectedConsoleMessagesHooks(Mocha, methodName, expectedMatcher) {
  const mochaHooks = {
    beforeAll: [],
    afterAll: [],
    beforeEach: [],
    afterEach: [],
  };
  const unexpectedCalls = [];
  const stackTraceFilter = Mocha.utils.stackTraceFilter();

  function logUnexpectedConsoleCalls(format, ...args) {
    const message = formatUtil(format, ...args);

    // Safe stack so that test dev can track where the unexpected console message was created.
    const { stack } = new Error();

    if (process.env.NODE_ENV === 'production') {
      // TODO: mock scheduler
      if (message.indexOf('act(...) is not supported in production builds of React') !== -1) {
        return;
      }
    }

    unexpectedCalls.push([
      // first line includes the (empty) error message
      // i.e. Remove the `Error:` line
      // second line is this frame
      stackTraceFilter(stack.split('\n').slice(2).join('\n')),
      message,
    ]);
  }

  let originalConsoleMethod;
  mochaHooks.beforeAll.push(function registerConsoleStub() {
    // eslint-disable-next-line no-console
    originalConsoleMethod = console[methodName];
    // eslint-disable-next-line no-console
    console[methodName] = logUnexpectedConsoleCalls;
  });

  mochaHooks.afterAll.push(function registerConsoleStub() {
    // eslint-disable-next-line no-console
    console[methodName] = originalConsoleMethod;
  });

  mochaHooks.afterEach.push(function flushUnexpectedCalls() {
    const hadUnexpectedCalls = unexpectedCalls.length > 0;
    const formattedCalls = unexpectedCalls.map(
      ([stack, message]) => `console.${methodName} message:\n  ${message}\n\nStack:\n${stack}`,
    );
    unexpectedCalls.length = 0;

    // eslint-disable-next-line no-console
    if (console[methodName] !== logUnexpectedConsoleCalls) {
      throw new Error(`Did not tear down spy or stub of console.${methodName} in your test.`);
    }
    if (hadUnexpectedCalls) {
      // In karma `file` is `null`.
      // We still have the stacktrace though
      const location = this.currentTest.file ?? '(unknown file)';
      const message =
        `Expected test not to call console.${methodName}()\n\n` +
        'If the warning is expected, test for it explicitly by ' +
        // Don't add any punctuation after the location.
        // Otherwise it's not clickable in IDEs
        `using the ${expectedMatcher}() matcher.\nTest location:\n  ${location} `;

      const error = new Error(`${message}\n\n${formattedCalls.join('\n\n')}`);
      // The stack of `flushUnexpectedCalls` is irrelevant.
      // It includes no clue where the test was triggered
      error.stack = '';

      if (isKarma) {
        const testPath = `"${this.currentTest.parent
          .titlePath()
          .concat(this.currentTest.title)
          .join('" -> "')}"`;

        error.message += `\n\nin ${testPath}`;
        throw error;
      } else {
        this.test.error(error);
      }
    }
  });

  return mochaHooks;
}

function createMochaHooks(Mocha) {
  const warnHooks = createUnexpectedConsoleMessagesHooks(Mocha, 'warn', 'toWarnDev');
  const errorHooks = createUnexpectedConsoleMessagesHooks(Mocha, 'error', 'toErrorDev');

  return {
    beforeAll: [...warnHooks.beforeAll, ...errorHooks.beforeAll],
    afterAll: [...warnHooks.afterAll, ...errorHooks.afterAll],
    beforeEach: [...warnHooks.beforeEach, ...errorHooks.beforeEach],
    afterEach: [...warnHooks.afterEach, ...errorHooks.afterEach],
  };
}

module.exports = { createMochaHooks };
