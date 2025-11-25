import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point to local carousel source
      '@mui/carousel': path.resolve(__dirname, '../packages/mui-carousel/src'),
    },
    // Ensure these resolve from demo's node_modules
    dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    // Exclude the aliased local package from optimization
    exclude: ['@mui/carousel'],
    // Include dependencies that @mui/carousel needs
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@mui/material',
      '@mui/system',
      '@mui/utils',
      '@emotion/react',
      '@emotion/styled',
      'react-transition-group',
      'clsx',
    ],
  },
});
