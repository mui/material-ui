import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';

const external = ['@mui/zero-runtime/utils'];

const baseConfig: Options = {
  ...(config as Options),
  tsconfig: './tsconfig.build.json',
  external,
};

export default defineConfig([
  {
    ...baseConfig,
    entry: ['./src/index.ts'],
  },
]);
