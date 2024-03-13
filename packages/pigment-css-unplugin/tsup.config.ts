import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';
import runtimePackageJson from '../pigment-css-react/package.json';

const baseConfig: Options = {
  ...(config as Options),
  tsconfig: './tsconfig.build.json',
  env: {
    RUNTIME_PACKAGE_NAME: runtimePackageJson.name,
  },
};

export default defineConfig(baseConfig);
