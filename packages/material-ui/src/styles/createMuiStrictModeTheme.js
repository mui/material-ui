import createTheme from './createTheme';

let warnedOnce = false;

export default function createMuiStrictModeTheme(...args) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(
        [
          'Material-UI: The createMuiStrictModeTheme function is now replaced with createTheme.',
          'StrictMode is supported by default.',
          "You should use `import { createTheme } from '@material-ui/core/styles'`",
        ].join('\n'),
      );
    }
  }

  return createTheme(...args);
}
