import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const MONOREPO_ROOT = path.resolve(dirname, '../..');

export default defineConfig(({ mode }) => ({
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      enforce: 'pre' as const,
      transform(code, id) {
        if (/\/node_modules\//.test(id) || id.startsWith('\0') || !/.*\.js$/.test(id)) {
          return null;
        }
        return transformWithEsbuild(code, id, { loader: 'jsx' });
      },
    },
    react(),
  ],
  resolve: {
    alias: [
      {
        find: '@mui/material',
        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-material/src'),
      },
      {
        find: '@mui/system',
        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-system/src'),
      },
      {
        find: '@mui/utils',
        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-utils/src'),
      },
      {
        find: '@mui/private-theming',
        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-private-theming/src'),
      },
      {
        find: '@mui/styled-engine',
        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-styled-engine-noop/src'),
      },
    ],
  },
}));
