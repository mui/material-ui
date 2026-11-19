import { mergeConfig } from 'vitest/config';
// eslint-disable-next-line import/no-relative-packages
import sharedConfig, { REACT_MAJOR } from '../../vitest.shared.mts';

// `generate-llms-txt` uses docs-infra, which needs React 18+, so the React 17 jobs skip its tests.
export default mergeConfig(await sharedConfig(import.meta.url), {
  test: {
    exclude: REACT_MAJOR < 18 ? ['generate-llms-txt/**'] : [],
  },
});
