import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: 'var(--joy-palette-neutral-50)',
        },
      },
    },
    dark: {
      palette: {
        neutral: {
          outlinedBorder: 'var(--joy-palette-neutral-700)',
        },
      },
    },
  },
  components: {
    JoyAutocomplete: {
      styleOverrides: {
        root: {
          boxShadow: 'var(--joy-shadow-xs)',
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: {
          boxShadow: 'var(--joy-shadow-xs)',
        },
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          boxShadow: 'var(--joy-shadow-xs)',
        },
      },
    },
    JoyTextarea: {
      styleOverrides: {
        root: {
          boxShadow: 'var(--joy-shadow-xs)',
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: {
          boxShadow: 'var(--joy-shadow-xs)',
        },
      },
    },
  },
  fontFamily: {
    display: "'Inter', var(--joy-fontFamily-fallback)",
    body: "'Inter', var(--joy-fontFamily-fallback)",
  },
});
