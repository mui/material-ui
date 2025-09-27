import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for testing MUI styled-components compatibility
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    // Test both with and without fallbackCJS to ensure the fix works
    server: {
      deps: {
        // Uncomment to test with fallbackCJS (should work with both)
        // fallbackCJS: true,
        
        // Alternative: inline MUI packages (should work with both)
        // inline: [
        //   '@mui/material',
        //   '@mui/system',
        //   '@mui/styled-engine',
        //   '@mui/styled-engine-sc',
        // ],
      },
    },
  },
  resolve: {
    alias: {
      // Ensure we're using the styled-engine-sc version
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
});