import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    maxConcurrency: 4,
  },
});
