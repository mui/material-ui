import { ThemeOptions as SystemThemeOptions } from '@mui/system';
import { MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { TypographyOptions } from './createTypography';
import { Shadows } from './shadows';
import { TransitionsOptions } from './createTransitions';
import { ZIndexOptions } from './zIndex';
import { Components } from './components';
import { BaseTheme } from './BaseTheme.types';

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'> {
  mixins?: MixinsOptions;
  components?: Components<BaseTheme>;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

/**
 * Our [TypeScript guide on theme customization](https://mui.com/material-ui/guides/typescript/#customization-of-theme) explains in detail how you would add custom properties.
 */
export interface Theme extends BaseTheme {
  components?: Components<BaseTheme>;
}

/**
 * @deprecated
 * Use `import { createTheme } from '@mui/material/styles'` instead.
 */
export function createMuiTheme(options?: ThemeOptions, ...args: object[]): Theme;

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;
