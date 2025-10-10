import {
  ThemeOptions as SystemThemeOptions,
  Theme as SystemTheme,
  CSSObject,
  SxProps,
  SxConfig,
} from '@mui/system';
import { Palette, PaletteOptions } from '../styles/createPalette';
import { Mixins, MixinsOptions } from '../styles/createMixins';
import { Shadows } from '../styles/shadows';
import { Transitions, TransitionsOptions } from '../styles/createTransitions';
import { TypographyVariants, TypographyVariantsOptions } from '../styles/createTypography';
import { ZIndex, ZIndexOptions } from '../styles/zIndex';
import {
  DefaultColorScheme,
  ExtendedColorScheme,
  SupportedColorScheme,
  ColorSystemOptions,
  CssVarsTheme,
  CssVarsPalette,
} from '../styles/createThemeFoundation';

export interface ThemeComponents {
  mergeClassNameAndStyles?: boolean;
  [componentName: string]: any;
}

interface ThemeNoVarsOptions extends Omit<SystemThemeOptions, 'zIndex'>, CssVarsOptions {
  mixins?: MixinsOptions;
  components?: ThemeComponents;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyVariantsOptions | ((palette: Palette) => TypographyVariantsOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
  unstable_sxConfig?: SxConfig;
  modularCssLayers?: boolean | string;
}

export interface CssVarsThemeOptions extends Omit<ThemeNoVarsOptions, 'palette'> {
  /**
   * The strategy to generate CSS variables
   *
   * @example 'media'
   * Generate CSS variables using [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
   *
   * @example '.mode-%s'
   * Generate CSS variables within a class .mode-light, .mode-dark
   *
   * @example '[data-mode-%s]'
   * Generate CSS variables within a data attribute [data-mode-light], [data-mode-dark]
   */
  colorSchemeSelector?: 'media' | 'class' | 'data' | string;
  /**
   * Prefix of the generated CSS variables
   * @default 'mui'
   */
  cssVarPrefix?: string;
  /**
   * If `true`, the CSS color-scheme will not be set.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * @default false
   */
  disableCssColorScheme?: boolean;
  /**
   * If `true`, the CSS relative color will be used.
   */
  nativeColor?: boolean;
  /**
   * The selector to generate the global CSS variables (non-color-scheme related)
   * @default ':root'
   * @example ':host' // (for shadow DOM)
   * @see https://mui.com/material-ui/customization/shadow-dom/#3-css-theme-variables-optional
   */
  rootSelector?: string;
  /**
   * A function to determine if the key, value should be attached as CSS Variable
   * `keys` is an array that represents the object path keys.
   *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
   *  then, keys = ['foo', 'bar']
   *        value = 'var(--test)'
   */
  shouldSkipGeneratingVar?: (keys: string[], value: string | number) => boolean;
  /**
   * @default 'light'
   */
  defaultColorScheme?: SupportedColorScheme;
  /**
   * Color schemes configuration
   */
  colorSchemes?: Partial<Record<DefaultColorScheme, boolean | ColorSystemOptions>> &
    (ExtendedColorScheme extends string ? Record<ExtendedColorScheme, ColorSystemOptions> : {});
}

export interface CssThemeVariables {}

type CssVarsOptions = CssThemeVariables extends {
  enabled: true;
}
  ? ColorSystemOptions
  : {};

// shut off automatic exporting for the `BaseTheme` above
export {};

type CssVarsConfigList =
  | 'colorSchemeSelector'
  | 'rootSelector'
  | 'disableCssColorScheme'
  | 'cssVarPrefix'
  | 'shouldSkipGeneratingVar'
  | 'nativeColor';

export interface ThemeOptions extends CssVarsOptions, Omit<CssVarsThemeOptions, CssVarsConfigList> {
  cssVariables?: boolean | Pick<CssVarsThemeOptions, CssVarsConfigList>;
  palette?: PaletteOptions;
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
  components?: ThemeComponents;
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
declare function createTheme(
  options: ThemeOptions, // cast type to skip module augmentation test
  ...args: object[]
): Theme;

export default createTheme;
