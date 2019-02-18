import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const tsconfig = path.join(__dirname, 'tsconfig.json');
console.info(`Using tsconfig: ${tsconfig}`);

// treat as externals not relative and not absolute paths
const external = id => !id.startsWith('.') && !id.startsWith('/');

const input = './src/index.ts';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  '@material-ui/core/Icon': 'material-ui.Icon',
  '@material-ui/core/Button/': 'material-ui/Button.',
  '@material-ui/core/IconButton': 'material-ui.IconButton',
  '@material-ui/core/InputAdornment': 'material-ui.InputAdornment',
  '@material-ui/core/TextField': 'material-ui.TextField',
  '@material-ui/core/Button': 'material-ui.Button',
  '@material-ui/core/Dialog': 'material-ui.Dialog',
  '@material-ui/core/DialogActions': 'material-ui.DialogActions',
  '@material-ui/core/DialogContent': 'material-ui.DialogContent',
  '@material-ui/core/styles/withStyles': 'material-ui.withStyles',
  '@material-ui/core/styles/createStyles': 'material-ui.createStyles',
  '@material-ui/core/Toolbar': 'material-ui.Toolbar',
  '@material-ui/core/Typography': 'material-ui.Typography',
  '@material-ui/core/Popover': 'material-ui.Popover',
  '@material-ui/core/Paper': 'material-ui.Paper',
  '@material-ui/core/styles/withTheme': 'material-ui.withTheme',
  '@material-ui/core/Tab': 'material-ui.Tab',
  '@material-ui/core/Tabs': 'material-ui.Tabs',
  '@material-ui/core/styles': 'material-ui.styles',
  '@material-ui/core/SvgIcon': 'material-ui.SvgIcon',
};

const extensions = ['.ts', '.tsx'];

const babelOptions = {
  babelrc: false,
  extensions,
  plugins: ['./remove-prop-types.js'],
};

const commonjsOptions = {
  include: 'node_modules/**',
};

export default [
  {
    input,
    external,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ extensions }),
      typescriptPlugin({ typescript, tsconfig }),
      babel(babelOptions),
    ],
  },

  {
    input,
    external,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ extensions }),
      typescriptPlugin({ typescript, tsconfig }),
      babel(babelOptions),
      replace({
        delimiters: ['', ''],
        values: { '/** @class */': '/*@__PURE__*/' },
      }),
      sizeSnapshot(),
    ],
  },

  {
    input,
    external: Object.keys(globals),
    output: {
      globals,
      format: 'umd',
      name: pkg.name,
      file: 'build/dist/material-ui-pickers.umd.js',
    },

    plugins: [
      nodeResolve({ extensions }),
      typescriptPlugin({ typescript, tsconfig }),
      babel(babelOptions),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot(),
    ],
  },

  {
    input,
    external: Object.keys(globals),
    output: {
      globals,
      format: 'umd',
      name: pkg.name,
      file: 'build/dist/material-ui-pickers.umd.min.js',
    },
    plugins: [
      nodeResolve({ extensions }),
      typescriptPlugin({ typescript, tsconfig }),
      babel(babelOptions),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      uglify(),
    ],
  },
];
