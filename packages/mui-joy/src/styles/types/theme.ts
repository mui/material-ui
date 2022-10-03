import { OverridableStringUnion } from '@mui/types';
import {
  Breakpoints,
  Spacing,
  SxProps as SystemSxProps,
  SystemProps as SystemSystemProps,
} from '@mui/system';
import { DefaultColorScheme, ExtendedColorScheme } from './colorScheme';
import { ColorSystem } from './colorSystem';
import { Focus } from './focus';
import { Shadow } from './shadow';
import { Radius } from './radius';
import {
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TypographySystem,
} from './typography';
import { Variants, VariantOverrides, VariantOverrideConfig } from './variants';

type Split<T, K extends keyof T = keyof T> = K extends string | number
  ? { [k in K]: Exclude<T[K], undefined> }
  : never;

type ConcatDeep<T> = T extends Record<string | number, infer V>
  ? keyof T extends string | number
    ? V extends string | number
      ? keyof T
      : keyof V extends string | number
      ? `${keyof T}-${ConcatDeep<Split<V>>}`
      : never
    : never
  : never;

/**
 * Does not work for these cases:
 * - { borderRadius: string | number } // the value can't be a union
 * - { shadows: [string, string, ..., string] } // the value can't be an array
 */
type NormalizeVars<T> = ConcatDeep<Split<T>>;

export interface RuntimeColorSystem extends Omit<ColorSystem, 'palette'> {
  palette: ColorSystem['palette'] & {
    mode: 'light' | 'dark';
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
}

export interface ThemeVars extends ThemeScales, ColorSystem {}

export interface ThemeCssVarOverrides {}

export type ThemeCssVar = OverridableStringUnion<NormalizeVars<ThemeVars>, ThemeCssVarOverrides>;

export interface Theme extends ThemeScales, RuntimeColorSystem {
  colorSchemes: Record<DefaultColorScheme | ExtendedColorScheme, ColorSystem>;
  focus: Focus;
  typography: TypographySystem;
  variants: Variants;
  variantOverrides: VariantOverrides;
  variantOverrideConfig: VariantOverrideConfig;
  spacing: Spacing;
  breakpoints: Breakpoints;
  cssVarPrefix: string;
  vars: ThemeVars;
  getCssVar: (field: ThemeCssVar, ...vars: ThemeCssVar[]) => string;
  getColorSchemeSelector: (colorScheme: DefaultColorScheme | ExtendedColorScheme) => string;
}

export type SxProps = SystemSxProps<Theme>;

export type SystemProps = SystemSystemProps<Theme>;
