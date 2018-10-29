import fs from 'fs';
import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';

const extensions = ['.ts', '.tsx'];
const external = id => !id.startsWith('.') && !id.startsWith('/');
const tsconfig = path.join(__dirname, 'tsconfig.json');

const createUtilsConfigs = ({ name, input }) => {
  const utilsPkg = {
    name,
    main: 'index.js',
    module: 'index.esm.js',
    typings: 'index.d.ts',
  };

  fs.writeFileSync(
    `./${name}/package.json`,
    JSON.stringify(utilsPkg, null, 2)
  );

  const createConfig = (format, fileName) => ({
    input: `src/${name}/index.ts`,
    external,
    output: {
      file: `./${name}/${fileName}`,
      format: format,
    },
    plugins: [
      nodeResolve({ extensions }),
      typescriptPlugin({ typescript, tsconfig }),
    ],
  });

  return [
    createConfig('esm', 'index.esm.js'),
    createConfig('cjs', 'index.js')
  ];
};

export default [
  ...createUtilsConfigs({ name: 'date-fns' }),
  ...createUtilsConfigs({ name: 'date-fns-old' }),
  ...createUtilsConfigs({ name: 'moment' }),
  ...createUtilsConfigs({ name: 'luxon' }),
];
