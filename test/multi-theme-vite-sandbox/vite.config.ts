import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  build: {
    rollupOptions: {
      input: {
        polished: path.resolve(dirname, 'index.html'),
        brutalist: path.resolve(dirname, 'brutalist.html'),
        consumer: path.resolve(dirname, 'consumer.html'),
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        // Keep MUI's markup and behavior, but replace all runtime component style generation.
        find: /^@mui\/styled-engine$/,
        replacement: path.resolve(dirname, 'src/noopStyledEngine.tsx'),
      },
    ],
  },
}));
