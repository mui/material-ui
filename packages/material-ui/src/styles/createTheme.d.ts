import { ThemeOptions as SystemThemeOptions, Theme as SystemTheme } from '@material-ui/system';
import { Mixins, MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { Typography, TypographyOptions } from './createTypography';
import { Shadows } from './shadows';
import { Transitions, TransitionsOptions } from './createTransitions';
import { ZIndex, ZIndexOptions } from './zIndex';
import { Components } from './components';

export interface ThemeOptions extends SystemThemeOptions {
  mixins?: MixinsOptions;
  components?: Components;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

export interface Theme extends SystemTheme {
  mixins: Mixins;
  components?: Components;
  palette: Palette;
  shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}

/**
 * @deprecated The createMuiTheme function was renamed to createTheme.
 * Use `import { createTheme } from '@material-ui/core/styles'` instead. It's equivalent.
 */
export function createMuiTheme(options?: ThemeOptions, ...args: object[]): Theme;

/**
 * @deprecated The createMuiStrictModeTheme function is now replaced with createTheme.
 * StrictMode is supported by default.
 * Use `import { createTheme } from '@material-ui/core/styles'` instead. It's equivalent.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function unstable_createMuiStrictModeTheme(options?: ThemeOptions, ...args: object[]): Theme;

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready to use theme object.
 */
export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;
