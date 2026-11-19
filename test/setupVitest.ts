import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import setupVitest from '@mui/internal-test-utils/setupVitest';

const originalFocusFixup: unique symbol = Symbol.for('mui.jsdomRequestFocusFixup');

type JsdomWindow = Window & {
  _requestFocusFixup?: () => void;
  [originalFocusFixup]?: () => void;
};

// jsdom 31 starts its focus fixup loop with the global `setInterval`. A fake clock can strand
// that loop and stop all later animation frames: https://github.com/jsdom/jsdom/issues/4455
function deferJsdomFocusFixup() {
  const jsdomWindow = globalThis.window as JsdomWindow | undefined;
  // eslint-disable-next-line no-underscore-dangle
  const requestFocusFixup = jsdomWindow?.[originalFocusFixup] ?? jsdomWindow?._requestFocusFixup;
  if (!jsdomWindow || !requestFocusFixup) {
    return;
  }

  // Setup files run again for each test file with `--no-isolate`, so keep the jsdom original.
  jsdomWindow[originalFocusFixup] = requestFocusFixup;
  let pending = false;
  // eslint-disable-next-line no-underscore-dangle
  jsdomWindow._requestFocusFixup = () => {
    if (vi.isFakeTimers()) {
      pending = true;
      return;
    }
    requestFocusFixup();
  };

  // Register before `setupVitest()`, so this runs after its cleanup restores the real timers.
  afterEach(() => {
    if (pending && !vi.isFakeTimers()) {
      pending = false;
      requestFocusFixup();
    }
  });
}

deferJsdomFocusFixup();
setupVitest({ emotion: true });

// In Firefox, calling focus() with arguments (e.g. focusOptions) fails silently,
// which causes focus-visible related tests to fail as a consequence.
// This override is only applied in a browser environment running Firefox.
if (typeof globalThis.navigator !== 'undefined' && !navigator.userAgent.includes('jsdom')) {
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

  if (isFirefox) {
    const originalFocus = HTMLElement.prototype.focus;

    beforeAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'focus', {
        configurable: true,
        value: function focusWithoutArguments() {
          originalFocus.call(this); // always call without arguments
        },
      });
    });

    afterAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'focus', {
        value: originalFocus,
      });
    });
  }
}
