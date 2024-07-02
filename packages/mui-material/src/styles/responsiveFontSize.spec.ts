import {
  responsiveFontSizes,
  extendTheme,
  createTheme,
  Theme,
  CssVarsTheme,
} from '@mui/material/styles';
import { expectType } from '@mui/types';

const cssVarsTheme = responsiveFontSizes(extendTheme());
expectType<Omit<Theme, 'applyStyles'> & CssVarsTheme, typeof cssVarsTheme>(cssVarsTheme);

const theme = responsiveFontSizes(createTheme());
expectType<Theme, typeof theme>(theme);
