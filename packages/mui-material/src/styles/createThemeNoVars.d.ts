import {
  ThemeOptions as SystemThemeOptions,
  Theme as SystemTheme,
  SxProps,
  CSSObject,
  SxConfig,
} from '@mui/system';
import { Mixins, MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { TypographyVariants, TypographyVariantsOptions } from './createTypography';
import { Shadows } from './shadows';
import { Transitions, TransitionsOptions } from './createTransitions';
import { ZIndex, ZIndexOptions } from './zIndex';
// OPTIMIZATION: Import Components type lazily to break circular dependency
import type { Components } from './components';
import { CssVarsTheme, CssVarsPalette, ColorSystemOptions } from './createThemeWithVars';

// PERFORMANCE OPTIMIZATION: Break circular dependency with forward declaration
// The circular dependency Components<Theme> -> Theme -> Components causes exponential type computation
// We use interface merging and forward declaration to break the cycle while preserving type safety

// Forward declare a minimal theme interface to break circular dependency
// This includes the properties most commonly accessed in component styleOverrides
// Using a minimal interface reduces TypeScript computation while maintaining functionality
interface ThemeForComponents {
  // Core theme properties
  palette: Palette & (CssThemeVariables extends { enabled: true } ? CssVarsPalette : {});
  spacing: any;
  breakpoints: any;
  transitions: Transitions;
  typography: TypographyVariants;
  shape: any;
  shadows: Shadows;
  zIndex: ZIndex;
  mixins: Mixins;

  // CSS-in-JS utilities
  alpha: (color: string, value: number | string) => string;
  lighten: (color: string, coefficient: number | string) => string;
  darken: (color: string, coefficient: number | string) => string;
  applyStyles: (styles: any) => any;

  // Optional CSS variables properties
  vars?: any;
  applyDarkStyles?: any;
  unstable_strictMode?: boolean;
}

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
  mixins?: MixinsOptions;
  // OPTIMIZATION: Use forward-declared theme type to break circular dependency
  components?: Components<ThemeForComponents>;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyVariantsOptions | ((palette: Palette) => TypographyVariantsOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
  unstable_sxConfig?: SxConfig;
  modularCssLayers?: boolean | string;
}

export interface BaseTheme extends SystemTheme {
  mixins: Mixins;
  palette: Palette & (CssThemeVariables extends { enabled: true } ? CssVarsPalette : {});
  shadows: Shadows;
  transitions: Transitions;
  typography: TypographyVariants;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}

// shut off automatic exporting for the `BaseTheme` above
export {};

type CssVarsProperties = CssThemeVariables extends { enabled: true }
  ? Pick<
      CssVarsTheme,
      | 'applyStyles'
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
  cssVariables?: false;
  // OPTIMIZATION: Use forward-declared theme type to break circular dependency
  components?: Components<ThemeForComponents>;
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
