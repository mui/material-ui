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

// PERFORMANCE OPTIMIZATION: Break circular dependency with deferred component resolution
// Instead of Components<Omit<Theme, 'components'>>, use a conditional type that defers resolution
type DeferredComponents<T = any> = T extends infer U ? Components<U> : never;

// Create a stable theme reference that doesn't cause circular resolution
type StableThemeBase = Omit<SystemTheme, 'components'> & {
  mixins: Mixins;
  palette: Palette;
  shadows: Shadows;
  transitions: Transitions;
  typography: TypographyVariants;
  zIndex: ZIndex;
};

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
  // OPTIMIZATION: Use deferred component resolution to break circular dependency
  components?: DeferredComponents<StableThemeBase>;
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
  // OPTIMIZATION: Use deferred resolution for components to prevent circular computation
  components?: DeferredComponents<BaseTheme>;
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
