import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import * as url from 'url';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const WORKSPACE_ROOT = path.resolve(currentDirectory, '../../');

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
  plugins: [
    {
      // Unfortunately necessary as we opted to write our jsx in js files
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (/\/node_modules\//.test(id)) {
          return null;
        }
        if (!/.*\.js$/.test(id)) {
          return null;
        }
        if (id.startsWith('\0')) {
          return null;
        }
        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'tsx',
          jsx: 'automatic',
        });
      },
    },
    react(),
  ],
  define: {
    'process.env': '{}',
  },
  resolve: {
    alias: {
      '@mui/material': path.resolve(WORKSPACE_ROOT, './packages/mui-material/src'),
      '@mui/docs': path.resolve(WORKSPACE_ROOT, './packages/mui-docs/src'),
      '@mui/icons-material': path.resolve(WORKSPACE_ROOT, './packages/mui-icons-material/lib/esm'),
      '@mui/lab': path.resolve(WORKSPACE_ROOT, './packages/mui-lab/src'),
      '@mui/styled-engine': path.resolve(WORKSPACE_ROOT, './packages/mui-styled-engine/src'),
      '@mui/styled-engine-sc': path.resolve(WORKSPACE_ROOT, './packages/mui-styled-engine-sc/src'),
      '@mui/styles': path.resolve(WORKSPACE_ROOT, './packages/mui-styles/src'),
      '@mui/system': path.resolve(WORKSPACE_ROOT, './packages/mui-system/src'),
      '@mui/private-theming': path.resolve(WORKSPACE_ROOT, './packages/mui-private-theming/src'),
      '@mui/utils': path.resolve(WORKSPACE_ROOT, './packages/mui-utils/src'),
      '@mui/material-nextjs': path.resolve(WORKSPACE_ROOT, './packages/mui-material-nextjs/src'),
      '@mui/joy': path.resolve(WORKSPACE_ROOT, './packages/mui-joy/src'),
      '@mui/stylis-plugin-rtl': path.resolve(
        WORKSPACE_ROOT,
        './packages/mui-stylis-plugin-rtl/src',
      ),
      '@mui/internal-docs-utils': path.resolve(
        WORKSPACE_ROOT,
        './packages-internal/docs-utils/src',
      ),
      '@mui/internal-scripts/typescript-to-proptypes': path.resolve(
        WORKSPACE_ROOT,
        './packages-internal/scripts/typescript-to-proptypes/src',
      ),
      '@mui/internal-test-utils': path.resolve(
        WORKSPACE_ROOT,
        './packages-internal/test-utils/src',
      ),
      docs: path.resolve(WORKSPACE_ROOT, './docs'),
    },
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'tsx',
      },
    },
  },
});
