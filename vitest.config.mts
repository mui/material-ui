import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import * as path from 'path';

const MONOREPO_ROOT = path.resolve(__dirname, '.');

const BROWSER_TESTS = ['{docs,packages{-internal,}/*}/vitest.config.browser.mts'];
const NODE_TESTS = ['{docs,packages{-internal,}/*}/vitest.config{.jsdom,}.mts'];

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
    workspace: getProjects(),
    coverage: {
      provider: 'v8',
      reporter: process.env.CI ? ['lcovonly'] : ['text'],
      reportsDirectory: path.resolve(MONOREPO_ROOT, 'coverage'),
      include: ['packages/*/src/**/*.(c|m)[jt]s?(x)'],
      exclude: [
        '**/*.test/**/*',
        'packages/mui-icons-material/src/**/*',
        'packages/mui-codemod/src/**/test-cases/**/*',
        '**/{postcss,vitest}.config.*',
        ...coverageConfigDefaults.exclude,
      ],
    },
    sequence: {
      hooks: 'list',
    },
  },
});
