/// <reference types="@chialab/vitest-provider-browserstack" />
import 'dotenv/config';
import { configDefaults, defineProject } from 'vitest/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { Plugin, transformWithEsbuild } from 'vite';
import { playwright } from '@vitest/browser-playwright';

const browserstack = {
  options: {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
  },
  capabilities: {
    'chrome-latest': {
      browserName: 'Chrome',
      'bstack:options': {
        browserVersion: 'latest',
      },
    },
    'firefox-latest': {
      browserName: 'Firefox',
      'bstack:options': {
        browserVersion: 'latest',
      },
    },
    'safari-latest': {
      browserName: 'Safari',
      'bstack:options': {
        browserVersion: 'latest',
      },
    },
    'edge-latest': {
      browserName: 'MicrosoftEdge',
      'bstack:options': {
        browserVersion: 'latest',
      },
    },
  },
};

const BROWSERSTACK_ENABLED = false;

function getBrowser({ enabled = false, enableScrollbars = false } = {}) {
  if (BROWSERSTACK_ENABLED) {
    return {
      enabled,
      // Use the browserstack provider.
      provider: '@chialab/vitest-provider-browserstack',
      // We need to expose the server to the network in order to let Browserstack access it.
      api: {
        host: '0.0.0.0',
        port: 5176,
      },
      viewport: {
        width: 1024,
        height: 896,
      },
      instances: [{ browser: 'browserstack:chrome-latest' }],
    };
  }
  return {
    enabled,
    provider: playwright({
      launchOptions: {
        ignoreDefaultArgs: [...(enableScrollbars ? ['--hide-scrollbars'] : [])],
      },
    }),
    headless: true,
    viewport: {
      width: 1024,
      height: 896,
    },
    instances: [{ browser: 'chromium' }],
  };
}

function forceJsxForJsFiles(): Plugin {
  return {
    name: 'force-jsx-loader-for-js',
    enforce: 'pre',
    async transform(code, id) {
      if (id.includes('/node_modules/')) {
        return null;
      }

      if (!id.endsWith('.js')) {
        return null;
      }

      const result = await transformWithEsbuild(code, id, {
        loader: 'jsx',
      });

      // @vitejs/plugin-react only adds the React import for .jsx files.
      if (!result.code.includes("from 'react'") && !result.code.includes('from "react"')) {
        result.code = `import * as React from 'react';\n${result.code}`;
      }

      return result;
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

  return defineProject({
    plugins: [react(), forceJsxForJsFiles()],
    define: {
      'process.env.NODE_ENV': JSON.stringify('test'),
    },
    test: {
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

      fakeTimers: {
        // We use performance.now in the codebase
        toFake: [...(configDefaults.fakeTimers.toFake ?? []), 'performance'],
      },
      browser: getBrowser({ enabled: testEnv === 'browser', enableScrollbars }),
      env: {
        VITEST: 'true',
      },
      browserstack,
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
