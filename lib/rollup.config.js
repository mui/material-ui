import fs from 'fs';
import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

// treat as externals not relative and not absolute paths
const external = id => !id.startsWith('.') && !id.startsWith('/');

const input = './src/index.ts';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
};

const commonjsOptions = {
  include: 'node_modules/**',
};

const extensions = ['.ts', '.tsx'];

const createUtilsConfigs = ({ name, input }) => {
  const utilsPkg = {
    name,
    main: 'index.js',
    module: 'index.esm.js',
    typings: 'index.d.ts',
  };
  fs.writeFileSync(
    `build/${name}/package.json`,
    JSON.stringify(utilsPkg, null, 2)
  );
  return {
    input: `src/${name}/index.ts`,
    external,
    output: {
      file: `build/${name}/index.esm.js`,
      format: 'esm',
    },
    plugins: [nodeResolve({ extensions }), typescript()],
  };
};

export default [
  createUtilsConfigs({ name: 'date-fns-utils' }),
  createUtilsConfigs({ name: 'date-fns-utils-old' }),
  createUtilsConfigs({ name: 'moment-utils' }),
  createUtilsConfigs({ name: 'luxon-utils' }),

  {
    input,
    external,
    output: {
      file: path.join('build', pkg.main),
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ extensions }),
      typescript(),
      // babel(getBabelOptions({ useESModules: false })),
      sizeSnapshot(),
    ],
  },

  {
    input,
    external,
    output: {
      file: path.join('build', pkg.module),
      format: 'esm',
      sourcemap: true,
    },
    plugins: [nodeResolve({ extensions }), typescript(), sizeSnapshot()],
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
      typescript(),
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
      typescript(),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      uglify(),
    ],
  },
];
