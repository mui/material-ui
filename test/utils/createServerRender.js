/* eslint-env mocha */
import { render as enzymeRender } from 'enzyme';
import { stub } from 'sinon';

/**
 *
 * @param {object} [options]
 * @param {boolean} [options.expectUseLayoutEffectWarning]
 */
export default function createServerRender(options = {}) {
  const { expectUseLayoutEffectWarning = false } = options;

  // must be called in describe()
  // eslint-disable-next-line mocha/no-top-level-hooks
  beforeEach(() => {
    stub(console, 'error').callsFake((message, ...args) => {
      const isUseLayoutEffectWarning = /Warning: useLayoutEffect does nothing on the server/.test(
        message,
      );

      if (!expectUseLayoutEffectWarning || !isUseLayoutEffectWarning) {
        // callThrough
        // eslint-disable-next-line no-console
        console.info(message, ...args);
        throw new Error(message, ...args);
      }
    });
  });

  // must be called in describe()
  // eslint-disable-next-line mocha/no-top-level-hooks
  afterEach(() => {
    console.error.restore();
  });

  return function render(node) {
    return enzymeRender(node);
  };
}
