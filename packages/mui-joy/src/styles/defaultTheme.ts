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

export const lightColorSystem: Pick<BaseJoyTokens, 'palette'> = {
  palette: {
    brand: {
      ...colors.purple,
      textColor: 'var(--joy-palette-brand-600)',
      textHoverBg: 'var(--joy-palette-neutral-100)',
      textActiveBg: 'var(--joy-palette-neutral-200)',
      textDisabledColor: 'var(--joy-palette-neutral-300)',
      outlinedBorder: 'var(--joy-palette-neutral-300)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-200)',
      filledColor: 'var(--joy-palette-brand-700)',
      filledBg: 'var(--joy-palette-brand-100)',
      filledHoverBg: 'var(--joy-palette-brand-200)',
      filledActiveBg: 'var(--joy-palette-brand-300)',
      filledDisabledColor: 'var(--joy-palette-brand-400)',
      filledDisableBg: 'var(--joy-palette-brand-50)',
      containedColor: '#fff',
      containedBg: 'var(--joy-palette-brand-600)',
      containedHoverBg: 'var(--joy-palette-brand-700)',
      containedActiveBg: 'var(--joy-palette-brand-500)',
      containedDisabledBg: 'var(--joy-palette-brand-300)',
    },
    neutral: {
      ...colors.grey,
      textColor: 'var(--joy-palette-neutral-600)',
      textHoverBg: 'var(--joy-palette-neutral-100)',
      textActiveBg: 'var(--joy-palette-neutral-200)',
      textDisabledColor: 'var(--joy-palette-neutral-300)',
      outlinedBorder: 'var(--joy-palette-neutral-300)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-200)',
      filledColor: 'var(--joy-palette-neutral-700)',
      filledBg: 'var(--joy-palette-neutral-100)',
      filledHoverBg: 'var(--joy-palette-neutral-200)',
      filledActiveBg: 'var(--joy-palette-neutral-300)',
      filledDisabledColor: 'var(--joy-palette-neutral-400)',
      filledDisableBg: 'var(--joy-palette-neutral-50)',
      containedColor: '#fff',
      containedBg: 'var(--joy-palette-neutral-600)',
      containedHoverBg: 'var(--joy-palette-neutral-700)',
      containedActiveBg: 'var(--joy-palette-neutral-500)',
      containedDisabledBg: 'var(--joy-palette-neutral-300)',
    },
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
  variant: {
    text: {
      brand: {
        color: 'var(--joy-variant-brand-textColor, var(--joy-palette-brand-textColor))',
      },
      neutral: {
        color: 'var(--joy-palette-neutral-textColor)',
      },
    },
    textInteractive: {
      brand: {
        color: 'var(--joy-variant-brand-textColor, var(--joy-palette-brand-textColor))',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-brand-textHoverBg, var(--joy-palette-brand-textHoverBg))',
        },
        '&:active': {
          backgroundColor:
            'var(--joy-variant-brand-textActiveBg, var(--joy-palette-brand-textActiveBg))',
        },
        '&.Mui-disabled': {
          color: 'var(--joy-palette-brand-textDisabledColor)',
        },
      },
      neutral: {
        color: 'var(--joy-palette-neutral-textColor)',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-neutral-textHoverBg)',
        },
        '&:active': {
          backgroundColor: 'var(--joy-palette-neutral-textActiveBg)',
        },
        '&.Mui-disabled': {
          color: 'var(--joy-palette-neutral-textDisabledColor)',
        },
      },
    },
    outlined: {
      brand: {
        color: 'var(--joy-variant-brand-outlinedColor, var(--joy-palette-brand-textColor))',
        border: '1px solid',
        borderColor:
          'var(--joy-variant-brand-outlinedBorder, var(--joy-palette-brand-outlinedBorder))',
      },
      neutral: {
        color: 'var(--joy-palette-neutral-textColor)',
        border: '1px solid',
        borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
      },
    },
    outlinedInteractive: {
      brand: {
        color: 'var(--joy-variant-brand-outlinedColor, var(--joy-palette-brand-textColor))',
        border: '1px solid',
        borderColor:
          'var(--joy-variant-brand-outlinedBorder, var(--joy-palette-brand-outlinedBorder))',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-brand-outlinedHoverBg, var(--joy-palette-brand-textHoverBg))',
        },
        '&:active': {
          backgroundColor:
            'var(--joy-variant-brand-outlinedActiveBg, var(--joy-palette-brand-textActiveBg))',
        },
        '&.Mui-disabled': {
          color: 'var(--joy-palette-brand-textDisabledColor)',
          borderColor: 'var(--joy-palette-brand-outlinedDisabledBorder)',
        },
      },
      neutral: {
        color: 'var(--joy-palette-neutral-textColor)',
        border: '1px solid',
        borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-neutral-textHoverBg)',
        },
        '&:active': {
          backgroundColor: 'var(--joy-palette-neutral-textActiveBg)',
        },
        '&.Mui-disabled': {
          color: 'var(--joy-palette-neutral-textDisabledColor)',
          borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
        },
      },
    },
    filled: {
      brand: {
        color: 'var(--joy-variant-brand-filledColor, var(--joy-palette-brand-filledColor))',
        backgroundColor: 'var(--joy-variant-brand-filledBg, var(--joy-palette-brand-filledBg))',
      },
      neutral: {
        color: 'var(--joy-palette-neutral-filledColor)',
        backgroundColor: 'var(--joy-palette-neutral-filledBg)',
      },
    },
    filledInteractive: {
      brand: {
        color: 'var(--joy-variant-brand-filledColor, var(--joy-palette-brand-filledColor))',
        backgroundColor: 'var(--joy-variant-brand-filledBg, var(--joy-palette-brand-filledBg))',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-brand-filledHoverBg, var(--joy-palette-brand-filledHoverBg))',
        },
        '&:active': {
          backgroundColor:
            'var(--joy-variant-brand-filledActiveBg, var(--joy-palette-brand-filledActiveBg))',
        },
        '&.Mui-disabled': {
          color: 'var(--joy-palette-brand-filledDisabledColor)',
          backgroundColor: 'var(--joy-palette-brand-filledDisabledBg)',
        },
      },
      neutral: {
        color: 'var(--joy-palette-neutral-filledColor)',
        backgroundColor: 'var(--joy-palette-neutral-filledBg)',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-neutral-filledHoverBg)',
        },
        '&:active': {
          backgroundColor: 'var(--joy-palette-neutral-filledActiveBg)',
        },
        '&.Mui-disabled': {
          color: 'var(--joy-palette-neutral-filledDisabledColor)',
          backgroundColor: 'var(--joy-palette-neutral-filledDisabledBg)',
        },
      },
    },
    contained: {
      brand: {
        color: 'var(--joy-palette-brand-containedColor)',
        backgroundColor: 'var(--joy-palette-brand-containedBg)',
        '--joy-variant-brand-textColor': '#fff',
        '--joy-variant-brand-textHoverBg': 'var(--joy-palette-brand-600)',
        '--joy-variant-brand-textActiveBg': 'var(--joy-palette-brand-700)',
        '--joy-variant-brand-outlinedColor': '#fff',
        '--joy-variant-brand-outlinedBorder': 'var(--joy-palette-brand-400)',
        '--joy-variant-brand-outlinedHoverBg': 'var(--joy-palette-brand-600)',
        '--joy-variant-brand-outlinedActiveBg': 'var(--joy-palette-brand-700)',
        '--joy-variant-brand-filledColor': '#fff',
        '--joy-variant-brand-filledBg': 'var(--joy-palette-brand-500)',
        '--joy-variant-brand-filledHoverBg': 'var(--joy-palette-brand-500)',
        '--joy-variant-brand-filledActiveBg': 'var(--joy-palette-brand-700)',
      },
      neutral: {
        color: 'var(--joy-palette-neutral-containedColor)',
        backgroundColor: 'var(--joy-palette-neutral-containedBg)',
      },
    },
    containedInteractive: {
      brand: {
        color: 'var(--joy-palette-brand-containedColor)',
        backgroundColor: 'var(--joy-palette-brand-containedBg)',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-brand-containedHoverBg)',
        },
        '&:active': {
          backgroundColor: 'var(--joy-palette-brand-containedActiveBg)',
        },
        '&.Mui-disabled': {
          backgroundColor: 'var(--joy-palette-brand-containedDisabledBg)',
        },
      },
      neutral: {
        color: 'var(--joy-palette-neutral-containedColor)',
        backgroundColor: 'var(--joy-palette-neutral-containedBg)',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-neutral-containedHoverBg)',
        },
        '&:active': {
          backgroundColor: 'var(--joy-palette-neutral-containedActiveBg)',
        },
        '&.Mui-disabled': {
          backgroundColor: 'var(--joy-palette-neutral-containedDisabledBg)',
        },
      },
    },
  },
};

export const darkColorSystem: Pick<BaseJoyTokens, 'palette'> = {
  palette: {
    brand: {
      ...colors.purple,
      textColor: 'var(--joy-palette-brand-200)',
      textHoverBg: 'var(--joy-palette-neutral-800)',
      textActiveBg: 'var(--joy-palette-neutral-700)',
      textDisabledColor: 'var(--joy-palette-neutral-500)',
      outlinedBorder: 'var(--joy-palette-neutral-700)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',
      filledColor: 'var(--joy-palette-brand-200)',
      filledBg: 'var(--joy-palette-brand-800)',
      filledHoverBg: 'var(--joy-palette-brand-700)',
      filledActiveBg: 'var(--joy-palette-brand-600)',
      filledDisabledColor: 'var(--joy-palette-brand-500)',
      filledDisableBg: 'var(--joy-palette-brand-800)',
      containedColor: '#fff',
      containedBg: 'var(--joy-palette-brand-600)',
      containedHoverBg: 'var(--joy-palette-brand-700)',
      containedActiveBg: 'var(--joy-palette-brand-500)',
      containedDisabledBg: 'var(--joy-palette-brand-300)',
    },
    neutral: {
      ...colors.grey,
      textColor: 'var(--joy-palette-neutral-200)',
      textHoverBg: 'var(--joy-palette-neutral-800)',
      textActiveBg: 'var(--joy-palette-neutral-700)',
      textDisabledColor: 'var(--joy-palette-neutral-500)',
      outlinedBorder: 'var(--joy-palette-neutral-700)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',
      filledColor: 'var(--joy-palette-neutral-200)',
      filledBg: 'var(--joy-palette-neutral-800)',
      filledHoverBg: 'var(--joy-palette-neutral-700)',
      filledActiveBg: 'var(--joy-palette-neutral-600)',
      filledDisabledColor: 'var(--joy-palette-neutral-500)',
      filledDisableBg: 'var(--joy-palette-neutral-800)',
      containedColor: '#fff',
      containedBg: 'var(--joy-palette-neutral-600)',
      containedHoverBg: 'var(--joy-palette-neutral-700)',
      containedActiveBg: 'var(--joy-palette-neutral-500)',
      containedDisabledBg: 'var(--joy-palette-neutral-300)',
    },
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
  },
};

/**
 * Base Joy Theme
 * Any value with `var(--joy-*)` can be used. 'joy-' will be replaced by the application prefix if provided.
 */
const themeWithoutVars: BaseJoyTokens = {
  ...lightColorSystem,
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
    sans: 'Public Sans',
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
    light: {
      palette: themeWithoutVars.palette,
    },
  },
  vars: themeWithoutVars,
} as JoyTheme;

export default defaultTheme;
