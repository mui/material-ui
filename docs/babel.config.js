const fse = require('fs-extra');
const path = require('path');

const errorCodesPath = path.resolve(__dirname, './public/static/error-codes.json');

const alias = {
  '@mui/material': '../packages/mui-material/src',
  '@mui/docs': '../packages/mui-docs/src',
  '@mui/icons-material': '../packages/mui-icons-material/lib',
  '@mui/lab': '../packages/mui-lab/src',
  '@mui/styles': '../packages/mui-styles/src',
  '@mui/styled-engine-sc': '../packages/mui-styled-engine-sc/src',
  // Swap the comments on the next two lines for using the styled-components as style engine
  '@mui/styled-engine': '../packages/mui-styled-engine/src',
  // '@mui/styled-engine': '../packages/mui-styled-engine-sc/src',
  '@mui/system': '../packages/mui-system/src',
  '@mui/private-theming': '../packages/mui-private-theming/src',
  '@mui/utils': '../packages/mui-utils/src',
  '@mui/base': '../packages/mui-base/src',
  '@mui/material-next': '../packages/mui-material-next/src',
  '@mui/joy': '../packages/mui-joy/src',
  docs: './',
  modules: '../modules',
  pages: './pages',
};

const { version: transformRuntimeVersion } = fse.readJSONSync(
  require.resolve('@babel/runtime-corejs2/package.json'),
);

module.exports = {
  // TODO: Enable once nextjs uses babel 7.13
  // assumptions: {
  //   noDocumentAll: true,
  // },
  presets: [
    // backport of https://github.com/vercel/next.js/pull/9511
    [
      'next/babel',
      {
        'preset-react': { runtime: 'automatic' },
        'transform-runtime': { corejs: 2, version: transformRuntimeVersion },
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-macros',
      {
        muiError: {
          errorCodesPath,
        },
      },
    ],
    'babel-plugin-optimize-clsx',
    // for IE11 support
    '@babel/plugin-transform-object-assign',
    [
      'babel-plugin-module-resolver',
      {
        alias,
        transformFunctions: ['require', 'require.context'],
      },
    ],
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
        ['babel-plugin-transform-react-remove-prop-types', { mode: 'remove' }],
      ],
    },
  },
};
