const bpmr = require('babel-plugin-module-resolver');

function resolvePath(sourcePath, currentFile, opts) {
  if (sourcePath === 'markdown') {
    const base = currentFile.substring(__dirname.length).slice(0, -3);
    return `${__dirname}/docs/src/${base}/`;
  }

  return bpmr.resolvePath(sourcePath, currentFile, opts);
}

const alias = {
  '@material-ui/core': '../packages/material-ui/src',
  '@material-ui/docs': '../packages/material-ui-docs/src',
  '@material-ui/icons': '../packages/material-ui-icons/src',
  '@material-ui/lab': '../packages/material-ui-lab/src',
  '@material-ui/styles': '../packages/material-ui-styles/src',
  '@material-ui/system': '../packages/material-ui-system/src',
  '@material-ui/utils': '../packages/material-ui-utils/src',
  docs: './',
  modules: '../modules',
  pages: './pages',
};

module.exports = {
  presets: [
    // TODO figure out how to make it work with dependencies that have this repo as a
    // peer,
    // false causes 'Attempted import error: 'KeyboardTimePicker' is not exported from '@material-ui/pickers'.'
    ['next/babel', { 'preset-env': { modules: 'commonjs' } }],
    '@zeit/next-typescript/babel',
  ],
  plugins: [
    'babel-plugin-optimize-clsx',
    // for IE 11 support
    '@babel/plugin-transform-object-assign',
    'babel-plugin-preval',
    [
      'babel-plugin-module-resolver',
      {
        alias,
        transformFunctions: ['require', 'require.context'],
        resolvePath,
      },
    ],
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    production: {
      plugins: [
        'babel-plugin-transform-react-constant-elements',
        'babel-plugin-transform-dev-warning',
        ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
        ['babel-plugin-transform-react-remove-prop-types', { mode: 'remove' }],
      ],
    },
  },
};
