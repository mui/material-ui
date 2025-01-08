import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'tsx', // OR "jsx"
    include: /\.[jt]sx?$/,
    exclude: [],
  },
});
