import { ThemeOptions as SystemThemeOptions, SxConfig } from '@mui/system';
import { MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { TypographyVariantsOptions } from './createTypography';
import { Shadows } from './shadows';
import { TransitionsOptions } from './createTransitions';
import { ZIndexOptions } from './zIndex';
import { Components } from './components';
import { ColorSystemOptions } from './createThemeFoundation';
import { Theme, CssThemeVariables } from '../stylesOptimized';

export { CssThemeVariables };

type CssVarsOptions = CssThemeVariables extends {
  enabled: true;
}
  ? ColorSystemOptions
  : {};

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'>, CssVarsOptions {
  mixins?: MixinsOptions;
  components?: Components<Omit<Theme, 'components'>>;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyVariantsOptions | ((palette: Palette) => TypographyVariantsOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
  unstable_sxConfig?: SxConfig;
  modularCssLayers?: boolean | string;
}

declare module '../stylesOptimized' {
  interface ThemeComponents extends Components<Omit<Theme, 'components'>> {}
}

export { Theme };

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createThemeNoVars(options?: ThemeOptions, ...args: object[]): Theme;
