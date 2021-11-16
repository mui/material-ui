import * as React from 'react';
import colors from '../colors';
import { ColorSystems, Palette, PaletteRange, PaletteText, PaletteBgNeutral } from './ColorSystem';
import { Variant, DefaultVariantKey } from './Variant';

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
  elevation: Elevation;
  focus: Focus;
  htmlFontSize: React.CSSProperties['fontSize'];
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  typography: TypographySystems;
  variant: Variant;
}

export interface ThemeWithoutVars extends StaticTheme, ColorSystems {}

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
  | 'filledColor'
  | 'filledBg'
  | 'filledHoverBg'
  | 'filledActiveBg'
  | 'filledDisabledColor'
  | 'filledDisabledBg'
  | 'containedColor'
  | 'containedBg'
  | 'containedHoverBg'
  | 'containedActiveBg'
  | 'containedDisabledBg';
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
  variant: Pick<Variant, DefaultVariantKey>;
};

export const lightColorSystem: Pick<BaseJoyTokens, 'palette' | 'elevationRing'> = {
  palette: {
    brand: {
      ...colors.purple,
      textColor: 'var(--joy-palette-brand-600)',
      textHoverBg: 'var(--joy-palette-neutral-100)',
      textActiveBg: 'var(--joy-palette-neutral-200)',
      textDisabledColor: 'var(--joy-palette-neutral-300)',

      outlinedColor: 'var(--joy-palette-brand-600)',
      outlinedBorder: 'var(--joy-palette-neutral-300)',
      outlinedHoverBg: 'var(--joy-palette-neutral-100)',
      outlinedHoverBorder: 'var(--joy-palette-neutral-400)',
      outlinedActiveBg: 'var(--joy-palette-neutral-200)',
      outlinedDisabledColor: 'var(--joy-palette-neutral-300)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-200)',

      filledColor: 'var(--joy-palette-brand-700)',
      filledBg: 'var(--joy-palette-brand-100)',
      filledHoverBg: 'var(--joy-palette-brand-200)',
      filledActiveBg: 'var(--joy-palette-brand-300)',
      filledDisabledColor: 'var(--joy-palette-brand-400)',
      filledDisabledBg: 'var(--joy-palette-brand-50)',

      containedColor: '#fff',
      containedBg: 'var(--joy-palette-brand-500)',
      containedHoverBg: 'var(--joy-palette-brand-600)',
      containedActiveBg: 'var(--joy-palette-brand-400)',
      containedDisabledBg: 'var(--joy-palette-brand-300)',
    },
    neutral: {
      ...colors.grey,
      textColor: 'var(--joy-palette-neutral-600)',
      textHoverBg: 'var(--joy-palette-neutral-100)',
      textActiveBg: 'var(--joy-palette-neutral-200)',
      textDisabledColor: 'var(--joy-palette-neutral-300)',

      outlinedColor: 'var(--joy-palette-neutral-600)',
      outlinedBorder: 'var(--joy-palette-neutral-100)',
      outlinedHoverBg: 'var(--joy-palette-neutral-100)',
      outlinedHoverBorder: 'var(--joy-palette-neutral-300)',
      outlinedActiveBg: 'var(--joy-palette-neutral-200)',
      outlinedDisabledColor: 'var(--joy-palette-neutral-300)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-200)',

      filledColor: 'var(--joy-palette-neutral-700)',
      filledBg: 'var(--joy-palette-neutral-100)',
      filledHoverBg: 'var(--joy-palette-neutral-200)',
      filledActiveBg: 'var(--joy-palette-neutral-300)',
      filledDisabledColor: 'var(--joy-palette-neutral-400)',
      filledDisabledBg: 'var(--joy-palette-neutral-50)',

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
      transparency: 'var(--joy-palette-neutral-50)',
      plain: '#fff',
    },
    focusVisible: 'var(--joy-palette-brand-200)',
  },
  elevationRing: '0 0 #000',
};

export const darkColorSystem: Pick<BaseJoyTokens, 'palette' | 'elevationRing'> = {
  palette: {
    brand: {
      ...colors.purple,
      textColor: 'var(--joy-palette-brand-200)',
      textHoverBg: 'var(--joy-palette-neutral-800)',
      textActiveBg: 'var(--joy-palette-neutral-700)',
      textDisabledColor: 'var(--joy-palette-neutral-500)',

      outlinedColor: 'var(--joy-palette-brand-200)',
      outlinedBorder: 'var(--joy-palette-neutral-700)',
      outlinedHoverBg: 'var(--joy-palette-neutral-800)',
      outlinedHoverBorder: 'var(--joy-palette-neutral-600)',
      outlinedActiveBg: 'var(--joy-palette-neutral-700)',
      outlinedDisabledColor: 'var(--joy-palette-neutral-500)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',

      filledColor: 'var(--joy-palette-brand-300)',
      filledBg: 'var(--joy-palette-brand-800)',
      filledHoverBg: 'var(--joy-palette-brand-700)',
      filledActiveBg: 'var(--joy-palette-brand-600)',
      filledDisabledColor: 'var(--joy-palette-brand-500)',
      filledDisabledBg: 'var(--joy-palette-brand-800)',

      containedColor: '#fff',
      containedBg: 'var(--joy-palette-brand-500)',
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

      outlinedColor: 'var(--joy-palette-neutral-200)',
      outlinedBorder: 'var(--joy-palette-neutral-800)',
      outlinedHoverBg: 'var(--joy-palette-neutral-800)',
      outlinedHoverBorder: 'var(--joy-palette-neutral-600)',
      outlinedActiveBg: 'var(--joy-palette-neutral-700)',
      outlinedDisabledColor: 'var(--joy-palette-neutral-500)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',

      filledColor: 'var(--joy-palette-neutral-200)',
      filledBg: 'var(--joy-palette-neutral-800)',
      filledHoverBg: 'var(--joy-palette-neutral-700)',
      filledActiveBg: 'var(--joy-palette-neutral-600)',
      filledDisabledColor: 'var(--joy-palette-neutral-500)',
      filledDisabledBg: 'var(--joy-palette-neutral-800)',

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
      transparency: 'var(--joy-palette-neutral-800)',
      plain: '#040404',
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
  variant: {
    text: {
      brand: {
        color: 'var(--joy-variant-textColor, var(--joy-palette-brand-textColor))',
      },
      neutral: {
        color: 'var(--joy-variant-textColor, var(--joy-palette-neutral-textColor))',
      },
    },
    textHover: {
      brand: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-variant-textHoverBg, var(--joy-palette-brand-textHoverBg))',
        },
      },
      neutral: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-variant-textHoverBg, var(--joy-palette-neutral-textHoverBg))',
        },
      },
    },
    textActive: {
      brand: {
        '&:active': {
          backgroundColor: 'var(--joy-variant-textActiveBg, var(--joy-palette-brand-textActiveBg))',
        },
      },
      neutral: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-textActiveBg, var(--joy-palette-neutral-textActiveBg))',
        },
      },
    },
    textDisabled: {
      brand: {
        '&.Mui-disabled': {
          color: 'var(--joy-variant-textDisabledColor, var(--joy-palette-brand-textDisabledColor))',
        },
      },
      neutral: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-textDisabledColor, var(--joy-palette-neutral-textDisabledColor))',
        },
      },
    },
    outlined: {
      brand: {
        color: 'var(--joy-variant-outlinedColor, var(--joy-palette-brand-outlinedColor))',
        border: '1px solid',
        borderColor: 'var(--joy-variant-outlinedBorder, var(--joy-palette-brand-outlinedBorder))',
      },
      neutral: {
        color: 'var(--joy-variant-outlinedColor, var(--joy-palette-neutral-outlinedColor))',
        border: '1px solid',
        borderColor: 'var(--joy-variant-outlinedBorder, var(--joy-palette-neutral-outlinedBorder))',
      },
    },
    outlinedHover: {
      brand: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-outlinedHoverBg, var(--joy-palette-brand-outlinedHoverBg))',
        },
      },
      neutral: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-outlinedHoverBg, var(--joy-palette-neutral-outlinedHoverBg))',
        },
      },
    },
    outlinedActive: {
      brand: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-outlinedActiveBg, var(--joy-palette-brand-outlinedActiveBg))',
        },
      },
      neutral: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-outlinedActiveBg, var(--joy-palette-neutral-outlinedActiveBg))',
        },
      },
    },
    outlinedDisabled: {
      brand: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-outlinedDisabledColor, var(--joy-palette-brand-outlinedDisabledColor))',
          borderColor:
            'var(--joy-variant-outlinedDisabledBorder, var(--joy-palette-brand-outlinedDisabledBorder))',
        },
      },
      neutral: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-outlinedDisabledColor, var(--joy-palette-neutral-outlinedDisabledColor))',
          borderColor:
            'var(--joy-variant-outlinedDisabledBorder, var(--joy-palette-neutral-outlinedDisabledBorder))',
        },
      },
    },
    filled: {
      brand: {
        color: 'var(--joy-variant-filledColor, var(--joy-palette-brand-filledColor))',
        backgroundColor: 'var(--joy-variant-filledBg, var(--joy-palette-brand-filledBg))',
      },
      neutral: {
        color: 'var(--joy-variant-filledColor, var(--joy-palette-neutral-filledColor))',
        backgroundColor: 'var(--joy-variant-filledBg, var(--joy-palette-neutral-filledBg))',
      },
    },
    filledHover: {
      brand: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-filledHoverBg, var(--joy-palette-brand-filledHoverBg))',
        },
      },
      neutral: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-filledHoverBg, var(--joy-palette-neutral-filledHoverBg))',
        },
      },
    },
    filledActive: {
      brand: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-filledActiveBg, var(--joy-palette-brand-filledActiveBg))',
        },
      },
      neutral: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-filledActiveBg, var(--joy-palette-neutral-filledActiveBg))',
        },
      },
    },
    filledDisabled: {
      brand: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-filledDisabledColor, var(--joy-palette-brand-filledDisabledColor))',
          backgroundColor:
            'var(--joy-variant-filledDisabledBg, var(--joy-palette-brand-filledDisabledBg))',
        },
      },
      neutral: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-filledDisabledColor, var(--joy-palette-neutral-filledDisabledColor))',
          backgroundColor:
            'var(--joy-variant-filledDisabledBg, var(--joy-palette-neutral-filledDisabledBg))',
        },
      },
    },
    contained: {
      brand: {
        color: 'var(--joy-palette-brand-containedColor)',
        backgroundColor: 'var(--joy-palette-brand-containedBg)',
      },
      neutral: {
        color: 'var(--joy-palette-neutral-containedColor)',
        backgroundColor: 'var(--joy-palette-neutral-containedBg)',
      },
    },
    containedHover: {
      brand: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-brand-containedHoverBg)',
        },
      },
      neutral: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-neutral-containedHoverBg)',
        },
      },
    },
    containedActive: {
      brand: {
        '&:active': {
          backgroundColor: 'var(--joy-palette-brand-containedActiveBg)',
        },
      },
      neutral: {
        '&:active': {
          backgroundColor: 'var(--joy-palette-neutral-containedActiveBg)',
        },
      },
    },
    containedDisabled: {
      brand: {
        '&.Mui-disabled': {
          backgroundColor: 'var(--joy-palette-brand-containedDisabledBg)',
        },
      },
      neutral: {
        '&.Mui-disabled': {
          backgroundColor: 'var(--joy-palette-neutral-containedDisabledBg)',
        },
      },
    },
    containedContext: {
      brand: {
        '[data-mui-color-scheme="light"] &': {
          '--joy-palette-text-heading': '#fff',
          '--joy-palette-text-headingIntro': '#fff',
          '--joy-palette-text-content': '#fff',
          '--joy-palette-text-detail': '#fff',
          '--joy-palette-text-overline': 'var(--joy-palette-brand-200)',

          '--joy-variant-textColor': 'var(--joy-palette-brand-100)',
          '--joy-variant-textBg': 'transparent',
          '--joy-variant-textHoverBg': 'var(--joy-palette-brand-500)',
          '--joy-variant-textActiveBg': 'var(--joy-palette-brand-700)',
          '--joy-variant-outlinedColor': '#fff',
          '--joy-variant-outlinedBorder': 'var(--joy-palette-brand-400)',
          '--joy-variant-outlinedHoverBorder': 'var(--joy-palette-brand-400)',
          '--joy-variant-outlinedBg': 'transparent',
          '--joy-variant-outlinedHoverBg': 'rgba(255, 255, 255, 0.12)',
          '--joy-variant-outlinedActiveBg': 'var(--joy-palette-brand-700)',
          '--joy-variant-filledColor': '#fff',
          '--joy-variant-filledBg': 'rgba(255, 255, 255, 0.2)',
          '--joy-variant-filledHoverBg': 'var(--joy-palette-brand-400)',
          '--joy-variant-filledActiveBg': 'var(--joy-palette-brand-400)',
        },
        '[data-mui-color-scheme="dark"] &': {
          '--joy-variant-textColor': '#fff',
          '--joy-variant-textBg': 'transparent',
          '--joy-variant-textHoverBg': 'var(--joy-palette-brand-400)',
          '--joy-variant-textActiveBg': 'var(--joy-palette-brand-500)',
          '--joy-variant-outlinedColor': '#fff',
          '--joy-variant-outlinedBorder': 'var(--joy-palette-brand-400)',
          '--joy-variant-outlinedHoverBorder': 'var(--joy-palette-brand-400)',
          '--joy-variant-outlinedBg': 'transparent',
          '--joy-variant-outlinedHoverBg': 'rgba(255, 255, 255, 0.12)',
          '--joy-variant-outlinedActiveBg': 'var(--joy-palette-brand-700)',
          '--joy-variant-filledColor': '#fff',
          '--joy-variant-filledBg': 'rgba(255, 255, 255, 0.2)',
          '--joy-variant-filledHoverBg': 'var(--joy-palette-brand-400)',
          '--joy-variant-filledActiveBg': 'var(--joy-palette-brand-400)',
        },
      },
      neutral: {
        '--joy-variant-textColor': 'var(--joy-palette-neutral-100)',
        '--joy-variant-textBg': 'transparent',
        '--joy-variant-textHoverBg': 'var(--joy-palette-neutral-500)',
        '--joy-variant-textActiveBg': 'var(--joy-palette-neutral-700)',
        '--joy-variant-outlinedColor': '#fff',
        '--joy-variant-outlinedBorder': 'var(--joy-palette-neutral-400)',
        '--joy-variant-outlinedHoverBorder': 'var(--joy-palette-neutral-400)',
        '--joy-variant-outlinedBg': 'transparent',
        '--joy-variant-outlinedHoverBg': 'rgba(255, 255, 255, 0.12)',
        '--joy-variant-outlinedActiveBg': 'var(--joy-palette-neutral-700)',
        '--joy-variant-filledColor': '#fff',
        '--joy-variant-filledBg': 'rgba(255, 255, 255, 0.2)',
        '--joy-variant-filledHoverBg': 'var(--joy-palette-neutral-400)',
        '--joy-variant-filledActiveBg': 'var(--joy-palette-neutral-400)',
      },
    },
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
