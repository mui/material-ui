/// <reference types="vitest" />
import { join, dirname, basename } from 'node:path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import { zeroVitePlugin } from '@mui/zero-vite-plugin';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();
// @TODO - Make this part of the main package
// @ts-ignore
theme.applyDarkStyles = function applyDarkStyles(obj) {
  return {
    // @TODO - Use custom stylis plugin as in docs/src/createEmotionCache.ts
    // so that we don't need to use *
    '* :where([data-mui-color-scheme="dark"]) &': obj,
  };
};

export default defineConfig({
  plugins: [
    zeroVitePlugin({
      cssVariablesPrefix: 'app',
      theme,
    }),
    reactPlugin(),
    splitVendorChunkPlugin(),
  ],
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
    resolveSnapshotPath(testPath, extension) {
      return join(
        join(dirname(testPath), '__vite_snapshots__'),
        `${basename(testPath)}${extension}`,
      );
    },
    passWithNoTests: true,
    css: {
      // to render the final css in the output html to test
      // computed styles. Users will need to add this if they
      // want to test computed styles.
      include: [/.+/],
    },
  },
});
