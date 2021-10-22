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

export interface Palette {
  brand: PaletteRange;
}

export interface ColorSystems {
  palette: Palette;
}

export interface BorderRadius {
  md: React.CSSProperties['borderRadius'];
}

export interface FontSize {
  md: React.CSSProperties['fontSize'];
}

export interface FontFamily {
  sans: React.CSSProperties['fontFamily'];
  mono: React.CSSProperties['fontFamily'];
}

export interface FontWeight {
  regular: React.CSSProperties['fontWeight'];
}

export interface LineHeight {
  normal: React.CSSProperties['lineHeight'];
}

export interface Shadow {
  ring: React.CSSProperties['boxShadow'];
  md: React.CSSProperties['boxShadow'];
}

export interface TypographySystems {
  body: (vars: JoyTheme) => React.CSSProperties;
}

export interface StaticTheme {
  borderRadius: BorderRadius;
  htmlFontSize: React.CSSProperties['fontSize'];
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  typography: TypographySystems;
  shadow: Shadow;
}

export interface ThemeWithoutVars extends StaticTheme, ColorSystems {}

// @ts-ignore error from module augmentation in .spec.tsx
const themeWithoutVars = {
  palette: {
    brand: colors.blue,
  },
  borderRadius: {
    md: '4px',
  },
  htmlFontSize: '16px',
  fontSize: {
    md: '1rem',
  },
  fontFamily: {
    sans: 'IBM Plex Sans',
    mono: 'Consolas',
  },
  fontWeight: {
    regular: 400,
  },
  lineHeight: {
    normal: 1.5,
  },
  typography: {
    body: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.regular,
      fontSize: theme.vars.fontSize.md,
      lineHeight: theme.vars.lineHeight.normal,
    }),
  },
  shadow: {
    ring: '0 0 0 0 rgba(0,0,0,0)',
    md: 'var(--shadows-ring), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
} as ThemeWithoutVars;

export interface JoyTheme extends ThemeWithoutVars {
  vars: ThemeWithoutVars;
}

const defaultTheme = {
  ...themeWithoutVars,
  vars: themeWithoutVars,
} as JoyTheme;

export default defaultTheme;
