import { red } from '@mui/material/colors';

import { alpha } from '@mui/material';

export const brandColor = {
  50: '#EDF5FD',
  100: '#E3EFFB',
  200: '#C7DFF7',
  300: '#97C3F0',
  400: '#4393E4',
  500: '#0B6BCB',
  600: '#185EA5',
  700: '#0E3862',
  800: '#0A2744',
  900: '#051423',
};

export const secondaryColor = {
  50: '#F8EDFF',
  100: '#EEDCFF',
  200: '#D9B9FF',
  300: '#C496FF',
  400: '#AC76F0',
  500: '#915CD4',
  600: '#7742B8',
  700: '#5E269F',
  800: '#460085',
  900: '#2A0054',
};

export const greyColor = {
  50: '#FBFCFE',
  100: '#F0F4F8',
  200: '#DDE7EE',
  300: '#CDD7E1',
  400: '#9FA6AD',
  500: '#636B74',
  600: '#555E68',
  700: '#32383E',
  800: '#171A1C',
  900: '#0B0D0E',
};

export const successColor = {
  50: '#F6FEF6',
  100: '#E3FBE3',
  200: '#C7F7C7',
  300: '#A1E8A1',
  400: '#51BC51',
  500: '#1F7A1F',
  600: '#136C13',
  700: '#0A470A',
  800: '#042F04',
  900: '#021D02',
};

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            light: brandColor[300],
            main: brandColor[500],
            dark: brandColor[800],
          },
          secondary: {
            light: secondaryColor[300],
            main: secondaryColor[500],
            dark: secondaryColor[800],
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
            light: successColor[300],
            main: successColor[400],
            dark: successColor[800],
          },
          background: {
            default: '#fff',
            paper: greyColor[50],
          },
          text: {
            primary: greyColor[900],
            secondary: greyColor[700],
          },
        }
      : {
          primary: {
            light: brandColor[400],
            main: brandColor[500],
            dark: brandColor[800],
          },
          secondary: {
            light: secondaryColor[400],
            main: secondaryColor[500],
            dark: secondaryColor[900],
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
            light: successColor[400],
            main: successColor[500],
            dark: successColor[700],
          },
          background: {
            default: greyColor[900],
            paper: greyColor[800],
          },
          text: {
            primary: '#fff',
            secondary: greyColor[300],
          },
        }),
  },
});

const typographyBase = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
};

export default function getAlbumTheme(mode) {
  const modeDesignTokens = getDesignTokens(mode);

  const fontHeader = {
    color: modeDesignTokens.palette.text.primary,
    fontWeight: typographyBase.fontWeightMedium,
    fontFamily: "'Inter', sans-serif",
  };

  return {
    ...modeDesignTokens,
    palette: {
      ...modeDesignTokens.palette,
      background: {
        ...modeDesignTokens.palette.background,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? greyColor[50] : greyColor[900],
            boxShadow: 'none',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '8px',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            boxShadow: 'none',
            borderRadius: '8px',
            ...(ownerState.variant === 'contained' && {
              boxShadow: `inset 0px 1px 1px ${brandColor[400]}, inset 0px -2px 1px ${
                brandColor[600]
              }, 0px 0px 0px 1px ${alpha(
                brandColor[500],
                0.5,
              )}, 0px 2px 4px rgba(0, 0, 0, 0.1)`,
              '&:hover': {
                backgroundColor: brandColor[600],
                boxShadow: '0px 0px 0px 1px rgba(38, 38, 38, 1)',
              },
            }),
            ...(ownerState.variant === 'outlined' && {
              backgroundColor:
                mode === 'light'
                  ? alpha(brandColor[300], 0.1)
                  : alpha(brandColor[600], 0.1),
              border: '1px solid',
              borderColor: mode === 'light' ? brandColor[300] : brandColor[700],
              color: mode === 'light' ? brandColor[500] : brandColor[300],
            }),
            textTransform: 'none',
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.color === 'primary' && {
              color: mode === 'light' ? brandColor[500] : brandColor[400],
            }),
          }),
        },
      },
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
          disableGutters: true,
        },
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#fff' : greyColor[900],
            border: '1px solid',
            borderColor: mode === 'light' ? greyColor[100] : greyColor[800],
            ':before': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            border: 'none',
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { mb: 20, border: 'none' },
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
      ...typographyBase,
      fontHeader,
      h1: {
        ...fontHeader,
        letterSpacing: 0,
        fontSize: 60,
      },
      h2: {
        ...fontHeader,
        fontSize: 48,
      },
      h3: {
        ...fontHeader,
        fontSize: 42,
      },
      h4: {
        ...fontHeader,
        fontSize: 36,
      },
      h5: {
        fontSize: 20,
        fontWeight: typographyBase.fontWeightLight,
      },
      h6: {
        ...fontHeader,
        fontSize: 18,
      },
      subtitle1: {
        fontSize: 18,
      },
      subtitle2: {
        fontSize: 16,
      },
      body1: {
        fontWeight: typographyBase.fontWeightRegular,
        fontSize: 16,
      },
      body2: {
        fontSize: 14,
        color: mode === 'light' ? greyColor[700] : greyColor[300],
      },
    },
  };
}
