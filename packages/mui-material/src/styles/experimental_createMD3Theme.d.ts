/* eslint-disable @typescript-eslint/naming-convention */
import { ThemeOptions, Theme } from './createTheme';

/**
 * Generate a Material Design 3 theme based on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function experimental_createMD3Theme(
  options?: ThemeOptions,
  ...args: object[]
): Theme;
