import * as React from 'react';
import { createTheme as systemCreateTheme, Breakpoints, Spacing } from '@mui/system';
import colors from '../colors';
import {
  ColorSystem,
  Palette,
  PaletteText,
  PaletteRange,
  PaletteSurface,
  ColorPaletteProp,
} from './ColorSystem';
import { Variants, DefaultVariantKey, DefaultContextualOverrides } from './Variants';
import {
  createLightModeVariantVariables,
  createDarkModeVariantVariables,
  createVariant,
} from './variantUtils';

/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */

export interface BorderRadius {
  default: React.CSSProperties['borderRadius'];
  xs: React.CSSProperties['borderRadius'];
  sm: React.CSSProperties['borderRadius'];
  md: React.CSSProperties['borderRadius'];
  lg: React.CSSProperties['borderRadius'];
  xl: React.CSSProperties['borderRadius'];
}

export interface Elevation {
  xs: React.CSSProperties['borderRadius'];
  sm: React.CSSProperties['borderRadius'];
  md: React.CSSProperties['borderRadius'];
  lg: React.CSSProperties['borderRadius'];
  xl: React.CSSProperties['borderRadius'];
}

export interface Focus {
  default: React.CSSProperties;
}

export interface FontSize {
  default: React.CSSProperties['fontSize'];
  xs: React.CSSProperties['fontSize'];
  sm: React.CSSProperties['fontSize'];
  md: React.CSSProperties['fontSize'];
  lg: React.CSSProperties['fontSize'];
  xl: React.CSSProperties['fontSize'];
  xl2: React.CSSProperties['fontSize'];
  xl3: React.CSSProperties['fontSize'];
  xl4: React.CSSProperties['fontSize'];
  xl5: React.CSSProperties['fontSize'];
  xl6: React.CSSProperties['fontSize'];
}

export interface FontFamily {
  default: React.CSSProperties['fontFamily'];
  display: React.CSSProperties['fontFamily'];
  code: React.CSSProperties['fontFamily'];
  fallback: React.CSSProperties['fontFamily'];
}

export interface FontWeight {
  // add string to support css variable value.
  default: React.CSSProperties['fontWeight'] | string;
  xs: React.CSSProperties['fontWeight'] | string;
  sm: React.CSSProperties['fontWeight'] | string;
  md: React.CSSProperties['fontWeight'] | string;
  lg: React.CSSProperties['fontWeight'] | string;
  xl: React.CSSProperties['fontWeight'] | string;
}

export interface LineHeight {
  default: React.CSSProperties['lineHeight'];
  sm: React.CSSProperties['lineHeight'];
  md: React.CSSProperties['lineHeight'];
  lg: React.CSSProperties['lineHeight'];
}

export interface LetterSpacing {
  default: React.CSSProperties['letterSpacing'];
  sm: React.CSSProperties['letterSpacing'];
  md: React.CSSProperties['letterSpacing'];
  lg: React.CSSProperties['letterSpacing'];
}

export interface TypographySystem {
  h1: React.CSSProperties;
  h2: React.CSSProperties;
  h3: React.CSSProperties;
  h4: React.CSSProperties;
  h5: React.CSSProperties;
  h6: React.CSSProperties;
  body1: React.CSSProperties;
  body2: React.CSSProperties;
  body3: React.CSSProperties;
}

// ---------------------------------------------------------------

export interface ThemeScales {
  borderRadius: BorderRadius;
  elevation: Elevation;
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
}

/**
 * ==============================================
 * Internal type for definfing default Joy theme.
 * ==============================================
 */
type BasePaletteRange =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 'textColor'
  | 'textHoverBg'
  | 'textActiveBg'
  | 'textDisabledColor'
  | 'outlinedColor'
  | 'outlinedBorder'
  | 'outlinedHoverBg'
  | 'outlinedHoverBorder'
  | 'outlinedActiveBg'
  | 'outlinedDisabledColor'
  | 'outlinedDisabledBorder'
  | 'lightColor'
  | 'lightBg'
  | 'lightHoverBg'
  | 'lightActiveBg'
  | 'lightDisabledColor'
  | 'lightDisabledBg'
  | 'containedColor'
  | 'containedBg'
  | 'containedHoverBg'
  | 'containedActiveBg'
  | 'containedDisabledBg';
type BaseJoyTokens = {
  palette: {
    primary: Pick<PaletteRange, BasePaletteRange>;
    neutral: Pick<PaletteRange, BasePaletteRange>;
    danger: Pick<PaletteRange, BasePaletteRange>;
    info: Pick<PaletteRange, BasePaletteRange>;
    success: Pick<PaletteRange, BasePaletteRange>;
    warning: Pick<PaletteRange, BasePaletteRange>;
    text: Pick<PaletteText, 'primary' | 'secondary' | 'tertiary'>;
    surface: Pick<PaletteSurface, 'default' | 'level1' | 'level2' | 'level3'>;
    focusVisible: Palette['focusVisible'];
  };
  borderRadius: Pick<BorderRadius, 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  elevationRing: React.CSSProperties['boxShadow'];
  elevation: Pick<Elevation, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  focus: Pick<Focus, 'default'>;
  fontSize: Pick<
    FontSize,
    'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl2' | 'xl3' | 'xl4' | 'xl5' | 'xl6'
  >;
  fontFamily: Pick<FontFamily, 'default' | 'display' | 'code' | 'fallback'>;
  fontWeight: Pick<FontWeight, 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  lineHeight: Pick<LineHeight, 'default' | 'sm' | 'md' | 'lg'>;
  letterSpacing: Pick<LetterSpacing, 'default' | 'sm' | 'md' | 'lg'>;
  typography: Pick<
    TypographySystem,
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'body3'
  >;
  variants: Pick<Variants, DefaultVariantKey> &
    Record<DefaultContextualOverrides, Record<Exclude<ColorPaletteProp, 'context'>, object>>;
};

export const lightColorSystem: Pick<BaseJoyTokens, 'palette' | 'elevationRing'> = {
  palette: {
    primary: {
      ...colors.purple,
      ...createLightModeVariantVariables('primary'),
    },
    neutral: {
      ...colors.grey,
      ...createLightModeVariantVariables('neutral'),
    },
    danger: {
      ...colors.red,
      ...createLightModeVariantVariables('danger'),
    },
    info: {
      ...colors.blue,
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
    surface: {
      default: 'var(--joy-palette-neutral-50)',
      level1: '#fff',
      level2: 'var(--joy-palette-neutral-100)',
      level3: 'var(--joy-palette-neutral-200)',
    },
    focusVisible: 'var(--joy-palette-primary-200)',
  },
  elevationRing: '0 0 #000',
};

export const darkColorSystem: Pick<BaseJoyTokens, 'palette' | 'elevationRing'> = {
  palette: {
    primary: {
      ...colors.purple,
      ...createDarkModeVariantVariables('primary'),
    },
    neutral: {
      ...colors.grey,
      ...createDarkModeVariantVariables('neutral'),
    },
    danger: {
      ...colors.red,
      ...createDarkModeVariantVariables('danger'),
    },
    info: {
      ...colors.blue,
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
    surface: {
      default: 'var(--joy-palette-neutral-800)',
      level1: 'var(--joy-palette-neutral-900)',
      level2: 'var(--joy-palette-neutral-700)',
      level3: 'var(--joy-palette-neutral-600)',
    },
    focusVisible: 'var(--joy-palette-primary-400)',
  },
  elevationRing: '0 0 #000',
};

/**
 * Base Joy design tokens
 * Any value with `var(--joy-*)` can be used. 'joy-' will be replaced by the application prefix if provided.
 */
const joyDesignTokens: BaseJoyTokens = {
  ...lightColorSystem,
  borderRadius: {
    default: '28px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '20px',
    xl: '32px',
  },
  elevation: {
    xs: 'var(--joy-elevationRing), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: 'var(--joy-elevationRing), 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: 'var(--joy-elevationRing), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: 'var(--joy-elevationRing), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: 'var(--joy-elevationRing), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  focus: {
    default: {
      outline: '4px solid',
      outlineColor: 'var(--joy-palette-focusVisible)',
    },
  },
  fontSize: {
    default: '1rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1.125rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xl2: '1.875rem',
    xl3: '2.25rem',
    xl4: '3rem',
    xl5: '3.75rem',
    xl6: '4.5rem',
  },
  fontFamily: {
    default: '"Public Sans", var(--joy-fontFamily-fallback)',
    display: '"PlusJakartaSans-ExtraBold", var(--joy-fontFamily-fallback)',
    code: 'Consolas',
    fallback:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  fontWeight: {
    default: 400,
    xs: 200,
    sm: 300,
    md: 500,
    lg: 700,
    xl: 800,
  },
  lineHeight: {
    default: 1.5,
    sm: 1.25,
    md: 1.72,
    lg: 2,
  },
  letterSpacing: {
    default: 0,
    sm: '-0.01em',
    md: '0.083em',
    lg: '0.125em',
  },
  typography: {
    h1: {
      fontFamily: 'var(--joy-fontFamily-display)',
      fontWeight: 'var(--joy-fontWeight-lg)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl4)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-sm)',
      color: 'var(--joy-palette-text-primary)',
    },
    h2: {
      fontFamily: 'var(--joy-fontFamily-display)',
      fontWeight: 'var(--joy-fontWeight-lg)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl3)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-sm)',
      color: 'var(--joy-palette-text-primary)',
    },
    h3: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl2)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    h4: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    h5: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-lg)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    h6: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-md)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    body1: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-default)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    body2: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-sm)',
      lineHeight: 'var(--joy-lineHeight-md)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-secondary)',
    },
    body3: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xs)',
      lineHeight: 'var(--joy-lineHeight-md)',
      letterSpacing: 'var(--joy-letterSpacing-md)',
      color: 'var(--joy-palette-text-tertiary)',
    },
  },
  variants: {
    text: createVariant('text'),
    textHover: createVariant('textHover'),
    textActive: createVariant('textActive'),
    textDisabled: createVariant('textDisabled'),
    outlined: createVariant('outlined'),
    outlinedHover: createVariant('outlinedHover'),
    outlinedActive: createVariant('outlinedActive'),
    outlinedDisabled: createVariant('outlinedDisabled'),
    light: createVariant('light'),
    lightHover: createVariant('lightHover'),
    lightActive: createVariant('lightActive'),
    lightDisabled: createVariant('lightDisabled'),
    contained: createVariant('contained'),
    containedHover: createVariant('containedHover'),
    containedActive: createVariant('containedActive'),
    containedDisabled: createVariant('containedDisabled'),
    containedOverrides: createVariant('containedOverrides'),
  },
};

// ---------------------------------------------------------------

export type ColorScheme = 'light' | 'dark';

export interface JoyTheme<ExtendedColorScheme extends string = never>
  extends ThemeScales,
    ColorSystem {
  colorSchemes: Record<ColorScheme | ExtendedColorScheme, ColorSystem>;
  focus: Focus;
  typography: TypographySystem;
  variants: Variants;
  spacing: Spacing;
  breakpoints: Breakpoints;
  vars: ThemeScales & ColorSystem;
}

const defaultSystemTheme = systemCreateTheme();

const defaultTheme = {
  ...joyDesignTokens,
  colorSchemes: {
    light: lightColorSystem,
    dark: darkColorSystem,
  },
  vars: joyDesignTokens,
  breakpoints: defaultSystemTheme.breakpoints,
  spacing: defaultSystemTheme.spacing,
} as JoyTheme;

export default defaultTheme;
