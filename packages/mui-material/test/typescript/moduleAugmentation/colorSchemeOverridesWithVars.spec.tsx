import { extendTheme, styled } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

declare module '@mui/material/styles' {
  interface ColorSchemeOverrides {
    superDark: true;
  }
}

// Test theme creation with CSS variables enabled
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#90caf9',
        },
      },
    },
    superDark: {
      palette: {
        primary: {
          main: '#000000',
        },
        background: {
          default: '#000000',
        },
      },
    },
  },
});

// Test that applyStyles works with custom color schemes
theme.applyStyles('superDark', { color: 'red' });
theme.applyStyles('light', { color: 'blue' });
theme.applyStyles('dark', { color: 'green' });

// @ts-expect-error - 'invalid' is not a valid color scheme
theme.applyStyles('invalid', { color: 'yellow' });

// Test that applyStyles works with custom color schemes in styled components
const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.vars.palette.background.default,
  ...theme.applyStyles('superDark', {
    backgroundColor: '#000',
  }),
}));
