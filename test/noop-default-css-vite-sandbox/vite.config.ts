import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(dirname, '../..');

export default defineConfig(({ mode }) => ({
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: '@mui/styled-engine',
        replacement: path.resolve(monorepoRoot, 'packages/mui-styled-engine-noop/build'),
      },
    ],
  },
}));
