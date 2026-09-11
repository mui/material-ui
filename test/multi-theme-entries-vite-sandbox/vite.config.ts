import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// This intentionally has no Material UI aliases or CSS-generation plugin: it exercises the built
// package exactly as an application consuming the proposed themed JavaScript entries would.
export default defineConfig(({ mode }) => ({
  build: {
    rollupOptions: {
      input: {
        direct: path.resolve(dirname, 'index.html'),
        barrel: path.resolve(dirname, 'barrel.html'),
        multiple: path.resolve(dirname, 'multiple.html'),
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
  plugins: [react()],
}));
