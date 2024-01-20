import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';
import zeroPkgJson from '../zero-runtime/package.json';

const external = ['@mui/zero-runtime/utils'];

const baseConfig: Options = {
  ...(config as Options),
  tsconfig: './tsconfig.build.json',
  external,
  env: {
    RUNTIME_PACKAGE_NAME: zeroPkgJson.name,
  },
};

export default defineConfig([
  {
    ...baseConfig,
    entry: ['./src/index.ts'],
  },
]);
