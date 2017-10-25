import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

const external = () => {
  const externalDependencies = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];

  return moduleId => externalDependencies
    .filter(dependency => moduleId.startsWith(dependency))
    .length > 0;
};

export default {
  input: 'src/index.js',
  sourcemap: true,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  external: external(),
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
      exclude: [
        'node_modules/react',
        'node_modules/react-dom',
        'node_modules/prop-types',
        'node_modules/classnames',
        'node_modules/material-ui',
      ],
      namedExports: {
        'node_modules/moment-range/dist/moment-range.js': ['extendMoment'],
      },
    }),
  ],
};
