import { defineConfig, splitVendorChunkPlugin } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import linaria from '@linaria/vite';
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
    linaria({
      displayName: true,
      sourceMap: true,
      // @ts-ignore
      themeArgs: {
        theme,
      },
      babelOptions: {
        plugins: ['@babel/plugin-syntax-jsx'],
      },
    }),
    reactPlugin(),
    splitVendorChunkPlugin(),
  ],
});
