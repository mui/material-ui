import { OverridableStringUnion } from '@mui/types';
import {
  Breakpoints,
  Spacing,
  SxProps as SystemSxProps,
  SystemProps as SystemSystemProps,
  CSSObject,
  SxConfig,
} from '@mui/system';
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
  LetterSpacing,
  TypographySystem,
  DefaultFontFamily,
  DefaultFontSize,
  DefaultFontWeight,
  DefaultLineHeight,
  DefaultLetterSpacing,
} from './typography';
import { Variants, ColorInversion, ColorInversionConfig } from './variants';
import { DefaultZIndex, ZIndex } from './zIndex';
import { MergeDefault } from './utils';

type Split<T, K extends keyof T = keyof T> = K extends string | number
  ? { [k in K]: Exclude<T[K], undefined> }
  : never;

type ConcatDeep<T, D extends string = '-'> = T extends Record<string | number, infer V>
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
  letterSpacing: LetterSpacing;
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
    letterSpacing: DefaultLetterSpacing;
    zIndex: DefaultZIndex;
  }
>;

interface ColorSystemVars extends Omit<ColorSystem, 'palette'> {
  palette: Omit<ColorSystem['palette'], 'mode'>;
}
export interface ThemeVars extends ThemeScales, ColorSystemVars {}

export interface ThemeCssVarOverrides {}

/**
 * For providing `sx` autocomplete, e.g. `color`, `bgcolor`, `borderColor`.
 */
export type TextColor =
  | NormalizeVars<Omit<ColorSystem['palette'], 'mode'>, '.'>
  | (string & Record<never, never>);

export type ThemeCssVar = OverridableStringUnion<NormalizeVars<ThemeVars>, ThemeCssVarOverrides>;

export interface Theme extends ThemeScales, RuntimeColorSystem {
  colorSchemes: Record<DefaultColorScheme | ExtendedColorScheme, ColorSystem>;
  focus: Focus;
  typography: TypographySystem;
  variants: Variants;
  colorInversion: ColorInversion;
  colorInversionConfig: ColorInversionConfig;
  spacing: Spacing;
  breakpoints: Breakpoints;
  cssVarPrefix: string;
  vars: ThemeVars;
  getCssVar: (field: ThemeCssVar, ...vars: ThemeCssVar[]) => string;
  getColorSchemeSelector: (colorScheme: DefaultColorScheme | ExtendedColorScheme) => string;
  generateCssVars: (colorScheme?: DefaultColorScheme | ExtendedColorScheme) => {
    css: Record<string, string | number>;
    vars: ThemeVars;
  };
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
}

export type SxProps = SystemSxProps<Theme>;

export type SystemProps = SystemSystemProps<Theme>;
