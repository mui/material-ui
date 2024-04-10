import * as path from 'node:path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import { pigment } from '@pigment-css/vite-plugin';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  getSelector: function getSelector(colorScheme, css) {
    if (colorScheme) {
      return {
        [`@media (prefers-color-scheme: ${colorScheme})`]: {
          ':root': css,
        },
      };
    }
    return ':root';
  },
});
theme.getColorSchemeSelector = (colorScheme) => {
  return `@media (prefers-color-scheme: ${colorScheme})`;
};

export default defineConfig({
  plugins: [
    reactPlugin({
      include: /\.(mdx|js|jsx|ts|tsx)$/,
      babel: {
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
          '@babel/preset-typescript',
        ],
      },
    }),
    pigment({
      theme,
      transformLibraries: ['local-ui-lib', '@mui/material'],
      sourceMap: true,
      displayName: true,
    }),
    Pages(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: [
      {
        find: /^@mui\/icons-material\/(.*)/,
        replacement: '@mui/icons-material/esm/$1',
      },
      {
        find: /^@pigment-css\/react$/,
        // There is a weird issue on the CI where Vite/Rollup isn't able to resolve
        // the path for pigment-css/react in this monodrep. This is a temporary workaround. It does not
        // affect local development or end-user projects.
        replacement: path.resolve(
          path.join(process.cwd(), 'node_modules/@pigment-css/react/build/index.mjs'),
        ),
      },
    ],
  },
});
