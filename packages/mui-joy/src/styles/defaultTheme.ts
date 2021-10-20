import * as React from 'react';
import colors from '../colors';

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

export interface Typography {
  fontFamily: React.CSSProperties['fontFamily'];
  fontWeight: React.CSSProperties['fontWeight'];
  fontSize: React.CSSProperties['fontSize'];
  lineHeight: React.CSSProperties['lineHeight'];
  color?: React.CSSProperties['color'];
}

export interface JoyColorSystems {
  palette: {
    brand: PaletteRange;
    highlight: PaletteRange;
  };
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
}

export interface FontFamily {
  sans: React.CSSProperties['fontFamily'];
  mono: React.CSSProperties['fontFamily'];
}

export interface FontWeight {
  regular: React.CSSProperties['fontWeight'];
  medium: React.CSSProperties['fontWeight'];
  bold: React.CSSProperties['fontWeight'];
}

export interface LineHeight {
  xs: React.CSSProperties['lineHeight'];
  sm: React.CSSProperties['lineHeight'];
  md: React.CSSProperties['lineHeight'];
  lg: React.CSSProperties['lineHeight'];
  xl: React.CSSProperties['lineHeight'];
}

export interface TypographySystems {
  body: (vars: JoyTheme['vars']) => Typography;
}

export interface BaseStaticTheme {
  borderRadius: BorderRadius;
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  typography: TypographySystems;
}

export interface StaticTheme extends BaseStaticTheme, JoyColorSystems {}

const staticThemeWithoutVars: StaticTheme = {
  palette: {
    brand: colors.blue,
    highlight: colors.gray,
  },
  borderRadius: {
    md: 4,
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },
  fontFamily: {
    sans: 'IBM Plex Sans',
    mono: 'Consolas',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    xs: 1,
    sm: 1.43,
    md: 1.5,
    lg: 1.75,
    xl: 2,
  },
  typography: {
    body: (vars) => ({
      fontFamily: vars.fontFamily.sans,
      fontWeight: vars.fontWeight.regular,
      fontSize: vars.fontSize.md,
      lineHeight: vars.lineHeight.md,
    }),
  },
};

export interface JoyTheme extends StaticTheme {
  vars: StaticTheme;
}

const defaultTheme: JoyTheme = {
  ...staticThemeWithoutVars,
  vars: staticThemeWithoutVars,
};

export default defaultTheme;
