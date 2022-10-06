/* eslint-disable @typescript-eslint/naming-convention */
import { Theme } from './createTheme';
import { CssVarsThemeOptions, CssVarsTheme } from './experimental_extendTheme';
/**
 * Generate a theme based on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function experimental_extendMD3Theme(
  options?: CssVarsThemeOptions,
  ...args: object[]
): Omit<Theme, 'palette'> & CssVarsTheme;
