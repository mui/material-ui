// @ts-check
const path = require('path');

/**
 * @typedef {import('@babel/core')} babel
 */

const errorCodesPath = path.resolve(__dirname, './docs/public/static/error-codes.json');
const missingError = process.env.MUI_EXTRACT_ERROR_CODES === 'true' ? 'write' : 'annotate';

/**
 * @param {string} relativeToBabelConf
 * @returns {string}
 */
function resolveAliasPath(relativeToBabelConf) {
  const resolvedPath = path.relative(process.cwd(), path.resolve(__dirname, relativeToBabelConf));
  return `./${resolvedPath.replace('\\', '/')}`;
}

/** @type {babel.PluginItem[]} */
const productionPlugins = [
  ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
];

/** @type {babel.ConfigFunction} */
module.exports = function getBabelConfig(api) {
  const useESModules = api.env(['regressions', 'modern', 'stable']);

  const defaultAlias = {
    '@mui/material': resolveAliasPath('./packages/mui-material/src'),
    '@mui/docs': resolveAliasPath('./packages/mui-docs/src'),
    '@mui/icons-material': resolveAliasPath(
      `./packages/mui-icons-material/lib${useESModules ? '/esm' : ''}`,
    ),
    '@mui/lab': resolveAliasPath('./packages/mui-lab/src'),
    '@mui/internal-markdown': resolveAliasPath('./packages/markdown'),
    '@mui/styled-engine': resolveAliasPath('./packages/mui-styled-engine/src'),
    '@mui/styled-engine-sc': resolveAliasPath('./packages/mui-styled-engine-sc/src'),
    '@mui/styles': resolveAliasPath('./packages/mui-styles/src'),
    '@mui/system': resolveAliasPath('./packages/mui-system/src'),
    '@mui/private-theming': resolveAliasPath('./packages/mui-private-theming/src'),
    '@mui/base': resolveAliasPath('./packages/mui-base/src'),
    '@mui/utils': resolveAliasPath('./packages/mui-utils/src'),
    '@mui/joy': resolveAliasPath('./packages/mui-joy/src'),
    '@mui/internal-docs-utils': resolveAliasPath('./packages-internal/docs-utils/src'),
    docs: resolveAliasPath('./docs'),
    test: resolveAliasPath('./test'),
  };

  const presets = [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
        debug: process.env.MUI_BUILD_VERBOSE === 'true',
        modules: useESModules ? false : 'commonjs',
        shippedProposals: api.env('modern'),
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ];

  const usesAliases =
    // in this config:
    api.env(['coverage', 'development', 'test', 'benchmark']) ||
    process.env.NODE_ENV === 'test' ||
    // in webpack config:
    api.env(['regressions']);

  const outFileExtension = '.js';

  /** @type {babel.PluginItem[]} */
  const plugins = [
    [
      'babel-plugin-macros',
      {
        muiError: {
          errorCodesPath,
          missingError,
        },
      },
    ],
    'babel-plugin-optimize-clsx',
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules,
        // any package needs to declare 7.4.4 as a runtime dependency. default is ^7.0.0
        version: '^7.4.4',
      },
    ],
    [
      'babel-plugin-transform-react-remove-prop-types',
      {
        mode: 'unsafe-wrap',
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: [
          'MUI_VERSION',
          'MUI_MAJOR_VERSION',
          'MUI_MINOR_VERSION',
          'MUI_PATCH_VERSION',
          'MUI_PRERELEASE_LABEL',
          'MUI_PRERELEASE_NUMBER',
        ],
      },
    ],
    ...(useESModules
      ? [
          [
            '@mui/internal-babel-plugin-resolve-imports',
            {
              // Don't replace the extension when we're using aliases.
              // Essentially only replace in production builds.
              outExtension: usesAliases ? null : outFileExtension,
            },
          ],
        ]
      : []),
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(...productionPlugins);
  }
  if (process.env.NODE_ENV === 'test') {
    plugins.push([
      'babel-plugin-module-resolver',
      {
        alias: defaultAlias,
        root: ['./'],
      },
    ]);
  }

  return {
    assumptions: {
      noDocumentAll: true,
    },
    presets,
    plugins,
    ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
    overrides: [
      {
        exclude: /\.test\.(js|ts|tsx)$/,
        plugins: ['@babel/plugin-transform-react-constant-elements'],
      },
      {
        test: /(\.test\.[^.]+$|\.test\/)/,
        plugins: [['@mui/internal-babel-plugin-resolve-imports', false]],
      },
    ],
    env: {
      coverage: {
        plugins: [
          'babel-plugin-istanbul',
          [
            'babel-plugin-module-resolver',
            {
              root: ['./'],
              alias: defaultAlias,
            },
          ],
        ],
      },
      development: {
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              alias: {
                ...defaultAlias,
                modules: './modules',
              },
              root: ['./'],
            },
          ],
        ],
      },
      test: {
        sourceMaps: 'both',
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              root: ['./'],
              alias: defaultAlias,
            },
          ],
        ],
      },
      benchmark: {
        plugins: [
          ...productionPlugins,
          [
            'babel-plugin-module-resolver',
            {
              alias: defaultAlias,
            },
          ],
        ],
      },
    },
  };
};
