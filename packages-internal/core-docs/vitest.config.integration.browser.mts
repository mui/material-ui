import { mergeConfig } from 'vitest/config';
import sharedConfig, { REACT_MAJOR } from '../../vitest.shared.mts';

export default mergeConfig(await sharedConfig(import.meta.url, { enableScrollbars: true }), {
  optimizeDeps: {
    include: [
      '@mui/internal-docs-infra/useCode',
      '@mui/internal-docs-infra > sucrase',
      '@mui/internal-docs-infra > path-module',
      '@mui/internal-docs-infra > @wooorm/starry-night',
      '@mui/internal-docs-infra/useDemoController',
      '@mui/internal-docs-infra/pipeline/parseSource',
      '@mui/internal-docs-infra/pipeline/enhanceCodeEmphasis',
    ],
  },
  test: {
    name: 'browser:@mui/internal-core-docs-integration',
    include: ['src/DemoContent/DemoContent.client.test.tsx'],
    exclude: REACT_MAJOR < 18 ? ['**'] : [],
  },
});
