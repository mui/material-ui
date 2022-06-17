const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const nextTranspileModules = require('next-transpile-modules');
const pkg = require('../package.json');
const { findPages } = require('./src/modules/utils/find');
const { LANGUAGES, LANGUAGES_SSR } = require('./src/modules/constants');
const FEATURE_TOGGLE = require('./src/featureToggle');

const withTM = nextTranspileModules([
  '@mui/material',
  '@mui/docs',
  '@mui/icons-material',
  '@mui/lab',
  '@mui/styled-engine',
  '@mui/styles',
  '@mui/system',
  '@mui/private-theming',
  '@mui/utils',
  '@mui/base',
  '@mui/material-next',
  '@mui/joy',
]);

const reactStrictMode = true;
if (reactStrictMode) {
  // eslint-disable-next-line no-console
  console.log(`Using React.StrictMode.`);
}
const l10nPRInNetlify = /^l10n_/.test(process.env.HEAD) && process.env.NETLIFY === 'true';
const vercelDeploy = Boolean(process.env.VERCEL);
const isDeployPreview = process.env.PULL_REQUEST === 'true';
// For crowdin PRs we want to build all locales for testing.
const buildOnlyEnglishLocale = isDeployPreview && !l10nPRInNetlify && !vercelDeploy;

const staging =
  process.env.REPOSITORY_URL === undefined ||
  // The linked repository url comes from https://app.netlify.com/sites/material-ui/settings/deploys
  /mui-org\/material-ui$/.test(process.env.REPOSITORY_URL);

if (staging) {
  // eslint-disable-next-line no-console
  console.log(`Staging deploy of ${process.env.REPOSITORY_URL || 'local repository'}`);
}

module.exports = withTM({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Motivated by https://github.com/vercel/next.js/issues/7687
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  webpack5: true,
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

      if (externals.length > 0) {
        // currently not the case but other next plugins might introduce additional
        // rules for externals. We would need to handle those in the callback
        throw new Error('There are other externals in the webpack config.');
      }

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
        alias: {
          ...config.resolve.alias,
          '@mui/material': path.resolve(__dirname, '../packages/mui-material/src'),
          '@mui/docs': path.resolve(__dirname, '../packages/mui-docs/src'),
          '@mui/icons-material': path.resolve(__dirname, '../packages/mui-icons-material/lib'),
          '@mui/lab': path.resolve(__dirname, '../packages/mui-lab/src'),
          '@mui/styled-engine': path.resolve(__dirname, '../packages/mui-styled-engine/src'),
          '@mui/styles': path.resolve(__dirname, '../packages/mui-styles/src'),
          '@mui/system': path.resolve(__dirname, '../packages/mui-system/src'),
          '@mui/private-theming': path.resolve(__dirname, '../packages/mui-private-theming/src'),
          '@mui/utils': path.resolve(__dirname, '../packages/mui-utils/src'),
          '@mui/base': path.resolve(__dirname, '../packages/mui-base/src'),
          '@mui/material-next': path.resolve(__dirname, '../packages/mui-material-next/src'),
          '@mui/joy': path.resolve(__dirname, '../packages/mui-joy/src'),
          docs: path.resolve(__dirname, './'),
          modules: path.resolve(__dirname, '../modules'),
          pages: path.resolve(__dirname, './pages'),
        },
      },
      module: {
        ...config.module,
        rules: config.module.rules.concat([
          {
            test: /\.md$/,
            oneOf: [
              {
                resourceQuery: /@mui\/markdown/,
                use: [options.defaultLoaders.babel, require.resolve('@mui/markdown/loader')],
              },
              {
                // used in some /getting-started/templates
                type: 'asset/source',
              },
            ],
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
    COMMIT_REF: process.env.COMMIT_REF,
    ENABLE_AD_IN_DEV_MODE: process.env.ENABLE_AD_IN_DEV_MODE,
    GITHUB_AUTH: process.env.GITHUB_AUTH,
    GIT_REVIEW_ID: process.env.REVIEW_ID,
    LIB_VERSION: pkg.version,
    NETLIFY_DEPLOY_URL: process.env.DEPLOY_URL || 'http://localhost:3000',
    NETLIFY_SITE_NAME: process.env.SITE_NAME || 'material-ui',
    PULL_REQUEST: process.env.PULL_REQUEST === 'true',
    REACT_STRICT_MODE: reactStrictMode,
    FEEDBACK_URL: process.env.FEEDBACK_URL,
    // #default-branch-switch
    SOURCE_CODE_ROOT_URL: 'https://github.com/mui/material-ui/blob/master',
    SOURCE_CODE_REPO: 'https://github.com/mui/material-ui',
    STAGING: staging,
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
        if (page.pathname.startsWith('/experiments') && !staging) {
          return;
        }
        // The blog is not translated
        if (
          userLanguage !== 'en' &&
          (page.pathname === '/blog' || page.pathname.startsWith('/blog/'))
        ) {
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
  reactStrictMode,
  trailingSlash: true,
  // rewrites has no effect when run `next export` for production
  async rewrites() {
    return [
      { source: `/:lang(${LANGUAGES.join('|')})?/:rest*`, destination: '/:rest*' },
      // Make sure to include the trailing slash if `trailingSlash` option is set
      { source: '/api/:rest*/', destination: '/api-docs/:rest*/' },
      { source: `/static/x/:rest*`, destination: 'http://0.0.0.0:3001/static/x/:rest*' },
    ];
  },
  // For developement, adjust the redirects here (no effect on production because of `next export`)
  // For production, configure at `docs/public/_redirects` (netlify)
  async redirects() {
    if (FEATURE_TOGGLE.enable_redirects) {
      return [
        {
          source: '/joy-ui/',
          destination: '/joy-ui/getting-started/overview/',
          permanent: false,
        },
        {
          source: '/styles/:path*',
          destination: '/system/styles/:path*',
          permanent: false,
        },
        {
          source: '/getting-started/:path*',
          destination: '/material-ui/getting-started/:path*',
          permanent: false,
        },
        {
          source: '/customization/:path*',
          destination: '/material-ui/customization/:path*',
          permanent: false,
        },
        {
          source: '/guides/:path*',
          destination: '/material-ui/guides/:path*',
          permanent: false,
        },
        {
          source: '/experimental-api/:path*',
          destination: '/material-ui/experimental-api/:path*',
          permanent: false,
        },
        {
          source: '/discover-more/:path*',
          destination: '/material-ui/discover-more/:path*',
          permanent: false,
        },
        {
          source: '/components/data-grid/:path*',
          destination: '/x/react-data-grid/:path*',
          permanent: false,
        },
        {
          source: '/components/:slug(icons|material-icons|about-the-lab|transitions|pickers)',
          destination: '/material-ui/:slug',
          permanent: false,
        },
        {
          source: '/components/:path(tabs|breadcrumbs)',
          destination: '/material-ui/react-:path',
          permanent: false,
        },
        ...['checkboxes', 'switches'].map((component) => ({
          source: `/components/${component}`,
          destination: `/material-ui/react-${component.replace(/es$/, '')}`,
          permanent: false,
        })),
        ...[
          'buttons',
          'radio-buttons',
          'selects',
          'text-fields',
          'avatars',
          'badges',
          'chips',
          'dividers',
          'lists',
          'tables',
          'tooltips',
          'dialogs',
          'snackbars',
          'cards',
          'drawers',
          'links',
          'menus',
          'steppers',
        ].map((component) => ({
          source: `/components/${component}`,
          destination: `/material-ui/react-${component.replace(/s$/, '')}`,
          permanent: false,
        })),
        {
          source: '/components/:path',
          destination: '/material-ui/react-:path',
          permanent: false,
        },
        {
          source: '/api/data-grid/:path*',
          destination: '/x/api/data-grid/:path*',
          permanent: false,
        },
        {
          source: '/api/:path*',
          destination: '/material-ui/api/:path*',
          permanent: false,
        },
      ];
    }
    return [];
  },
  // Can be turned on when https://github.com/vercel/next.js/issues/24640 is fixed
  optimizeFonts: false,
});
