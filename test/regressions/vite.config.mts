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
    {
      // Seed `@mui/x-data-grid-generator`'s data `Chance` with a fixed integer
      // so the Data Grid composites (XHero/XGridFullDemo/XTheming via
      // `useDemoData`) render the *same* rows on every load — without it the
      // data is random per visit and churns the Argos baseline.
      //
      // The package's own `__DISABLE_CHANCE_RANDOM__` branch (set below) seeds
      // the data generator with `new Chance(() => 0.5)`, a constant source that
      // makes every row identical. We want deterministic *and* varied data, so
      // rewrite that one seed to a fixed integer (`new Chance(42)`), which
      // yields a fixed but varied sequence. Safe for our runner: each composite
      // renders on its own browser page (its own module-scoped `chance`) and
      // does a single generation pass, so nothing interleaves the sequence.
      name: 'seed-x-data-grid-generator',
      enforce: 'post',
      transform(code, id) {
        if (!id.includes('@mui/x-data-grid-generator') || !id.includes('random-generator')) {
          return null;
        }
        const needle = 'new Chance(() => 0.5)';
        if (!code.includes(needle)) {
          // Fail loudly if upstream reformats the seed, rather than silently
          // falling back to identical-row data.
          throw new Error(
            `[seed-x-data-grid-generator] expected "${needle}" in ${id}; the generator's seed line changed.`,
          );
        }
        return code.replace(needle, 'new Chance(42)');
      },
    },
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    // Seed `@mui/x-data-grid-generator`'s Chance instances deterministically so
    // the Data Grid composites (XHero/XGridFullDemo/XTheming via `useDemoData`)
    // render the same rows on every load. Without this the generated data is
    // random per page visit and churns the Argos baseline. Mirrors mui-x's
    // regression bundle, which replaces the same token. The data seed is then
    // re-pointed to a varied sequence by the plugin above.
    __DISABLE_CHANCE_RANDOM__: 'true',
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
