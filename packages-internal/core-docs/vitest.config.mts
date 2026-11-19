import { mergeConfig } from 'vitest/config';
// eslint-disable-next-line import/no-relative-packages
import sharedConfig, { REACT_MAJOR } from '../../vitest.shared.mts';

// Docs-infra code needs React 18+ and does not ship, so the React 17 jobs skip its tests.
export default mergeConfig(await sharedConfig(import.meta.url, { jsdom: true }), {
  test: {
    exclude: REACT_MAJOR < 18 ? ['**'] : [],
  },
});
