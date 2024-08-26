import * as React from 'react';

export * from './components';
export { default as describeConformance } from './describeConformance';
export * from './describeConformance';
export { default as createDescribe } from './createDescribe';
export * from './createRenderer';
export {
  default as focusVisible,
  simulatePointerDevice,
  simulateKeyboardDevice,
  programmaticFocusTriggersFocusVisible,
} from './focusVisible';
export {} from './initMatchers';
export * as fireDiscreteEvent from './fireDiscreteEvent';
export { default as flushMicrotasks } from './flushMicrotasks';
export { default as reactMajor } from './reactMajor';

/**
 * Set to true if console logs during [lifecycles that are invoked twice in `React.StrictMode`](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) are suppressed.
 * Useful for asserting on `console.warn` or `console.error` via `toErrorDev()`.
 * TODO: Refactor to use reactMajor when fixing the React 17 cron test.
 * https://github.com/mui/material-ui/issues/43153
 */
export const strictModeDoubleLoggingSuppressed = React.version.startsWith('17');
