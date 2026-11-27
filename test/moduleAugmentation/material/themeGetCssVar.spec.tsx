import { createTheme } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

declare module '@mui/material/styles' {
  interface ThemeCssVarOverrides {
    'custom-color': true;
  }
}

const theme = createTheme({ cssVariables: true });

theme.getCssVar('custom-color');
