const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require('../package.json');
const withDocsInfra = require('./nextConfigDocsInfra');
const { findPages } = require('./src/modules/utils/find');
const {
  LANGUAGES,
  LANGUAGES_SSR,
  LANGUAGES_IGNORE_PAGES,
  LANGUAGES_IN_PROGRESS,
} = require('./config');

const workspaceRoot = path.join(__dirname, '../');

const l10nPRInNetlify = /^l10n_/.test(process.env.HEAD) && process.env.NETLIFY === 'true';
const vercelDeploy = Boolean(process.env.VERCEL);
const isDeployPreview = Boolean(process.env.PULL_REQUEST_ID);
// For crowdin PRs we want to build all locales for testing.
const buildOnlyEnglishLocale = isDeployPreview && !l10nPRInNetlify && !vercelDeploy;

module.exports = withDocsInfra({
  webpack: (config, options) => {
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

    // next includes node_modules in webpack externals. Some of those have dependencies
    // on the aliases defined above. If a module is an external those aliases won't be used.
    // We need tell webpack to not consider those packages as externals.
    if (
      options.isServer &&
      // Next executes this twice on the server with React 18 (once per runtime).
      // We only care about Node runtime at this point.
      (options.nextRuntime === undefined || options.nextRuntime === 'nodejs')
    ) {
      const [nextExternals, ...externals] = config.externals;

      config.externals = [
        (ctx, callback) => {
          const { request } = ctx;
          const hasDependencyOnRepoPackages = [
            'notistack',
            '@mui/x-data-grid',
            '@mui/x-data-grid-pro',
            '@mui/x-date-pickers',
            '@mui/x-date-pickers-pro',
            '@mui/x-data-grid-generator',
            '@mui/x-license-pro',
          ].some((dep) => request.startsWith(dep));

          if (hasDependencyOnRepoPackages) {
            return callback(null);
          }
          return nextExternals(ctx, callback);
        },
        ...externals,
      ];
    }

    config.module.rules.forEach((r) => {
      r.resourceQuery = { not: [/raw/] };
    });

    return {
      ...config,
      plugins,
      resolve: {
        ...config.resolve,
        // resolve .tsx first
        extensions: [
          '.tsx',
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
                resourceQuery: /@mui\/markdown/,
                use: [
                  options.defaultLoaders.babel,
                  {
                    loader: require.resolve('@mui/markdown/loader'),
                    options: {
                      ignoreLanguagePages: LANGUAGES_IGNORE_PAGES,
                      languagesInProgress: LANGUAGES_IN_PROGRESS,
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
          // transpile 3rd party packages with dependencies in this repository
          {
            test: /\.(js|mjs|jsx)$/,
            resourceQuery: { not: [/raw/] },
            include:
              /node_modules(\/|\\)(notistack|@mui(\/|\\)x-data-grid|@mui(\/|\\)x-data-grid-pro|@mui(\/|\\)x-license-pro|@mui(\/|\\)x-data-grid-generator|@mui(\/|\\)x-date-pickers-pro|@mui(\/|\\)x-date-pickers)/,
            use: {
              loader: 'babel-loader',
              options: {
                // on the server we use the transpiled commonJS build, on client ES6 modules
                // babel needs to figure out in what context to parse the file
                sourceType: 'unambiguous',
                plugins: [
                  [
                    'babel-plugin-module-resolver',
                    {
                      alias: {
                        // all packages in this monorepo
                        '@mui/material': '../packages/mui-material/src',
                        '@mui/docs': '../packages/mui-docs/src',
                        '@mui/icons-material': '../packages/mui-icons-material/lib',
                        '@mui/lab': '../packages/mui-lab/src',
                        '@mui/styled-engine': '../packages/mui-styled-engine/src',
                        '@mui/styles': '../packages/mui-styles/src',
                        '@mui/system': '../packages/mui-system/src',
                        '@mui/private-theming': '../packages/mui-private-theming/src',
                        '@mui/utils': '../packages/mui-utils/src',
                        '@mui/base': '../packages/mui-base/src',
                        '@mui/material-next': '../packages/mui-material-next/src',
                        '@mui/joy': '../packages/mui-joy/src',
                      },
                      // transformFunctions: ['require'],
                    },
                  ],
                ],
              },
            },
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
    GITHUB_AUTH: process.env.GITHUB_AUTH
      ? `Basic ${Buffer.from(process.env.GITHUB_AUTH).toString('base64')}`
      : null,
    LIB_VERSION: pkg.version,
    FEEDBACK_URL: process.env.FEEDBACK_URL,
    SOURCE_CODE_ROOT_URL: 'https://github.com/mui/material-ui/blob/master', // #default-branch-switch
    SOURCE_CODE_REPO: 'https://github.com/mui/material-ui',
    GITHUB_TEMPLATE_DOCS_FEEDBACK: '4.docs-feedback.yml',
    BUILD_ONLY_ENGLISH_LOCALE: buildOnlyEnglishLocale,
  },
  // Next.js provides a `defaultPathMap` argument, we could simplify the logic.
  // However, we don't in order to prevent any regression in the `findPages()` method.
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    function traverse(pages2, userLanguage) {
      const prefix = userLanguage === 'en' ? '' : `/${userLanguage}`;

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
  // rewrites has no effect when run `next export` for production
  rewrites: async () => {
    return [
      { source: `/:lang(${LANGUAGES.join('|')})?/:rest*`, destination: '/:rest*' },
      // Make sure to include the trailing slash if `trailingSlash` option is set
      { source: '/api/:rest*/', destination: '/api-docs/:rest*/' },
      { source: `/static/x/:rest*`, destination: 'http://0.0.0.0:3001/static/x/:rest*' },
    ];
  },
});
