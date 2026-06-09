import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    // Expose global test hooks so @testing-library/react registers its
    // automatic cleanup.
    globals: true,
    // Intentionally no `server.deps.inline` entries for `@mui/material` or
    // `react-transition-group`. Vitest externalizes `node_modules` by default,
    // so the tests load `@mui/material` through Node's own ESM resolver — the
    // module resolution path from
    // https://github.com/mui/material-ui/issues/48636.
  },
});
