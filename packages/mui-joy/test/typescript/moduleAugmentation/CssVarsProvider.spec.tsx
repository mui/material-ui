import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';

// override theme
<CssVarsProvider
  theme={{
    fontFamily: {
      sans: '"Rubik", sans-serif',
    },
    // @ts-expect-error 'color' does not exist in JoyTheme
    color: {},
  }}
/>;

// extends PaletteRange
declare module '@mui/joy/styles' {
  interface PaletteRange {
    1000: string;
  }
}

// extends Palette
declare module '@mui/joy/styles' {
  interface Palette {
    neutral: PaletteRange;
  }
}

// extends ColorSystems
declare module '@mui/joy/styles' {
  interface ColorSystems {
    bgcolor: string;
  }
}

// extends BorderRadius
declare module '@mui/joy/styles' {
  interface BorderRadius {
    xxxs: string;
  }
}

// extends FontSize
declare module '@mui/joy/styles' {
  interface FontSize {
    xxxs: string;
  }
}

// extends FontFamily
declare module '@mui/joy/styles' {
  interface FontFamily {
    secondary: string;
  }
}

// extends FontWeight
declare module '@mui/joy/styles' {
  interface FontWeight {
    xxxs: string;
  }
}

// extends LineHeight
declare module '@mui/joy/styles' {
  interface LineHeight {
    xxxs: string;
  }
}

// extends TypographySystems
declare module '@mui/joy/styles' {
  interface TypographySystems {
    ads: React.CSSProperties;
  }
}

<CssVarsProvider
  theme={{
    colorSchemes: {
      light: {
        palette: {
          brand: {
            1000: '',
          },
          neutral: {
            500: '',
          },
        },
        bgcolor: '',
      },
    },
    borderRadius: {
      xxxs: '',
    },
    fontSize: {
      xxxs: '',
    },
    fontFamily: {
      secondary: '',
    },
    fontWeight: {
      xxxs: '',
    },
    lineHeight: {
      xxxs: '',
    },
    typography: {
      ads: {
        fontFamily: 'var(--joy-fontFamily-secondary)',
        fontSize: '1rem',
        lineHeight: 1,
      },
    },
  }}
/>;
