import { defineConfig } from 'vitest/config';
import * as path from 'path';

const MONOREPO_ROOT = path.resolve(__dirname, '.');

/**
 * See https://vitest.dev/guide/workspace.html
 * > The root configuration will only influence global options such as reporters and coverage.
 */

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: path.resolve(MONOREPO_ROOT, 'coverage'),
      include: ['src/**'],
    },
    sequence: {
      hooks: 'list',
    },
  },
});
