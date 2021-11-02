import * as React from 'react';
import colors from '../colors';
import { ColorSystems, PaletteRange } from './ColorSystem';
import { Components } from './components';

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
  body: (theme: JoyTheme) => React.CSSProperties;
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
  };
  borderRadius: Pick<BorderRadius, 'md'>;
  htmlFontSize: React.CSSProperties['fontSize'];
  fontSize: Pick<FontSize, 'md'>;
  fontFamily: Pick<FontFamily, 'sans' | 'mono'>;
  fontWeight: Pick<FontWeight, 'regular'>;
  lineHeight: Pick<LineHeight, 'normal'>;
  typography: Pick<TypographySystems, 'body'>;
  shadow: Pick<Shadow, 'ring' | 'md'>;
};

const themeWithoutVars: BaseJoyTokens = {
  palette: {
    brand: colors.blue,
    neutral: colors.grey,
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
};

// ---------------------------------------------------------------

export interface JoyTheme extends ThemeWithoutVars {
  vars: ThemeWithoutVars;
  components?: Components;
}

const defaultTheme = {
  ...themeWithoutVars,
  vars: themeWithoutVars,
} as JoyTheme;

export default defaultTheme;
