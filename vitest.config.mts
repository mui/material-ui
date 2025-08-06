import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import * as path from 'path';

const MONOREPO_ROOT = path.resolve(__dirname, '.');

const BROWSER_TESTS = ['{docs,packages{-internal,}/*}/vitest.config.browser.mts'];
const NODE_TESTS = ['{docs,packages{-internal,}/*}/vitest.config.mts'];

function getProjects() {
  if (process.env.TEST_SCOPE === 'browser') {
    return BROWSER_TESTS;
  } else if (process.env.TEST_SCOPE === 'node') {
    return NODE_TESTS;
  }
  return [...BROWSER_TESTS, ...NODE_TESTS];
}

/**
 * See https://vitest.dev/guide/workspace.html
 * > The root configuration will only influence global options such as reporters and coverage.
 */

export default defineConfig({
  test: {
    projects: getProjects(),
    reporters: ['default', 'junit'],
    outputFile: 'test-results/junit.xml',
    coverage: {
      provider: 'v8',
      reporter: process.env.CI ? ['lcovonly'] : ['text'],
      reportsDirectory: path.resolve(MONOREPO_ROOT, 'coverage'),
      ignoreEmptyLines: true,
      include: ['packages/*/src/**'],
      exclude: [
        '**/__fixtures__/**',
        'packages/mui-icons-material/src/**',
        'packages/mui-codemod/src/**/{test-cases,*.test}/**',
        '**/{postcss,vitest}.config.*',
        ...coverageConfigDefaults.exclude,
      ],
    },
    sequence: {
      hooks: 'list',
    },
  },
});
