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
    reactPlugin({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    pigment({
      theme,
      transformLibraries: ['local-ui-lib', '@mui/material'],
      sourceMap: true,
      displayName: true,
      transformSx: false,
    }),
    Pages(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: [
      {
        find: /^@mui\/system\/(.*)/,
        replacement: '@mui/system/esm/$1',
      },
      {
        find: /^@mui\/icons-material\/(.*)/,
        replacement: '@mui/icons-material/esm/$1',
      },
    ],
  },
});
