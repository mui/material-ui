import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  BreakpointsOptions,
  SpacingOptions,
} from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import defaultTheme, {
  ThemeScales,
  ColorScheme,
  lightColorSystem,
  darkColorSystem,
  TypographySystem,
  Focus,
} from './defaultTheme';
import { Variants } from './Variants';
import { ColorSystem } from './ColorSystem';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

type PartialNested<T> = {
  [K in keyof T]?: {
    [J in keyof T[K]]?: T[K][J];
  };
};

export interface ColorSchemeOverrides {}

export type ExtendedColorScheme = OverridableStringUnion<never, ColorSchemeOverrides>;

export type SupportedColorScheme = ColorScheme | ExtendedColorScheme;

// Use PartialNested instead of PartialDeep because nested value type is CSSObject which does not work with PartialDeep.
type ThemeInput = PartialNested<
  ThemeScales & {
    focus: Focus;
    typography: TypographySystem;
    variants: Variants;
  }
> & {
  breakpoints?: BreakpointsOptions;
  spacing?: SpacingOptions;
};

type JoyThemeInput = ThemeInput & {
  colorSchemes: Record<ColorScheme, PartialDeep<ColorSystem>>;
};

type ApplicationThemeInput = ThemeInput & {
  colorSchemes: Record<ExtendedColorScheme, PartialDeep<ColorSystem>>;
};

const { palette, ...rest } = defaultTheme;

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  JoyThemeInput,
  ColorScheme,
  ApplicationThemeInput,
  ExtendedColorScheme
>({
  theme: {
    ...rest,
    colorSchemes: {
      light: lightColorSystem,
      dark: darkColorSystem,
    },
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'joy',
  shouldSkipGeneratingVar: (keys) =>
    keys[0] === 'typography' || keys[0] === 'variants' || keys[0] === 'focus',
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
