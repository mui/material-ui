import { defineConfig, splitVendorChunkPlugin } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import { pigment } from '@pigment-css/vite-plugin';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme();

// TODO: Fix this from the Material UI side in a separate PR
theme.palette = theme.colorSchemes.light.palette;
theme.getColorSchemeSelector = (colorScheme) => {
  return `@media (prefers-color-scheme: ${colorScheme})`;
};
const { css: rootCss } = theme.generateCssVars();
const { css: lightCss } = theme.generateCssVars('light');
const { css: darkCss } = theme.generateCssVars('dark');
theme.generateCssVars = (colorScheme) => {
  if (colorScheme === 'dark') {
    return {
      css: darkCss,
      selector: {
        '@media (prefers-color-scheme: dark)': {
          ':root': darkCss,
        },
      },
    };
  }
  if (colorScheme === 'light') {
    return { css: lightCss, selector: ':root' };
  }
  return { css: rootCss, selector: ':root' };
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
