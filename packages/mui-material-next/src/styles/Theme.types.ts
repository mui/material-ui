import { SxProps as SystemSxProps, SxConfig, CSSObject } from '@mui/system';
import {
  CssVarsTheme as MD2Theme,
  SupportedColorScheme,
  ColorSystemOptions as MD2ColorSystemOptions,
  CssVarsThemeOptions as MD2CssVarsThemeOptions,
} from '@mui/material/styles';

export interface MD3Tones {
  0: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  95: string;
  99: string;
  100: string;
}
export interface MD3Palettes {
  primary: MD3Tones;
  secondary: MD3Tones;
  tertiary: MD3Tones;
  neutral: MD3Tones;
  neutralVariant: MD3Tones;
  error: MD3Tones;
  common: {
    black: string;
    white: string;
  };
}

export interface MD3ColorSchemeTokens {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  background: string;
  onBackground: string;

  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;

  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  surfaceTint?: string;

  outline: string;
  shadow: string;

  // channels
  primaryChannel: string;
  secondaryChannel: string;
  tertiaryChannel: string;
  onSurfaceChannel: string;
  secondaryContainerChannel: string;
}

export interface MD3Typeface {
  plain: string;
  brand: string;
  weight: {
    bold: string;
    medium: string;
    regular: string;
  };
}

export interface MD3States {
  hover: {
    stateLayerOpacity: number;
  };
  focus: {
    stateLayerOpacity: number;
  };
  pressed: {
    stateLayerOpacity: number;
  };
  dragged: {
    stateLayerOpacity: number;
  };
}

export interface TypescaleValue {
  small: {
    family: string;
    weight: string;
  };
  medium: {
    family: string;
    weight: string;
  };
  large: {
    family: string;
    weight: string;
    lineHeight: number;
    size: number;
    tracking: number;
  };
}

export interface MD3Typescale {
  label: TypescaleValue;
  body: TypescaleValue;
  headline: TypescaleValue;
  display: TypescaleValue;
}

export interface Shapes {
  borderRadius: number;
}

export interface MD3CssVarsThemeOptions extends Omit<MD2CssVarsThemeOptions, 'colorSchemes'> {
  md3?: {
    shape?: Partial<Shapes>;
  };
  ref?: {
    typeface?: Partial<MD3Typeface>;
  };
  sys?: {
    typescale?: Partial<MD3Typescale>;
    state?: Partial<MD3States>;
  };
}

export interface ColorSystemOptions extends MD2ColorSystemOptions {
  ref?: {
    palette?: Partial<MD3Palettes>;
  };
  sys?: {
    color?: Partial<MD3ColorSchemeTokens>;
  };
}

export interface CssVarsThemeOptions extends Omit<MD3CssVarsThemeOptions, 'colorSchemes'> {
  /**
   * Color schemes configuration
   */
  colorSchemes?: Partial<Record<SupportedColorScheme, ColorSystemOptions>>;
}

export interface Theme extends Omit<MD2Theme, 'vars'> {
  useMaterialYou?: boolean;
  ref: {
    palette: MD3Palettes;
    typeface: MD3Typeface;
  };
  sys: {
    color: MD3ColorSchemeTokens;
    typescale: MD3Typescale;
    state: MD3States;
  };
  md3: {
    shape: Shapes;
  };
  palette: MD2Theme['palette'];
  vars: MD2Theme['vars'] & {
    palette: MD2Theme['vars']['palette'];
    ref: {
      palette: MD3Palettes;
      typeface: any;
    };
    sys: {
      color: MD3ColorSchemeTokens;
      typescale: MD3Typescale;
      state: MD3States;
    };
    md3: {
      shape: Shapes;
    };
  };
  unstable_sxConfig: SxConfig;
  unstable_sx: (props: SystemSxProps<Theme>) => CSSObject;
  unstable_calculateSxConfig: (props: any) => SxConfig;
}

export type SxProps = SystemSxProps<Theme>;
