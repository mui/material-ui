import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

// override theme
<CssVarsProvider
  theme={extendTheme({
    fontFamily: {
      default: '"Rubik", sans-serif',
    },
    // @ts-expect-error 'color' does not exist in JoyTheme
    color: {},
  })}
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
    secondary: PaletteRange;
  }
}

// extends ColorSystems
declare module '@mui/joy/styles' {
  interface ColorSystem {
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
  interface TypographySystem {
    ads: React.CSSProperties;
  }
}

const extendedTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
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
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const { color, variant } = ownerState;
          const styles = [];
          if (color === 'primary') {
            styles.push({
              width: 120,
              height: 48,
            });
          }
          if (variant === 'contained') {
            styles.push(theme.typography.body1);
          }
          return styles;
        },
      },
    },
    JoySwitch: {
      styleOverrides: {
        thumb: ({ ownerState, theme }) => [
          ownerState.color === 'primary' && {
            '&:hover': {
              backgroundColor: theme.vars.palette.primary.containedHoverBg,
            },
          },
        ],
      },
    },
  },
});

extendedTheme.getCssVar('fontSize-xxxs');
extendedTheme.getCssVar('palette-secondary-solidBg');

<CssVarsProvider theme={extendedTheme} />;
