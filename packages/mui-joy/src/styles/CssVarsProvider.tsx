import { deepmerge } from '@mui/utils';
import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  unstable_createGetCssVar as createGetCssVar,
  BreakpointsOptions,
  SpacingOptions,
  CSSObject,
} from '@mui/system';
import defaultTheme, {
  lightColorSystem,
  darkColorSystem,
  Focus,
  ThemeScales,
  JoyTheme,
} from './defaultTheme';
import { DefaultColorScheme, ExtendedColorScheme } from './types/colorScheme';
import { Variants, VariantKey } from './types/variants';
import { ColorSystem, DefaultColorPalette } from './types/colorSystem';
import { TypographySystem } from './types/typography';
import { Components } from './components';
import { createVariantStyle, isVariantPalette } from './variantUtils';

type PartialNested<T> = {
  [K in keyof T]?: T[K] extends Record<any, any>
    ? {
        [J in keyof T[K]]?: T[K][J];
      }
    : T[K];
};

type PartialNestedNested<T> = {
  [K in keyof T]?: {
    [J in keyof T[K]]?: T[K][J] extends Record<any, any>
      ? {
          [P in keyof T[K][J]]?: T[K][J][P];
        }
      : T[K][J];
  };
};

// Use PartialNested instead of PartialDeep because nested value type is CSSObject which does not work with PartialDeep.
type ThemeInput = PartialNested<
  ThemeScales & {
    focus: Focus;
    typography: TypographySystem;
    variants: PartialNested<Variants>;
  }
> & {
  breakpoints?: BreakpointsOptions;
  spacing?: SpacingOptions;
  components?: Components<JoyTheme>;
};

type JoyThemeInput = ThemeInput & {
  colorSchemes: Record<DefaultColorScheme, PartialNestedNested<ColorSystem>>;
};

type ApplicationThemeInput = ThemeInput & {
  colorSchemes: Record<ExtendedColorScheme, PartialNestedNested<ColorSystem>>;
};

const createContainedOverrides = (theme: JoyTheme) => {
  const getCssVar = createGetCssVar(theme.prefix);
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result = {
        ...result,
        [color]: {
          [`--${theme.prefix ? `${theme.prefix}-` : ''}palette-text-primary`]: '#fff',
          [`--${theme.prefix ? `${theme.prefix}-` : ''}palette-text-secondary`]: getCssVar(
            `palette-${color}-100`,
          ),
          [`--${theme.prefix ? `${theme.prefix}-` : ''}palette-text-tertiary`]: getCssVar(
            `palette-${color}-200`,
          ),

          '--variant-textColor': getCssVar(`palette-${color}-100`),
          '--variant-textHoverColor': `#fff`,
          '--variant-textHoverBg': `rgba(255 255 255 / 0.12)`,
          '--variant-textActiveBg': `rgba(255 255 255 / 0.2)`,
          '--variant-textDisabledColor': getCssVar(`palette-${color}-300`),

          '--variant-outlinedColor': getCssVar(`palette-${color}-100`),
          '--variant-outlinedBorder': getCssVar(`palette-${color}-300`),
          '--variant-outlinedHoverColor': `#fff`,
          '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-200`),
          '--variant-outlinedHoverBg': `rgba(255 255 255 / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(255 255 255 / 0.2)`,
          '--variant-outlinedDisabledColor': getCssVar(`palette-${color}-300`),
          '--variant-outlinedDisabledBorder': `rgba(255 255 255 / 0.2)`,

          '--variant-lightColor': '#fff',
          '--variant-lightBg': `rgba(255 255 255 / 0.12)`,
          '--variant-lightHoverBg': `rgba(255 255 255 / 0.2)`,
          '--variant-lightActiveBg': `rgba(255 255 255 / 0.08)`,
          '--variant-lightDisabledColor': getCssVar(`palette-${color}-300`),
          '--variant-lightDisabledBg': `rgba(255 255 255 / 0.08)`,
        },
      };
    }
  });
  return result;
};

const createVariant = (variant: VariantKey, theme: JoyTheme) => {
  let result = {} as Record<DefaultColorPalette | 'context', CSSObject>;

  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      Exclude<DefaultColorPalette, 'context'>,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result = {
        ...result,
        [color]: createVariantStyle(
          variant,
          // cannot use theme.vars because it is created from all color schemes.
          // @example developer provides `primary.outlinedActiveBorder` to only dark mode.
          //          theme.vars.palette.primary.outlinedActiveBorder always exists regardless of the current color scheme.
          theme.palette[color],
          (variantVar) => theme.vars.palette[color][variantVar],
        ),
      };
    }
  });

  result.context = createVariantStyle(variant, {
    textColor: 'var(--variant-textColor)',
    textHoverColor: `var(--variant-textHoverColor)`,
    textHoverBg: 'var(--variant-textHoverBg)',
    textActiveBg: 'var(--variant-textActiveBg)',
    textDisabledColor: 'var(--variant-textDisabledColor)',

    outlinedColor: 'var(--variant-outlinedColor)',
    outlinedBorder: 'var(--variant-outlinedBorder)',
    outlinedHoverColor: `var(--variant-outlinedHoverColor)`,
    outlinedHoverBorder: `var(--variant-outlinedHoverBorder)`,
    outlinedHoverBg: `var(--variant-outlinedHoverBg)`,
    outlinedActiveBg: `var(--variant-outlinedActiveBg)`,
    outlinedDisabledColor: `var(--variant-outlinedDisabledColor)`,
    outlinedDisabledBorder: `var(--variant-outlinedDisabledBorder)`,

    lightColor: 'var(--variant-lightColor)',
    lightBg: 'var(--variant-lightBg)',
    lightHoverColor: 'var(--variant-lightHoverColor)',
    lightHoverBg: 'var(--variant-lightHoverBg)',
    lightActiveBg: 'var(--variant-lightActiveBg)',
    lightDisabledColor: 'var(--variant-lightDisabledColor)',
    lightDisabledBg: 'var(--variant-lightDisabledBg)',
  });
  return result;
};

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
      light: lightColorSystem,
      dark: darkColorSystem,
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
