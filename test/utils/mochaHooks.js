const formatUtil = require('format-util');

const isKarma = Boolean(process.env.KARMA);

/**
 * From https://github.com/facebook/react/blob/e23673b511a2eab6ddcb848a4150105c954f289a/scripts/jest/shouldIgnoreConsoleError.js#L3
 * @param {*} format
 * @param {*} args
 */
function shouldIgnoreConsoleError(format, args) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof format === 'string') {
      if (format.indexOf('Error: Uncaught [') === 0) {
        // This looks like an uncaught error from invokeGuardedCallback() wrapper
        // in development that is reported by jsdom. Ignore because it's noisy.
        return true;
      }
      if (format.indexOf('The above error occurred') === 0) {
        // This looks like an error addendum from ReactFiberErrorLogger.
        // Ignore it too.
        return true;
      }
    }
  } else {
    if (
      format != null &&
      typeof format.message === 'string' &&
      typeof format.stack === 'string' &&
      args.length === 0
    ) {
      // In production, ReactFiberErrorLogger logs error objects directly.
      // They are noisy too so we'll try to ignore them.
      return true;
    }
    if (format.indexOf('act(...) is not supported in production builds of React') === 0) {
      // React does yet support act() for prod builds, and warn for it.
      // But we'd like to use act() ourselves for prod builds.
      // Let's ignore the warning and #yolo.
      return true;
    }
  }
  // Looks legit
  return false;
}

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
    if (methodName === 'error' && shouldIgnoreConsoleError(format, args)) {
      return;
    }

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

/**
 * full titles of tests that are not applicable to production.
 */
const devOnlyTests = new Set([
  // .propTypes tests
  '<Accordion /> prop: children first child requires at least one child',
  '<Accordion /> prop: children first child needs a valid element as the first child',
  '<CardMedia /> warnings warns when neither `children`, nor `image`, nor `src`, nor `component` are provided',
  '<IconButton /> should raise a warning about onClick in children because of Firefox',
  '<ListItem /> secondary action warnings warns if it cant detect the secondary action properly',
  '<Popover /> warnings should warn if anchorEl is not valid',
  '<Popover /> warnings warns if a component for the Paper is used that cant hold a ref',
  '<TablePagination /> warnings should raise a warning if the page prop is out of range',
  '<TreeItem /> warnings should warn if an onFocus callback is supplied',
  '<TreeItem /> warnings should warn if an `ContentComponent` that does not hold a ref is used',
]);
/**
 * @this {import('mocha').Context}
 */
function skipDevOnlyTestsInProd() {
  if (devOnlyTests.has(this.currentTest?.fullTitle())) {
    this.skip();
  }
}

function createMochaHooks(Mocha) {
  const warnHooks = createUnexpectedConsoleMessagesHooks(Mocha, 'warn', 'toWarnDev');
  const errorHooks = createUnexpectedConsoleMessagesHooks(Mocha, 'error', 'toErrorDev');

  return {
    beforeAll: [...warnHooks.beforeAll, ...errorHooks.beforeAll],
    afterAll: [...warnHooks.afterAll, ...errorHooks.afterAll],
    beforeEach: [skipDevOnlyTestsInProd, ...warnHooks.beforeEach, ...errorHooks.beforeEach],
    afterEach: [...warnHooks.afterEach, ...errorHooks.afterEach],
  };
}

module.exports = { createMochaHooks };
