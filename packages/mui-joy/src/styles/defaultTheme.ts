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
    danger: Pick<PaletteRange, BasePaletteRange>;
    info: Pick<PaletteRange, BasePaletteRange>;
    success: Pick<PaletteRange, BasePaletteRange>;
    warning: Pick<PaletteRange, BasePaletteRange>;
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
      outlinedBorder: 'var(--joy-palette-neutral-200)',
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
    danger: {
      ...colors.red,
      textColor: 'var(--joy-palette-danger-600)',
      textHoverBg: 'var(--joy-palette-danger-100)',
      textActiveBg: 'var(--joy-palette-danger-200)',
      textDisabledColor: 'var(--joy-palette-danger-300)',

      outlinedColor: 'var(--joy-palette-danger-600)',
      outlinedBorder: 'var(--joy-palette-danger-300)',
      outlinedHoverBg: 'var(--joy-palette-danger-100)',
      outlinedHoverBorder: 'var(--joy-palette-danger-400)',
      outlinedActiveBg: 'var(--joy-palette-danger-200)',
      outlinedDisabledColor: 'var(--joy-palette-danger-300)',
      outlinedDisabledBorder: 'var(--joy-palette-danger-200)',

      filledColor: 'var(--joy-palette-danger-700)',
      filledBg: 'var(--joy-palette-danger-100)',
      filledHoverBg: 'var(--joy-palette-danger-200)',
      filledActiveBg: 'var(--joy-palette-danger-300)',
      filledDisabledColor: 'var(--joy-palette-danger-400)',
      filledDisabledBg: 'var(--joy-palette-danger-50)',

      containedColor: '#fff',
      containedBg: 'var(--joy-palette-danger-500)',
      containedHoverBg: 'var(--joy-palette-danger-600)',
      containedActiveBg: 'var(--joy-palette-danger-400)',
      containedDisabledBg: 'var(--joy-palette-danger-300)',
    },
    info: {
      ...colors.blue,
      textColor: 'var(--joy-palette-info-600)',
      textHoverBg: 'var(--joy-palette-info-100)',
      textActiveBg: 'var(--joy-palette-info-200)',
      textDisabledColor: 'var(--joy-palette-info-300)',

      outlinedColor: 'var(--joy-palette-info-600)',
      outlinedBorder: 'var(--joy-palette-info-300)',
      outlinedHoverBg: 'var(--joy-palette-info-100)',
      outlinedHoverBorder: 'var(--joy-palette-info-400)',
      outlinedActiveBg: 'var(--joy-palette-info-200)',
      outlinedDisabledColor: 'var(--joy-palette-info-300)',
      outlinedDisabledBorder: 'var(--joy-palette-info-200)',

      filledColor: 'var(--joy-palette-info-700)',
      filledBg: 'var(--joy-palette-info-100)',
      filledHoverBg: 'var(--joy-palette-info-200)',
      filledActiveBg: 'var(--joy-palette-info-300)',
      filledDisabledColor: 'var(--joy-palette-info-400)',
      filledDisabledBg: 'var(--joy-palette-info-50)',

      containedColor: '#fff',
      containedBg: 'var(--joy-palette-info-500)',
      containedHoverBg: 'var(--joy-palette-info-600)',
      containedActiveBg: 'var(--joy-palette-info-400)',
      containedDisabledBg: 'var(--joy-palette-info-300)',
    },
    success: {
      ...colors.green,
      textColor: 'var(--joy-palette-success-600)',
      textHoverBg: 'var(--joy-palette-success-100)',
      textActiveBg: 'var(--joy-palette-success-200)',
      textDisabledColor: 'var(--joy-palette-success-300)',

      outlinedColor: 'var(--joy-palette-success-600)',
      outlinedBorder: 'var(--joy-palette-success-300)',
      outlinedHoverBg: 'var(--joy-palette-success-100)',
      outlinedHoverBorder: 'var(--joy-palette-success-400)',
      outlinedActiveBg: 'var(--joy-palette-success-200)',
      outlinedDisabledColor: 'var(--joy-palette-success-300)',
      outlinedDisabledBorder: 'var(--joy-palette-success-200)',

      filledColor: 'var(--joy-palette-success-700)',
      filledBg: 'var(--joy-palette-success-100)',
      filledHoverBg: 'var(--joy-palette-success-200)',
      filledActiveBg: 'var(--joy-palette-success-300)',
      filledDisabledColor: 'var(--joy-palette-success-400)',
      filledDisabledBg: 'var(--joy-palette-success-50)',

      containedColor: '#fff',
      containedBg: 'var(--joy-palette-success-500)',
      containedHoverBg: 'var(--joy-palette-success-600)',
      containedActiveBg: 'var(--joy-palette-success-400)',
      containedDisabledBg: 'var(--joy-palette-success-300)',
    },
    warning: {
      ...colors.yellow,
      textColor: 'var(--joy-palette-warning-600)',
      textHoverBg: 'var(--joy-palette-warning-100)',
      textActiveBg: 'var(--joy-palette-warning-200)',
      textDisabledColor: 'var(--joy-palette-warning-300)',

      outlinedColor: 'var(--joy-palette-warning-600)',
      outlinedBorder: 'var(--joy-palette-warning-300)',
      outlinedHoverBg: 'var(--joy-palette-warning-100)',
      outlinedHoverBorder: 'var(--joy-palette-warning-400)',
      outlinedActiveBg: 'var(--joy-palette-warning-200)',
      outlinedDisabledColor: 'var(--joy-palette-warning-300)',
      outlinedDisabledBorder: 'var(--joy-palette-warning-200)',

      filledColor: 'var(--joy-palette-warning-700)',
      filledBg: 'var(--joy-palette-warning-100)',
      filledHoverBg: 'var(--joy-palette-warning-200)',
      filledActiveBg: 'var(--joy-palette-warning-300)',
      filledDisabledColor: 'var(--joy-palette-warning-400)',
      filledDisabledBg: 'var(--joy-palette-warning-50)',

      containedColor: '#fff',
      containedBg: 'var(--joy-palette-warning-500)',
      containedHoverBg: 'var(--joy-palette-warning-600)',
      containedActiveBg: 'var(--joy-palette-warning-400)',
      containedDisabledBg: 'var(--joy-palette-warning-300)',
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
    danger: {
      ...colors.red,
      textColor: 'var(--joy-palette-danger-200)',
      textHoverBg: 'var(--joy-palette-neutral-800)',
      textActiveBg: 'var(--joy-palette-neutral-700)',
      textDisabledColor: 'var(--joy-palette-neutral-500)',

      outlinedColor: 'var(--joy-palette-danger-200)',
      outlinedBorder: 'var(--joy-palette-neutral-700)',
      outlinedHoverBg: 'var(--joy-palette-neutral-800)',
      outlinedHoverBorder: 'var(--joy-palette-neutral-600)',
      outlinedActiveBg: 'var(--joy-palette-neutral-700)',
      outlinedDisabledColor: 'var(--joy-palette-neutral-500)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',

      filledColor: 'var(--joy-palette-danger-300)',
      filledBg: 'var(--joy-palette-danger-800)',
      filledHoverBg: 'var(--joy-palette-danger-700)',
      filledActiveBg: 'var(--joy-palette-danger-600)',
      filledDisabledColor: 'var(--joy-palette-danger-500)',
      filledDisabledBg: 'var(--joy-palette-danger-800)',

      containedColor: '#fff',
      containedBg: 'var(--joy-palette-danger-500)',
      containedHoverBg: 'var(--joy-palette-danger-700)',
      containedActiveBg: 'var(--joy-palette-danger-500)',
      containedDisabledBg: 'var(--joy-palette-danger-300)',
    },
    info: {
      ...colors.blue,
      textColor: 'var(--joy-palette-info-200)',
      textHoverBg: 'var(--joy-palette-neutral-800)',
      textActiveBg: 'var(--joy-palette-neutral-700)',
      textDisabledColor: 'var(--joy-palette-neutral-500)',

      outlinedColor: 'var(--joy-palette-info-200)',
      outlinedBorder: 'var(--joy-palette-neutral-700)',
      outlinedHoverBg: 'var(--joy-palette-neutral-800)',
      outlinedHoverBorder: 'var(--joy-palette-neutral-600)',
      outlinedActiveBg: 'var(--joy-palette-neutral-700)',
      outlinedDisabledColor: 'var(--joy-palette-neutral-500)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',

      filledColor: 'var(--joy-palette-info-300)',
      filledBg: 'var(--joy-palette-info-800)',
      filledHoverBg: 'var(--joy-palette-info-700)',
      filledActiveBg: 'var(--joy-palette-info-600)',
      filledDisabledColor: 'var(--joy-palette-info-500)',
      filledDisabledBg: 'var(--joy-palette-info-800)',

      containedColor: '#fff',
      containedBg: 'var(--joy-palette-info-500)',
      containedHoverBg: 'var(--joy-palette-info-700)',
      containedActiveBg: 'var(--joy-palette-info-500)',
      containedDisabledBg: 'var(--joy-palette-info-300)',
    },
    success: {
      ...colors.green,
      textColor: 'var(--joy-palette-success-200)',
      textHoverBg: 'var(--joy-palette-neutral-800)',
      textActiveBg: 'var(--joy-palette-neutral-700)',
      textDisabledColor: 'var(--joy-palette-neutral-500)',

      outlinedColor: 'var(--joy-palette-success-200)',
      outlinedBorder: 'var(--joy-palette-neutral-700)',
      outlinedHoverBg: 'var(--joy-palette-neutral-800)',
      outlinedHoverBorder: 'var(--joy-palette-neutral-600)',
      outlinedActiveBg: 'var(--joy-palette-neutral-700)',
      outlinedDisabledColor: 'var(--joy-palette-neutral-500)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',

      filledColor: 'var(--joy-palette-success-300)',
      filledBg: 'var(--joy-palette-success-800)',
      filledHoverBg: 'var(--joy-palette-success-700)',
      filledActiveBg: 'var(--joy-palette-success-600)',
      filledDisabledColor: 'var(--joy-palette-success-500)',
      filledDisabledBg: 'var(--joy-palette-success-800)',

      containedColor: '#fff',
      containedBg: 'var(--joy-palette-success-500)',
      containedHoverBg: 'var(--joy-palette-success-700)',
      containedActiveBg: 'var(--joy-palette-success-500)',
      containedDisabledBg: 'var(--joy-palette-success-300)',
    },
    warning: {
      ...colors.yellow,
      textColor: 'var(--joy-palette-warning-200)',
      textHoverBg: 'var(--joy-palette-neutral-800)',
      textActiveBg: 'var(--joy-palette-neutral-700)',
      textDisabledColor: 'var(--joy-palette-neutral-500)',

      outlinedColor: 'var(--joy-palette-warning-200)',
      outlinedBorder: 'var(--joy-palette-neutral-700)',
      outlinedHoverBg: 'var(--joy-palette-neutral-800)',
      outlinedHoverBorder: 'var(--joy-palette-neutral-600)',
      outlinedActiveBg: 'var(--joy-palette-neutral-700)',
      outlinedDisabledColor: 'var(--joy-palette-neutral-500)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-800)',

      filledColor: 'var(--joy-palette-warning-300)',
      filledBg: 'var(--joy-palette-warning-800)',
      filledHoverBg: 'var(--joy-palette-warning-700)',
      filledActiveBg: 'var(--joy-palette-warning-600)',
      filledDisabledColor: 'var(--joy-palette-warning-500)',
      filledDisabledBg: 'var(--joy-palette-warning-800)',

      containedColor: '#fff',
      containedBg: 'var(--joy-palette-warning-500)',
      containedHoverBg: 'var(--joy-palette-warning-700)',
      containedActiveBg: 'var(--joy-palette-warning-500)',
      containedDisabledBg: 'var(--joy-palette-warning-300)',
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
      color: 'var(--joy-palette-text-heading)',
    },
    h2: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-semiBold)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl3)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      color: 'var(--joy-palette-text-heading)',
    },
    h3: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl2)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      color: 'var(--joy-palette-text-heading)',
    },
    h4: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-medium)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      color: 'var(--joy-palette-text-heading)',
    },
    h5: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-lg)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      color: 'var(--joy-palette-text-heading)',
    },
    headingSubtitle: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-lg)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      color: 'var(--joy-palette-text-content)',
    },
    body: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-md)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      color: 'var(--joy-palette-text-content)',
    },
    caption: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-sm)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
      color: 'var(--joy-palette-text-content)',
    },
    detail: {
      fontFamily: 'var(--joy-fontFamily-sans)',
      fontWeight: 'var(--joy-fontWeight-regular)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xs)',
      lineHeight: 'var(--joy-lineHeight-normal)',
      letterSpacing: 'var(--joy-letterSpacing-normal)',
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
    },
  },
  variant: {
    text: {
      brand: {
        color: 'var(--joy-variant-textColor, var(--joy-palette-brand-textColor))',
        backgroundColor: 'var(--joy-variant-textBg, var(--joy-palette-brand-textBg))',
      },
      neutral: {
        color: 'var(--joy-variant-textColor, var(--joy-palette-neutral-textColor))',
        backgroundColor: 'var(--joy-variant-textBg, var(--joy-palette-neutral-textBg))',
      },
      danger: {
        color: 'var(--joy-variant-textColor, var(--joy-palette-danger-textColor))',
        backgroundColor: 'var(--joy-variant-textBg, var(--joy-palette-danger-textBg))',
      },
      info: {
        color: 'var(--joy-variant-textColor, var(--joy-palette-info-textColor))',
        backgroundColor: 'var(--joy-variant-textBg, var(--joy-palette-info-textBg))',
      },
      success: {
        color: 'var(--joy-variant-textColor, var(--joy-palette-success-textColor))',
        backgroundColor: 'var(--joy-variant-textBg, var(--joy-palette-success-textBg))',
      },
      warning: {
        color: 'var(--joy-variant-textColor, var(--joy-palette-warning-textColor))',
        backgroundColor: 'var(--joy-variant-textBg, var(--joy-palette-warning-textBg))',
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
      danger: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-variant-textHoverBg, var(--joy-palette-danger-textHoverBg))',
        },
      },
      info: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-variant-textHoverBg, var(--joy-palette-info-textHoverBg))',
        },
      },
      success: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-variant-textHoverBg, var(--joy-palette-success-textHoverBg))',
        },
      },
      warning: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-variant-textHoverBg, var(--joy-palette-warning-textHoverBg))',
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
      danger: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-textActiveBg, var(--joy-palette-danger-textActiveBg))',
        },
      },
      info: {
        '&:active': {
          backgroundColor: 'var(--joy-variant-textActiveBg, var(--joy-palette-info-textActiveBg))',
        },
      },
      success: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-textActiveBg, var(--joy-palette-success-textActiveBg))',
        },
      },
      warning: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-textActiveBg, var(--joy-palette-warning-textActiveBg))',
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
      danger: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-textDisabledColor, var(--joy-palette-danger-textDisabledColor))',
        },
      },
      info: {
        '&.Mui-disabled': {
          color: 'var(--joy-variant-textDisabledColor, var(--joy-palette-info-textDisabledColor))',
        },
      },
      success: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-textDisabledColor, var(--joy-palette-success-textDisabledColor))',
        },
      },
      warning: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-textDisabledColor, var(--joy-palette-warning-textDisabledColor))',
        },
      },
    },
    outlined: {
      brand: {
        color: 'var(--joy-variant-outlinedColor, var(--joy-palette-brand-outlinedColor))',
        border: '1px solid',
        borderColor: 'var(--joy-variant-outlinedBorder, var(--joy-palette-brand-outlinedBorder))',
        backgroundColor: 'var(--joy-variant-outlinedBg, var(--joy-palette-brand-outlinedBg))',
      },
      neutral: {
        color: 'var(--joy-variant-outlinedColor, var(--joy-palette-neutral-outlinedColor))',
        border: '1px solid',
        borderColor: 'var(--joy-variant-outlinedBorder, var(--joy-palette-neutral-outlinedBorder))',
        backgroundColor: 'var(--joy-variant-outlinedBg, var(--joy-palette-neutral-outlinedBg))',
      },
      danger: {
        color: 'var(--joy-variant-outlinedColor, var(--joy-palette-danger-outlinedColor))',
        border: '1px solid',
        borderColor: 'var(--joy-variant-outlinedBorder, var(--joy-palette-danger-outlinedBorder))',
        backgroundColor: 'var(--joy-variant-outlinedBg, var(--joy-palette-danger-outlinedBg))',
      },
      info: {
        color: 'var(--joy-variant-outlinedColor, var(--joy-palette-info-outlinedColor))',
        border: '1px solid',
        borderColor: 'var(--joy-variant-outlinedBorder, var(--joy-palette-info-outlinedBorder))',
        backgroundColor: 'var(--joy-variant-outlinedBg, var(--joy-palette-info-outlinedBg))',
      },
      success: {
        color: 'var(--joy-variant-outlinedColor, var(--joy-palette-success-outlinedColor))',
        border: '1px solid',
        borderColor: 'var(--joy-variant-outlinedBorder, var(--joy-palette-success-outlinedBorder))',
        backgroundColor: 'var(--joy-variant-outlinedBg, var(--joy-palette-success-outlinedBg))',
      },
      warning: {
        color: 'var(--joy-variant-outlinedColor, var(--joy-palette-warning-outlinedColor))',
        border: '1px solid',
        borderColor: 'var(--joy-variant-outlinedBorder, var(--joy-palette-warning-outlinedBorder))',
        backgroundColor: 'var(--joy-variant-outlinedBg, var(--joy-palette-warning-outlinedBg))',
      },
    },
    outlinedHover: {
      brand: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-outlinedHoverBg, var(--joy-palette-brand-outlinedHoverBg))',
          borderColor:
            'var(--joy-variant-outlinedHoverBorder, var(--joy-palette-brand-outlinedHoverBorder))',
        },
      },
      neutral: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-outlinedHoverBg, var(--joy-palette-neutral-outlinedHoverBg))',
          borderColor:
            'var(--joy-variant-outlinedHoverBorder, var(--joy-palette-neutral-outlinedHoverBorder))',
        },
      },
      danger: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-outlinedHoverBg, var(--joy-palette-danger-outlinedHoverBg))',
          borderColor:
            'var(--joy-variant-outlinedHoverBorder, var(--joy-palette-danger-outlinedHoverBorder))',
        },
      },
      info: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-outlinedHoverBg, var(--joy-palette-info-outlinedHoverBg))',
          borderColor:
            'var(--joy-variant-outlinedHoverBorder, var(--joy-palette-info-outlinedHoverBorder))',
        },
      },
      success: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-outlinedHoverBg, var(--joy-palette-success-outlinedHoverBg))',
          borderColor:
            'var(--joy-variant-outlinedHoverBorder, var(--joy-palette-success-outlinedHoverBorder))',
        },
      },
      warning: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-outlinedHoverBg, var(--joy-palette-warning-outlinedHoverBg))',
          borderColor:
            'var(--joy-variant-outlinedHoverBorder, var(--joy-palette-warning-outlinedHoverBorder))',
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
      danger: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-outlinedActiveBg, var(--joy-palette-danger-outlinedActiveBg))',
        },
      },
      info: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-outlinedActiveBg, var(--joy-palette-info-outlinedActiveBg))',
        },
      },
      success: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-outlinedActiveBg, var(--joy-palette-success-outlinedActiveBg))',
        },
      },
      warning: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-outlinedActiveBg, var(--joy-palette-warning-outlinedActiveBg))',
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
      danger: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-outlinedDisabledColor, var(--joy-palette-danger-outlinedDisabledColor))',
          borderColor:
            'var(--joy-variant-outlinedDisabledBorder, var(--joy-palette-danger-outlinedDisabledBorder))',
        },
      },
      info: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-outlinedDisabledColor, var(--joy-palette-info-outlinedDisabledColor))',
          borderColor:
            'var(--joy-variant-outlinedDisabledBorder, var(--joy-palette-info-outlinedDisabledBorder))',
        },
      },
      success: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-outlinedDisabledColor, var(--joy-palette-success-outlinedDisabledColor))',
          borderColor:
            'var(--joy-variant-outlinedDisabledBorder, var(--joy-palette-success-outlinedDisabledBorder))',
        },
      },
      warning: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-outlinedDisabledColor, var(--joy-palette-warning-outlinedDisabledColor))',
          borderColor:
            'var(--joy-variant-outlinedDisabledBorder, var(--joy-palette-warning-outlinedDisabledBorder))',
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
      danger: {
        color: 'var(--joy-variant-filledColor, var(--joy-palette-danger-filledColor))',
        backgroundColor: 'var(--joy-variant-filledBg, var(--joy-palette-danger-filledBg))',
      },
      info: {
        color: 'var(--joy-variant-filledColor, var(--joy-palette-info-filledColor))',
        backgroundColor: 'var(--joy-variant-filledBg, var(--joy-palette-info-filledBg))',
      },
      success: {
        color: 'var(--joy-variant-filledColor, var(--joy-palette-success-filledColor))',
        backgroundColor: 'var(--joy-variant-filledBg, var(--joy-palette-success-filledBg))',
      },
      warning: {
        color: 'var(--joy-variant-filledColor, var(--joy-palette-warning-filledColor))',
        backgroundColor: 'var(--joy-variant-filledBg, var(--joy-palette-warning-filledBg))',
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
      danger: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-filledHoverBg, var(--joy-palette-danger-filledHoverBg))',
        },
      },
      info: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-filledHoverBg, var(--joy-palette-info-filledHoverBg))',
        },
      },
      success: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-filledHoverBg, var(--joy-palette-success-filledHoverBg))',
        },
      },
      warning: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            'var(--joy-variant-filledHoverBg, var(--joy-palette-warning-filledHoverBg))',
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
      danger: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-filledActiveBg, var(--joy-palette-danger-filledActiveBg))',
        },
      },
      info: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-filledActiveBg, var(--joy-palette-info-filledActiveBg))',
        },
      },
      success: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-filledActiveBg, var(--joy-palette-success-filledActiveBg))',
        },
      },
      warning: {
        '&:active': {
          backgroundColor:
            'var(--joy-variant-filledActiveBg, var(--joy-palette-warning-filledActiveBg))',
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
      danger: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-filledDisabledColor, var(--joy-palette-danger-filledDisabledColor))',
          backgroundColor:
            'var(--joy-variant-filledDisabledBg, var(--joy-palette-danger-filledDisabledBg))',
        },
      },
      info: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-filledDisabledColor, var(--joy-palette-info-filledDisabledColor))',
          backgroundColor:
            'var(--joy-variant-filledDisabledBg, var(--joy-palette-info-filledDisabledBg))',
        },
      },
      success: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-filledDisabledColor, var(--joy-palette-success-filledDisabledColor))',
          backgroundColor:
            'var(--joy-variant-filledDisabledBg, var(--joy-palette-success-filledDisabledBg))',
        },
      },
      warning: {
        '&.Mui-disabled': {
          color:
            'var(--joy-variant-filledDisabledColor, var(--joy-palette-warning-filledDisabledColor))',
          backgroundColor:
            'var(--joy-variant-filledDisabledBg, var(--joy-palette-warning-filledDisabledBg))',
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
      danger: {
        color: 'var(--joy-palette-danger-containedColor)',
        backgroundColor: 'var(--joy-palette-danger-containedBg)',
      },
      info: {
        color: 'var(--joy-palette-info-containedColor)',
        backgroundColor: 'var(--joy-palette-info-containedBg)',
      },
      success: {
        color: 'var(--joy-palette-success-containedColor)',
        backgroundColor: 'var(--joy-palette-success-containedBg)',
      },
      warning: {
        color: 'var(--joy-palette-warning-containedColor)',
        backgroundColor: 'var(--joy-palette-warning-containedBg)',
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
      danger: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-danger-containedHoverBg)',
        },
      },
      info: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-info-containedHoverBg)',
        },
      },
      success: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-success-containedHoverBg)',
        },
      },
      warning: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--joy-palette-warning-containedHoverBg)',
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
      danger: {
        '&:active': {
          backgroundColor: 'var(--joy-palette-danger-containedActiveBg)',
        },
      },
      info: {
        '&:active': {
          backgroundColor: 'var(--joy-palette-info-containedActiveBg)',
        },
      },
      success: {
        '&:active': {
          backgroundColor: 'var(--joy-palette-success-containedActiveBg)',
        },
      },
      warning: {
        '&:active': {
          backgroundColor: 'var(--joy-palette-warning-containedActiveBg)',
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
      danger: {
        '&.Mui-disabled': {
          backgroundColor: 'var(--joy-palette-danger-containedDisabledBg)',
        },
      },
      info: {
        '&.Mui-disabled': {
          backgroundColor: 'var(--joy-palette-info-containedDisabledBg)',
        },
      },
      success: {
        '&.Mui-disabled': {
          backgroundColor: 'var(--joy-palette-success-containedDisabledBg)',
        },
      },
      warning: {
        '&.Mui-disabled': {
          backgroundColor: 'var(--joy-palette-warning-containedDisabledBg)',
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
      danger: {
        '--joy-variant-textColor': 'var(--joy-palette-danger-100)',
        '--joy-variant-textBg': 'transparent',
        '--joy-variant-textHoverBg': 'var(--joy-palette-danger-500)',
        '--joy-variant-textActiveBg': 'var(--joy-palette-danger-700)',
        '--joy-variant-outlinedColor': '#fff',
        '--joy-variant-outlinedBorder': 'var(--joy-palette-danger-400)',
        '--joy-variant-outlinedHoverBorder': 'var(--joy-palette-danger-400)',
        '--joy-variant-outlinedBg': 'transparent',
        '--joy-variant-outlinedHoverBg': 'rgba(255, 255, 255, 0.12)',
        '--joy-variant-outlinedActiveBg': 'var(--joy-palette-danger-700)',
        '--joy-variant-filledColor': '#fff',
        '--joy-variant-filledBg': 'rgba(255, 255, 255, 0.2)',
        '--joy-variant-filledHoverBg': 'var(--joy-palette-danger-400)',
        '--joy-variant-filledActiveBg': 'var(--joy-palette-danger-400)',
      },
      info: {
        '--joy-variant-textColor': 'var(--joy-palette-info-100)',
        '--joy-variant-textBg': 'transparent',
        '--joy-variant-textHoverBg': 'var(--joy-palette-info-500)',
        '--joy-variant-textActiveBg': 'var(--joy-palette-info-700)',
        '--joy-variant-outlinedColor': '#fff',
        '--joy-variant-outlinedBorder': 'var(--joy-palette-info-400)',
        '--joy-variant-outlinedHoverBorder': 'var(--joy-palette-info-400)',
        '--joy-variant-outlinedBg': 'transparent',
        '--joy-variant-outlinedHoverBg': 'rgba(255, 255, 255, 0.12)',
        '--joy-variant-outlinedActiveBg': 'var(--joy-palette-info-700)',
        '--joy-variant-filledColor': '#fff',
        '--joy-variant-filledBg': 'rgba(255, 255, 255, 0.2)',
        '--joy-variant-filledHoverBg': 'var(--joy-palette-info-400)',
        '--joy-variant-filledActiveBg': 'var(--joy-palette-info-400)',
      },
      success: {
        '--joy-variant-textColor': 'var(--joy-palette-success-100)',
        '--joy-variant-textBg': 'transparent',
        '--joy-variant-textHoverBg': 'var(--joy-palette-success-500)',
        '--joy-variant-textActiveBg': 'var(--joy-palette-success-700)',
        '--joy-variant-outlinedColor': '#fff',
        '--joy-variant-outlinedBorder': 'var(--joy-palette-success-400)',
        '--joy-variant-outlinedHoverBorder': 'var(--joy-palette-success-400)',
        '--joy-variant-outlinedBg': 'transparent',
        '--joy-variant-outlinedHoverBg': 'rgba(255, 255, 255, 0.12)',
        '--joy-variant-outlinedActiveBg': 'var(--joy-palette-success-700)',
        '--joy-variant-filledColor': '#fff',
        '--joy-variant-filledBg': 'rgba(255, 255, 255, 0.2)',
        '--joy-variant-filledHoverBg': 'var(--joy-palette-success-400)',
        '--joy-variant-filledActiveBg': 'var(--joy-palette-success-400)',
      },
      warning: {
        '--joy-variant-textColor': 'var(--joy-palette-warning-100)',
        '--joy-variant-textBg': 'transparent',
        '--joy-variant-textHoverBg': 'var(--joy-palette-warning-500)',
        '--joy-variant-textActiveBg': 'var(--joy-palette-warning-700)',
        '--joy-variant-outlinedColor': '#fff',
        '--joy-variant-outlinedBorder': 'var(--joy-palette-warning-400)',
        '--joy-variant-outlinedHoverBorder': 'var(--joy-palette-warning-400)',
        '--joy-variant-outlinedBg': 'transparent',
        '--joy-variant-outlinedHoverBg': 'rgba(255, 255, 255, 0.12)',
        '--joy-variant-outlinedActiveBg': 'var(--joy-palette-warning-700)',
        '--joy-variant-filledColor': '#fff',
        '--joy-variant-filledBg': 'rgba(255, 255, 255, 0.2)',
        '--joy-variant-filledHoverBg': 'var(--joy-palette-warning-400)',
        '--joy-variant-filledActiveBg': 'var(--joy-palette-warning-400)',
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
