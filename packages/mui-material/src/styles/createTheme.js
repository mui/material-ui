import { createTheme } from '@mui/md-theme';

let warnedOnce = false;

export function createMuiTheme(...args) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(
        [
          'MUI: the createMuiTheme function was renamed to createTheme.',
          '',
          "You should use `import { createTheme } from '@mui/material/styles'`",
        ].join('\n'),
      );
    }
  }

  return createTheme(...args);
}

export default createTheme;
