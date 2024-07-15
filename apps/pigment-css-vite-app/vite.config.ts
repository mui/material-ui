import { defineConfig, splitVendorChunkPlugin } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import { pigment } from '@pigment-css/vite-plugin';
import { extendTheme } from '@mui/material/styles';

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
      transformLibraries: ['@mui/material'],
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
    ],
  },
});
