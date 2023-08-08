import { defineConfig, splitVendorChunkPlugin } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import linaria from '@linaria/vite';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();
// theme.palette.Slider = theme.palette.Slider ?? {};
// @ts-ignore
theme.applyDarkStyles = function applyDarkStyles(obj) {
  return {
    ':where([data-mui-color-scheme="dark"]) &': obj,
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
    }),
    reactPlugin(),
    splitVendorChunkPlugin(),
  ],
});
