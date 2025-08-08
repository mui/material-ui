import { defineProject, coverageConfigDefaults } from 'vitest/config';

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

export default defineProject({
  test: {
    projects: getProjects(),
    sequence: {
      hooks: 'list',
    },
  },
});
