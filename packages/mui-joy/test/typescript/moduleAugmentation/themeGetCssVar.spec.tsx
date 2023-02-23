import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface ThemeCssVarOverrides {
    'custom-color': true;
  }
}

const theme = extendTheme();

theme.getCssVar('custom-color');
