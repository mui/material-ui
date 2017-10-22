import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  sourcemap: true,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  external: ['react', 'react-dom', 'prop-types', 'material-ui', 'classnames'],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs({
      include: [
        'node_modules/**',
      ],
      namedExports: {
        'node_modules/moment-range/dist/moment-range.js': ['extendMoment'],
      },
    }),
  ],
};
