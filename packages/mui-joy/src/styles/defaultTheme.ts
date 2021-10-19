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
  fontFamily: string;
  fontWeight: string | number;
  fontSize: string | number;
  lineHeight: string | number;
  color?: string;
}

export interface JoyColorSystems {
  palette: {
    brand: PaletteRange;
    highlight: PaletteRange;
  };
}

export interface BorderRadius {
  md: string | number;
}

export interface FontSize {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface FontFamily {
  sans: string;
  mono: string;
}

export interface FontWeight {
  regular: string | number;
  medium: string | number;
  bold: string | number;
}

export interface LineHeight {
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
}

export interface TypographySystems {
  body: (theme: DefaultTheme) => Typography;
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
    regular: 500,
    medium: 600,
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
    body: (theme) => ({
      fontFamily: theme.vars.fontFamily.sans,
      fontWeight: theme.vars.fontWeight.medium,
      fontSize: theme.vars.fontSize.md,
      lineHeight: theme.vars.lineHeight.md,
    }),
  },
};

export interface DefaultTheme extends StaticTheme {
  vars: StaticTheme;
}

const defaultTheme: DefaultTheme = {
  ...staticThemeWithoutVars,
  vars: staticThemeWithoutVars,
};

export default defaultTheme;
