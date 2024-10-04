import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  test: {
    exclude: ['**/*.spec.*'],
    globals: true,
    setupFiles: [path.resolve(__dirname, '../../packages-internal/test-utils/src/setupVitest')],
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@mui/internal-test-utils': path.resolve(__dirname, '../../packages-internal/test-utils/src'),
      '@mui/icons-material': path.resolve(__dirname, '../../packages/mui-icons-material/lib'),
    },
  },
  esbuild: {
    loader: 'tsx',
    include: /.*\.[jt]sx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
});
