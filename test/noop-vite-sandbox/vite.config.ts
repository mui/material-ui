import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const MONOREPO_ROOT = path.resolve(dirname, '../..');

function resolveMuiCustomMedia(code: string) {
  return code
    .replace(/\(--mui-breakpoint-up-xs\)/g, '(min-width: 0px)')
    .replace(/\(--mui-breakpoint-up-sm\)/g, '(min-width: 720px)')
    .replace(/\(--mui-breakpoint-down-sm\)/g, '(max-width: 719.95px)');
}

export default defineConfig(({ mode }) => ({
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
  resolve: {
    alias: [
      {
        find: '@mui/styled-engine',
        replacement: path.resolve(MONOREPO_ROOT, 'packages/mui-styled-engine-noop/build'),
      },
    ],
  },
}));
