import { ThemeOptions as SystemThemeOptions, Theme as SystemTheme } from '@material-ui/system';
import { MixinsOptions, Mixins } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { Typography, TypographyOptions } from './createTypography';
import { Shadows } from './shadows';
import { ZIndex, ZIndexOptions } from './zIndex';
import { Components } from './components';

export interface ThemeOptions extends SystemThemeOptions {
  components?: Components;
  mixins?: MixinsOptions;
  palette?: PaletteOptions;
  shadows?: Shadows;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

export interface Theme extends SystemTheme {
  components?: Components;
  mixins?: Mixins;
  palette: Palette;
  shadows: Shadows;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}

/**
 * @deprecated
 * Use `import { createTheme } from '@material-ui/core/styles'` instead.
 */
export function createMuiTheme(options?: ThemeOptions, ...args: object[]): Theme;

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready to use theme object.
 */
export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;
