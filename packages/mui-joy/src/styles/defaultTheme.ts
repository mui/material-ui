import * as React from 'react';
import colors from '../colors';
import { ColorSystems, Palette, PaletteRange, PaletteText, PaletteBgNeutral } from './ColorSystem';

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
  sans: React.CSSProperties['fontFamily'];
  mono: React.CSSProperties['fontFamily'];
}

export interface FontWeight {
  // add string to support css variable value.
  light: React.CSSProperties['fontWeight'] | string;
  regular: React.CSSProperties['fontWeight'] | string;
  medium: React.CSSProperties['fontWeight'] | string;
  semiBold: React.CSSProperties['fontWeight'] | string;
  bold: React.CSSProperties['fontWeight'] | string;
  extraBold: React.CSSProperties['fontWeight'] | string;
  black: React.CSSProperties['fontWeight'] | string;
}

export interface LineHeight {
  xs: React.CSSProperties['lineHeight'];
  sm: React.CSSProperties['lineHeight'];
  normal: React.CSSProperties['lineHeight'];
  lg: React.CSSProperties['lineHeight'];
}

export interface LetterSpacing {
  xs: React.CSSProperties['letterSpacing'];
  normal: React.CSSProperties['letterSpacing'];
  lg: React.CSSProperties['letterSpacing'];
}

export interface Shadow {
  ring: React.CSSProperties['boxShadow'];
  md: React.CSSProperties['boxShadow'];
}

export interface TypographySystems {
  h1: React.CSSProperties;
  h2: React.CSSProperties;
  h3: React.CSSProperties;
  h4: React.CSSProperties;
  h5: React.CSSProperties;
  headingSubtitle: React.CSSProperties;
  body: React.CSSProperties;
  caption: React.CSSProperties;
  detail: React.CSSProperties;
  headingIntro: React.CSSProperties;
  overline: React.CSSProperties;
  button: React.CSSProperties;
}

// ---------------------------------------------------------------

export interface StaticTheme {
  borderRadius: BorderRadius;
  htmlFontSize: React.CSSProperties['fontSize'];
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  typography: TypographySystems;
  shadow: Shadow;
}

export interface ThemeWithoutVars extends StaticTheme, ColorSystems {}

/**
 * ==============================================
 * Internal type for definfing default Joy theme.
 * ==============================================
 */
type BasePaletteRange = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type BaseJoyTokens = {
  palette: {
    brand: Pick<PaletteRange, BasePaletteRange>;
    neutral: Pick<PaletteRange, BasePaletteRange>;
    text: Pick<PaletteText, 'heading' | 'headingIntro' | 'content' | 'detail' | 'overline'>;
    bgNeutral: Pick<PaletteBgNeutral, 'plain' | 'transparency'>;
    focusVisible: Palette['focusVisible'];
  };
  borderRadius: Pick<BorderRadius, 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  elevationRing: React.CSSProperties['boxShadow'];
  elevation: Pick<Elevation, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  focus: Pick<Focus, 'default'>;
  htmlFontSize: React.CSSProperties['fontSize'];
  fontSize: Pick<
    FontSize,
    'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl2' | 'xl3' | 'xl4' | 'xl5' | 'xl6'
  >;
  fontFamily: Pick<FontFamily, 'sans' | 'mono'>;
  fontWeight: Pick<
    FontWeight,
    'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold' | 'black'
  >;
  lineHeight: Pick<LineHeight, 'xs' | 'sm' | 'normal' | 'lg'>;
  letterSpacing: Pick<LetterSpacing, 'xs' | 'normal' | 'lg'>;
  typography: Pick<
    TypographySystems,
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'headingSubtitle'
    | 'body'
    | 'caption'
    | 'detail'
    | 'headingIntro'
    | 'button'
    | 'overline'
  >;
  shadow: Pick<Shadow, 'ring' | 'md'>;
};

export const lightColorSystem: Pick<BaseJoyTokens, 'palette' | 'elevationRing'> = {
  palette: {
    brand: colors.purple,
    neutral: colors.grey,
    text: {
      heading: 'var(--joy-palette-neutral-900)',
      headingIntro: 'var(--joy-palette-brand-300)',
      content: 'var(--joy-palette-neutral-600)',
      detail: 'var(--joy-palette-neutral-500)',
      overline: 'var(--joy-palette-neutral-500)',
    },
    bgNeutral: {
      transparency: 'var(--joy-palette-neutral-100)',
      plain: 'var(--joy-palette-neutral-100)',
    },
    focusVisible: 'var(--joy-palette-brand-200)',
  },
  elevationRing: '0 0 #000',
};

export const darkColorSystem: Pick<BaseJoyTokens, 'palette' | 'elevationRing'> = {
  palette: {
    brand: colors.purple,
    neutral: colors.grey,
    text: {
      heading: '#fff',
      headingIntro: 'var(--joy-palette-brand-300)',
      content: 'var(--joy-palette-neutral-200)',
      detail: 'var(--joy-palette-neutral-300)',
      overline: 'var(--joy-palette-neutral-500)',
    },
    bgNeutral: {
      transparency: 'var(--joy-palette-neutral-900)',
      plain: 'var(--joy-palette-neutral-900)',
    },
    focusVisible: 'var(--joy-palette-brand-400)',
  },
  elevationRing: '0 0 #000',
};

/**
 * Base Joy Theme
 * Any value with `var(--joy-*)` can be used. 'joy-' will be replaced by the application prefix if provided.
 */
const themeWithoutVars: BaseJoyTokens = {
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
    xs: 'var(--joy-elevation-ring), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: 'var(--joy-elevation-ring), 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: 'var(--joy-elevation-ring), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: 'var(--joy-elevation-ring), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: 'var(--joy-elevation-ring), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  focus: {
    default: {
      outline: '4px solid',
      outlineColor: 'var(--joy-palette-focusVisible)',
    },
  },
  htmlFontSize: '16px',
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
    sans: '"Public Sans", Roboto',
    mono: 'Consolas',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  lineHeight: {
    xs: 1,
    sm: 1.25,
    normal: 1.5,
    lg: 2,
  },
  letterSpacing: {
    xs: '-0.01em',
    normal: 0,
    lg: '0.1em',
  },
  typography: {
    h1: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-bold)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl4)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-xs)',
      textTransform: 'capitalize',
      color: 'var(--joy-palette-text-heading)',
    },
    h2: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-semiBold)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl3)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      textTransform: 'capitalize',
      color: 'var(--joy-palette-text-heading)',
    },
    h3: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl2)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      textTransform: 'capitalize',
      color: 'var(--joy-palette-text-heading)',
    },
    h4: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-medium)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      textTransform: 'capitalize',
      color: 'var(--joy-palette-text-heading)',
    },
    h5: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-lg)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      textTransform: 'capitalize',
      color: 'var(--joy-palette-text-heading)',
    },
    headingSubtitle: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-lg)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      textTransform: 'capitalize',
      color: 'var(--joy-palette-text-content)',
    },
    body: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-md)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      textTransform: 'capitalize',
      color: 'var(--joy-palette-text-content)',
    },
    caption: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-sm)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      textTransform: 'capitalize',
      color: 'var(--joy-palette-text-content)',
    },
    detail: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xs)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      textTransform: 'capitalize',
      color: 'var(--joy-palette-text-detail)',
    },
    headingIntro: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-extraBold)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-md)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-lg)',
      textTransform: 'uppercase',
      color: 'var(--joy-palette-text-headingIntro)',
    },
    overline: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-extraBold)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xs)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-lg)',
      textTransform: 'uppercase',
      color: 'var(--joy-palette-text-overline)',
    },
    button: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-bold)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-md)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      textTransform: 'capitalize',
    },
  },
  shadow: {
    ring: '0 0 0 0 rgba(0,0,0,0)',
    md: 'var(--shadows-ring), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
};

// ---------------------------------------------------------------

export type ColorScheme = 'light' | 'dark';

export interface JoyTheme<ExtendedColorScheme extends string = never> extends ThemeWithoutVars {
  colorSchemes: Record<ColorScheme | ExtendedColorScheme, ColorSystems>;
  vars: ThemeWithoutVars;
}

const defaultTheme = {
  ...themeWithoutVars,
  colorSchemes: {
    light: lightColorSystem,
    dark: darkColorSystem,
  },
  vars: themeWithoutVars,
} as JoyTheme;

export default defaultTheme;
