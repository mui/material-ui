import { mergeConfig } from 'vitest/config';
import sharedConfig, { REACT_MAJOR } from '../../vitest.shared.mts';

export default mergeConfig(await sharedConfig(import.meta.url, { enableScrollbars: true }), {
  test: {
    name: 'browser:@mui/internal-core-docs-integration',
    include: ['src/DemoContent/DemoContent.client.test.tsx'],
    exclude: REACT_MAJOR < 18 ? ['**'] : [],
  },
});
