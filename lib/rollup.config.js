import path from 'path';
import pkg from './package.json';
// named exports detectors
import babel from '@rollup/plugin-babel';
import replace from 'rollup-plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const external = id => !id.startsWith('.') && !path.isAbsolute(id);

const input = './src/index.ts';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@material-ui/core/utils': 'material-ui.utils',
  '@material-ui/core/Button': 'material-ui.Button',
  '@material-ui/core/ButtonBase': 'material-ui.ButtonBase',
  '@material-ui/core/CircularProgress': 'material-ui.CircularProgress',
  '@material-ui/core/Dialog': 'material-ui.Dialog',
  '@material-ui/core/DialogActions': 'material-ui.DialogActions',
  '@material-ui/core/DialogContent': 'material-ui.DialogContent',
  '@material-ui/core/Fade': 'material-ui.Fade',
  '@material-ui/core/Grid': 'material-ui.Grid',
  '@material-ui/core/IconButton': 'material-ui.IconButton',
  '@material-ui/core/InputAdornment': 'material-ui.InputAdornment',
  '@material-ui/core/Paper': 'material-ui.Paper',
  '@material-ui/core/Popover': 'material-ui.Popover',
  '@material-ui/core/styles': 'material-ui',
  '@material-ui/core/styles/colorManipulator': 'material-ui.colorManipulator',
  '@material-ui/core/SvgIcon': 'material-ui.SvgIcon',
  '@material-ui/core/Tab': 'material-ui.Tab',
  '@material-ui/core/Tabs': 'material-ui.Tabs',
  '@material-ui/core/TextField': 'material-ui.TextField',
  '@material-ui/core/Toolbar': 'material-ui.Toolbar',
  '@material-ui/core/Typography': 'material-ui.Typography',
  '@material-ui/core/useMediaQuery': 'material-ui.useMediaQuery',
  '@material-ui/core/Unstable_TrapFocus': 'material-ui.Unstable_TrapFocus',
  '@material-ui/core/Grow': 'material-ui.Grow',
  '@material-ui/core/Popper': 'material-ui.Popper',
};

const extensions = ['.ts', '.tsx', '.js'];

const getBabelOptions = ({ useESModules }) => ({
  exclude: /node_modules/,
  babelHelpers: 'runtime',
  extensions,
  plugins: [['@babel/plugin-transform-runtime', { useESModules }]],
});

const commonjsOptions = {
  include: /node_modules/,
};

const onwarn = warning => {
  // ignore imported types
  if (warning.code === 'NON_EXISTENT_EXPORT') {
    return;
  }
  throw Error(String(warning));
};

const getCommonPlugins = ({ esm }) => [
  nodeResolve({ extensions }),
  babel(getBabelOptions({ useESModules: esm })),
];

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
    plugins: getCommonPlugins({ esm: false }),
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
      dir: 'build',
      format: 'esm',
      sourcemap: true,
    },
    plugins: getCommonPlugins({ esm: true }),
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
    plugins: [...getCommonPlugins({ esm: true }), sizeSnapshot()],
  },

  {
    input: {
      'date-fns/index': './adapter/date-fns',
      'luxon/index': './adapter/luxon',
      'moment/index': './adapter/moment',
      'dayjs/index': './adapter/dayjs',
    },
    external,
    onwarn,
    output: {
      dir: 'build/adapter',
      format: 'esm',
      sourcemap: true,
    },
    plugins: getCommonPlugins({ esm: false }),
  },

  {
    input: {
      'date-fns/index.cjs': './adapter/date-fns',
      'luxon/index.cjs': './adapter/luxon',
      'moment/index.cjs': './adapter/moment',
      'dayjs/index.cjs': './adapter/dayjs',
    },
    external,
    onwarn,
    output: {
      dir: 'build/adapter',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: getCommonPlugins({ esm: false }),
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
      ...getCommonPlugins({ esm: true }),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot(),
      {
        transform(code, id) {
          if (id.includes('@material-ui/core')) {
            throw Error(`add ${id} imports to globals`);
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
      ...getCommonPlugins({ esm: true }),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      terser(),
    ],
  },
];
