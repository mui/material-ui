import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function resolveMuiCustomMedia(code: string) {
  return code
    .replace(/\(--mui-breakpoint-up-xs\)/g, '(min-width: 0px)')
    .replace(/\(--mui-breakpoint-up-sm\)/g, '(min-width: 720px)')
    .replace(/\(--mui-breakpoint-down-sm\)/g, '(max-width: 719.95px)');
}

// https://vite.dev/config/
// Use the function form so `mode` is available for the NODE_ENV define.
export default defineConfig(({ mode }) => ({
  // MUI source files reference process.env.NODE_ENV for dev-only warnings.
  // Vite doesn't polyfill `process` in browser builds, so we define it explicitly.
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
  plugins: [
    {
      name: 'resolve-mui-custom-media',
      enforce: 'pre' as const,
      transform(code, id) {
        if (!id.endsWith('.css')) {
          return null;
        }

        return { code: resolveMuiCustomMedia(code), map: null };
      },
    },
    react(),
  ],
}));
