import { deepmerge } from '@mui/utils';
import {
  BreakpointsOptions,
  SpacingOptions,
  createBreakpoints,
  createSpacing,
  colorChannel,
  unstable_prepareCssVars as prepareCssVars,
  unstable_createGetCssVar as systemCreateGetCssVar,
  unstable_styleFunctionSx as styleFunctionSx,
  SxConfig,
} from '@mui/system';
import defaultSxConfig from './sxConfig';
import colors from '../colors';
import defaultShouldSkipGeneratingVar from './shouldSkipGeneratingVar';
import { DefaultColorScheme, ExtendedColorScheme, SupportedColorScheme } from './types/colorScheme';
import { ColorSystem, ColorPaletteProp, Palette, PaletteOptions } from './types/colorSystem';
import { Focus } from './types/focus';
import { TypographySystemOptions, FontSize } from './types/typography';
import { Variants, ColorInversion, ColorInversionConfig } from './types/variants';
import { Theme, ThemeCssVar, ThemeScalesOptions, SxProps, ThemeVars } from './types';
import { Components } from './components';
import { generateUtilityClass } from '../className';
import { createSoftInversion, createSolidInversion, createVariant } from './variantUtils';
import { MergeDefault } from './types/utils';

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

export type ColorSystemOptions = Partial3Level<
  MergeDefault<ColorSystem, { palette: PaletteOptions }>
> & {
  shadowRing?: string;
  shadowChannel?: string;
};

// Use Partial2Level instead of PartialDeep because nested value type is CSSObject which does not work with PartialDeep.
export interface CssVarsThemeOptions extends Partial2Level<ThemeScalesOptions> {
  /**
   * Prefix of the generated CSS variables
   * @default 'joy'
   * @example extendTheme({ cssVarPrefix: 'foo-bar' })
   * // { ..., typography: { body1: { fontSize: 'var(--foo-bar-fontSize-md)' } }, ... }
   *
   * @example <caption>Provides empty string ('') to remove the prefix</caption>
   * extendTheme({ cssVarPrefix: 'foo-bar' })
   * // { ..., typography: { body1: { fontSize: 'var(--fontSize-md)' } }, ... }
   */
  cssVarPrefix?: string;
  focus?: Partial<Focus>;
  typography?: Partial<TypographySystemOptions>;
  variants?: Partial2Level<Variants>;
  colorInversion?:
    | Partial2Level<ColorInversion>
    | ((theme: Theme) => Partial2Level<ColorInversion>);
  colorInversionConfig?: ColorInversionConfig;
  breakpoints?: BreakpointsOptions;
  spacing?: SpacingOptions;
  components?: Components<Theme>;
  colorSchemes?: Partial<Record<DefaultColorScheme | ExtendedColorScheme, ColorSystemOptions>>;
  unstable_sxConfig?: SxConfig;
  /**
   * A function to determine if the key, value should be attached as CSS Variable
   * `keys` is an array that represents the object path keys.
   *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
   *  then, keys = ['foo', 'bar']
   *        value = 'var(--test)'
   */
  shouldSkipGeneratingVar?: (keys: string[], value: string | number) => boolean;
}

export const createGetCssVar = (cssVarPrefix = 'joy') =>
  systemCreateGetCssVar<ThemeCssVar>(cssVarPrefix);

export default function extendTheme(themeOptions?: CssVarsThemeOptions): Theme {
  const {
    cssVarPrefix = 'joy',
    breakpoints,
    spacing,
    components: componentsInput,
    variants: variantsInput,
    colorInversion: colorInversionInput,
    shouldSkipGeneratingVar = defaultShouldSkipGeneratingVar,
    ...scalesInput
  } = themeOptions || {};
  const getCssVar = createGetCssVar(cssVarPrefix);

  const defaultColors = {
    primary: colors.blue,
    neutral: colors.grey,
    danger: colors.red,
    info: colors.purple,
    success: colors.green,
    warning: colors.yellow,
    common: {
      white: '#FFF',
      black: '#09090D',
    },
  };

  const getCssVarColor = (cssVar: string) => {
    const tokens = cssVar.split('-');
    const color = tokens[1];
    const index = tokens[2];

    // @ts-ignore
    return getCssVar(cssVar, defaultColors[color]?.[index]);
  };

  const createLightModeVariantVariables = (color: ColorPaletteProp) => ({
    plainColor: getCssVarColor(`palette-${color}-600`),
    plainHoverBg: getCssVarColor(`palette-${color}-100`),
    plainActiveBg: getCssVarColor(`palette-${color}-200`),
    plainDisabledColor: getCssVarColor(`palette-${color}-200`),

    outlinedColor: getCssVarColor(`palette-${color}-500`),
    outlinedBorder: getCssVarColor(`palette-${color}-200`),
    outlinedHoverBg: getCssVarColor(`palette-${color}-100`),
    outlinedHoverBorder: getCssVarColor(`palette-${color}-300`),
    outlinedActiveBg: getCssVarColor(`palette-${color}-200`),
    outlinedDisabledColor: getCssVarColor(`palette-${color}-100`),
    outlinedDisabledBorder: getCssVarColor(`palette-${color}-100`),

    softColor: getCssVarColor(`palette-${color}-600`),
    softBg: getCssVarColor(`palette-${color}-100`),
    softHoverBg: getCssVarColor(`palette-${color}-200`),
    softActiveBg: getCssVarColor(`palette-${color}-300`),
    softDisabledColor: getCssVarColor(`palette-${color}-300`),
    softDisabledBg: getCssVarColor(`palette-${color}-50`),

    solidColor: '#fff',
    solidBg: getCssVarColor(`palette-${color}-500`),
    solidHoverBg: getCssVarColor(`palette-${color}-600`),
    solidActiveBg: getCssVarColor(`palette-${color}-700`),
    solidDisabledColor: `#fff`,
    solidDisabledBg: getCssVarColor(`palette-${color}-200`),
  });

  const createDarkModeVariantVariables = (color: ColorPaletteProp) => ({
    plainColor: getCssVarColor(`palette-${color}-300`),
    plainHoverBg: getCssVarColor(`palette-${color}-800`),
    plainActiveBg: getCssVarColor(`palette-${color}-700`),
    plainDisabledColor: getCssVarColor(`palette-${color}-800`),

    outlinedColor: getCssVarColor(`palette-${color}-200`),
    outlinedBorder: getCssVarColor(`palette-${color}-700`),
    outlinedHoverBg: getCssVarColor(`palette-${color}-800`),
    outlinedHoverBorder: getCssVarColor(`palette-${color}-600`),
    outlinedActiveBg: getCssVarColor(`palette-${color}-900`),
    outlinedDisabledColor: getCssVarColor(`palette-${color}-800`),
    outlinedDisabledBorder: getCssVarColor(`palette-${color}-800`),

    softColor: getCssVarColor(`palette-${color}-200`),
    softBg: getCssVarColor(`palette-${color}-900`),
    softHoverBg: getCssVarColor(`palette-${color}-800`),
    softActiveBg: getCssVarColor(`palette-${color}-700`),
    softDisabledColor: getCssVarColor(`palette-${color}-800`),
    softDisabledBg: getCssVarColor(`palette-${color}-900`),

    solidColor: `#fff`,
    solidBg: getCssVarColor(`palette-${color}-600`),
    solidHoverBg: getCssVarColor(`palette-${color}-700`),
    solidActiveBg: getCssVarColor(`palette-${color}-800`),
    solidDisabledColor: getCssVarColor(`palette-${color}-700`),
    solidDisabledBg: getCssVarColor(`palette-${color}-900`),
  });

  const lightColorSystem = {
    palette: {
      mode: 'light',
      primary: {
        ...defaultColors.primary,
        ...createLightModeVariantVariables('primary'),
      },
      neutral: {
        ...defaultColors.neutral,
        plainColor: getCssVarColor(`palette-neutral-800`),
        plainHoverColor: getCssVarColor(`palette-neutral-900`),
        plainHoverBg: getCssVarColor(`palette-neutral-100`),
        plainActiveBg: getCssVarColor(`palette-neutral-200`),
        plainDisabledColor: getCssVarColor(`palette-neutral-300`),

        outlinedColor: getCssVarColor(`palette-neutral-800`),
        outlinedBorder: getCssVarColor(`palette-neutral-200`),
        outlinedHoverColor: getCssVarColor(`palette-neutral-900`),
        outlinedHoverBg: getCssVarColor(`palette-neutral-100`),
        outlinedHoverBorder: getCssVarColor(`palette-neutral-300`),
        outlinedActiveBg: getCssVarColor(`palette-neutral-200`),
        outlinedDisabledColor: getCssVarColor(`palette-neutral-300`),
        outlinedDisabledBorder: getCssVarColor(`palette-neutral-100`),

        softColor: getCssVarColor(`palette-neutral-800`),
        softBg: getCssVarColor(`palette-neutral-100`),
        softHoverColor: getCssVarColor(`palette-neutral-900`),
        softHoverBg: getCssVarColor(`palette-neutral-200`),
        softActiveBg: getCssVarColor(`palette-neutral-300`),
        softDisabledColor: getCssVarColor(`palette-neutral-300`),
        softDisabledBg: getCssVarColor(`palette-neutral-50`),
        solidColor: getCssVarColor(`palette-common-white`),
        solidBg: getCssVarColor(`palette-neutral-600`),
        solidHoverBg: getCssVarColor(`palette-neutral-700`),
        solidActiveBg: getCssVarColor(`palette-neutral-800`),
        solidDisabledColor: getCssVarColor(`palette-neutral-300`),
        solidDisabledBg: getCssVarColor(`palette-neutral-50`),
      },
      danger: {
        ...defaultColors.danger,
        ...createLightModeVariantVariables('danger'),
      },
      info: {
        ...defaultColors.info,
        ...createLightModeVariantVariables('info'),
      },
      success: {
        ...defaultColors.success,
        ...createLightModeVariantVariables('success'),
      },
      warning: {
        ...defaultColors.warning,
        ...createLightModeVariantVariables('warning'),
        solidColor: getCssVarColor(`palette-warning-800`),
        solidBg: getCssVarColor(`palette-warning-200`),
        solidHoverBg: getCssVarColor(`palette-warning-300`),
        solidActiveBg: getCssVarColor(`palette-warning-400`),
        solidDisabledColor: getCssVarColor(`palette-warning-200`),
        solidDisabledBg: getCssVarColor(`palette-warning-50`),

        softColor: getCssVarColor(`palette-warning-800`),
        softBg: getCssVarColor(`palette-warning-50`),
        softHoverBg: getCssVarColor(`palette-warning-100`),
        softActiveBg: getCssVarColor(`palette-warning-200`),
        softDisabledColor: getCssVarColor(`palette-warning-200`),
        softDisabledBg: getCssVarColor(`palette-warning-50`),

        outlinedColor: getCssVarColor(`palette-warning-800`),
        outlinedHoverBg: getCssVarColor(`palette-warning-50`),

        plainColor: getCssVarColor(`palette-warning-800`),
        plainHoverBg: getCssVarColor(`palette-warning-50`),
      },
      common: {
        white: '#FFF',
        black: '#09090D',
      },
      text: {
        primary: getCssVarColor('palette-neutral-800'),
        secondary: getCssVarColor('palette-neutral-600'),
        tertiary: getCssVarColor('palette-neutral-500'),
      },
      background: {
        body: getCssVarColor('palette-common-white'),
        surface: getCssVarColor('palette-common-white'),
        popup: getCssVarColor('palette-common-white'),
        level1: getCssVarColor('palette-neutral-50'),
        level2: getCssVarColor('palette-neutral-100'),
        level3: getCssVarColor('palette-neutral-200'),
        tooltip: getCssVarColor('palette-neutral-800'),
        backdrop: 'rgba(255 255 255 / 0.5)',
      },
      divider: `rgba(${getCssVar(
        'palette-neutral-mainChannel',
        colorChannel(defaultColors.neutral[500]), // should be the same index as in `attachColorChannels`
      )} / 0.28)`,
      focusVisible: getCssVarColor('palette-primary-500'),
    },
    shadowRing: '0 0 #000',
    shadowChannel: '187 187 187',
  };
  const darkColorSystem = {
    palette: {
      mode: 'dark',
      primary: {
        ...defaultColors.primary,
        ...createDarkModeVariantVariables('primary'),
      },
      neutral: {
        ...defaultColors.neutral,
        plainColor: getCssVarColor(`palette-neutral-200`),
        plainHoverColor: getCssVarColor(`palette-neutral-50`),
        plainHoverBg: getCssVarColor(`palette-neutral-800`),
        plainActiveBg: getCssVarColor(`palette-neutral-700`),
        plainDisabledColor: getCssVarColor(`palette-neutral-700`),

        outlinedColor: getCssVarColor(`palette-neutral-200`),
        outlinedBorder: getCssVarColor(`palette-neutral-800`),
        outlinedHoverColor: getCssVarColor(`palette-neutral-50`),
        outlinedHoverBg: getCssVarColor(`palette-neutral-800`),
        outlinedHoverBorder: getCssVarColor(`palette-neutral-700`),
        outlinedActiveBg: getCssVarColor(`palette-neutral-800`),
        outlinedDisabledColor: getCssVarColor(`palette-neutral-800`),
        outlinedDisabledBorder: getCssVarColor(`palette-neutral-800`),

        softColor: getCssVarColor(`palette-neutral-200`),
        softBg: getCssVarColor(`palette-neutral-800`),
        softHoverColor: getCssVarColor(`palette-neutral-50`),
        softHoverBg: getCssVarColor(`palette-neutral-700`),
        softActiveBg: getCssVarColor(`palette-neutral-600`),
        softDisabledColor: getCssVarColor(`palette-neutral-700`),
        softDisabledBg: getCssVarColor(`palette-neutral-900`),

        solidColor: getCssVarColor(`palette-common-white`),
        solidBg: getCssVarColor(`palette-neutral-600`),
        solidHoverBg: getCssVarColor(`palette-neutral-700`),
        solidActiveBg: getCssVarColor(`palette-neutral-800`),
        solidDisabledColor: getCssVarColor(`palette-neutral-700`),
        solidDisabledBg: getCssVarColor(`palette-neutral-900`),
      },
      danger: {
        ...defaultColors.danger,
        ...createDarkModeVariantVariables('danger'),
      },
      info: {
        ...defaultColors.info,
        ...createDarkModeVariantVariables('info'),
      },
      success: {
        ...defaultColors.success,
        ...createDarkModeVariantVariables('success'),
        solidColor: '#fff',
        solidBg: getCssVarColor(`palette-success-600`),
        solidHoverBg: getCssVarColor(`palette-success-700`),
        solidActiveBg: getCssVarColor(`palette-success-800`),
      },
      warning: {
        ...defaultColors.warning,
        ...createDarkModeVariantVariables('warning'),
        solidColor: getCssVarColor(`palette-common-black`),
        solidBg: getCssVarColor(`palette-warning-300`),
        solidHoverBg: getCssVarColor(`palette-warning-400`),
        solidActiveBg: getCssVarColor(`palette-warning-500`),
      },
      common: {
        white: '#FFF',
        black: '#09090D',
      },
      text: {
        primary: getCssVarColor('palette-neutral-100'),
        secondary: getCssVarColor('palette-neutral-300'),
        tertiary: getCssVarColor('palette-neutral-400'),
      },
      background: {
        body: getCssVarColor('palette-neutral-900'),
        surface: getCssVarColor('palette-common-black'),
        popup: getCssVarColor('palette-neutral-900'),
        level1: getCssVarColor('palette-neutral-800'),
        level2: getCssVarColor('palette-neutral-700'),
        level3: getCssVarColor('palette-neutral-600'),
        tooltip: getCssVarColor('palette-neutral-600'),
        backdrop: `rgba(${getCssVar(
          'palette-neutral-darkChannel',
          colorChannel(defaultColors.neutral[800]), // should be the same index as in `attachColorChannels`
        )} / 0.5)`,
      },
      divider: `rgba(${getCssVar(
        'palette-neutral-mainChannel',
        colorChannel(defaultColors.neutral[500]), // should be the same index as in `attachColorChannels`
      )} / 0.24)`,
      focusVisible: getCssVarColor('palette-primary-500'),
    },
    shadowRing: '0 0 #000',
    shadowChannel: '0 0 0',
  };

  const fontFamilyFallback =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  const fontFamily = {
    body: `"Public Sans", ${getCssVar('fontFamily-fallback', fontFamilyFallback)}`,
    display: `"Public Sans", ${getCssVar('fontFamily-fallback', fontFamilyFallback)}`,
    code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    fallback: fontFamilyFallback,
    ...scalesInput.fontFamily,
  };

  const fontWeight = {
    xs: 200,
    sm: 300,
    md: 500,
    lg: 600,
    xl: 700,
    xl2: 800,
    xl3: 900,
    ...scalesInput.fontWeight,
  };

  const fontSize = {
    xs3: '0.5rem',
    xs2: '0.625rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xl2: '1.5rem',
    xl3: '1.875rem',
    xl4: '2.25rem',
    xl5: '3rem',
    xl6: '3.75rem',
    xl7: '4.5rem',
    ...scalesInput.fontSize,
  };

  const lineHeight = {
    sm: 1.25,
    md: 1.5,
    lg: 1.7,
    ...scalesInput.lineHeight,
  };

  const letterSpacing = {
    sm: '-0.01em',
    md: '0.083em',
    lg: '0.125em',
    ...scalesInput.letterSpacing,
  };

  const defaultScales = {
    colorSchemes: {
      light: lightColorSystem,
      dark: darkColorSystem,
    },
    fontSize,
    fontFamily,
    fontWeight,
    focus: {
      thickness: '2px',
      selector: `&.${generateUtilityClass('', 'focusVisible')}, &:focus-visible`,
      default: {
        outlineOffset: `var(--focus-outline-offset, ${getCssVar(
          'focus-thickness',
          scalesInput.focus?.thickness ?? '2px',
        )})`,
        outline: `${getCssVar(
          'focus-thickness',
          scalesInput.focus?.thickness ?? '2px',
        )} solid ${getCssVar('palette-focusVisible', defaultColors.primary[500])}`,
      },
    },
    lineHeight,
    letterSpacing,
    radius: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    shadow: {
      xs: `${getCssVar(
        'shadowRing',
        scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing,
      )}, 0 1px 2px 0 rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.12)`,
      sm: `${getCssVar(
        'shadowRing',
        scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing,
      )}, 0.3px 0.8px 1.1px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.11), 0.5px 1.3px 1.8px -0.6px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.18), 1.1px 2.7px 3.8px -1.2px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.26)`,
      md: `${getCssVar(
        'shadowRing',
        scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing,
      )}, 0.3px 0.8px 1.1px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.12), 1.1px 2.8px 3.9px -0.4px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.17), 2.4px 6.1px 8.6px -0.8px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.23), 5.3px 13.3px 18.8px -1.2px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.29)`,
      lg: `${getCssVar(
        'shadowRing',
        scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing,
      )}, 0.3px 0.8px 1.1px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.16), 4.8px 12px 17px -0.5px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.19), 7px 17.5px 24.7px -0.7px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.21)`,
      xl: `${getCssVar(
        'shadowRing',
        scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing,
      )}, 0.3px 0.8px 1.1px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.16), 4.8px 12px 17px -0.5px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.19), 7px 17.5px 24.7px -0.7px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.21), 10.2px 25.5px 36px -0.9px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.24), 14.8px 36.8px 52.1px -1.1px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.27), 21px 52.3px 74px -1.2px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.29)`,
    },
    zIndex: {
      badge: 1,
      table: 10,
      popup: 1000,
      modal: 1300,
      tooltip: 1500,
    },
    typography: {
      display1: {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-xl', fontWeight.xl.toString()),
        fontSize: getCssVar('fontSize-xl7', fontSize.xl7),
        lineHeight: getCssVar('lineHeight-sm', lineHeight.sm.toString()),
        letterSpacing: getCssVar('letterSpacing-sm', letterSpacing.sm),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      display2: {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-xl', fontWeight.xl.toString()),
        fontSize: getCssVar('fontSize-xl6', fontSize.xl6),
        lineHeight: getCssVar('lineHeight-sm', lineHeight.sm.toString()),
        letterSpacing: getCssVar('letterSpacing-sm', letterSpacing.sm),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      h1: {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-lg', fontWeight.lg.toString()),
        fontSize: getCssVar('fontSize-xl5', fontSize.xl5),
        lineHeight: getCssVar('lineHeight-sm', lineHeight.sm.toString()),
        letterSpacing: getCssVar('letterSpacing-sm', letterSpacing.sm),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      h2: {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-lg', fontWeight.lg.toString()),
        fontSize: getCssVar('fontSize-xl4', fontSize.xl4),
        lineHeight: getCssVar('lineHeight-sm', lineHeight.sm.toString()),
        letterSpacing: getCssVar('letterSpacing-sm', letterSpacing.sm),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      h3: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-md', fontWeight.md.toString()),
        fontSize: getCssVar('fontSize-xl3', fontSize.xl3),
        lineHeight: getCssVar('lineHeight-sm', lineHeight.sm.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      h4: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-md', fontWeight.md.toString()),
        fontSize: getCssVar('fontSize-xl2', fontSize.xl2),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      h5: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-md', fontWeight.md.toString()),
        fontSize: getCssVar('fontSize-xl', fontSize.xl),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      h6: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-md', fontWeight.md.toString()),
        fontSize: getCssVar('fontSize-lg', fontSize.lg),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      body1: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontSize: getCssVar('fontSize-md', fontSize.md),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      body2: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontSize: getCssVar('fontSize-sm', fontSize.sm),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-secondary', lightColorSystem.palette.text.secondary),
      },
      body3: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontSize: getCssVar('fontSize-xs', fontSize.xs),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-tertiary', lightColorSystem.palette.text.tertiary),
      },
      body4: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontSize: getCssVar('fontSize-xs2', fontSize.xs2),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-tertiary', lightColorSystem.palette.text.tertiary),
      },
      body5: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontSize: getCssVar('fontSize-xs3', fontSize.xs3),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-tertiary', lightColorSystem.palette.text.tertiary),
      },
    },
  };

  const { colorSchemes, ...mergedScales } = scalesInput
    ? deepmerge(defaultScales, scalesInput)
    : defaultScales;

  const theme = {
    colorSchemes,
    ...mergedScales,
    breakpoints: createBreakpoints(breakpoints ?? {}),
    components: deepmerge(
      {
        // TODO: find a way to abstract SvgIcon out of @mui/material
        MuiSvgIcon: {
          defaultProps: {
            fontSize: 'xl',
          },
          styleOverrides: {
            root: ({ ownerState, theme: themeProp }) => {
              const instanceFontSize = ownerState.instanceFontSize as 'inherit' | keyof FontSize;
              return {
                color: 'var(--Icon-color)',
                margin: 'var(--Icon-margin)',
                ...(ownerState.fontSize &&
                  ownerState.fontSize !== 'inherit' && {
                    fontSize: `var(--Icon-fontSize, ${
                      themeProp.vars.fontSize[ownerState.fontSize]
                    })`,
                  }),
                ...(ownerState.color &&
                  ownerState.color !== 'inherit' &&
                  ownerState.color !== 'context' &&
                  themeProp.vars.palette[ownerState.color!] && {
                    color: `rgba(${themeProp.vars.palette[ownerState.color]?.mainChannel} / 1)`,
                  }),
                ...(ownerState.color === 'context' && {
                  color: themeProp.vars.palette.text.secondary,
                }),
                ...(instanceFontSize &&
                  instanceFontSize !== 'inherit' && {
                    '--Icon-fontSize': themeProp.vars.fontSize[instanceFontSize],
                  }),
              };
            },
          },
        },
      } as Components<Theme>,
      componentsInput,
    ),
    cssVarPrefix,
    getCssVar,
    spacing: createSpacing(spacing),
    colorInversionConfig: {
      soft: ['plain', 'outlined', 'soft', 'solid'],
      solid: ['plain', 'outlined', 'soft', 'solid'],
    },
  } as unknown as Theme; // Need type casting due to module augmentation inside the repo

  /**
   Color channels generation
  */
  function attachColorChannels(
    supportedColorScheme: SupportedColorScheme,
    palette: Pick<Palette, ColorPaletteProp>,
  ) {
    (Object.keys(palette) as Array<ColorPaletteProp>).forEach((key) => {
      const channelMapping = {
        main: '500',
        light: '200',
        dark: '800',
      } as const;
      if (supportedColorScheme === 'dark') {
        // @ts-ignore internal
        channelMapping.main = 400;
      }
      if (!palette[key].mainChannel && palette[key][channelMapping.main]) {
        palette[key].mainChannel = colorChannel(palette[key][channelMapping.main]);
      }
      if (!palette[key].lightChannel && palette[key][channelMapping.light]) {
        palette[key].lightChannel = colorChannel(palette[key][channelMapping.light]);
      }
      if (!palette[key].darkChannel && palette[key][channelMapping.dark]) {
        palette[key].darkChannel = colorChannel(palette[key][channelMapping.dark]);
      }
    });
  }
  // Set the channels
  (
    Object.entries(theme.colorSchemes) as Array<
      [SupportedColorScheme, { palette: Pick<Palette, ColorPaletteProp> }]
    >
  ).forEach(([supportedColorScheme, colorSystem]) => {
    attachColorChannels(supportedColorScheme, colorSystem.palette);
  });

  // ===============================================================
  // Create `theme.vars` that contain `var(--*)` as values
  // ===============================================================
  const parserConfig = {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar,
  };

  const { vars: themeVars, generateCssVars } = prepareCssVars<Theme, ThemeVars>(
    // @ts-ignore property truDark is missing from colorSchemes
    { colorSchemes, ...mergedScales },
    parserConfig,
  );
  theme.vars = themeVars;
  theme.generateCssVars = generateCssVars;
  theme.unstable_sxConfig = {
    ...defaultSxConfig,
    ...themeOptions?.unstable_sxConfig,
  };
  theme.unstable_sx = function sx(props: SxProps) {
    return styleFunctionSx({
      sx: props,
      theme: this,
    });
  };
  theme.getColorSchemeSelector = (colorScheme: SupportedColorScheme) =>
    colorScheme === 'light'
      ? '&'
      : `&[data-joy-color-scheme="${colorScheme}"], [data-joy-color-scheme="${colorScheme}"] &`;

  const createVariantInput = { getCssVar, palette: theme.colorSchemes.light.palette };
  theme.variants = deepmerge(
    {
      plain: createVariant('plain', createVariantInput),
      plainHover: createVariant('plainHover', createVariantInput),
      plainActive: createVariant('plainActive', createVariantInput),
      plainDisabled: createVariant('plainDisabled', createVariantInput),
      outlined: createVariant('outlined', createVariantInput),
      outlinedHover: createVariant('outlinedHover', createVariantInput),
      outlinedActive: createVariant('outlinedActive', createVariantInput),
      outlinedDisabled: createVariant('outlinedDisabled', createVariantInput),
      soft: createVariant('soft', createVariantInput),
      softHover: createVariant('softHover', createVariantInput),
      softActive: createVariant('softActive', createVariantInput),
      softDisabled: createVariant('softDisabled', createVariantInput),
      solid: createVariant('solid', createVariantInput),
      solidHover: createVariant('solidHover', createVariantInput),
      solidActive: createVariant('solidActive', createVariantInput),
      solidDisabled: createVariant('solidDisabled', createVariantInput),
    },
    variantsInput,
  );

  theme.palette = {
    ...theme.colorSchemes.light.palette,
    colorScheme: 'light',
  };

  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar;

  // @ts-ignore if the colorInversion is provided as callbacks, it needs to be resolved in the CssVarsProvider
  theme.colorInversion =
    typeof colorInversionInput === 'function'
      ? colorInversionInput
      : deepmerge(
          {
            soft: createSoftInversion(theme, true),
            solid: createSolidInversion(theme, true),
          },
          colorInversionInput || {},
          { clone: false },
        );

  return theme;
}
