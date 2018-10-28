import fs from 'fs';
import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';

const extensions = ['.ts', '.tsx'];
const tsconfig = path.join(__dirname, 'tsconfig.json');

const createUtilsConfigs = ({ name, input }) => {
  const utilsPkg = {
    name,
    main: 'index.js',
    module: 'index.esm.js',
    typings: 'index.d.ts',
  };

  // fs.writeFileSync(
  //   `build/${name}/package.json`,
  //   JSON.stringify(utilsPkg, null, 2)
  // );

  return {
    input: `src/${name}.ts`,
    output: {
      file: `build/${name}/index.esm.js`,
      format: 'esm',
    },
    plugins: [
      nodeResolve({ extensions }),
      typescriptPlugin({ typescript, tsconfig }),
    ],
  };
};

export default [
  createUtilsConfigs({ name: 'date-fns-utils' }),
  createUtilsConfigs({ name: 'date-fns-utils-old' }),
  createUtilsConfigs({ name: 'moment-utils' }),
  createUtilsConfigs({ name: 'luxon-utils' }),
];
