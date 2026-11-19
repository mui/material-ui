import { mergeConfig } from 'vitest/config';
import sharedConfig, { REACT_MAJOR } from '../../vitest.shared.mts';

// Docs-infra code needs React 18+ and does not ship, so the React 17 jobs skip its tests.
export default mergeConfig(await sharedConfig(import.meta.url), {
  optimizeDeps: {
    include: ['@mui/internal-docs-infra/useCode'],
  },
  test: {
    exclude: REACT_MAJOR < 18 ? ['**'] : [],
  },
});
