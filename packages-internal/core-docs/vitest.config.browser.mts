import { mergeConfig } from 'vitest/config';
import sharedConfig from '../../vitest.shared.mts';

export default mergeConfig(await sharedConfig(import.meta.url), {
  optimizeDeps: {
    include: ['@mui/internal-docs-infra/useCode'],
  },
});
