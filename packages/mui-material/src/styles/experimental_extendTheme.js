import extendTheme from './createThemeWithVars';

let warnedOnce = false;

export default function deprecatedExtendTheme(...args) {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The `experimental_extendTheme` has been stabilized.',
        '',
        "You should use `import { extendTheme } from '@mui/material/styles'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return extendTheme(...args);
}
