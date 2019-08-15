import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    sourcemap: true,
    format: 'cjs',
  },
  plugins: [
    typescript(),
    commonjs(),
    terser({
      toplevel: true,
    }),
  ],
};
