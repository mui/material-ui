import { ponyfillGlobal } from '@material-ui/utils';

/* Warning if there are several instances of @material-ui/styles */
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  ponyfillGlobal['__@material-ui/styles-init__'] =
    ponyfillGlobal['__@material-ui/styles-init__'] || 0;

  if (ponyfillGlobal['__@material-ui/styles-init__'] === 1) {
    // eslint-disable-next-line no-console
    console.warn(
      [
        'It looks like there are several instances of `@material-ui/styles` initialized in this application.',
        'This may cause theme propagation issues, broken class names ' +
          'and makes your application bigger without a good reason.',
        '',
        'See https://material-ui.com/getting-started/faq#i-have-several-instances-of-styles-on-the-page for more info.',
      ].join('\n'),
    );
  }

  ponyfillGlobal['__@material-ui/styles-init__'] += 1;
}

export { default as createGenerateClassName } from './createGenerateClassName';
export { default as createStyles } from './createStyles';
export { default as getThemeProps } from './getThemeProps';
export { default as jssPreset } from './jssPreset';
export { default as makeStyles } from './makeStyles';
export { default as mergeClasses } from './mergeClasses';
export { default as ServerStyleSheets } from './ServerStyleSheets';
export { default as styled } from './styled';
export { default as StylesProvider } from './StylesProvider';
export { default as ThemeProvider } from './ThemeProvider';
export { default as useTheme } from './useTheme';
export { default as withStyles } from './withStyles';
export { default as withTheme, withThemeCreator } from './withTheme';
