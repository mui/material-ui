import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

const externalDependencies = new RegExp(`^(${[
  ...Object.keys(pkg.peerDependencies || {}),
].join('|')})([/]|$)`);

export default {
  input: 'src/index.js',
  sourcemap: true,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  external: id => externalDependencies.test(id),
  plugins: [
    filesize(),
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
  ],
};
