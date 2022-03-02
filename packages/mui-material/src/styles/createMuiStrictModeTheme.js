import { deepmerge } from '@mui/utils';
import createTheme from './createTheme';

export default function createMuiStrictModeTheme(options, ...args) {
  return createTheme(
    deepmerge(
      {
        unstable_strictMode: true,
      },
      options,
    ),
    ...args,
  );
}
