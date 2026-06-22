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
  optimizeDeps: {
    esbuildOptions: {
      // MUI source files use .js extension but contain JSX syntax.
      // Tell esbuild's pre-bundler to treat them as JSX.
      loader: { '.js': 'jsx' },
    },
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
      // These aliases used to point @mui/* packages at their monorepo `src/`
      // directories so Vite would pick up in-flight source changes without a
      // rebuild. Now that the packages are built (pnpm -F @mui/material build
      // etc.), the workspace symlinks + each package's `exports` field in
      // build/package.json are enough — no alias needed.
      //
      // If you want to test against source again (e.g. mid-refactor before
      // rebuilding), un-comment these and re-add the `treat-js-files-as-jsx`
      // plugin (source .js files contain JSX; built .mjs files do not).
      //
      // { find: '@mui/material',        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-material/src') },
      // { find: '@mui/system',           replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-system/src') },
      // { find: '@mui/utils',            replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-utils/src') },
      // { find: '@mui/private-theming',  replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-private-theming/src') },

      // THE KEY ALIAS: swap Emotion for the zero-runtime noop engine.
      // This is exactly what non-Emotion users configure in their own bundler.

      {
        find: '@mui/styled-engine',
        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-styled-engine-noop/build'),
      },
    ],
  },
}));
