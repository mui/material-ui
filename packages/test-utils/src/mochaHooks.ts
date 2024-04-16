import formatUtil from 'format-util';
import type { Func } from 'mocha';

interface MochaHooks {
  beforeAll: Func[];
  afterAll: Func[];
  beforeEach: Func[];
  afterEach: Func[];
}

type CallsType = [stack: string, message: string];

const isKarma = Boolean(process.env.KARMA);

/**
 * Polyfills for https://github.com/facebook/react/issues/19416.
 */
function dedupeActWarningsByComponent(consoleCalls: CallsType[]) {
  const dedupedCalls: CallsType[] = [];

  let updatingComponentOutsideAct: string | undefined;

  consoleCalls.forEach(([stack, message]) => {
    const componentName = message.match(
      /An update to (.+?) ran an effect, but was not wrapped in act/,
    )?.[1];

    const duplicateMissingActWarning =
      componentName !== undefined && componentName === updatingComponentOutsideAct;
    if (!duplicateMissingActWarning) {
      dedupedCalls.push([stack, message]);
    }
    updatingComponentOutsideAct = componentName;
  });

  return dedupedCalls;
}

function createUnexpectedConsoleMessagesHooks(
  mocha: typeof Mocha,
  methodName: 'warn' | 'error',
  expectedMatcher: string,
) {
  const mochaHooks: MochaHooks = {
    beforeAll: [],
    afterAll: [],
    beforeEach: [],
    afterEach: [],
  };
  const unexpectedCalls: CallsType[] = [];
  const stackTraceFilter = mocha.utils.stackTraceFilter();

  function logUnexpectedConsoleCalls(format: string, ...args: unknown[]) {
    const message = formatUtil(format, ...args);

    // Safe stack so that test dev can track where the unexpected console message was created.
    const { stack } = new Error();
    if (stack === undefined) {
      throw new TypeError(
        `Unable to get stack. Logging unexpected console calls is only supported in environments where Error.prototype.stack is implemented.`,
      );
    }

    if (process.env.NODE_ENV === 'production') {
      // TODO: mock scheduler
      if (message.indexOf('act(...) is not supported in production builds of React') !== -1) {
        return;
      }
    }

    // Ignore legacy root deprecation warnings
    // TODO: Remove once we no longer use legacy roots.
    if (
      message.indexOf('Use createRoot instead.') !== -1 ||
      message.indexOf('Use hydrateRoot instead.') !== -1
    ) {
      return;
    }

    if (message.indexOf('Warning: useLayoutEffect does nothing on the server') !== -1) {
      // Controversial warning that is commonly ignored by switching to `useEffect` on the server.
      // https://github.com/facebook/react/issues/14927
      // However, this switch doesn't work since it relies on environment sniffing and we test SSR in a browser environment.
      return;
    }

    // Unclear why this is an issue for the current occurrences of this warning.
    // TODO: Revisit once https://github.com/facebook/react/issues/22796 is resolved
    if (
      message.indexOf(
        'Detected multiple renderers concurrently rendering the same context provider.',
      ) !== -1
    ) {
      return;
    }

    unexpectedCalls.push([
      // first line includes the (empty) error message
      // i.e. Remove the `Error:` line
      // second line is this frame
      stackTraceFilter(stack.split('\n').slice(2).join('\n')),
      message,
    ]);
  }

  let originalConsoleMethod: Console['warn' | 'error'];
  mochaHooks.beforeAll.push(function registerConsoleStub() {
    originalConsoleMethod = console[methodName];
    console[methodName] = logUnexpectedConsoleCalls;
  });

  mochaHooks.afterAll.push(function registerConsoleStub() {
    console[methodName] = originalConsoleMethod;
  });

  mochaHooks.afterEach.push(function flushUnexpectedCalls() {
    const actionableCalls = dedupeActWarningsByComponent(unexpectedCalls);
    const actionableCallCount = actionableCalls.length;
    const formattedCalls = actionableCalls.map(
      ([stack, message], index) =>
        `console.${methodName} message #${index + 1}:\n  ${message}\n\nStack:\n${stack}`,
    );
    unexpectedCalls.length = 0;

    if (console[methodName] !== logUnexpectedConsoleCalls) {
      throw new Error(`Did not tear down spy or stub of console.${methodName} in your test.`);
    }
    if (actionableCallCount > 0) {
      // In karma `file` is `null`.
      // We still have the stacktrace though
      // @ts-expect-error -- this.currentTest being undefined would be a bug
      const location = this.currentTest.file ?? '(unknown file)';
      const message =
        `Expected test not to call console.${methodName}() but instead received ${actionableCallCount} calls.\n\n` +
        'If the warning is expected, test for it explicitly by ' +
        // Don't add any punctuation after the location.
        // Otherwise it's not clickable in IDEs
        `using the ${expectedMatcher}() matcher.\nTest location:\n  ${location} `;

      const error = new Error(`${message}\n\n${formattedCalls.join('\n\n')}`);
      // The stack of `flushUnexpectedCalls` is irrelevant.
      // It includes no clue where the test was triggered
      error.stack = '';

      if (isKarma) {
        // @ts-expect-error -- this.currentTest being undefined would be a bug
        const testPath = `"${this.currentTest.fullTitle()}"`;

        error.message += `\n\nin ${testPath}`;
        throw error;
      } else {
        // @ts-expect-error -- this.test being undefined would be a bug
        this.test.error(error);
      }
    }
  });

  return mochaHooks;
}

export function createMochaHooks(mocha: typeof Mocha): MochaHooks {
  const warnHooks = createUnexpectedConsoleMessagesHooks(mocha, 'warn', 'toWarnDev');
  const errorHooks = createUnexpectedConsoleMessagesHooks(mocha, 'error', 'toErrorDev');

  return {
    beforeAll: [...warnHooks.beforeAll, ...errorHooks.beforeAll],
    afterAll: [...warnHooks.afterAll, ...errorHooks.afterAll],
    beforeEach: [...warnHooks.beforeEach, ...errorHooks.beforeEach],
    afterEach: [...warnHooks.afterEach, ...errorHooks.afterEach],
  };
}
