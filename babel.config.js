const path = require('path');

const errorCodesPath = path.resolve(__dirname, './docs/public/static/error-codes.json');
const missingError = process.env.MUI_EXTRACT_ERROR_CODES === 'true' ? 'write' : 'annotate';

const defaultAlias = {
  '@material-ui/core': './packages/material-ui/src',
  '@material-ui/docs': './packages/material-ui-docs/src',
  '@material-ui/icons': './packages/material-ui-icons/src',
  '@material-ui/lab': './packages/material-ui-lab/src',
  '@material-ui/styled-engine': './packages/material-ui-styled-engine/src',
  '@material-ui/styled-engine-sc': './packages/material-ui-styled-engine-sc/src',
  '@material-ui/styles': './packages/material-ui-styles/src',
  '@material-ui/system': './packages/material-ui-system/src',
  '@material-ui/utils': './packages/material-ui-utils/src',
  'typescript-to-proptypes': './packages/typescript-to-proptypes/src',
};

const productionPlugins = [
  '@babel/plugin-transform-react-constant-elements',
  ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
];

module.exports = function getBabelConfig(api) {
  const useESModules = api.env(['legacy', 'modern', 'stable', 'production-umd']);

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
    '@babel/preset-react',
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
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules,
        // any package needs to declare 7.4.4 as a runtime dependency. default is ^7.0.0
        version: '^7.4.4',
      },
    ],
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(...productionPlugins);
  }

  return {
    presets,
    plugins,
    ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
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
                modules: './modules',
              },
            },
          ],
        ],
      },
      legacy: {
        plugins: [
          // IE 11 support
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
              root: ['./'],
              alias: defaultAlias,
            },
          ],
        ],
      },
    },
  };
};
