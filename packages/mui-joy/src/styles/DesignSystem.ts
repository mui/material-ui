import { unstable_createDesignSystem as createDesignSystem } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';

export interface JoyColorSchemeOverrides {}

export interface JoyBaseTokens {
  fontSize: {
    md: string;
  };
  borderRadius: {
    md: string;
  };
}

export interface JoyColorSchemeTokens {
  palette: {
    brand: string;
    neutral: string;
  };
  background: {
    app: string;
    contrast: string;
  };
}

type JoyTheme = JoyBaseTokens &
  JoyColorSchemeTokens & {
    vars: JoyBaseTokens & JoyColorSchemeTokens;
  };

type JoyExtendedColorScheme = OverridableStringUnion<never, JoyColorSchemeOverrides>;

const { ThemeProvider, styled, CssVarsProvider, useColorScheme, getInitColorSchemeScript } =
  createDesignSystem<
    JoyBaseTokens,
    JoyColorSchemeTokens,
    'light' | 'dark',
    JoyExtendedColorScheme,
    JoyTheme
  >({
    baseTheme: {
      fontSize: {
        md: '1rem',
      },
      borderRadius: {
        md: '4px',
      },
    },
    colorSchemes: {
      light: {
        palette: {
          brand: '#007FFF',
          neutral: '#B3C3D3',
        },
        background: {
          app: '#F3F6F9',
          contrast: '#121212',
        },
      },
      dark: {
        palette: {
          brand: '#66B2FF',
          neutral: '#46505A',
        },
        background: {
          app: '#0A1929',
          contrast: '#f9f9f9',
        },
      },
    },
    defaultColorScheme: 'light',
  });

export { ThemeProvider, styled, CssVarsProvider, useColorScheme, getInitColorSchemeScript };
