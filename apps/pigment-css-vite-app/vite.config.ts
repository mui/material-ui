import { defineConfig, splitVendorChunkPlugin } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { pigment } from '@pigment-css/vite-plugin';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  colorSchemes: { light: true, dark: true },
});

export default defineConfig({
  plugins: [
    reactPlugin({
      include: /\.(mdx|js|jsx|ts|tsx)$/,
      babel: {
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
          '@babel/preset-typescript',
        ],
      },
    }),
    pigment({
      theme,
      transformLibraries: ['@mui/material'],
      sourceMap: true,
      displayName: true,
    }),
    splitVendorChunkPlugin(),
    Pages({
      exclude: ['**/*.test.*'],
    }),
    nodePolyfills(),
  ],
});
