import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

const dirname = path.dirname(fileURLToPath(import.meta.url));
// Two levels up: test/css-theme-provider-vite-sandbox → test → monorepo root
const MONOREPO_ROOT = path.resolve(dirname, '../..');

// https://vite.dev/config/
// Use the function form so `mode` is available for the NODE_ENV define.
export default defineConfig(({ mode }) => ({
  // MUI source files reference process.env.NODE_ENV for dev-only warnings.
  // Vite doesn't polyfill `process` in browser builds, so we define it explicitly.
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
  plugins: [
    // @mui/material source files use .js extension but contain JSX.
    // This plugin re-parses them as JSX so Rollup/esbuild can handle them.
    // enforce: 'pre' ensures this plugin runs before Vite's internal esbuild
    // pre-transform, which would otherwise reject JSX in .js files.
    {
      name: 'treat-js-files-as-jsx',
      enforce: 'pre' as const,
      transform(code, id) {
        if (/\/node_modules\//.test(id)) {
          return null;
        }
        if (id.startsWith('\0')) {
          return null;
        }
        if (!/.*\.js$/.test(id)) {
          return null;
        }
        return transformWithEsbuild(code, id, { loader: 'jsx' });
      },
    },
    react(),
  ],
  resolve: {
    alias: [
      // Resolve all @mui/* packages from monorepo source so we test the branch
      // code, not a published release.
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
      // THE KEY ALIAS: swap Emotion for the zero-runtime noop engine.
      // This is exactly what non-Emotion users configure in their own bundler.
      {
        find: '@mui/styled-engine',
        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-styled-engine-noop/src'),
      },
    ],
  },
}));
