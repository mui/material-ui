import { configDefaults, UserWorkspaceConfig } from 'vitest/config';
import * as path from 'path';

const MONOREPO_ROOT = path.resolve(__dirname, '.');

export default {
  test: {
    exclude: ['build', '**/*.spec.*'],
    globals: true,
    setupFiles: [path.resolve(MONOREPO_ROOT, './packages-internal/test-utils/src/setupVitest')],
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        pretendToBeVisual: true,
        url: 'http://localhost',
      },
    },
    fakeTimers: {
      // We use performance.now in the codebase
      toFake: [...configDefaults.fakeTimers.toFake, 'performance'],
    },
    browser: {
      enabled: false, // enabled through CLI
      name: 'chromium',
      provider: 'playwright',
      headless: !!process.env.CI,
      viewport: {
        width: 1024,
        height: 896,
      },
    },
    env: {
      VITEST: 'true',
    },
  },
  resolve: {
    alias: {
      '@mui/internal-test-utils': path.resolve(MONOREPO_ROOT, './packages-internal/test-utils/src'),
      '@mui/material': path.resolve(MONOREPO_ROOT, './packages/mui-material/src'),
      '@mui/system': path.resolve(MONOREPO_ROOT, './packages/mui-system/src'),
      '@mui/utils': path.resolve(MONOREPO_ROOT, './packages/mui-utils/src'),
      '@mui/styled-engine': path.resolve(MONOREPO_ROOT, './packages/mui-styled-engine/src'),
      '@mui/styled-engine-sc': path.resolve(MONOREPO_ROOT, './packages/mui-styled-engine-sc/src'),
      '@mui/styles': path.resolve(MONOREPO_ROOT, './packages/mui-styles/src'),
      '@mui/icons-material': path.resolve(MONOREPO_ROOT, './packages/mui-icons-material/lib/esm'),
      '@mui/lab': path.resolve(MONOREPO_ROOT, './packages/mui-lab/src'),
      '@mui/private-theming': path.resolve(MONOREPO_ROOT, './packages/mui-private-theming/src'),
      '@mui/base': path.resolve(MONOREPO_ROOT, './packages/mui-base/src'),
      '@mui/joy': path.resolve(MONOREPO_ROOT, './packages/mui-joy/src'),
      '@mui/docs': path.resolve(MONOREPO_ROOT, './packages/mui-docs/src'),
      '@mui/material-nextjs': path.resolve(MONOREPO_ROOT, './packages/mui-material-nextjs/src'),
    },
  },
  // @mui/material writes JSX in js
  esbuild: {
    loader: 'tsx',
    include: /.*\.[jt]sx?$/,
    exclude: [],
  },
} satisfies UserWorkspaceConfig;
