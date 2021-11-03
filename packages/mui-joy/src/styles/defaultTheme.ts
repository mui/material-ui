import * as React from 'react';
import colors from '../colors';

/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */
export interface PaletteRange {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface PaletteText {
  heading: React.CSSProperties['color'];
  headingIntro: React.CSSProperties['color'];
  content: React.CSSProperties['color'];
  detail: React.CSSProperties['color'];
  overline: React.CSSProperties['color'];
}

export interface PaletteBgNeutral {
  transparency: React.CSSProperties['backgroundColor'];
  plain: React.CSSProperties['backgroundColor'];
}

export interface Palette {
  brand: PaletteRange;
  neutral: PaletteRange;
  text: PaletteText;
  bgNeutral: PaletteBgNeutral;
}

export interface ColorSystems {
  palette: Palette;
}

export interface BorderRadius {
  md: React.CSSProperties['borderRadius'];
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
  light: React.CSSProperties['fontWeight'];
  regular: React.CSSProperties['fontWeight'];
  medium: React.CSSProperties['fontWeight'];
  semiBold: React.CSSProperties['fontWeight'];
  bold: React.CSSProperties['fontWeight'];
  extraBold: React.CSSProperties['fontWeight'];
  black: React.CSSProperties['fontWeight'];
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
  h1: (vars: JoyTheme) => React.CSSProperties;
  h2: (vars: JoyTheme) => React.CSSProperties;
  h3: (vars: JoyTheme) => React.CSSProperties;
  h4: (vars: JoyTheme) => React.CSSProperties;
  h5: (vars: JoyTheme) => React.CSSProperties;
  headingSubtitle: (vars: JoyTheme) => React.CSSProperties;
  body: (vars: JoyTheme) => React.CSSProperties;
  caption: (vars: JoyTheme) => React.CSSProperties;
  detail: (vars: JoyTheme) => React.CSSProperties;
  headingIntro: (vars: JoyTheme) => React.CSSProperties;
  overline: (vars: JoyTheme) => React.CSSProperties;
  button: (vars: JoyTheme) => React.CSSProperties;
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
  };
  borderRadius: Pick<BorderRadius, 'md'>;
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

const themeWithoutVars: BaseJoyTokens = {
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
  },
  borderRadius: {
    md: '4px',
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
    sans: 'IBM Plex Sans',
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
    h1: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.bold,
      fontSize: theme.vars.fontSize.xl4,
      lineHeight: theme.vars.lineHeight.sm,
      letterSpacing: theme.vars.letterSpacing.xs,
      textTransform: 'capitalize',
      color: theme.vars.palette.text.heading,
    }),
    h2: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.semiBold,
      fontSize: theme.vars.fontSize.xl3,
      lineHeight: theme.vars.lineHeight.sm,
      letterSpacing: theme.vars.letterSpacing.normal,
      textTransform: 'capitalize',
      color: theme.vars.palette.text.heading,
    }),
    h3: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.regular,
      fontSize: theme.vars.fontSize.xl2,
      lineHeight: theme.vars.lineHeight.sm,
      letterSpacing: theme.vars.letterSpacing.normal,
      textTransform: 'capitalize',
      color: theme.vars.palette.text.heading,
    }),
    h4: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.medium,
      fontSize: theme.vars.fontSize.xl,
      lineHeight: theme.vars.lineHeight.normal,
      letterSpacing: theme.vars.letterSpacing.normal,
      textTransform: 'capitalize',
      color: theme.vars.palette.text.heading,
    }),
    h5: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.regular,
      fontSize: theme.vars.fontSize.lg,
      lineHeight: theme.vars.lineHeight.normal,
      letterSpacing: theme.vars.letterSpacing.normal,
      textTransform: 'capitalize',
      color: theme.vars.palette.text.heading,
    }),
    headingSubtitle: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.regular,
      fontSize: theme.vars.fontSize.lg,
      lineHeight: theme.vars.lineHeight.normal,
      letterSpacing: theme.vars.letterSpacing.normal,
      textTransform: 'capitalize',
      color: theme.vars.palette.text.content,
    }),
    body: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.regular,
      fontSize: theme.vars.fontSize.md,
      lineHeight: theme.vars.lineHeight.normal,
      letterSpacing: theme.vars.letterSpacing.normal,
      textTransform: 'capitalize',
      color: theme.vars.palette.text.content,
    }),
    caption: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.regular,
      fontSize: theme.vars.fontSize.sm,
      lineHeight: theme.vars.lineHeight.normal,
      letterSpacing: theme.vars.letterSpacing.normal,
      textTransform: 'capitalize',
      color: theme.vars.palette.text.content,
    }),
    detail: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.regular,
      fontSize: theme.vars.fontSize.xs,
      lineHeight: theme.vars.lineHeight.normal,
      letterSpacing: theme.vars.letterSpacing.normal,
      textTransform: 'capitalize',
      color: theme.vars.palette.text.detail,
    }),
    headingIntro: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.extraBold,
      fontSize: theme.vars.fontSize.md,
      lineHeight: theme.vars.lineHeight.normal,
      letterSpacing: theme.vars.letterSpacing.lg,
      textTransform: 'uppercase',
      color: theme.vars.palette.text.headingIntro,
    }),
    overline: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.extraBold,
      fontSize: theme.vars.fontSize.xs,
      lineHeight: theme.vars.lineHeight.normal,
      letterSpacing: theme.vars.letterSpacing.lg,
      textTransform: 'uppercase',
      color: theme.vars.palette.text.overline,
    }),
    button: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.bold,
      fontSize: theme.vars.fontSize.md,
      lineHeight: theme.vars.lineHeight.normal,
      letterSpacing: theme.vars.letterSpacing.normal,
      textTransform: 'capitalize',
    }),
  },
  shadow: {
    ring: '0 0 0 0 rgba(0,0,0,0)',
    md: 'var(--shadows-ring), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
};

// ---------------------------------------------------------------

export interface JoyTheme extends ThemeWithoutVars {
  vars: ThemeWithoutVars;
}

const defaultTheme = {
  ...themeWithoutVars,
  vars: themeWithoutVars,
} as JoyTheme;

export default defaultTheme;
