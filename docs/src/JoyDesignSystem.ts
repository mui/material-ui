import { OverridableStringUnion } from '@mui/types';
import { unstable_createDesignSystem as createDesignSystem } from '@mui/system';

export interface JoyColorSchemeOverrides {}

type JoyExtendedColorScheme = OverridableStringUnion<never, JoyColorSchemeOverrides>;

interface JoyBaseTokens {
  fontSize: {
    md: string;
  };
  black: string;
  white: string;
}

interface JoyColorSchemeTokens {
  palette: {
    primary: {
      500: string;
    };
    success: {
      500: string;
    };
  };
  background: {
    app: string;
    contrast: string;
  };
}

interface JoyTheme extends JoyBaseTokens, JoyColorSchemeTokens {
  vars: JoyBaseTokens & JoyColorSchemeTokens;
}

const { ThemeProvider, styled, CssVarsProvider, useColorScheme, getInitColorSchemeScript } =
  createDesignSystem<
    JoyBaseTokens,
    JoyColorSchemeTokens,
    'light' | 'dark',
    JoyExtendedColorScheme,
    JoyTheme
  >({
    baseTheme: {
      black: '#000',
      white: '#fff',
      fontSize: {
        md: '1rem',
      },
    },
    colorSchemes: {
      light: {
        background: {
          app: '#f9f9f9',
          contrast: '#121212',
        },
        palette: {
          primary: {
            500: '#007FFF',
          },
          success: {
            500: '#1AA251',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            500: '#0059B2',
          },
          success: {
            500: '#178D46',
          },
        },
        background: {
          app: '#0A1929',
          contrast: '#fff',
        },
      },
    },
    defaultColorScheme: 'light',
  });

export { ThemeProvider, styled, CssVarsProvider, useColorScheme, getInitColorSchemeScript };
