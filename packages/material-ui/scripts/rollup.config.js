import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const input = './src/index.js';

const name = 'material-ui';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const getBabelOptions = () => ({
  exclude: /node_modules/,
  // We are using @babel/plugin-transform-runtime
  runtimeHelpers: true,
});

const getCommonjsOptions = () => ({
  include: /node_modules/,
});

export default [
  {
    input,
    output: { file: `build/umd/${name}.development.js`, format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(getBabelOptions()),
      commonjs(getCommonjsOptions()),
      sizeSnapshot(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },
  {
    input,
    output: { file: `build/umd/${name}.production.min.js`, format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(getBabelOptions()),
      commonjs(getCommonjsOptions()),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      uglify(),
    ],
  },
  {
    input,
    output: { file: `build/dist/${name}.esm.js`, format: 'es' },
    external: id => !id.startsWith('.') && !id.startsWith('/'),
    plugins: [nodeResolve(), babel(getBabelOptions()), sizeSnapshot()],
  },
];
