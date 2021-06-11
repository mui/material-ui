import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

// Resolve imports like:
// import Portal from '@material-ui/unstyled/Portal';
const nestedFolder = {
  resolveId: (importee) => {
    if (importee.indexOf('@material-ui/unstyled/') === 0) {
      const folder = importee.split('/')[2];
      const resolved = path.resolve(
        __dirname,
        `../../../packages/material-ui-unstyled/src/${folder}/index.js`,
      );
      return resolved;
    }

    if (importee.indexOf('@material-ui/private-theming/') === 0) {
      const folder = importee.split('/')[2];
      const resolved = path.resolve(
        __dirname,
        `../../../packages/material-ui-private-theming/src/${folder}/index.js`,
      );
      return resolved;
    }

    if (importee.indexOf('@material-ui/styled-engine/') === 0) {
      const folder = importee.split('/')[2];
      const resolved = path.resolve(
        __dirname,
        `../../../packages/material-ui-styled-engine/src/${folder}/index.js`,
      );
      return resolved;
    }

    if (importee.indexOf('@material-ui/styled-engine-sc/') === 0) {
      const folder = importee.split('/')[2];
      const resolved = path.resolve(
        __dirname,
        `../../../packages/material-ui-styled-engine-sc/src/${folder}/index.js`,
      );
      return resolved;
    }

    if (importee.indexOf('@material-ui/system/') === 0) {
      const folder = importee.split('/')[2];
      const resolved = path.resolve(
        __dirname,
        `../../../packages/material-ui-system/src/${folder}/index.js`,
      );
      return resolved;
    }

    return undefined;
  },
};

const input = './src/index.js';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const babelOptions = {
  exclude: /node_modules/,
  // We are using @babel/plugin-transform-runtime
  runtimeHelpers: true,
  extensions: ['.js', '.ts', '.tsx'],
  configFile: path.resolve(__dirname, '../../../babel.config.js'),
};
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    '../../node_modules/prop-types/index.js': [
      'elementType',
      'bool',
      'func',
      'object',
      'oneOfType',
      'element',
    ],
    '../../node_modules/react/jsx-runtime.js': ['jsx', 'jsxs'],
    '../../node_modules/react-is/index.js': [
      'ForwardRef',
      'isFragment',
      'isLazy',
      'isMemo',
      'Memo',
      'isValidElementType',
    ],
  },
};
const nodeOptions = {
  extensions: ['.js', '.tsx', '.ts'],
};

function onwarn(warning) {
  if (
    warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
    warning.source === 'react' &&
    warning.names.filter((identifier) => identifier !== 'useDebugValue').length === 0
  ) {
    // only warn for
    // import * as React from 'react'
    // if (__DEV__) React.useDebugValue()
    // React.useDebug not fully dce'd from prod bundle
    // in the sense that it's still imported but unused. Downgrading
    // it to a warning as a reminder to fix at some point
    console.warn(warning.message);
  } else {
    throw Error(warning.message);
  }
}

export default [
  {
    input,
    onwarn,
    output: {
      file: 'build/umd/material-ui.development.js',
      format: 'umd',
      name: 'MaterialUI',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(nodeOptions),
      nestedFolder,
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
      replace({ preventAssignment: true, 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },
  {
    input,
    onwarn,
    output: {
      file: 'build/umd/material-ui.production.min.js',
      format: 'umd',
      name: 'MaterialUI',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(nodeOptions),
      nestedFolder,
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
      replace({ preventAssignment: true, 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot({ snapshotPath: 'size-snapshot.json' }),
      terser(),
    ],
  },
];
