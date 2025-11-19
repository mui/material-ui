/// <reference types="@chialab/vitest-provider-browserstack" />
import 'dotenv/config';
import { configDefaults, defineProject } from 'vitest/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { Plugin, transformWithEsbuild } from 'vite';
import { playwright } from '@vitest/browser-playwright';
import { BrowserInstanceOption, BrowserProviderOption } from 'vitest/node';
import { webdriverio } from '@vitest/browser-webdriverio';
import { Local, Options } from 'browserstack-local';
import ip from 'ip';

declare global {
  // eslint-disable-next-line vars-on-top
  var bsTunnel: Promise<Local> | undefined;
}

const browserStackUser = process.env.BROWSERSTACK_USERNAME;
const browserStackKey = process.env.BROWSERSTACK_ACCESS_KEY;
const browserStack =
  browserStackUser && browserStackUser
    ? {
        user: browserStackUser,
        key: browserStackKey,
      }
    : null;

async function startTunnel(bsOptions: Partial<Options>): Promise<Local> {
  if (!globalThis.bsTunnel) {
    globalThis.bsTunnel = new Promise((resolve, reject) => {
      const bs = new Local();
      bs.start(bsOptions, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(bs);
        }
      });
    });
  }
  return globalThis.bsTunnel;
}

function browserstack({ verbose = false } = {}): BrowserProviderOption<object> {
  const localIdentifier = `vitest-${Date.now()}`;
  const user = /** @type {string} */ process.env.BROWSERSTACK_USERNAME;
  const key = /** @type {string} */ process.env.BROWSERSTACK_ACCESS_KEY;

  const tunnelPromise = startTunnel({
    verbose,
    force: true,
    forceLocal: true,
    user,
    key,
    localIdentifier,
    onlyHosts: 'localhost,0.0.0.0,127.0.0.1',
  });

  const provider = webdriverio({
    logLevel: verbose ? 'debug' : 'error',
    protocol: 'https',
    capabilities: {
      webSocketUrl: true,
      browserName: 'chrome',

      browserVersion: 'latest',
      'goog:chromeOptions': {
        args: [`--unsafely-treat-insecure-origin-as-secure=http://${ip.address()}:5176`],
      },
      'bstack:options': {
        // @ts-expect-error the type doesn't seem up-to-date
        seleniumBidi: true,
        seleniumVersion: '4.20.0',
        browserVersion: 'latest',
        wsLocalSupport: true,
        local: true,
        buildName: 'vitest',
        localIdentifier,
        os: 'OS X',
        osVersion: 'Monterey',
        userName: user,
        accessKey: key,
      },
    },

    user,
    key,
  });

  return new Proxy(provider, {
    get(target, prop, receiver) {
      if (prop === 'providerFactory') {
        return function providerFactory(project) {
          const browser = target.providerFactory(project);
          return new Proxy(browser, {
            get(browserTarget, browserProp, browserReceiver) {
              if (browserProp === 'openPage') {
                return async function openPage(sessionId, url) {
                  await tunnelPromise;

                  const localUrl = url.replace(/localhost|127\.0\.0\.1|0\.0\.0\.0/, ip.address());
                  return browserTarget.openPage(sessionId, localUrl);
                } satisfies (typeof browserTarget)['openPage'];
              }
              if (browserProp === 'close') {
                return async function close() {
                  const bsLocal = await tunnelPromise;
                  await Promise.all([
                    browserTarget.close(),
                    new Promise<void>((resolve) => {
                      bsLocal.stop(() => resolve());
                    }).catch(() => null),
                  ]);
                } satisfies (typeof browserTarget)['close'];
              }
              return Reflect.get(browserTarget, browserProp, browserReceiver);
            },
          });
        } satisfies (typeof target)['providerFactory'];
      }
      return Reflect.get(target, prop, receiver);
    },
  });
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
      browser: {
        enabled: testEnv === 'browser',
        provider: browserStack
          ? browserstack()
          : playwright({
              launchOptions: {
                ignoreDefaultArgs: [...(enableScrollbars ? ['--hide-scrollbars'] : [])],
              },
            }),
        api: browserStack
          ? {
              host: '0.0.0.0',
              port: 5176,
            }
          : undefined,
        headless: true,
        viewport: {
          width: 1024,
          height: 896,
        },
        instances: browserStack
          ? [{ browser: 'chrome' } as BrowserInstanceOption]
          : (process.env.VITEST_BROWSERS || 'chromium')
              .split(',')
              .map((browser) => ({ browser }) as BrowserInstanceOption),
        screenshotFailures: false,
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
