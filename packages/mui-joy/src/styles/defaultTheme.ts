import * as CSS from 'csstype';
import { createTheme as systemCreateTheme, Breakpoints, Spacing, CSSObject } from '@mui/system';
import colors from '../colors';
import {
  ColorSystem,
  Palette,
  PaletteText,
  PaletteRange,
  PaletteBackground,
  ColorPaletteProp,
} from './ColorSystem';
import { Variants, DefaultVariantKey, DefaultContextualOverrides } from './Variants';
import {
  createLightModeVariantVariables,
  createDarkModeVariantVariables,
  createVariant,
} from './variantUtils';
import { Components } from './components';

type CSSProperties = CSS.Properties<number | string>;

/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */

export interface BorderRadius {
  default: CSSProperties['borderRadius'];
  xs: CSSProperties['borderRadius'];
  sm: CSSProperties['borderRadius'];
  md: CSSProperties['borderRadius'];
  lg: CSSProperties['borderRadius'];
  xl: CSSProperties['borderRadius'];
}

export interface Elevation {
  xs: CSSProperties['boxShadow'];
  sm: CSSProperties['boxShadow'];
  md: CSSProperties['boxShadow'];
  lg: CSSProperties['boxShadow'];
  xl: CSSProperties['boxShadow'];
}

export interface Focus {
  default: CSSObject;
}

export interface FontSize {
  default: CSSProperties['fontSize'];
  xs: CSSProperties['fontSize'];
  sm: CSSProperties['fontSize'];
  md: CSSProperties['fontSize'];
  lg: CSSProperties['fontSize'];
  xl: CSSProperties['fontSize'];
  xl2: CSSProperties['fontSize'];
  xl3: CSSProperties['fontSize'];
  xl4: CSSProperties['fontSize'];
  xl5: CSSProperties['fontSize'];
  xl6: CSSProperties['fontSize'];
}

export interface FontFamily {
  default: CSSProperties['fontFamily'];
  display: CSSProperties['fontFamily'];
  code: CSSProperties['fontFamily'];
  fallback: CSSProperties['fontFamily'];
}

export interface FontWeight {
  // add string to support css variable value.
  default: CSSProperties['fontWeight'];
  xs: CSSProperties['fontWeight'];
  sm: CSSProperties['fontWeight'];
  md: CSSProperties['fontWeight'];
  lg: CSSProperties['fontWeight'];
  xl: CSSProperties['fontWeight'];
}

export interface LineHeight {
  default: CSSProperties['lineHeight'];
  sm: CSSProperties['lineHeight'];
  md: CSSProperties['lineHeight'];
  lg: CSSProperties['lineHeight'];
}

export interface LetterSpacing {
  default: CSSProperties['letterSpacing'];
  sm: CSSProperties['letterSpacing'];
  md: CSSProperties['letterSpacing'];
  lg: CSSProperties['letterSpacing'];
}

export interface TypographySystem {
  h1: CSSObject;
  h2: CSSObject;
  h3: CSSObject;
  h4: CSSObject;
  h5: CSSObject;
  h6: CSSObject;
  body1: CSSObject;
  body2: CSSObject;
  body3: CSSObject;
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
    background: Pick<PaletteBackground, 'default' | 'level1' | 'level2' | 'level3'>;
    focusVisible: Palette['focusVisible'];
  };
  borderRadius: Pick<BorderRadius, 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  elevationRing: CSSProperties['boxShadow'];
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
    Record<DefaultContextualOverrides, Record<Exclude<ColorPaletteProp, 'context'>, CSSObject>>;
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
    background: {
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
    background: {
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
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl2)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    h4: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    h5: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-lg)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    h6: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-md)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    body1: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-default)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    body2: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-sm)',
      lineHeight: 'var(--joy-lineHeight-md)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-secondary)',
    },
    body3: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
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
  components?: Components;
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
