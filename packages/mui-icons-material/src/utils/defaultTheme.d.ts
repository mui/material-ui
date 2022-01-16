import * as React from 'react';
import * as CSS from 'csstype';
import { Theme } from '@mui/system';

type NormalCssProperties = CSS.Properties<number | string>;
type Fontface = CSS.AtRule.FontFace & { fallbacks?: CSS.AtRule.FontFace[] };

/**
 * Allows the user to augment the properties available
 */
interface BaseCSSProperties extends NormalCssProperties {
  '@font-face'?: Fontface | Fontface[];
}

interface CSSProperties extends BaseCSSProperties {
  // Allow pseudo selectors and media queries
  // `unknown` is used since TS does not allow assigning an interface without
  // an index signature to one with an index signature. This is to allow type safe
  // module augmentation.
  // Technically we want any key not typed in `BaseCSSProperties` to be of type
  // `CSSProperties` but this doesn't work. The index signature needs to cover
  // BaseCSSProperties as well. Usually you would use `BaseCSSProperties[keyof BaseCSSProperties]`
  // but this would not allow assigning React.CSSProperties to CSSProperties
  [k: string]: unknown | CSSProperties;
}

interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

interface Color {
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
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

interface TypeText {
  primary: string;
  secondary: string;
  disabled: string;
}

interface TypeAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledOpacity: number;
  disabledBackground: string;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
}

interface TypeBackground {
  default: string;
  paper: string;
}

type TypeDivider = string;

type ColorPartial = Partial<Color>;

type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

interface SimplePaletteColorOptions {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

interface PaletteAugmentColorOptions {
  color: PaletteColorOptions;
  mainShade?: number | string;
  lightShade?: number | string;
  darkShade?: number | string;
  name?: number | string;
}

type Shadows = [
  'none',
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

interface Easing {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
}

interface Duration {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  enteringScreen: number;
  leavingScreen: number;
}

interface Transitions {
  easing: Easing;
  duration: Duration;
  create: (
    props: string | string[],
    options?: Partial<{ duration: number | string; easing: string; delay: number | string }>,
  ) => string;
  getAutoHeightDuration: (height: number) => number;
}

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

interface FontStyle
  extends Required<{
    fontFamily: React.CSSProperties['fontFamily'];
    fontSize: number;
    fontWeightLight: React.CSSProperties['fontWeight'];
    fontWeightRegular: React.CSSProperties['fontWeight'];
    fontWeightMedium: React.CSSProperties['fontWeight'];
    fontWeightBold: React.CSSProperties['fontWeight'];
    htmlFontSize: number;
  }> {}

interface TypographyUtils {
  pxToRem: (px: number) => string;
}

interface Typography extends Record<Variant, CSSProperties>, FontStyle, TypographyUtils {}

export interface DefaultTheme extends Theme {
  mixins: {
    toolbar: CSSProperties;
  };
  palette: {
    common: {
      black: string;
      white: string;
    };
    mode: 'light' | 'dark';
    contrastThreshold: number;
    tonalOffset:
      | number
      | {
          light: number;
          dark: number;
        };
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    warning: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
    grey: Color;
    text: TypeText;
    divider: TypeDivider;
    action: TypeAction;
    background: TypeBackground;
    getContrastText: (background: string) => string;
    augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;
  };
  shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  zIndex: {
    mobileStepper: number;
    speedDial: number;
    appBar: number;
    drawer: number;
    modal: number;
    snackbar: number;
    tooltip: number;
  };
}

// shut off automatic exporting
export {};
