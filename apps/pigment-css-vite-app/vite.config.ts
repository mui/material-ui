import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { pigment } from '@pigment-css/vite-plugin';
import { extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  getSelector: function getSelector(colorScheme: string, css: string) {
    if (colorScheme) {
      return {
        [`@media (prefers-color-scheme: ${colorScheme})`]: {
          ':root': css,
        },
      };
    }
    return ':root';
  },
});
theme.getColorSchemeSelector = (colorScheme) => {
  return `@media (prefers-color-scheme: ${colorScheme})`;
};

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
    Pages({
      exclude: ['**/*.test.*'],
    }),
    nodePolyfills(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          mui: [
            '@mui/base',
            '@mui/icons-material',
            '@mui/lab',
            '@mui/material',
            '@mui/system',
            '@mui/utils',
          ],
          react: ['react', 'react-dom', 'react-error-boundary', 'react-router-dom'],
          vendor: ['clsx'],
        },
      },
    },
  },
});
