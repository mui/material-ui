import { defineConfig, configDefaults } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  test: {
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
      '@mui/internal-test-utils': path.resolve(__dirname, '../../packages-internal/test-utils/src'),
      '@mui/material': path.resolve(__dirname, './src'),
      '@mui/system': path.resolve(__dirname, '../mui-system/src'),
      '@mui/utils': path.resolve(__dirname, '../mui-utils/src'),
      '@mui/icons-material': path.resolve(__dirname, '../mui-icons-material/lib'),
    },
  },
  // @mui/material writes JSX in js
  esbuild: {
    loader: 'tsx',
    include: /.*\.[jt]sx?$/,
    exclude: [],
  },
});
