import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// eslint-disable-next-line import/no-relative-packages
import { alias } from '../../vitest.shared.mts';

const stubsDir = resolve(fileURLToPath(new URL('.', import.meta.url)), 'stubs');

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
    tailwindcss(),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  resolve: {
    alias: [
      // The existing `alias` from vitest.shared.mts is an object map; spread
      // it as { find, replacement } entries so the next/* regex aliases below
      // coexist with it.
      ...Object.entries(alias).map(([find, replacement]) => ({ find, replacement })),
      // Stub `next/*` modules so docs composites under `docs/src/components/`
      // that transitively import `next/router` (via `@mui/internal-core-docs/Link`)
      // render outside the Next.js docs host. See `stubs/next-router.ts` for
      // the rationale.
      { find: /^next\/router$/, replacement: `${stubsDir}/next-router.ts` },
      { find: /^next\/link$/, replacement: `${stubsDir}/next-link.tsx` },
      { find: /^next\/head$/, replacement: `${stubsDir}/next-head.tsx` },
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'tsx',
      },
    },
  },
});
