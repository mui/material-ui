import { CssVarsTheme } from '../styles/createThemeFoundation';
import { CssVarsThemeOptions, Theme } from './createTheme';

declare function createThemeWithVars(
  options?: CssVarsThemeOptions,
  ...args: object[]
): Omit<Theme, 'applyStyles'> & CssVarsTheme;

export default createThemeWithVars;
