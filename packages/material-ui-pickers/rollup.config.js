import fs from 'fs';
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

const tsconfig = path.resolve(__dirname, '..', '..', 'tsconfig.build.json');
console.info(`Using tsconfig: ${tsconfig}`);

// treat as externals not relative and not absolute paths
const external = id => !id.startsWith('.') && !id.startsWith('/');

const input = './src/index.ts';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
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
      sizeSnapshot(),
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
      {
        transform(code) {
          if (code.includes('/** @class */')) {
            return code.replace(/\/\*\* @class \*\//g, '/*@__PURE__*/');
          }
        },
      },
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
