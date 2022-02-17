import { deepmerge } from '@mui/utils';
import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  BreakpointsOptions,
  SpacingOptions,
} from '@mui/system';
import defaultTheme, {
  lightColorSystem,
  darkColorSystem,
  Focus,
  ThemeScales,
  JoyTheme,
} from './defaultTheme';
import { DefaultColorScheme, ExtendedColorScheme } from './types/colorScheme';
import { Variants } from './types/variants';
import { ColorSystem } from './types/colorSystem';
import { TypographySystem } from './types/typography';
import { Components } from './components';
import { createVariant, createTextOverrides, createContainedOverrides } from './variantUtils';

type Partial2Level<T> = {
  [K in keyof T]?: T[K] extends Record<any, any>
    ? {
        [J in keyof T[K]]?: T[K][J];
      }
    : T[K];
};

type Partial3Level<T> = {
  [K in keyof T]?: T[K] extends Record<any, any>
    ? {
        [J in keyof T[K]]?: T[K][J] extends Record<any, any>
          ? {
              [P in keyof T[K][J]]?: T[K][J][P];
            }
          : T[K][J];
      }
    : T[K];
};

// Use Partial2Level instead of PartialDeep because nested value type is CSSObject which does not work with PartialDeep.
interface ThemeInput extends Partial2Level<ThemeScales> {
  focus?: Partial<Focus>;
  typography?: TypographySystem;
  variants?: Partial2Level<Variants>;
  breakpoints?: BreakpointsOptions;
  spacing?: SpacingOptions;
  components?: Components<JoyTheme>;
}

interface JoyThemeInput extends ThemeInput {
  colorSchemes: Record<DefaultColorScheme, Partial3Level<ColorSystem>>;
}

interface ApplicationThemeInput extends ThemeInput {
  colorSchemes: Record<ExtendedColorScheme, Partial3Level<ColorSystem>>;
}

const { palette, ...rest } = defaultTheme;

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  JoyThemeInput,
  DefaultColorScheme,
  ApplicationThemeInput,
  ExtendedColorScheme
>({
  theme: {
    ...rest,
    colorSchemes: {
      light: lightColorSystem as ColorSystem,
      dark: darkColorSystem as ColorSystem,
    },
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'joy',
  resolveTheme: (mergedTheme: JoyTheme) => {
    mergedTheme.variants = deepmerge(
      {
        text: createVariant('text', mergedTheme),
        textHover: createVariant('textHover', mergedTheme),
        textActive: createVariant('textActive', mergedTheme),
        textDisabled: createVariant('textDisabled', mergedTheme),
        outlined: createVariant('outlined', mergedTheme),
        outlinedHover: createVariant('outlinedHover', mergedTheme),
        outlinedActive: createVariant('outlinedActive', mergedTheme),
        outlinedDisabled: createVariant('outlinedDisabled', mergedTheme),
        light: createVariant('light', mergedTheme),
        lightHover: createVariant('lightHover', mergedTheme),
        lightActive: createVariant('lightActive', mergedTheme),
        lightDisabled: createVariant('lightDisabled', mergedTheme),
        contained: createVariant('contained', mergedTheme),
        containedHover: createVariant('containedHover', mergedTheme),
        containedActive: createVariant('containedActive', mergedTheme),
        containedDisabled: createVariant('containedDisabled', mergedTheme),

        // variant overrides
        textOverrides: createTextOverrides(mergedTheme),
        outlinedOverrides: createTextOverrides(mergedTheme),
        lightOverrides: createTextOverrides(mergedTheme),
        containedOverrides: createContainedOverrides(mergedTheme),
      } as typeof mergedTheme.variants,
      mergedTheme.variants,
      { clone: false },
    );
    return mergedTheme;
  },
  shouldSkipGeneratingVar: (keys) =>
    keys[0] === 'typography' ||
    keys[0] === 'variants' ||
    keys[0] === 'focus' ||
    keys[0] === 'breakpoints',
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
