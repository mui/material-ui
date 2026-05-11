import { defineConfig } from 'vitest/config';
import A11yReporter from './a11y/a11yReporter';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 60_000,
    reporters: [['default', {}], new A11yReporter()],
  },
});
