import { Options, defineConfig } from 'tsup';
import pkg from './package.json';
import config from '../../tsup.config';

const processors = ['styled', 'sx', 'keyframes', 'generateAtomics', 'css', 'createUseThemeProps'];
const external = ['react', 'react-is', 'prop-types'];

const isBundleSizeCheck = process.env.BUNDLE_SIZE_CHECK === '1';

const baseConfig: Options = {
  ...(config as Options),
  tsconfig: './tsconfig.build.json',
  external,
  // output to a different dir for bundle size check
  ...(isBundleSizeCheck ? { outDir: '.bundlesize' } : {}),
};

const BASE_FILES = ['index.ts', 'theme.ts', 'Box.jsx', 'RtlProvider.tsx'];

const submodules: Options[] = [
  {
    ...baseConfig,
    entry: processors.map((file) => `./src/processors/${file}.ts`),
    outDir: 'processors',
  },
  {
    ...baseConfig,
    entry: [
      './src/utils/index.ts',
      './src/utils/pre-linaria-plugin.ts',
      './src/utils/remove-prop-types-plugin.ts',
    ],
    outDir: 'utils',
  },
];

export default defineConfig([
  {
    ...baseConfig,
    entry: BASE_FILES.map((file) => `./src/${file}`),
    // embed dependencirs for bundle size check
    ...(isBundleSizeCheck
      ? {
          noExternal: Object.keys(pkg.dependencies),
          loader: {
            '.js': 'jsx',
          },
        }
      : {}),
  },
  ...(isBundleSizeCheck ? [] : submodules),
]);
