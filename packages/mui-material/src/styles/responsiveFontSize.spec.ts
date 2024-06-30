import {
  responsiveFontSizes,
  experimental_extendTheme,
  createTheme,
  Theme,
  CssVarsTheme,
} from '@mui/material/styles';
import { expectType } from '@mui/types';

const cssVarsTheme = responsiveFontSizes(experimental_extendTheme());
expectType<Omit<Theme, 'palette' | 'applyStyles'> & CssVarsTheme, typeof cssVarsTheme>(
  cssVarsTheme,
);

const theme = responsiveFontSizes(createTheme());
expectType<Theme, typeof theme>(theme);
