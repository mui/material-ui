import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import postcssCustomMedia from 'postcss-custom-media';
import { createTheme } from '@mui/material/styles';
import muiCustomMedia from '@mui/material-css-tools/postcss';
import { muiMaterialCssModules } from '@mui/material-css-tools/vite';
import customBreakpoints from './src/theme';

const breakpointTheme = createTheme({ breakpoints: customBreakpoints });

// https://vite.dev/config/
// Use the function form so `mode` is available for the NODE_ENV define.
export default defineConfig(({ mode }) => ({
  // MUI source files reference process.env.NODE_ENV for dev-only warnings.
  // Vite doesn't polyfill `process` in browser builds, so we define it explicitly.
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
  css: {
    postcss: {
      plugins: [muiCustomMedia({ theme: breakpointTheme }), tailwindcss(), postcssCustomMedia()],
    },
  },
  plugins: [muiMaterialCssModules(), react()],
}));
