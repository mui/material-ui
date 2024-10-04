import { beforeAll, afterAll, it } from 'vitest';
import failOnConsole from 'vitest-fail-on-console';
import './initMatchers';

failOnConsole({
  silenceMessage: (message) => {
    if (process.env.NODE_ENV === 'production') {
      // TODO: mock scheduler
      if (message.includes('act(...) is not supported in production builds of React')) {
        return true;
      }
    }

    // Ignore legacy root deprecation warnings
    // TODO: Remove once we no longer use legacy roots.
    if (
      message.includes('Use createRoot instead.') ||
      message.includes('Use hydrateRoot instead.')
    ) {
      return true;
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

function wrappedIt(name: string, fn: Function) {
  return it(name, (context) => {
    return fn?.call(context);
  });
}

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

const isVitestJsdom = process.env.MUI_JSDOM === 'true';

// Only necessary when not in browser mode.
if (isVitestJsdom) {
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
