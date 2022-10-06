interface MD3Tones {
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

export interface MD3PalettesOptions extends Partial<MD3Palettes> {}

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
}

export interface MD3ColorSchemeTokensOptions extends Partial<MD3ColorSchemeTokens> {}

declare module '@mui/material/styles' {
  interface Theme {
    useMaterialYou?: boolean;
  }

  interface ThemeOptions {
    useMaterialYou?: boolean;
  }

  interface Palette {
    md3: MD3Palettes & { colors: MD3ColorSchemeTokens };
  }

  interface PaletteOptions {
    md3?: MD3PalettesOptions & { colors?: MD3ColorSchemeTokensOptions };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    filled: true;
    filledTonal: true;
    elevated: true;
  }
}
