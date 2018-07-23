import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

// treat as externals not relative, not absolute and not reserved rollup paths
const cjsExternal = id =>
  !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/');

const input = './src/index.js';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
};

const babelOptions = {
  exclude: 'node_modules/**',
  plugins: ['external-helpers'],
};

const commonjsOptions = {
  include: [
    'node_modules/**',
  ],
  namedExports: {
    'node_modules/moment-range/dist/moment-range.js': ['extendMoment'],
  },
};

export default [
  {
    input,
    external: cjsExternal,
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'esm', sourcemap: true },
    ],
    plugins: [
      resolve({ extensions: ['.js', '.jsx'] }),
      babel(babelOptions),
      commonjs(commonjsOptions),
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
      sourcemap: true,
      file: 'build/dist/material-ui-pickers.umd.js',
    },
    plugins: [
      resolve({ extensions: ['.js', '.jsx'] }),
      babel(babelOptions),
      commonjs(commonjsOptions),
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
      resolve({ extensions: ['.js', '.jsx'] }),
      babel(babelOptions),
      commonjs(commonjsOptions),
      sizeSnapshot(),
      uglify(),
    ],
  },
];
