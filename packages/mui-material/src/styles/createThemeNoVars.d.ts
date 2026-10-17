import * as React from 'react';
import {
  ThemeOptions as SystemThemeOptions,
  Theme as SystemTheme,
  SxProps,
  CSSObject,
  SxConfig,
  ApplyStyles,
} from '@mui/system';
import { Mixins, MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { TypographyVariants, TypographyVariantsOptions } from './createTypography';
import { Shadows } from './shadows';
import { Motion, MotionOptions } from './createMotion';
import { Transitions, TransitionsOptions } from './createTransitions';
import { ZIndex, ZIndexOptions } from './zIndex';
import { Components } from './components';
import {
  CssVarsTheme,
  CssVarsPalette,
  ColorSystemOptions,
  Shape,
  ShapeOptions,
  SupportedColorScheme,
} from './createThemeFoundation';

/**
 * The theme is typed with CSS theme variables (`theme.vars`, palette channel tokens, etc.) by default.
 * If you create the theme with `cssVariables: false`, use module augmentation to remove them from the types:
 *
 * @example
 * declare module '@mui/material/styles' {
 *   interface CssThemeVariables {
 *     enabled: false;
 *   }
 * }
 */
export interface CssThemeVariables {}

/**
 * CSS of the keyboard focus ring, spread onto the `Mui-focusVisible` state. An object merges
 * over the curated default (`solid` style, `palette.primary.main` color, `2px` width, `2px`
 * offset); set `outlineColor: 'transparent'` to drop the outline for a box-shadow-only ring.
 */
export type FocusVisible = React.CSSProperties;

type CssVarsOptions = CssThemeVariables extends {
  enabled: false;
}
  ? {}
  : ColorSystemOptions;

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'>, CssVarsOptions {
  mixins?: MixinsOptions | undefined;
  components?: Components<Omit<Theme, 'components'>> | undefined;
  motion?: MotionOptions | undefined;
  palette?: PaletteOptions | undefined;
  shadows?: Shadows | undefined;
  shape?: ShapeOptions | undefined;
  transitions?: TransitionsOptions | undefined;
  typography?:
    TypographyVariantsOptions | ((palette: Palette) => TypographyVariantsOptions) | undefined;
  zIndex?: ZIndexOptions | undefined;
  focusVisible?: boolean | FocusVisible | undefined;
  unstable_strictMode?: boolean | undefined;
  unstable_sxConfig?: SxConfig | undefined;
  modularCssLayers?: boolean | string | undefined;
}

export interface BaseTheme extends SystemTheme {
  mixins: Mixins;
  motion: Motion;
  palette: Palette & (CssThemeVariables extends { enabled: false } ? {} : CssVarsPalette);
  shadows: Shadows;
  shape: Shape;
  transitions: Transitions;
  typography: TypographyVariants;
  zIndex: ZIndex;
  focusVisible?: FocusVisible | false | undefined;
  unstable_strictMode?: boolean | undefined;
  applyStyles: ApplyStyles<SupportedColorScheme>;
}

// shut off automatic exporting for the `BaseTheme` above
export {};

type CssVarsProperties = CssThemeVariables extends { enabled: false }
  ? Partial<Pick<CssVarsTheme, 'vars'>>
  : Pick<
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
    >;

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
