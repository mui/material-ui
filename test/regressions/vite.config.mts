import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-relative-packages
import { alias } from '../../vitest.shared.mts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      // Necessary as we opted to write our jsx in js files
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
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  resolve: {
    alias,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'tsx',
      },
    },
  },
});
