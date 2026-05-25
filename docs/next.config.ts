// @ts-check
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import * as semver from 'semver';
// @ts-ignore
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { createRequire } from 'module';
import { NextConfig } from 'next';
import { findPages } from './src/modules/utils/find';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);

const withDocsInfra = require('./nextConfigDocsInfra');

const workspaceRoot = path.join(currentDirectory, '../');

const pkgContent = fs.readFileSync(path.resolve(workspaceRoot, 'package.json'), 'utf8');
const pkg = JSON.parse(pkgContent);

export default withDocsInfra({
  turbopack: {
    resolveAlias: {
      '@mui/material': '../packages/mui-material/src',
      '@mui/material/package.json': '../packages/mui-material/package.json',
      '@mui/internal-core-docs': '../packages-internal/core-docs/src',
      // Pin bare `@mui/icons-material` to the ESM index.mjs (mirrors the
      // webpack `@mui/icons-material$` exact-match alias). Turbopack directory
      // resolution can otherwise land on the CJS `index.js`, which breaks
      // `import * as mui from '@mui/icons-material'` (namespace members end up
      // as `{ default: Component }` under CJS-ESM interop).
      '@mui/icons-material': '../packages/mui-icons-material/lib/index.mjs',
      '@mui/lab': '../packages/mui-lab/src',
      '@mui/styled-engine': '../packages/mui-styled-engine/src',
      '@mui/system': '../packages/mui-system/src',
      '@mui/system/package.json': '../packages/mui-system/package.json',
      '@mui/private-theming': '../packages/mui-private-theming/src',
      '@mui/utils': '../packages/mui-utils/src',
      '@mui/material-nextjs': '../packages/mui-material-nextjs/src',
      // Mirrors the `docs` alias from babel.config.mjs / babel-plugin-module-resolver.
      docs: '.',
    },
    resolveExtensions: ['.mjs', '.tsx', '.ts', '.jsx', '.js', '.json'],
    // Suppress turbopack's over-strict pages-router global-CSS check. Our
    // global CSS imports are all in `pages/_app.tsx`, which is the documented
    // allowed location — turbopack's check misfires here.
    ignoreIssue: [
      { path: /_app\.tsx/, title: /Global CSS/ },
      { path: /_app\.tsx/, description: /Global CSS/ },
      { path: /global\.css$/ },
      { path: /components-gallery\/base-theme\.css$/ },
    ],
    rules: {
      // Turbopack requires serializable loader options, so `ignoreLanguagePages`
      // (a function) is omitted. Safe while docs is English-only in SSR.
      '*.md': [
        // `.md?muiMarkdown` → markdown loader (mirrors the webpack `oneOf` first branch).
        {
          condition: { query: /[?&]muiMarkdown(?=&|$)/ },
          loaders: [
            {
              loader: '@mui/internal-markdown/loader',
              options: {
                workspaceRoot,
                languagesInProgress: [],
                packages: [
                  {
                    productId: 'material-ui',
                    paths: [
                      path.join(workspaceRoot, 'packages/mui-lab/src'),
                      path.join(workspaceRoot, 'packages/mui-material/src'),
                    ],
                  },
                ],
                env: {
                  SOURCE_CODE_REPO: 'https://github.com/mui/material-ui',
                  LIB_VERSION: pkg.version,
                },
              },
            },
          ],
          as: '*.js',
        },
        // Non-muiMarkdown `.md` (e.g. `import terms from './terms.md'`) → raw source.
        // `{ not: 'foreign' }` keeps raw-loader away from node_modules / Next.js internals.
        {
          condition: {
            all: [{ not: 'foreign' }, { not: { query: /[?&]muiMarkdown(?=&|$)/ } }],
          },
          loaders: ['raw-loader'],
          as: '*.js',
        },
      ],
    },
  },
  webpack: (
    config: Parameters<NonNullable<NextConfig['webpack']>>[0],
    options: Parameters<NonNullable<NextConfig['webpack']>>[1],
  ) => {
    const plugins = config.plugins.slice();

    if (process.env.DOCS_STATS_ENABLED && !options.isServer) {
      plugins.push(
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          generateStatsFile: true,
          analyzerPort: options.isServer ? 8888 : 8889,
          reportTitle: `${options.isServer ? 'server' : 'client'} docs bundle`,
          // Will be available at `.next/${statsFilename}`
          statsFilename: `stats-${options.isServer ? 'server' : 'client'}.json`,
        }),
      );
    }

    // If a module is an webpack "external" the webpack aliases configured are not used.
    // Next.js includes node_modules in webpack externals, some of those have dependencies
    // on the aliases we defined above.
    // So we need tell webpack to not consider those packages as externals.
    if (
      options.isServer &&
      // Next.js executes this twice on the server with React 18 (once per runtime).
      // We only care about Node runtime at this point.
      (options.nextRuntime === undefined || options.nextRuntime === 'nodejs')
    ) {
      const externals = config.externals.slice(0, -1);
      const nextExternals = config.externals.at(-1);

      config.externals = [
        // @ts-ignore
        (ctx, callback) => {
          const { request } = ctx;
          const hasDependencyOnRepoPackages = [
            'material-ui-popup-state',
            // Assume any X dependencies depend on a package defined in this repository.
            '@mui/x-',
            '@toolpad/core',
          ].some((dep) => request.startsWith(dep));

          if (hasDependencyOnRepoPackages) {
            return callback(null);
          }
          return nextExternals(ctx, callback);
        },
        ...externals,
      ];
    }

    // @ts-ignore
    config.module.rules.forEach((rule) => {
      rule.resourceQuery = { not: [/raw/] };
    });

    return {
      ...config,
      plugins,
      resolve: {
        ...config.resolve,
        // resolve .tsx first
        alias: {
          ...config.resolve.alias,

          // for 3rd party packages with dependencies in this repository
          '@mui/material$': path.resolve(workspaceRoot, 'packages/mui-material/src/index.js'),
          '@mui/material/package.json': path.resolve(
            workspaceRoot,
            'packages/mui-material/package.json',
          ),
          '@mui/material': path.resolve(workspaceRoot, 'packages/mui-material/src'),

          '@mui/internal-core-docs': path.resolve(workspaceRoot, 'packages-internal/core-docs/src'),
          '@mui/icons-material$': path.resolve(
            workspaceRoot,
            'packages/mui-icons-material/lib/index.mjs',
          ),
          '@mui/icons-material': path.resolve(workspaceRoot, 'packages/mui-icons-material/lib'),
          '@mui/lab': path.resolve(workspaceRoot, 'packages/mui-lab/src'),
          '@mui/styled-engine': path.resolve(workspaceRoot, 'packages/mui-styled-engine/src'),
          '@mui/system/package.json': path.resolve(
            workspaceRoot,
            'packages/mui-system/package.json',
          ),
          '@mui/system': path.resolve(workspaceRoot, 'packages/mui-system/src'),
          '@mui/private-theming': path.resolve(workspaceRoot, 'packages/mui-private-theming/src'),
          '@mui/utils': path.resolve(workspaceRoot, 'packages/mui-utils/src'),
          '@mui/material-nextjs': path.resolve(workspaceRoot, 'packages/mui-material-nextjs/src'),
        },
        extensions: [
          '.mjs',
          '.tsx',
          // @ts-ignore
          ...config.resolve.extensions.filter(
            (extension: string) => extension !== '.tsx' && extension !== '.mjs',
          ),
        ],
      },
      module: {
        ...config.module,
        rules: config.module.rules.concat([
          {
            test: /\.md$/,
            oneOf: [
              {
                resourceQuery: /muiMarkdown/,
                use: [
                  options.defaultLoaders.babel,
                  {
                    loader: require.resolve('@mui/internal-markdown/loader'),
                    options: {
                      workspaceRoot,
                      ignoreLanguagePages: () => false,
                      languagesInProgress: [],
                      packages: [
                        {
                          productId: 'material-ui',
                          paths: [
                            path.join(workspaceRoot, 'packages/mui-lab/src'),
                            path.join(workspaceRoot, 'packages/mui-material/src'),
                          ],
                        },
                      ],
                      env: {
                        SOURCE_CODE_REPO: options.config.env.SOURCE_CODE_REPO,
                        LIB_VERSION: options.config.env.LIB_VERSION,
                      },
                    },
                  },
                ],
              },
              {
                // used in some /getting-started/templates
                type: 'asset/source',
              },
            ],
          },
          // required to transpile ../packages/
          {
            test: /\.(js|mjs|tsx|ts)$/,
            resourceQuery: { not: [/raw/] },
            // Narrow the scope to fixed directories
            include: [
              path.join(workspaceRoot, 'docs'),
              path.join(workspaceRoot, 'packages'),
              path.join(workspaceRoot, 'packages-internal'),
            ],
            exclude: /(node_modules|mui-icons-material)/,
            use: options.defaultLoaders.babel,
          },
          {
            resourceQuery: /raw/,
            type: 'asset/source',
          },
        ]),
      },
    };
  },
  env: {
    // docs-infra
    LIB_VERSION: pkg.version,
    SEARCH_INDEX: `material-ui-v${semver.major(pkg.version)}`,
    SOURCE_CODE_REPO: 'https://github.com/mui/material-ui',
    SOURCE_GITHUB_BRANCH: 'master', // #target-branch-reference
    GITHUB_TEMPLATE_DOCS_FEEDBACK: '4.docs-feedback.yml',
    // MUI Core related
    GITHUB_AUTH: process.env.GITHUB_AUTH,
    MUI_CHAT_API_BASE_URL: 'https://chat-backend.mui.com',
    MUI_CHAT_SCOPES: 'material-ui', // Use comma separated list of `productId` (see `_app.js`) to enable MUI Chat on demos
  },
  // Ensure CSS from the Data Grid packages is included in the build:
  // https://github.com/mui/mui-x/issues/17427#issuecomment-2813967605
  transpilePackages: ['@mui/x-data-grid', '@mui/x-data-grid-pro', '@mui/x-data-grid-premium'],
  distDir: 'export',
  // Next.js provides a `defaultPathMap` argument, we could simplify the logic.
  // However, we don't in order to prevent any regression in the `findPages()` method.
  // @ts-ignore
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    // @ts-ignore
    function traverse(pages2) {
      // @ts-ignore
      pages2.forEach((page) => {
        // The experiments pages are only meant for experiments, they shouldn't leak to production.
        if (
          (page.pathname.startsWith('/experiments/') || page.pathname === '/experiments') &&
          process.env.DEPLOY_ENV === 'production'
        ) {
          return;
        }
        if (!page.children) {
          // map api-docs to api
          // i: /api-docs/* > /api/* (old structure)
          // ii: /*/api-docs/* > /*/api/* (for new structure)
          // @ts-ignore
          map[page.pathname.replace(/^(\/[^/]+)?\/api-docs\/(.*)/, '$1/api/$2')] = {
            page: page.pathname,
          };
          return;
        }

        traverse(page.children);
      });
    }

    traverse(pages);

    return map;
  },
  // Used to signal we run pnpm build
  ...(process.env.NODE_ENV === 'production'
    ? {
        output: 'export',
      }
    : {
        // rewrites has no effect when run `next export` for production
        rewrites: async () => {
          return [
            // Make sure to include the trailing slash if `trailingSlash` option is set
            { source: '/api/:rest*/', destination: '/api-docs/:rest*/' },
            { source: `/static/x/:rest*`, destination: 'http://0.0.0.0:3001/static/x/:rest*' },
          ];
        },
        redirects: async () => {
          return [
            {
              source: '/base-ui/',
              destination: 'https://base-ui.com',
              permanent: true,
            },
          ];
        },
      }),
} satisfies NextConfig);
