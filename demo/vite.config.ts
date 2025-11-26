import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Check if we're in a deployment environment (carousel-src exists) or local dev
const carouselSrcPath = path.resolve(__dirname, 'src/carousel-src');
const localCarouselPath = path.resolve(__dirname, '../packages/mui-carousel/src');
const useLocalCarousel = fs.existsSync(localCarouselPath) && !process.env.VERCEL;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Use local monorepo source for dev, bundled source for deployment
      '@mui/carousel': useLocalCarousel ? localCarouselPath : carouselSrcPath,
    },
    // Ensure these resolve from demo's node_modules
    dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled', '@mui/material', '@mui/system', '@mui/utils'],
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
