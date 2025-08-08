/// <reference types="@vitest/browser/providers/playwright" />
import { configDefaults, defineConfig, coverageConfigDefaults } from 'vitest/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
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

function getVitestEnvironment(fileName: string): 'browser' | 'node' {
  const basename = path.basename(fileName);
  if (basename.includes('.browser.')) {
    return 'browser';
  }
  return 'node';
}

const MONOREPO_ROOT = path.resolve(__dirname, '.');

export interface CreateOptions {
  jsdom?: boolean;
  enableScrollbars?: boolean;
}

export default async function create(
  fileUrl: string,
  { jsdom = false, enableScrollbars = false }: CreateOptions = {},
) {
  const file = fileURLToPath(fileUrl);
  const testEnv = getVitestEnvironment(file);
  const pkgJson = path.resolve(file, '../package.json');
  const pkg = await fs.readFile(pkgJson, 'utf8').then((content) => JSON.parse(content));

  const name = `${testEnv}:${pkg.name}`;

  const ignore = await fs.readFile(path.resolve(MONOREPO_ROOT, './.gitignore'), 'utf8');
  const excludes = ignore
    .trim()
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((line) => (line.startsWith('/') ? line.slice(1) : line));

  return defineConfig({
    plugins: [react(), forceJsxForJsFiles()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.CI': process.env.CI ? JSON.stringify(process.env.CI) : 'undefined',
    },
    test: {
      reporters: ['default', 'junit'],
      outputFile: 'test-results/junit.xml',
      coverage: {
        provider: 'v8',
        reporter: process.env.CI ? ['lcovonly'] : ['text'],
        reportsDirectory: path.resolve(MONOREPO_ROOT, 'coverage'),
        ignoreEmptyLines: true,
        include: ['packages/*/src/**'],
        exclude: [
          '**/__fixtures__/**',
          'packages/mui-icons-material/src/**',
          'packages/mui-codemod/src/**/{test-cases,*.test}/**',
          '**/{postcss,vitest}.config.*',
          '**/build/**',
          ...coverageConfigDefaults.exclude,
        ],
      },
      name,
      exclude: ['**/node_modules/**', '**/build/**', '**/*.spec.*', '**/.next/**', ...excludes],
      globals: true,
      setupFiles: [
        path.resolve(MONOREPO_ROOT, './packages-internal/test-utils/src/setupVitest.ts'),
        ...(jsdom || testEnv === 'browser'
          ? [
              path.resolve(
                MONOREPO_ROOT,
                './packages-internal/test-utils/src/setupVitestBrowser.ts',
              ),
            ]
          : []),
      ],
      environment: jsdom ? 'jsdom' : 'node',
      environmentOptions: jsdom
        ? {
            jsdom: {
              pretendToBeVisual: true,
              url: 'http://localhost',
            },
          }
        : {},

      fakeTimers: {
        // We use performance.now in the codebase
        toFake: [...(configDefaults.fakeTimers.toFake ?? []), 'performance'],
      },
      browser: {
        enabled: testEnv === 'browser',
        provider: 'playwright',
        headless: true,
        viewport: {
          width: 1024,
          height: 896,
        },
        instances: [
          {
            browser: 'chromium',
            launch: {
              ignoreDefaultArgs: [...(enableScrollbars ? ['--hide-scrollbars'] : [])],
            },
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
        '@mui/internal-test-utils': path.resolve(
          MONOREPO_ROOT,
          './packages-internal/test-utils/src',
        ),
        '@mui/internal-docs-utils': path.resolve(
          MONOREPO_ROOT,
          './packages-internal/docs-utils/src',
        ),
        '@mui/material': path.resolve(MONOREPO_ROOT, './packages/mui-material/src'),
        '@mui/system': path.resolve(MONOREPO_ROOT, './packages/mui-system/src'),
        '@mui/types': path.resolve(MONOREPO_ROOT, './packages/mui-types/src'),
        '@mui/utils': path.resolve(MONOREPO_ROOT, './packages/mui-utils/src'),
        '@mui/styled-engine': path.resolve(MONOREPO_ROOT, './packages/mui-styled-engine/src'),
        '@mui/styled-engine-sc': path.resolve(MONOREPO_ROOT, './packages/mui-styled-engine-sc/src'),
        '@mui/styles': path.resolve(MONOREPO_ROOT, './packages/mui-styles/src'),
        '@mui/stylis-plugin-rtl': path.resolve(
          MONOREPO_ROOT,
          './packages/mui-stylis-plugin-rtl/src',
        ),
        '@mui/icons-material': path.resolve(MONOREPO_ROOT, './packages/mui-icons-material/lib/esm'),
        '@mui/lab': path.resolve(MONOREPO_ROOT, './packages/mui-lab/src'),
        '@mui/private-theming': path.resolve(MONOREPO_ROOT, './packages/mui-private-theming/src'),
        '@mui/joy': path.resolve(MONOREPO_ROOT, './packages/mui-joy/src'),
        '@mui/docs': path.resolve(MONOREPO_ROOT, './packages/mui-docs/src'),
        '@mui/material-nextjs': path.resolve(MONOREPO_ROOT, './packages/mui-material-nextjs/src'),
        docs: path.resolve(MONOREPO_ROOT, './docs'),
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
}
