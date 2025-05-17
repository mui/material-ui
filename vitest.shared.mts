import { configDefaults, defineConfig } from 'vitest/config';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { Plugin, transformWithEsbuild } from 'vite';

function forceJsxForJsFiles(): Plugin {
  return {
    name: 'force-jsx-loader-for-js',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('/node_modules/')) {
        return null;
      }

      if (!id.endsWith('.js')) {
        return null;
      }

      return transformWithEsbuild(code, id, {
        loader: 'jsx',
      });
    },
  };
}

const MONOREPO_ROOT = path.resolve(__dirname, '.');

export default defineConfig({
  plugins: [react(), forceJsxForJsFiles()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.CI': process.env.CI ? JSON.stringify(process.env.CI) : 'undefined',
  },
  test: {
    exclude: ['node_modules', 'build', '**/*.spec.*'],
    globals: true,
    setupFiles: [path.resolve(MONOREPO_ROOT, './packages-internal/test-utils/src/setupVitest.ts')],
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        pretendToBeVisual: true,
        url: 'http://localhost',
      },
    },
    fakeTimers: {
      // We use performance.now in the codebase
      toFake: [...(configDefaults.fakeTimers.toFake ?? []), 'performance'],
    },
    browser: {
      enabled: false, // enabled through CLI
      provider: 'playwright',
      headless: false,
      viewport: {
        width: 1024,
        height: 896,
      },
      instances: [
        {
          browser: 'chromium',
          headless: !!process.env.CI,
        },
      ],
    },
    env: {
      VITEST: 'true',
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@mui/internal-test-utils': path.resolve(MONOREPO_ROOT, './packages-internal/test-utils/src'),
      '@mui/material': path.resolve(MONOREPO_ROOT, './packages/mui-material/src'),
      '@mui/system': path.resolve(MONOREPO_ROOT, './packages/mui-system/src'),
      '@mui/utils': path.resolve(MONOREPO_ROOT, './packages/mui-utils/src'),
      '@mui/styled-engine': path.resolve(MONOREPO_ROOT, './packages/mui-styled-engine/src'),
      '@mui/styled-engine-sc': path.resolve(MONOREPO_ROOT, './packages/mui-styled-engine-sc/src'),
      '@mui/styles': path.resolve(MONOREPO_ROOT, './packages/mui-styles/src'),
      '@mui/icons-material': path.resolve(MONOREPO_ROOT, './packages/mui-icons-material/lib/esm'),
      '@mui/lab': path.resolve(MONOREPO_ROOT, './packages/mui-lab/src'),
      '@mui/private-theming': path.resolve(MONOREPO_ROOT, './packages/mui-private-theming/src'),
      '@mui/joy': path.resolve(MONOREPO_ROOT, './packages/mui-joy/src'),
      '@mui/docs': path.resolve(MONOREPO_ROOT, './packages/mui-docs/src'),
      '@mui/material-nextjs': path.resolve(MONOREPO_ROOT, './packages/mui-material-nextjs/src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'js-as-jsx',
          setup(build) {
            build.onLoad({ filter: /\.js$/ }, async (args) => {
              if (args.path.includes('/node_modules/')) {
                return null;
              }

              const fs = await import('fs/promises');
              const contents = await fs.readFile(args.path, 'utf8');

              return {
                contents,
                loader: 'jsx',
              };
            });
          },
        },
      ],
    },
  },
});
