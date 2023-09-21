const path = require('path');
const getMuiAliases = require('./scripts/muiAliases');

const errorCodesPath = path.resolve(__dirname, './docs/public/static/error-codes.json');
const missingError = process.env.MUI_EXTRACT_ERROR_CODES === 'true' ? 'write' : 'annotate';

const productionPlugins = [
  ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
];

module.exports = function getBabelConfig(api) {
  const useESModules = api.env(['regressions', 'legacy', 'modern', 'stable', 'rollup']);
  const muiAliases = getMuiAliases({ type: 'src', isRelative: true, useESIcons: useESModules });

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
    // Need the following 3 proposals for all targets in .browserslistrc.
    // With our usage the transpiled loose mode is equivalent to spec mode.
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
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
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(...productionPlugins);
  }
  if (process.env.NODE_ENV === 'test') {
    plugins.push([
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: muiAliases,
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
    ],
    env: {
      coverage: {
        plugins: [
          'babel-plugin-istanbul',
          [
            'babel-plugin-module-resolver',
            {
              root: ['./'],
              alias: muiAliases,
            },
          ],
        ],
      },
      development: {
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              root: ['./'],
              alias: muiAliases,
            },
          ],
        ],
      },
      legacy: {
        plugins: [
          // IE11 support
          '@babel/plugin-transform-object-assign',
        ],
      },
      test: {
        sourceMaps: 'both',
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              root: ['./'],
              alias: muiAliases,
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
              alias: muiAliases,
            },
          ],
        ],
      },
    },
  };
};
