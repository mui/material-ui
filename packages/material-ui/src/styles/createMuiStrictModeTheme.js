import { deepmerge } from '@material-ui/utils';
import createMuiTheme from './createMuiTheme';

export default function createMuiStrictModeTheme(options) {
  return createMuiTheme(
    deepmerge(
      {
        unstable_strictMode: true,
      },
      options,
    ),
  );
}
