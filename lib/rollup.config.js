import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

// treat as externals not relative, not absolute and not reserved rollup paths
const external = id =>
  !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/');

export default {
  input: './src/index.js',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'esm', sourcemap: true },
  ],
  external,
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    commonjs({
      include: [
        'node_modules/**',
      ],
      namedExports: {
        'node_modules/moment-range/dist/moment-range.js': ['extendMoment'],
      },
    }),
    sizeSnapshot()
  ],
};
