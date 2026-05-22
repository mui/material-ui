import {
  type ThemeOptions as SystemThemeOptions,
  type Theme as SystemTheme,
  type SxProps,
  type CSSObject,
  type SxConfig,
  type ApplyStyles,
} from '@mui/system';
import { type Mixins, type MixinsOptions } from './createMixins';
import { type Palette, type PaletteOptions } from './createPalette';
import { type TypographyVariants, type TypographyVariantsOptions } from './createTypography';
import { type Shadows } from './shadows';
import { type Transitions, type TransitionsOptions } from './createTransitions';
import { type ZIndex, type ZIndexOptions } from './zIndex';
import { type Components } from './components';
import {
  type CssVarsTheme,
  type CssVarsPalette,
  type ColorSystemOptions,
  type Shape,
  type ShapeOptions,
  type SupportedColorScheme,
} from './createThemeFoundation';

/**
 * To disable custom properties, use module augmentation
 *
 * @example
 * declare module '@mui/material/styles' {
 *   interface CssThemeVariables {
 *     enabled: true;
 *   }
 * }
 */
export interface CssThemeVariables {}

type CssVarsOptions = CssThemeVariables extends {
  enabled: true;
}
  ? ColorSystemOptions
  : {};

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'>, CssVarsOptions {
  mixins?: MixinsOptions | undefined;
  components?: Components<Omit<Theme, 'components'>> | undefined;
  palette?: PaletteOptions | undefined;
  shadows?: Shadows | undefined;
  shape?: ShapeOptions | undefined;
  transitions?: TransitionsOptions | undefined;
  typography?:
    | TypographyVariantsOptions
    | ((palette: Palette) => TypographyVariantsOptions)
    | undefined;
  zIndex?: ZIndexOptions | undefined;
  unstable_strictMode?: boolean | undefined;
  unstable_sxConfig?: SxConfig | undefined;
  modularCssLayers?: boolean | string | undefined;
}

export interface BaseTheme extends SystemTheme {
  mixins: Mixins;
  palette: Palette & (CssThemeVariables extends { enabled: true } ? CssVarsPalette : {});
  shadows: Shadows;
  shape: Shape;
  transitions: Transitions;
  typography: TypographyVariants;
  zIndex: ZIndex;
  unstable_strictMode?: boolean | undefined;
  applyStyles: ApplyStyles<SupportedColorScheme>;
}

// shut off automatic exporting for the `BaseTheme` above
export {};

type CssVarsProperties = CssThemeVariables extends { enabled: true }
  ? Pick<
      CssVarsTheme,
      | 'colorSchemes'
      | 'colorSchemeSelector'
      | 'rootSelector'
      | 'cssVarPrefix'
      | 'defaultColorScheme'
      | 'getCssVar'
      | 'getColorSchemeSelector'
      | 'generateThemeVars'
      | 'generateStyleSheets'
      | 'generateSpacing'
      | 'shouldSkipGeneratingVar'
      | 'vars'
    >
  : Partial<Pick<CssVarsTheme, 'vars'>>;

/**
 * Our [TypeScript guide on theme customization](https://mui.com/material-ui/guides/typescript/#customization-of-theme) explains in detail how you would add custom properties.
 */
export interface Theme extends BaseTheme, CssVarsProperties {
  cssVariables?: false | undefined;
  components?: Components<BaseTheme> | undefined;
  unstable_sx: (props: SxProps<Theme>) => CSSObject;
  unstable_sxConfig: SxConfig;
  alpha: (color: string, value: number | string) => string;
  lighten: (color: string, coefficient: number | string) => string;
  darken: (color: string, coefficient: number | string) => string;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createThemeNoVars(options?: ThemeOptions, ...args: object[]): Theme;
