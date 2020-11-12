/* eslint-env mocha */
import { createMochaHooks } from './mochaHooks';

const mochaHooks = createMochaHooks(window.Mocha);

before(function beforeAllHook() {
  mochaHooks.beforeAll.forEach((mochaHook) => {
    mochaHook.call(this);
  });
});

after(function afterAllHook() {
  mochaHooks.afterAll.forEach((mochaHook) => {
    mochaHook.call(this);
  });
});

beforeEach(function beforeEachHook() {
  mochaHooks.beforeEach.forEach((mochaHook) => {
    mochaHook.call(this);
  });
});

afterEach(function afterEachHook() {
  mochaHooks.afterEach.forEach((mochaHook) => {
    mochaHook.call(this);
  });
});

// Ensure that uncaught exceptions between tests result in the tests failing.
// This works around an issue with mocha / karma-mocha, see
// https://github.com/karma-runner/karma-mocha/issues/227
let pendingError = null;
let pendingErrorNotice = null;

window.addEventListener('error', (event) => {
  pendingError = event.error;
  pendingErrorNotice = 'An uncaught exception was thrown between tests';
});

window.addEventListener('unhandledrejection', (event) => {
  pendingError = event.reason;
  pendingErrorNotice = 'An uncaught promise rejection occurred between tests';
});

afterEach(() => {
  if (pendingError) {
    console.error(pendingErrorNotice);
    throw pendingError;
  }
});
