import { beforeAll, afterAll, it } from 'vitest';
import * as testingLibrary from '@testing-library/dom';
import failOnConsole from 'vitest-fail-on-console';
import './initMatchers';

// checking if an element is hidden is quite expensive
// this is only done in CI as a fail safe. It can still explicitly be checked
// in the test files which helps documenting what is part of the DOM but hidden
// from assistive technology
const defaultHidden = !process.env.CI;

// adds verbosity for something that might be confusing
console.warn(`${defaultHidden ? 'including' : 'excluding'} inaccessible elements by default`);

testingLibrary.configure({
  // JSDOM logs errors otherwise on `getComputedStyle(element, pseudoElement)` calls.
  computedStyleSupportsPseudoElements: false,
  defaultHidden,
});

// Enable missing act warnings: https://github.com/reactwg/react-18/discussions/102
(globalThis as any).jest = null;
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

failOnConsole({
  silenceMessage: (message) => {
    if (process.env.NODE_ENV === 'production') {
      // TODO: mock scheduler
      if (message.includes('act(...) is not supported in production builds of React')) {
        return true;
      }
    }

    if (message.includes('Warning: useLayoutEffect does nothing on the server')) {
      // Controversial warning that is commonly ignored by switching to `useEffect` on the server.
      // https://github.com/facebook/react/issues/14927
      // However, this switch doesn't work since it relies on environment sniffing and we test SSR in a browser environment.
      return true;
    }

    // Unclear why this is an issue for the current occurrences of this warning.
    // TODO: Revisit once https://github.com/facebook/react/issues/22796 is resolved
    if (
      message.includes(
        'Detected multiple renderers concurrently rendering the same context provider.',
      )
    ) {
      return true;
    }

    return false;
  },
});

function wrapIt(itFn: typeof it.only) {
  return function wrapper(name: string, fn: Function) {
    return itFn(name, (context) => {
      return fn?.call({
        ...context,
        currentTest: {
          fullTitle: () => context.task.name,
        },
      });
    });
  };
}

const wrappedIt: any = wrapIt(it);
wrappedIt.skip = wrapIt(it.skip);
wrappedIt.only = wrapIt(it.only);

(globalThis as any).it = wrappedIt;

if (!globalThis.before) {
  (globalThis as any).before = beforeAll;
}
if (!globalThis.after) {
  (globalThis as any).after = afterAll;
}
if (!globalThis.specify) {
  (globalThis as any).specify = wrappedIt;
}

const isJsdom = typeof window !== 'undefined' && window.navigator.userAgent.includes('jsdom');

// Only necessary when not in browser mode.
if (isJsdom) {
  class Touch {
    instance: any;

    constructor(instance: any) {
      this.instance = instance;
    }

    get identifier() {
      return this.instance.identifier;
    }

    get pageX() {
      return this.instance.pageX;
    }

    get pageY() {
      return this.instance.pageY;
    }

    get clientX() {
      return this.instance.clientX;
    }

    get clientY() {
      return this.instance.clientY;
    }
  }
  // @ts-expect-error
  globalThis.window.Touch = Touch;
}
