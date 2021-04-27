import createTheme from './createTheme';

let warnedOnce = false;

function createMuiTheme(...args) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(
        [
          'Material-UI: the createMuiTheme function was renamed to createTheme.',
          '',
          "You should use `import { createTheme } from '@material-ui/core/styles'`",
        ].join('\n'),
      );
    }
  }

  return createTheme(...args);
}

export default createMuiTheme;
