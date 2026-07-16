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
const MONOREPO_ROOT = path.resolve(dirname, '../..');
const breakpointTheme = createTheme({ breakpoints: customBreakpoints });

export default defineConfig(({ mode }) => ({
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
      {
        find: '@mui/styled-engine',
        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-styled-engine-noop/build'),
      },
    ],
  },
}));
