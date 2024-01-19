import { defineConfig, splitVendorChunkPlugin } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import { zeroVitePlugin as zeroPlugin } from '@mui/zero-vite-plugin';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme();
// @TODO - Make this part of the main package
// @ts-ignore
theme.applyDarkStyles = function applyDarkStyles(obj) {
  return {
    ':where([data-mui-color-scheme="dark"]) &': obj,
  };
};

export default defineConfig({
  plugins: [
    zeroPlugin({
      theme,
      transformLibraries: ['local-ui-lib'],
      displayName: true,
    }),
    reactPlugin(),
    splitVendorChunkPlugin(),
  ],
});
