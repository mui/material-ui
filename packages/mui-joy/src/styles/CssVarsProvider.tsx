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
import { TypographySystem, FontSize } from './types/typography';
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
  [K in keyof T]?: {
    [J in keyof T[K]]?: T[K][J] extends Record<any, any>
      ? {
          [P in keyof T[K][J]]?: T[K][J][P];
        }
      : T[K][J];
  };
};

// Use Partial2Level instead of PartialDeep because nested value type is CSSObject which does not work with PartialDeep.
interface JoyThemeInput extends Partial2Level<ThemeScales> {
  focus?: Partial<Focus>;
  typography?: Partial<TypographySystem>;
  variants?: Partial2Level<Variants>;
  breakpoints?: BreakpointsOptions;
  spacing?: SpacingOptions;
  components?: Components<JoyTheme>;
  colorSchemes?: Partial<
    Record<DefaultColorScheme | ExtendedColorScheme, Partial3Level<ColorSystem>>
  >;
}

const { palette, ...rest } = defaultTheme;

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  DefaultColorScheme | ExtendedColorScheme,
  JoyThemeInput
>({
  theme: {
    ...rest,
    colorSchemes: {
      light: lightColorSystem,
      dark: darkColorSystem,
    },
    components: {
      // TODO: find a way to abstract SvgIcon out of @mui/material
      MuiSvgIcon: {
        defaultProps: {
          fontSize: 'xl',
        },
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const instanceFontSize = ownerState.instanceFontSize as 'inherit' | keyof FontSize;
            return {
              ...(ownerState.fontSize &&
                ownerState.fontSize !== 'inherit' && {
                  fontSize: `var(--Icon-fontSize, ${theme.fontSize[ownerState.fontSize]})`,
                }),
              ...(ownerState.color &&
                ownerState.color !== 'inherit' && {
                  color: theme.vars.palette[ownerState.color].textColor,
                }),
              ...(instanceFontSize &&
                instanceFontSize !== 'inherit' && {
                  '--Icon-fontSize': theme.vars.fontSize[instanceFontSize],
                }),
            };
          },
        },
      },
    } as Components<JoyTheme>,
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
