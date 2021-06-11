/* eslint-env mocha */
import { render as enzymeRender } from 'enzyme';
import { stub } from 'sinon';

/**
 * @param {object} [options]
 * @param {boolean} [options.expectUseLayoutEffectWarning]
 */
export default function createServerRender(options = {}) {
  const { expectUseLayoutEffectWarning = false } = options;

  beforeEach(() => {
    const originalConsoleError = console.error;
    stub(console, 'error').callsFake((message, ...args) => {
      const isUseLayoutEffectWarning = /Warning: useLayoutEffect does nothing on the server/.test(
        message,
      );

      if (!expectUseLayoutEffectWarning || !isUseLayoutEffectWarning) {
        // callThrough
        originalConsoleError(message, ...args);
      }
    });
  });

  afterEach(() => {
    console.error.restore();
  });

  return function render(node) {
    return enzymeRender(node);
  };
}
