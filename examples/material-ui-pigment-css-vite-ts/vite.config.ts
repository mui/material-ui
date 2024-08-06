import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pigment } from '@pigment-css/vite-plugin';
import { createTheme } from '@mui/material/styles';

const pigmentConfig = {
  theme: createTheme({
    cssVariables: true,
    colorSchemes: { light: true, dark: true },
  }),
  transformLibraries: ['@mui/material'],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pigment(pigmentConfig)],
});
