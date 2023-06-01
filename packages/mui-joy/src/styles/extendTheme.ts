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
      white: '#FCFCFD',
      black: '#09090B',
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
    plainColor: getCssVarColor(`palette-${color}-500`),
    plainHoverBg: getCssVarColor(`palette-${color}-50`),
    plainActiveBg: getCssVarColor(`palette-${color}-100`),
    plainDisabledColor: getCssVarColor(`palette-${color}-600`),

    outlinedColor: getCssVarColor(`palette-${color}-500`),
    outlinedBorder: getCssVarColor(`palette-${color}-300`),
    outlinedHoverBg: getCssVarColor(`palette-${color}-100`),
    outlinedHoverBorder: getCssVarColor(`palette-${color}-300`),
    outlinedActiveColor: getCssVarColor(`palette-${color}-700`),
    outlinedActiveBg: getCssVarColor(`palette-${color}-200`),
    outlinedActiveBorder: getCssVarColor(`palette-${color}-300`),
    outlinedDisabledColor: getCssVarColor(`palette-neutral-700`),
    outlinedDisabledBorder: getCssVarColor(`palette-${color}-100`),
    
    softColor: getCssVarColor(`palette-${color}-700`),
    softBg: getCssVarColor(`palette-${color}-100`),
    softHoverBg: getCssVarColor(`palette-${color}-200`),
    softActiveColor: getCssVarColor(`palette-${color}-800`),
    softActiveBg: getCssVarColor(`palette-${color}-300`),
    softDisabledColor: getCssVarColor(`palette-neutral-600`),
    softDisabledBg: getCssVarColor(`palette-${color}-50`),

    solidColor: getCssVarColor(`palette-common-white`),
    solidBg: getCssVarColor(`palette-${color}-500`),
    solidHoverBg: getCssVarColor(`palette-${color}-600`),
    solidActiveBg: getCssVarColor(`palette-${color}-700`),
    solidDisabledColor: getCssVarColor(`palette-neutral-600`),
    solidDisabledBg: getCssVarColor(`palette-${color}-50`),
  });

  const createDarkModeVariantVariables = (color: ColorPaletteProp) => ({
    plainColor: getCssVarColor(`palette-${color}-300`),
    plainHoverBg: getCssVarColor(`palette-${color}-800`),
    plainActiveBg: getCssVarColor(`palette-${color}-900`),
    plainDisabledColor: getCssVarColor(`palette-neutral-400`),

    outlinedColor: getCssVarColor(`palette-${color}-200`),
    outlinedBorder: getCssVarColor(`palette-${color}-700`),
    outlinedHoverBg: getCssVarColor(`palette-${color}-800`),
    outlinedHoverBorder: getCssVarColor(`palette-${color}-700`),
    outlinedActiveColor: getCssVarColor(`palette-${color}-300`),
    outlinedActiveBg: getCssVarColor(`palette-${color}-900`),
    outlinedActiveBorder: getCssVarColor(`palette-${color}-700`),
    outlinedDisabledColor: getCssVarColor(`palette-neutral-400`),
    outlinedDisabledBorder: getCssVarColor(`palette-${color}-800`),

    softColor: getCssVarColor(`palette-${color}-200`),
    softBg: getCssVarColor(`palette-${color}-800`),
    softHoverBg: getCssVarColor(`palette-${color}-700`),
    softActiveColor: getCssVarColor(`palette-${color}-100`),
    softActiveBg: getCssVarColor(`palette-${color}-600`),
    softDisabledColor: getCssVarColor(`palette-neutral-400`),
    softDisabledBg: getCssVarColor(`palette-${color}-900`),

    solidColor: getCssVarColor(`palette-common-white`),
    solidBg: getCssVarColor(`palette-${color}-600`),
    solidHoverBg: getCssVarColor(`palette-${color}-700`),
    solidActiveBg: getCssVarColor(`palette-${color}-800`),
    solidDisabledColor: getCssVarColor(`palette-neutral-400`),
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
        ...createLightModeVariantVariables('neutral'),

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

      },
      common: {
        white: '#FCFCFD',
        black: '#09090B',
      },
      text: {
        primary: getCssVarColor('palette-neutral-900'),
        secondary: getCssVarColor('palette-neutral-700'),
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
        backdrop: `rgba(${getCssVar(
          'palette-neutral-darkChannel',
          colorChannel(defaultColors.neutral[900]), // should be the same index as in `attachColorChannels`
        )} / 0.25)`,
      },
      divider: `rgba(${getCssVar(
        'palette-neutral-mainChannel',
        colorChannel(defaultColors.neutral[500]), // should be the same index as in `attachColorChannels`
      )} / 0.16)`,
      focusVisible: getCssVarColor('palette-primary-500'),
    },
    shadowRing: '0 0 #000',
    shadowChannel: '187 187 187'
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
        ...createDarkModeVariantVariables('neutral'),
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

      },
      warning: {
        ...defaultColors.warning,
        ...createDarkModeVariantVariables('warning'),

      },
      common: {
        white: '#FCFCFD',
        black: '#09090B',
      },
      text: {
        primary: getCssVarColor('palette-neutral-50'),
        secondary: getCssVarColor('palette-neutral-200'),
        tertiary: getCssVarColor('palette-neutral-400'),
      },
      background: {
        body: getCssVarColor('palette-common-black'),
        surface: getCssVarColor('palette-common-black'),
        popup: getCssVarColor('palette-common-black'),
        level1: getCssVarColor('palette-neutral-900'),
        level2: getCssVarColor('palette-neutral-800'),
        level3: getCssVarColor('palette-neutral-700'),
        tooltip: getCssVarColor('palette-neutral-600'),
        backdrop: `rgba(${getCssVar(
          'palette-neutral-darkChannel',
          colorChannel(defaultColors.neutral[50]), // should be the same index as in `attachColorChannels`
        )} / 0.25)`,
      },
      divider: `rgba(${getCssVar(
        'palette-neutral-mainChannel',
        colorChannel(defaultColors.neutral[500]), // should be the same index as in `attachColorChannels`
      )} / 0.16)`,
      focusVisible: getCssVarColor('palette-primary-500'),
    },
    shadowRing: '0 0 #000',
    shadowChannel: '0 0 0',
  };

  const fontFamilyFallback =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  const fontFamily = {
    body: `"Inter", ${getCssVar('fontFamily-fallback', fontFamilyFallback)}`,
    display: `"Inter", ${getCssVar('fontFamily-fallback', fontFamilyFallback)}`,
    code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    fallback: fontFamilyFallback,
    ...scalesInput.fontFamily,
  };

  const fontWeight = {
    xs: 300,
    sm: 400,
    md: 500,
    lg: 600,
    xl: 700,
    ...scalesInput.fontWeight,
  };

  const fontSize = {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', //16px
    lg: '1.25rem', // 20px
    xl:'1.5rem', // 24px
    xl2:'2rem', // 32px
    xl3:'2.5rem', // 40px
    xl4:'3.5rem', // 56px
    xl5:'4rem', // 64px

    ...scalesInput.fontSize,
  };

  const lineHeight = {
    xs: '1.5rem',
    sm: '2rem',
    md: '3rem',
    lg: '4rem',
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
      xs: '2px',
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    
    shadow: {
      xs: `${getCssVar(
        'shadowRing',
        scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing,
      )}, 0px 1px 2px 0px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.2)`,


      sm: `${getCssVar(
        'shadowRing',
        scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing,
      )}, 0px 1px 2px 0px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.2), 0px 2px 4px 0px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.2)`,


      md: `${getCssVar(
        'shadowRing',
        scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing,
      )}, 0px 2px 8px -2px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.2), 0px 6px 12px -2px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.2)`,


      lg: `${getCssVar(
        'shadowRing',
        scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing,
      )}, 0px 2px 8px -2px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.2), 0px 12px 16px -4px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.2)`,


      xl: `${getCssVar(
        'shadowRing',
        scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing,
      )}, 0px 2px 8px -2px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.2), 0px 20px 24px -4px rgba(${getCssVar(
        'shadowChannel',
        scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel,
      )} / 0.2)`,      
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
        fontWeight: getCssVar('fontWeight-md', fontWeight.md.toString()),
        fontSize: getCssVar('fontSize-xl5', fontSize.xl5),
        lineHeight: getCssVar('lineHeight-lg', lineHeight.lg.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      h1: {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-lg', fontWeight.lg.toString()),
        fontSize: getCssVar('fontSize-xl3', fontSize.xl3),
        lineHeight: getCssVar('lineHeight-lg', lineHeight.lg.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      h2: {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-lg', fontWeight.lg.toString()),
        fontSize: getCssVar('fontSize-xl2', fontSize.xl2),
        lineHeight: getCssVar('lineHeight-lg', lineHeight.lg.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      h3: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-lg', fontWeight.lg.toString()),
        fontSize: getCssVar('fontSize-xl', fontSize.xl),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      h4: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-sm', fontWeight.sm.toString()),
        fontSize: getCssVar('fontSize-lg', fontSize.lg),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      body1: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-sm', fontWeight.sm.toString()),
        fontSize: getCssVar('fontSize-md', fontSize.md),
        lineHeight: getCssVar('lineHeight-sm', lineHeight.sm.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      body2: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-md', fontWeight.md.toString()),
        fontSize: getCssVar('fontSize-sm', fontSize.sm),
        lineHeight: getCssVar('lineHeight-xs', lineHeight.xs.toString()),
        color: getCssVar('palette-text-secondary', lightColorSystem.palette.text.secondary),
      },
      body3: {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-md', fontWeight.md.toString()),
        fontSize: getCssVar('fontSize-xs', fontSize.xs),
        lineHeight: getCssVar('lineHeight-xs', lineHeight.xs.toString()),
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
