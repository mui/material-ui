import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { Features } from 'lightningcss';
import { createTheme } from '@mui/material/styles';
import { muiCustomMedia, muiMaterialCssModules } from '@mui/material-css-tools/vite';
import customBreakpoints from './src/theme';

const dirname = path.dirname(fileURLToPath(import.meta.url));
// Two levels up: test/css-theme-provider-vite-sandbox → test → monorepo root
const MONOREPO_ROOT = path.resolve(dirname, '../..');
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
    transformer: 'lightningcss',
    lightningcss: {
      drafts: {
        customMedia: true,
      },
      include: Features.CustomMediaQueries,
    },
  },
  plugins: [
    muiMaterialCssModules(),
    muiCustomMedia({ theme: breakpointTheme }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      // THE KEY ALIAS: swap Emotion for the zero-runtime noop engine.
      // This is exactly what non-Emotion users configure in their own bundler.
      {
        find: '@mui/styled-engine',
        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-styled-engine-noop/build'),
      },
    ],
  },
}));
