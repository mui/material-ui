/* eslint-env mocha */
import { createMochaHooks } from './mochaHooks';

const mochaHooks = createMochaHooks(window.Mocha);

/**
 * Emit events from `DispatchingProfiler` as `browser_info` karma events.
 */
function handleReactProfilerResults(event) {
  // Only own properties are persisted when sending the object.
  const info = { type: event.type, detail: event.detail };
  // eslint-disable-next-line no-underscore-dangle -- public: http://karma-runner.github.io/5.2/dev/plugins.html
  window.__karma__.info(info);
}

before(function beforeAllHook() {
  mochaHooks.beforeAll.forEach((mochaHook) => {
    mochaHook.call(this);
  });

  window.addEventListener('reactProfilerResults', handleReactProfilerResults);
});

after(function afterAllHook() {
  window.removeEventListener('reactProfilerResults', handleReactProfilerResults);

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
