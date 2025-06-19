// @ts-check
import * as fs from 'fs';
import { createRequire } from 'module';
import { NextConfig } from 'next';
import * as path from 'path';
import * as url from 'url';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { LANGUAGES, LANGUAGES_IGNORE_PAGES, LANGUAGES_IN_PROGRESS } from './config';
import { withDocsInfra } from './nextConfigDocsInfra';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);

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
      if (!rule.resourceQuery) {
        rule.resourceQuery = { not: [/raw/] };
      }
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
          {
            resourceQuery: /raw/,
            type: 'asset/source',
          },
        ]),
      },
    };
  },
  // Ensure CSS from the Data Grid packages is included in the build:
  // https://github.com/mui/mui-x/issues/17427#issuecomment-2813967605
  transpilePackages: ['@mui/x-data-grid', '@mui/x-data-grid-pro', '@mui/x-data-grid-premium'],
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  distDir: 'export',
  envPlugin: {
    BUILD_ONLY_ENGLISH_LOCALE: String(buildOnlyEnglishLocale),
    // MUI Core related
    GITHUB_AUTH: process.env.GITHUB_AUTH
      ? `Basic ${Buffer.from(process.env.GITHUB_AUTH).toString('base64')}`
      : '',
    LIB_VERSION: pkg.version,
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
