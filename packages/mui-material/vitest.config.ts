import { defineConfig, configDefaults } from 'vitest/config';
import * as path from 'path';

const MONOREPO_ROOT = path.resolve(__dirname, '../..');

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: path.resolve(MONOREPO_ROOT, 'coverage'),
      include: ['src/**'],
    },
    exclude: ['**/*.spec.*'],
    globals: true,
    setupFiles: [path.resolve(__dirname, '../../packages-internal/test-utils/src/setupVitest')],
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
      '@mui/icons-material': path.resolve(MONOREPO_ROOT, './packages/mui-icons-material/lib'),
    },
  },
  // @mui/material writes JSX in js
  esbuild: {
    loader: 'tsx',
    include: /.*\.[jt]sx?$/,
    exclude: [],
  },
});
