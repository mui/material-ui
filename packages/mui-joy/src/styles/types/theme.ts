import { OverridableStringUnion } from '@mui/types';
import {
  Breakpoints,
  CssContainerQueries,
  Spacing,
  SxProps as SystemSxProps,
  SystemProps as SystemSystemProps,
  CSSObject,
  SxConfig,
  ApplyStyles,
} from '@mui/system';
import { ExtractTypographyTokens } from '@mui/system/cssVars';
import { DefaultColorScheme, ExtendedColorScheme } from './colorScheme';
import { ColorSystem } from './colorSystem';
import { Focus } from './focus';
import { DefaultShadow, Shadow } from './shadow';
import { DefaultRadius, Radius } from './radius';
import {
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  TypographySystem,
  DefaultFontFamily,
  DefaultFontSize,
  DefaultFontWeight,
  DefaultLineHeight,
} from './typography';
import { Variants } from './variants';
import { DefaultZIndex, ZIndex } from './zIndex';
import { MergeDefault } from './utils';

type Split<T, K extends keyof T = keyof T> = K extends string | number
  ? { [k in K]: Exclude<T[K], undefined> }
  : never;

type ConcatDeep<T, D extends string = '-'> =
  T extends Record<string | number, infer V>
    ? keyof T extends string | number
      ? V extends string | number
        ? keyof T
        : keyof V extends string | number
          ? `${keyof T}${D}${ConcatDeep<Split<V>, D>}`
          : never
      : never
    : never;

/**
 * Does not work for these cases:
 * - { borderRadius: string | number } // the value can't be a union
 * - { shadows: [string, string, ..., string] } // the value can't be an array
 */
type NormalizeVars<T, D extends string = '-'> = ConcatDeep<Split<T>, D>;

export interface RuntimeColorSystem extends Omit<ColorSystem, 'palette'> {
  palette: ColorSystem['palette'] & {
    colorScheme: DefaultColorScheme | ExtendedColorScheme;
  };
}

export interface ThemeScales {
  radius: Radius;
  shadow: Shadow;
  focus: { thickness: string };
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  zIndex: ZIndex;
}
export type ThemeScalesOptions = MergeDefault<
  ThemeScales,
  {
    radius: DefaultRadius;
    shadow: DefaultShadow;
    fontFamily: DefaultFontFamily;
    fontSize: DefaultFontSize;
    fontWeight: DefaultFontWeight;
    lineHeight: DefaultLineHeight;
    zIndex: DefaultZIndex;
  }
>;

interface ColorSystemVars extends Omit<ColorSystem, 'palette'> {
  palette: Omit<ColorSystem['palette'], 'mode'>;
}
export interface ThemeVars extends ThemeScales, ColorSystemVars {
  font: ExtractTypographyTokens<TypographySystem>;
}

export interface ThemeCssVarOverrides {}

/**
 * For providing `sx` autocomplete, for example `color`, `bgcolor`, `borderColor`.
 */
export type TextColor =
  | NormalizeVars<Omit<ColorSystem['palette'], 'mode'>, '.'>
  | (string & Record<never, never>);

export type ThemeCssVar = OverridableStringUnion<NormalizeVars<ThemeVars>, ThemeCssVarOverrides>;

export interface Theme extends ThemeScales, RuntimeColorSystem, CssContainerQueries {
  colorSchemes: Record<DefaultColorScheme | ExtendedColorScheme, ColorSystem>;
  defaultColorScheme: DefaultColorScheme | ExtendedColorScheme;
  focus: Focus;
  typography: TypographySystem;
  variants: Variants;
  spacing: Spacing;
  breakpoints: Breakpoints;
  cssVarPrefix: string;
  vars: ThemeVars;
  getCssVar: (field: ThemeCssVar, ...vars: ThemeCssVar[]) => string;
  getColorSchemeSelector: (colorScheme: DefaultColorScheme | ExtendedColorScheme) => string;
  generateThemeVars: () => ThemeVars;
  generateStyleSheets: () => Record<string, any>[];
  generateSpacing: () => Spacing;
  /**
   * A function to determine if the key, value should be attached as CSS Variable
   * `keys` is an array that represents the object path keys.
   *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
   *  then, keys = ['foo', 'bar']
   *        value = 'var(--test)'
   */
  shouldSkipGeneratingVar: (keys: string[], value: string | number) => boolean;
  unstable_sxConfig: SxConfig;
  unstable_sx: (props: SxProps) => CSSObject;
  applyStyles: ApplyStyles<DefaultColorScheme | ExtendedColorScheme>;
}

export type SxProps = SystemSxProps<Theme>;

export type SystemProps = SystemSystemProps<Theme>;
