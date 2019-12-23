import path from 'path';
import reactIs from 'react-is';
// @ts-ignore
import pkg from './package.json';
// named exports detectors
import propTypes from 'prop-types';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const external = id => !id.startsWith('.') && !path.isAbsolute(id);

const input = './src/index.ts';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@material-ui/core': 'material-ui',
  '@material-ui/core/Button': 'material-ui.Button',
  '@material-ui/core/Icon': 'material-ui.Icon',
  '@material-ui/core/IconButton': 'material-ui.IconButton',
  '@material-ui/core/InputAdornment': 'material-ui.InputAdornment',
  '@material-ui/core/TextField': 'material-ui.TextField',
  '@material-ui/core/Dialog': 'material-ui.Dialog',
  '@material-ui/core/DialogActions': 'material-ui.DialogActions',
  '@material-ui/core/DialogContent': 'material-ui.DialogContent',
  '@material-ui/core/Toolbar': 'material-ui.Toolbar',
  '@material-ui/core/Typography': 'material-ui.Typography',
  '@material-ui/core/Popover': 'material-ui.Popover',
  '@material-ui/core/Paper': 'material-ui.Paper',
  '@material-ui/core/Tab': 'material-ui.Tab',
  '@material-ui/core/Tabs': 'material-ui.Tabs',
  '@material-ui/core/SvgIcon': 'material-ui.SvgIcon',
  '@material-ui/core/CircularProgress': 'material-ui.CircularProgress',
  '@material-ui/core/Grid': 'material-ui.Grid',
  '@material-ui/core/styles': 'material-ui',
  '@material-ui/core/styles/colorManipulator': 'material-ui.colorManipulator',
  '@material-ui/core/internal/svg-icons/createSvgIcon': 'material-ui.createSvgIcon',
};

const extensions = ['.ts', '.tsx', '.js'];

const getBabelOptions = ({ useESModules }) => ({
  exclude: /node_modules/,
  runtimeHelpers: true,
  extensions,
  plugins: [['@babel/plugin-transform-runtime', { useESModules }]],
});

const commonjsOptions = {
  include: /node_modules/,
  namedExports: {
    'prop-types': Object.keys(propTypes),
    'react-is': Object.keys(reactIs),
    './src/typings/date.ts': ['MaterialUiPickersDate'],
  },
};

const onwarn = warning => {
  // ignore imported types
  if (warning.code === 'NON_EXISTENT_EXPORT') {
    return;
  }
  throw Error(String(warning));
};

export default [
  {
    input,
    external,
    onwarn,
    output: {
      file: 'build/dist/material-ui-pickers.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [nodeResolve({ extensions }), babel(getBabelOptions({ useESModules: false }))],
  },

  {
    input: {
      index: './src/index',
      DatePicker: './src/DatePicker',
      TimePicker: './src/TimePicker',
      DateTimePicker: './src/DateTimePicker',
      Calendar: './src/views/Calendar/Calendar',
      Day: './src/views/Calendar/Day',
      ClockView: './src/views/Clock/ClockView',
      Clock: './src/views/Clock/Clock',
      Picker: './src/Picker/Picker',
    },
    external,
    onwarn,
    output: {
      dir: 'build/esm',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [nodeResolve({ extensions }), babel(getBabelOptions({ useESModules: true }))],
  },

  {
    input,
    external,
    onwarn,
    output: {
      file: 'build/dist/material-ui-pickers.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ extensions }),
      babel(getBabelOptions({ useESModules: true })),
      sizeSnapshot(),
    ],
  },

  {
    input,
    external: Object.keys(globals),
    onwarn,
    output: {
      globals,
      format: 'umd',
      name: pkg.name,
      file: 'build/dist/material-ui-pickers.umd.js',
    },
    plugins: [
      nodeResolve({ extensions }),
      babel(getBabelOptions({ useESModules: true })),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot(),
      {
        transform(code, id) {
          if (id.includes('@material-ui/core')) {
            throw Error('add @material-ui/core imports to globals');
          }
        },
      },
    ],
  },

  {
    input,
    external: Object.keys(globals),
    onwarn,
    output: {
      globals,
      format: 'umd',
      name: pkg.name,
      file: 'build/dist/material-ui-pickers.umd.min.js',
    },
    plugins: [
      nodeResolve({ extensions }),
      babel(getBabelOptions({ useESModules: true })),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      terser(),
    ],
  },
];
