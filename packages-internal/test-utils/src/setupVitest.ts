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
