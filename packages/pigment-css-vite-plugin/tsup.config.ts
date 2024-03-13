import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';
import zeroPkgJson from '../pigment-css-react/package.json';

const external = [`${zeroPkgJson.name}/utils`];

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
