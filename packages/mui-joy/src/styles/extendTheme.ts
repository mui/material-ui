import * as CSS from 'csstype';
import { deepmerge } from '@mui/utils';
import {
  BreakpointsOptions,
  SpacingOptions,
  createBreakpoints,
  createSpacing,
  unstable_createGetCssVar as systemCreateGetCssVar,
  colorChannel,
} from '@mui/system';
import colors from '../colors';
import { DefaultColorScheme, ExtendedColorScheme } from './types/colorScheme';
import { ColorSystem, ColorPaletteProp, PaletteRange } from './types/colorSystem';
import { Focus } from './types/focus';
import { TypographySystem } from './types/typography';
import { Variants } from './types/variants';
import { Theme, ThemeCSSVar, ThemeScales } from './types';
import { Components } from './components';

type CSSProperties = CSS.Properties<number | string>;

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

export interface ColorSystemInput extends Partial3Level<ColorSystem> {}

// Use Partial2Level instead of PartialDeep because nested value type is CSSObject which does not work with PartialDeep.
export interface ThemeInput extends Partial2Level<ThemeScales> {
  focus?: Partial<Focus>;
  typography?: Partial<TypographySystem>;
  variants?: Partial2Level<Variants>;
  breakpoints?: BreakpointsOptions;
  spacing?: SpacingOptions;
  components?: Components<Theme>;
  colorSchemes?: Partial<Record<DefaultColorScheme | ExtendedColorScheme, ColorSystemInput>>;
}

export const createGetCssVar = (prefix = 'joy') => systemCreateGetCssVar<ThemeCSSVar>(prefix);

const createLightModeVariantVariables = (color: ColorPaletteProp) => ({
  textColor: `var(--joy-palette-${color}-600)`,
  textHoverBg: `var(--joy-palette-${color}-100)`,
  textActiveBg: `var(--joy-palette-${color}-200)`,
  textDisabledColor: `var(--joy-palette-${color}-200)`,

  outlinedColor: `var(--joy-palette-${color}-600)`,
  outlinedBorder: `var(--joy-palette-${color}-200)`,
  outlinedHoverBg: `var(--joy-palette-${color}-100)`,
  outlinedHoverBorder: `var(--joy-palette-${color}-300)`,
  outlinedActiveBg: `var(--joy-palette-${color}-200)`,
  outlinedDisabledColor: `var(--joy-palette-${color}-200)`,
  outlinedDisabledBorder: `var(--joy-palette-${color}-100)`,

  lightColor: `var(--joy-palette-${color}-700)`,
  lightBg: `var(--joy-palette-${color}-100)`,
  lightHoverBg: `var(--joy-palette-${color}-200)`,
  lightActiveBg: `var(--joy-palette-${color}-300)`,
  lightDisabledColor: `var(--joy-palette-${color}-300)`,
  lightDisabledBg: `var(--joy-palette-${color}-50)`,

  containedColor: '#fff',
  containedBg: `var(--joy-palette-${color}-600)`,
  containedHoverBg: `var(--joy-palette-${color}-700)`,
  containedActiveBg: `var(--joy-palette-${color}-800)`,
  containedDisabledColor: `#fff`,
  containedDisabledBg: `var(--joy-palette-${color}-200)`,

  overrideTextPrimary: `var(--joy-palette-${color}-700)`,
  overrideTextSecondary: `var(--joy-palette-${color}-500)`,
  overrideTextTertiary: `var(--joy-palette-${color}-400)`,
});

const createDarkModeVariantVariables = (color: ColorPaletteProp) => ({
  textColor: `var(--joy-palette-${color}-300)`,
  textHoverBg: `var(--joy-palette-${color}-800)`,
  textActiveBg: `var(--joy-palette-${color}-700)`,
  textDisabledColor: `var(--joy-palette-${color}-800)`,

  outlinedColor: `var(--joy-palette-${color}-200)`,
  outlinedBorder: `var(--joy-palette-${color}-700)`,
  outlinedHoverBg: `var(--joy-palette-${color}-900)`,
  outlinedHoverBorder: `var(--joy-palette-${color}-600)`,
  outlinedActiveBg: `var(--joy-palette-${color}-900)`,
  outlinedDisabledColor: `var(--joy-palette-${color}-800)`,
  outlinedDisabledBorder: `var(--joy-palette-${color}-800)`,

  lightColor: `var(--joy-palette-${color}-200)`,
  lightBg: `var(--joy-palette-${color}-900)`,
  lightHoverBg: `var(--joy-palette-${color}-800)`,
  lightActiveBg: `var(--joy-palette-${color}-700)`,
  lightDisabledColor: `var(--joy-palette-${color}-800)`,
  lightDisabledBg: `var(--joy-palette-${color}-900)`,

  containedColor: `#fff`,
  containedBg: `var(--joy-palette-${color}-600)`,
  containedHoverBg: `var(--joy-palette-${color}-700)`,
  containedActiveBg: `var(--joy-palette-${color}-800)`,
  containedDisabledColor: `#fff`,
  containedDisabledBg: `var(--joy-palette-${color}-300)`,

  overrideTextPrimary: `var(--joy-palette-${color}-200)`,
  overrideTextSecondary: `var(--joy-palette-${color}-400)`,
  overrideTextTertiary: `var(--joy-palette-${color}-500)`,
});

export default function extendTheme(themeInput?: ThemeInput): Theme {
  const { breakpoints, spacing, components, ...scalesInput } = themeInput || {};
  const lightColorSystem = {
    palette: {
      primary: {
        ...colors.blue,
        ...createLightModeVariantVariables('primary'),
      },
      neutral: {
        ...colors.grey,
        textColor: `var(--joy-palette-neutral-700)`,
        textHoverColor: `var(--joy-palette-neutral-900)`,
        textHoverBg: `var(--joy-palette-neutral-100)`,
        textActiveBg: `var(--joy-palette-neutral-200)`,
        textDisabledColor: `var(--joy-palette-neutral-400)`,

        outlinedColor: `var(--joy-palette-neutral-700)`,
        outlinedBorder: `var(--joy-palette-neutral-200)`,
        outlinedHoverColor: `var(--joy-palette-neutral-900)`,
        outlinedHoverBg: `var(--joy-palette-neutral-100)`,
        outlinedHoverBorder: `var(--joy-palette-neutral-300)`,
        outlinedActiveBg: `var(--joy-palette-neutral-200)`,
        outlinedDisabledColor: `var(--joy-palette-neutral-400)`,
        outlinedDisabledBorder: `var(--joy-palette-neutral-100)`,

        lightColor: `var(--joy-palette-neutral-700)`,
        lightBg: `var(--joy-palette-neutral-100)`,
        lightHoverColor: `var(--joy-palette-neutral-900)`,
        lightHoverBg: `var(--joy-palette-neutral-200)`,
        lightActiveBg: `var(--joy-palette-neutral-300)`,
        lightDisabledColor: `var(--joy-palette-neutral-500)`,
        lightDisabledBg: `var(--joy-palette-neutral-50)`,

        containedColor: '#fff',
        containedBg: `var(--joy-palette-neutral-700)`,
        containedHoverBg: `var(--joy-palette-neutral-800)`,
        containedActiveBg: `var(--joy-palette-neutral-700)`,
        containedDisabledColor: `var(--joy-palette-neutral-50)`,
        containedDisabledBg: `var(--joy-palette-neutral-300)`,

        overrideTextPrimary: `var(--joy-palette-neutral-700)`,
        overrideTextSecondary: `var(--joy-palette-neutral-500)`,
        overrideTextTertiary: `var(--joy-palette-neutral-400)`,
      },
      danger: {
        ...colors.red,
        ...createLightModeVariantVariables('danger'),
      },
      info: {
        ...colors.teal,
        ...createLightModeVariantVariables('info'),
      },
      success: {
        ...colors.green,
        ...createLightModeVariantVariables('success'),
      },
      warning: {
        ...colors.yellow,
        ...createLightModeVariantVariables('warning'),
      },
      text: {
        primary: 'var(--joy-palette-neutral-800)',
        secondary: 'var(--joy-palette-neutral-600)',
        tertiary: 'var(--joy-palette-neutral-500)',
      },
      background: {
        body: '#fff',
        level1: 'var(--joy-palette-neutral-50)',
        level2: 'var(--joy-palette-neutral-100)',
        level3: 'var(--joy-palette-neutral-200)',
      },
      divider: 'rgba(0 0 0 / 0.12)',
      focusVisible: 'var(--joy-palette-primary-200)',
    },
    shadowRing: '0 0 #000',
    shadowChannel: '187 187 187',
  };
  const darkColorSystem = {
    palette: {
      primary: {
        ...colors.blue,
        ...createDarkModeVariantVariables('primary'),
      },
      neutral: {
        ...colors.grey,
        textColor: `var(--joy-palette-neutral-200)`,
        textHoverColor: `var(--joy-palette-neutral-50)`,
        textHoverBg: `var(--joy-palette-neutral-800)`,
        textActiveBg: `var(--joy-palette-neutral-700)`,
        textDisabledColor: `var(--joy-palette-neutral-600)`,

        outlinedColor: `var(--joy-palette-neutral-200)`,
        outlinedBorder: `var(--joy-palette-neutral-700)`,
        outlinedHoverColor: `var(--joy-palette-neutral-50)`,
        outlinedHoverBg: `var(--joy-palette-neutral-900)`,
        outlinedHoverBorder: `var(--joy-palette-neutral-600)`,
        outlinedActiveBg: `var(--joy-palette-neutral-900)`,
        outlinedDisabledColor: `var(--joy-palette-neutral-600)`,
        outlinedDisabledBorder: `var(--joy-palette-neutral-800)`,

        lightColor: `var(--joy-palette-neutral-200)`,
        lightBg: `var(--joy-palette-neutral-900)`,
        lightHoverColor: `var(--joy-palette-neutral-50)`,
        lightHoverBg: `var(--joy-palette-neutral-800)`,
        lightActiveBg: `var(--joy-palette-neutral-700)`,
        lightDisabledColor: `var(--joy-palette-neutral-600)`,
        lightDisabledBg: `var(--joy-palette-neutral-900)`,

        containedColor: `#fff`,
        containedBg: `var(--joy-palette-neutral-600)`,
        containedHoverBg: `var(--joy-palette-neutral-700)`,
        containedActiveBg: `var(--joy-palette-neutral-800)`,
        containedDisabledColor: `var(--joy-palette-neutral-400)`,
        containedDisabledBg: `var(--joy-palette-neutral-800)`,

        overrideTextPrimary: `var(--joy-palette-neutral-200)`,
        overrideTextSecondary: `var(--joy-palette-neutral-400)`,
        overrideTextTertiary: `var(--joy-palette-neutral-500)`,
      },
      danger: {
        ...colors.red,
        ...createDarkModeVariantVariables('danger'),
      },
      info: {
        ...colors.teal,
        ...createDarkModeVariantVariables('info'),
      },
      success: {
        ...colors.green,
        ...createDarkModeVariantVariables('success'),
      },
      warning: {
        ...colors.yellow,
        ...createDarkModeVariantVariables('warning'),
      },
      text: {
        primary: 'var(--joy-palette-neutral-100)',
        secondary: 'var(--joy-palette-neutral-300)',
        tertiary: 'var(--joy-palette-neutral-400)',
      },
      background: {
        body: 'var(--joy-palette-neutral-900)',
        level1: 'var(--joy-palette-neutral-800)',
        level2: 'var(--joy-palette-neutral-700)',
        level3: 'var(--joy-palette-neutral-600)',
      },
      divider: 'rgba(255 255 255 / 0.16)',
      focusVisible: 'var(--joy-palette-primary-500)',
    },
    shadowRing: '0 0 #000',
    shadowChannel: '0 0 0',
  };

  const defaultScales = {
    colorSchemes: {
      light: lightColorSystem,
      dark: darkColorSystem,
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xl2: '1.875rem',
      xl3: '2.25rem',
      xl4: '3rem',
      xl5: '3.75rem',
      xl6: '4.5rem',
    },
    fontFamily: {
      body: '"Public Sans", var(--joy-fontFamily-fallback)',
      display: '"Public Sans", var(--joy-fontFamily-fallback)',
      code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
      fallback:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    fontWeight: {
      xs: 200,
      sm: 300,
      md: 500,
      lg: 700,
      xl: 800,
    },
    focus: {
      selector: '&.Mui-focusVisible, &:focus-visible',
      default: {
        outlineOffset: 0, // reset user agent stylesheet
        outline: '4px solid var(--joy-palette-focusVisible)',
      },
    },
    lineHeight: {
      sm: 1.25,
      md: 1.5,
      lg: 1.7,
    },
    letterSpacing: {
      sm: '-0.01em',
      md: '0.083em',
      lg: '0.125em',
    },
    radius: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    shadow: {
      xs: 'var(--joy-shadowRing), 0 1px 2px 0 rgba(var(--joy-shadowChannel) / 0.12)',
      sm: 'var(--joy-shadowRing), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel) / 0.11), 0.5px 1.3px 1.8px -0.6px rgba(var(--joy-shadowChannel) / 0.18), 1.1px 2.7px 3.8px -1.2px rgba(var(--joy-shadowChannel) / 0.26)',
      md: 'var(--joy-shadowRing), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel) / 0.12), 1.1px 2.8px 3.9px -0.4px rgba(var(--joy-shadowChannel) / 0.17), 2.4px 6.1px 8.6px -0.8px rgba(var(--joy-shadowChannel) / 0.23), 5.3px 13.3px 18.8px -1.2px rgba(var(--joy-shadowChannel) / 0.29)',
      lg: 'var(--joy-shadowRing), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel) / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(var(--joy-shadowChannel) / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(var(--joy-shadowChannel) / 0.16), 4.8px 12px 17px -0.5px rgba(var(--joy-shadowChannel) / 0.19), 7px 17.5px 24.7px -0.7px rgba(var(--joy-shadowChannel) / 0.21)',
      xl: 'var(--joy-shadowRing), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel) / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(var(--joy-shadowChannel) / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(var(--joy-shadowChannel) / 0.16), 4.8px 12px 17px -0.5px rgba(var(--joy-shadowChannel) / 0.19), 7px 17.5px 24.7px -0.7px rgba(var(--joy-shadowChannel) / 0.21), 10.2px 25.5px 36px -0.9px rgba(var(--joy-shadowChannel) / 0.24), 14.8px 36.8px 52.1px -1.1px rgba(var(--joy-shadowChannel) / 0.27), 21px 52.3px 74px -1.2px rgba(var(--joy-shadowChannel) / 0.29)',
    },
    typography: {
      h1: {
        fontFamily: 'var(--joy-fontFamily-display)',
        fontWeight: 'var(--joy-fontWeight-lg)' as CSSProperties['fontWeight'],
        fontSize: 'var(--joy-fontSize-xl4)',
        lineHeight: 'var(--joy-lineHeight-sm)',
        letterSpacing: 'var(--joy-letterSpacing-sm)',
        color: 'var(--joy-palette-text-primary)',
      },
      h2: {
        fontFamily: 'var(--joy-fontFamily-display)',
        fontWeight: 'var(--joy-fontWeight-lg)' as CSSProperties['fontWeight'],
        fontSize: 'var(--joy-fontSize-xl3)',
        lineHeight: 'var(--joy-lineHeight-sm)',
        letterSpacing: 'var(--joy-letterSpacing-sm)',
        color: 'var(--joy-palette-text-primary)',
      },
      h3: {
        fontFamily: 'var(--joy-fontFamily-body)',
        fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
        fontSize: 'var(--joy-fontSize-xl2)',
        lineHeight: 'var(--joy-lineHeight-sm)',
        color: 'var(--joy-palette-text-primary)',
      },
      h4: {
        fontFamily: 'var(--joy-fontFamily-body)',
        fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
        fontSize: 'var(--joy-fontSize-xl)',
        lineHeight: 'var(--joy-lineHeight-md)',
        color: 'var(--joy-palette-text-primary)',
      },
      h5: {
        fontFamily: 'var(--joy-fontFamily-body)',
        fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
        fontSize: 'var(--joy-fontSize-lg)',
        lineHeight: 'var(--joy-lineHeight-md)',
        color: 'var(--joy-palette-text-primary)',
      },
      h6: {
        fontFamily: 'var(--joy-fontFamily-body)',
        fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
        fontSize: 'var(--joy-fontSize-md)',
        lineHeight: 'var(--joy-lineHeight-md)',
        color: 'var(--joy-palette-text-primary)',
      },
      body1: {
        fontFamily: 'var(--joy-fontFamily-body)',
        fontSize: 'var(--joy-fontSize-md)',
        lineHeight: 'var(--joy-lineHeight-md)',
        color: 'var(--joy-palette-text-primary)',
      },
      body2: {
        fontFamily: 'var(--joy-fontFamily-body)',
        fontSize: 'var(--joy-fontSize-sm)',
        lineHeight: 'var(--joy-lineHeight-md)',
        color: 'var(--joy-palette-text-secondary)',
      },
      body3: {
        fontFamily: 'var(--joy-fontFamily-body)',
        fontSize: 'var(--joy-fontSize-xs)',
        lineHeight: 'var(--joy-lineHeight-md)',
        color: 'var(--joy-palette-text-tertiary)',
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
    components,
    getCssVar: createGetCssVar('joy'),
    spacing: createSpacing(spacing),
    vars: { ...mergedScales, ...colorSchemes.light }, // dummy vars, (the real `vars` have to be generated by CssVarsProvider)
    variants: {}, // variants will be generated internally based on the selected color scheme.
  } as unknown as Theme; // Need type casting due to module augmentation inside the repo

  /**
   * Color channels generation
   */
  function attachColorChannels(
    palette: Record<Exclude<ColorPaletteProp, 'context'>, PaletteRange>,
  ) {
    (Object.keys(palette) as Array<Exclude<ColorPaletteProp, 'context'>>).forEach((key) => {
      const channelMapping = {
        // Need type casting due to module augmentation inside the repo
        main: '500' as keyof PaletteRange,
        light: '100' as keyof PaletteRange,
        dark: '900' as keyof PaletteRange,
      };
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

  (
    Object.entries(theme.colorSchemes) as Array<
      [string, { palette: Record<Exclude<ColorPaletteProp, 'context'>, PaletteRange> }]
    >
  ).forEach(([, colorSystem]) => {
    attachColorChannels(colorSystem.palette);
  });

  return theme;
}
