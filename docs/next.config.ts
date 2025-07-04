// @ts-check
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
// @ts-ignore
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { createRequire } from 'module';
import { NextConfig } from 'next';
import { findPages } from './src/modules/utils/find';
import { LANGUAGES, LANGUAGES_SSR, LANGUAGES_IGNORE_PAGES, LANGUAGES_IN_PROGRESS } from './config';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);

const withDocsInfra = require('./nextConfigDocsInfra');

const workspaceRoot = path.join(currentDirectory, '../');

const l10nPRInNetlify = /^l10n_/.test(process.env.HEAD || '') && process.env.NETLIFY === 'true';
const vercelDeploy = Boolean(process.env.VERCEL);
const isDeployPreview = Boolean(process.env.PULL_REQUEST_ID);
// For crowdin PRs we want to build all locales for testing.
const buildOnlyEnglishLocale = isDeployPreview && !l10nPRInNetlify && !vercelDeploy;

const pkgContent = fs.readFileSync(path.resolve(workspaceRoot, 'package.json'), 'utf8');
const pkg = JSON.parse(pkgContent);

export default withDocsInfra({
  webpack: (config: NextConfig, options): NextConfig => {
    const plugins = config.plugins.slice();

    if (process.env.DOCS_STATS_ENABLED) {
      plugins.push(
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
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
          '@mui/material': path.resolve(workspaceRoot, 'packages/mui-material/src'),

          '@mui/docs': path.resolve(workspaceRoot, 'packages/mui-docs/src'),
          '@mui/icons-material$': path.resolve(
            workspaceRoot,
            'packages/mui-icons-material/lib/esm/index.js',
          ),
          '@mui/icons-material': path.resolve(workspaceRoot, 'packages/mui-icons-material/lib/esm'),
          '@mui/lab': path.resolve(workspaceRoot, 'packages/mui-lab/src'),
          '@mui/styled-engine': path.resolve(workspaceRoot, 'packages/mui-styled-engine/src'),
          '@mui/system': path.resolve(workspaceRoot, 'packages/mui-system/src'),
          '@mui/private-theming': path.resolve(workspaceRoot, 'packages/mui-private-theming/src'),
          '@mui/utils': path.resolve(workspaceRoot, 'packages/mui-utils/src'),
          '@mui/material-nextjs': path.resolve(workspaceRoot, 'packages/mui-material-nextjs/src'),
          '@mui/joy': path.resolve(workspaceRoot, 'packages/mui-joy/src'),
        },
        extensions: [
          '.tsx',
          // @ts-ignore
          ...config.resolve.extensions.filter((extension) => extension !== '.tsx'),
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
                      ignoreLanguagePages: LANGUAGES_IGNORE_PAGES,
                      languagesInProgress: LANGUAGES_IN_PROGRESS,
                      packages: [
                        {
                          productId: 'material-ui',
                          paths: [
                            path.join(workspaceRoot, 'packages/mui-lab/src'),
                            path.join(workspaceRoot, 'packages/mui-material/src'),
                          ],
                        },
                        {
                          productId: 'joy-ui',
                          paths: [path.join(workspaceRoot, 'packages/mui-joy/src')],
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
            include: [workspaceRoot],
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
    SOURCE_CODE_REPO: 'https://github.com/mui/material-ui',
    SOURCE_GITHUB_BRANCH: 'master', // #target-branch-reference
    GITHUB_TEMPLATE_DOCS_FEEDBACK: '4.docs-feedback.yml',
    BUILD_ONLY_ENGLISH_LOCALE: String(buildOnlyEnglishLocale),
    // MUI Core related
    GITHUB_AUTH: process.env.GITHUB_AUTH
      ? `Basic ${Buffer.from(process.env.GITHUB_AUTH).toString('base64')}`
      : '',
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
    function traverse(pages2, userLanguage) {
      const prefix = userLanguage === 'en' ? '' : `/${userLanguage}`;

      // @ts-ignore
      pages2.forEach((page) => {
        // The experiments pages are only meant for experiments, they shouldn't leak to production.
        if (
          (page.pathname.startsWith('/experiments/') || page.pathname === '/experiments') &&
          process.env.DEPLOY_ENV === 'production'
        ) {
          return;
        }
        // The blog is not translated
        if (userLanguage !== 'en' && LANGUAGES_IGNORE_PAGES(page.pathname)) {
          return;
        }
        if (!page.children) {
          // map api-docs to api
          // i: /api-docs/* > /api/* (old structure)
          // ii: /*/api-docs/* > /*/api/* (for new structure)
          // @ts-ignore
          map[`${prefix}${page.pathname.replace(/^(\/[^/]+)?\/api-docs\/(.*)/, '$1/api/$2')}`] = {
            page: page.pathname,
            query: {
              userLanguage,
            },
          };
          return;
        }

        traverse(page.children, userLanguage);
      });
    }

    // We want to speed-up the build of pull requests.
    // For this, consider only English language on deploy previews, except for crowdin PRs.
    if (buildOnlyEnglishLocale) {
      // eslint-disable-next-line no-console
      console.log('Considering only English for SSR');
      traverse(pages, 'en');
    } else {
      // eslint-disable-next-line no-console
      console.log('Considering various locales for SSR');
      LANGUAGES_SSR.forEach((userLanguage) => {
        traverse(pages, userLanguage);
      });
    }

    return map;
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
  // Used to signal we run pnpm build
  ...(process.env.NODE_ENV === 'production'
    ? {
        output: 'export',
      }
    : {
        // rewrites has no effect when run `next export` for production
        rewrites: async () => {
          return [
            { source: `/:lang(${LANGUAGES.join('|')})?/:rest*`, destination: '/:rest*' },
            // Make sure to include the trailing slash if `trailingSlash` option is set
            { source: '/api/:rest*/', destination: '/api-docs/:rest*/' },
            { source: `/static/x/:rest*`, destination: 'http://0.0.0.0:3001/static/x/:rest*' },
          ];
        },
      }),
} satisfies NextConfig);
