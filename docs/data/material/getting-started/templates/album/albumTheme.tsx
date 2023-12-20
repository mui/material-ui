import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            light: '#4393E4',
            main: '#0B6BCB',
            dark: '#185EA5',
          },
          secondary: {
            light: '#00FF6F',
            main: '#00FF6F',
            dark: '#00FF6F',
          },
          warning: {
            main: '#F7B538',
            dark: '#F79F00',
          },
          error: {
            light: red[50],
            main: red[500],
            dark: red[700],
          },
          success: {
            light: '#00FF6F',
            main: '#00FF6F',
            dark: '#00FF6F',
          },
          background: {
            default: '#fff',
            paper: '#FBFCFE',
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: {
            light: '#314A7D',
            main: '#0B6BCB',
            dark: '#0D4781',
          },
          secondary: {
            light: '#007F3F',
            main: '#007F3F',
            dark: '#007F3F',
          },
          warning: {
            main: '#F7B538',
            dark: '#F79F00',
          },
          error: {
            light: '#D32F2F',
            main: '#D32F2F',
            dark: '#B22A2A',
          },
          success: {
            light: '#007F3F',
            main: '#007F3F',
            dark: '#007F3F',
          },
          background: {
            default: '#121212',
            paper: '#1E1E1E',
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});

const theme = createTheme({
  palette: {
    ...getDesignTokens,
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const fontHeader = {
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: "'Inter', sans-serif",
};

export default function getAlbumTheme(mode: 'light' | 'dark') {
  return {
    ...theme,
    palette: {
      ...theme.palette,
      background: {
        ...theme.palette.background,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '8px',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }: { ownerState: { variant: string } }) => ({
            boxShadow: 'none',
            borderRadius: '8px',

            ...(ownerState.variant === 'outlined' && {
              border: '1px solid',
              borderColor: '#C7DFF7',
            }),
            textTransform: 'none',
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
      },
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
          disableGutters: true,
        },
        styleOverrides: {
          root: {
            backgroundColor: '',
            border: '1px solid',
            borderColor: grey[200],
            ':before': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            ml: '20px',
            border: 'none',
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { mt: 2, border: 'none' },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& label.Mui-focused': {
              color: 'white',
            },
            '& .MuiInputBase-input': {
              fontSize: '14px',
              color: 'white',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '8px',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
              fontSize: '14px',
            },
            '& .MuiOutlinedInput-input:-webkit-autofill': {
              '-webkit-box-shadow': '0 0 0 100px rgba(255, 255, 255, 0.2) inset',
            },
          },
        },
      },
    },
    typography: {
      ...theme.typography,
      fontHeader,
      h1: {
        ...theme.typography.h1,
        ...fontHeader,
        letterSpacing: 0,
        fontSize: 60,
      },
      h2: {
        ...theme.typography.h2,
        ...fontHeader,
        fontSize: 48,
      },
      h3: {
        ...theme.typography.h3,
        ...fontHeader,
        fontSize: 42,
      },
      h4: {
        ...theme.typography.h4,
        ...fontHeader,
        fontSize: 36,
      },
      h5: {
        ...theme.typography.h5,
        fontSize: 20,
        fontWeight: theme.typography.fontWeightLight,
      },
      h6: {
        ...theme.typography.h6,
        ...fontHeader,
        fontSize: 18,
      },
      subtitle1: {
        ...theme.typography.subtitle1,
        fontSize: 18,
      },
      subtitle2: {
        ...theme.typography.subtitle2,
        fontSize: 16,
      },
      body1: {
        ...theme.typography.body2,
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: 16,
      },
      body2: {
        ...theme.typography.body1,
        fontSize: 14,
      },
    },
  };
}
