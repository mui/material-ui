import { beforeAll, afterAll, it } from 'vitest';
import failOnConsole from 'vitest-fail-on-console';
import * as chai from 'chai';
import './chai.types';
import chaiPlugin from './chaiPlugin';

chai.use(chaiPlugin);

failOnConsole({
  silenceMessage: (message: string) => {
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
