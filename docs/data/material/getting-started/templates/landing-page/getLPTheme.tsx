import { red } from '@mui/material/colors';
import { createTheme, ThemeOptions, alpha } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

export const brandColor = {
  50: '#F0F7FF',
  100: '#CEE5FD',
  200: '#9CCCFC',
  300: '#55A6F6',
  400: '#0A66C2',
  500: '#0959AA',
  600: '#064079',
  700: '#033363',
  800: '#02294F',
  900: '#021F3B',
};

export const secondaryColor = {
  50: '#F9F0FF',
  100: '#E9CEFD',
  200: '#D49CFC',
  300: '#B355F6',
  400: '#750AC2',
  500: '#6709AA',
  600: '#490679',
  700: '#3B0363',
  800: '#2F024F',
  900: '#23023B',
};

export const greyColor = {
  50: '#FBFCFE',
  100: '#EAF0F5',
  200: '#D6E2EB',
  300: '#BFCCD9',
  400: '#94A6B8',
  500: '#5B6B7C',
  600: '#4C5967',
  700: '#364049',
  800: '#131B20',
  900: '#090E10',
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

const theme = createTheme();

const getDesignTokens = (mode: PaletteMode) =>
  ({
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
              primary: greyColor[800],
              secondary: greyColor[600],
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
  } as ThemeOptions);

const typographyBase = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
};

export default function getLPTheme(): ThemeOptions {
  const fontHeader = {
    color: theme.palette.text.primary,
    fontWeight: typographyBase.fontWeightMedium,
    fontFamily: "'Inter', sans-serif",
  };

  return {
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            color: greyColor[500],
            fontWeight: 500,
            ...theme.applyDarkStyles({
              color: greyColor[300],
            }),
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: greyColor[100],
            ...theme.applyDarkStyles({
              backgroundColor: greyColor[900],
            }),
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: greyColor[50],
            borderRadius: '8px',
            border: `1px solid ${alpha(greyColor[200], 0.8)}`,
            boxShadow: 'none',
            ...theme.applyDarkStyles({
              backgroundColor: greyColor[900],
              border: `1px solid ${alpha(greyColor[700], 0.6)}`,
            }),
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: `${alpha(greyColor[200], 0.8)}`,
            ...theme.applyDarkStyles({
              borderColor: `${alpha(greyColor[700], 0.6)}`,
            }),
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            alignSelf: 'center',
            py: 1.5,
            px: 0.5,
            background: `linear-gradient(to bottom right, ${brandColor[50]}, ${brandColor[100]})`,
            border: '1px solid',
            borderColor: `${alpha(brandColor[500], 0.3)}`,
            fontWeight: '600',
            '&:hover': {
              backgroundColor: brandColor[500],
            },
            '&:focus-visible': {
              borderColor: brandColor[800],
              backgroundColor: brandColor[200],
            },
            '& .MuiChip-label': {
              color: brandColor[500],
            },
            '& .MuiChip-icon': {
              color: brandColor[500],
            },
            ...theme.applyDarkStyles({
              background: `linear-gradient(to bottom right, ${brandColor[700]}, ${brandColor[900]})`,
              borderColor: `${alpha(brandColor[500], 0.5)}`,
              '&:hover': {
                backgroundColor: brandColor[600],
              },
              '&:focus-visible': {
                borderColor: brandColor[200],
                backgroundColor: brandColor[600],
              },
              '& .MuiChip-label': {
                color: brandColor[200],
              },
              '& .MuiChip-icon': {
                color: brandColor[200],
              },
            }),
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: ({
            ownerState,
          }: {
            ownerState: {
              color?: string;
              variant?: string;
              size?: string;
            };
          }) =>
            ({
              boxShadow: 'none',
              borderRadius: '8px',
              ...(ownerState.size === 'small' && {
                maxHeight: '32px',
              }),
              ...(ownerState.size === 'medium' && {
                height: '40px',
              }),
              ...(ownerState.variant === 'contained' &&
                ownerState.color === 'primary' && {
                  backgroundColor: brandColor[400],
                  border: `1px solid ${alpha(brandColor[600], 0.5)}`,
                  boxShadow: `inset 0px 1px 1px ${
                    brandColor[300]
                  }, inset 0px -2px 1px ${alpha(
                    brandColor[700],
                    0.5,
                  )}, 0px 2px 4px rgba(0, 0, 0, 0.1)`,
                  '&:hover': {
                    backgroundColor: brandColor[600],
                    boxShadow: 'none',
                  },
                }),
              ...(ownerState.variant === 'contained' &&
                ownerState.color === 'secondary' && {
                  backgroundColor: secondaryColor[500],
                  border: `1px solid ${alpha(secondaryColor[600], 0.5)}`,
                  boxShadow: `inset 0px 1px 1px ${secondaryColor[300]}, inset 0px -2px 1px ${secondaryColor[600]},  0px 2px 4px rgba(0, 0, 0, 0.1)`,
                  '&:hover': {
                    backgroundColor: secondaryColor[600],
                    boxShadow: 'none',
                  },
                }),
              ...(ownerState.variant === 'outlined' && {
                backgroundColor: alpha(brandColor[300], 0.1),
                borderColor: brandColor[300],
                color: brandColor[500],
                '&:hover': {
                  backgroundColor: alpha(brandColor[300], 0.3),
                  borderColor: brandColor[200],
                },
              }),
              ...(ownerState.variant === 'text' && {
                color: brandColor[500],
                '&:hover': {
                  backgroundColor: alpha(brandColor[300], 0.3),
                  borderColor: brandColor[200],
                },
              }),
              textTransform: 'none',
              '&:active': {
                transform: 'scale(0.98)',
              },
              ...theme.applyDarkStyles({
                ...(ownerState.variant === 'outlined' && {
                  backgroundColor: alpha(brandColor[600], 0.1),
                  borderColor: brandColor[700],
                  color: brandColor[300],
                  '&:hover': {
                    backgroundColor: alpha(brandColor[600], 0.3),
                    borderColor: brandColor[700],
                  },
                }),
                ...(ownerState.variant === 'text' && {
                  color: brandColor[300],
                  '&:hover': {
                    backgroundColor: alpha(brandColor[600], 0.3),
                    borderColor: brandColor[700],
                  },
                }),
              }),
            } as const),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ ownerState }: { ownerState: { color?: string } }) =>
            ({
              color: brandColor[500],
              fontWeight: 500,
              position: 'relative',
              textDecoration: 'none',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: 0,
                height: '1px',
                bottom: 0,
                left: 0,
                backgroundColor: brandColor[200],
                opacity: 0.5,
                transition: 'width 0.3s ease, opacity 0.3s ease',
              },
              '&:hover::before': {
                width: '100%',
                opacity: 1,
              },
              ...theme.applyDarkStyles({
                color: brandColor[200],
              }),
            } as const),
        } as any,
      },
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
          disableGutters: true,
        },
        styleOverrides: {
          root: {
            backgroundColor: '#fff',
            border: '1px solid',
            borderColor: greyColor[100],
            ':before': {
              backgroundColor: 'transparent',
            },
            '&:first-of-type': {
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            },
            '&:last-of-type': {
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            },
            ...theme.applyDarkStyles({
              backgroundColor: greyColor[900],
              borderColor: greyColor[800],
            }),
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
              '&::placeholder': {
                opacity: 0.7,
              },
              fontSize: '14px',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              height: '40px',
              '& fieldset': {
                borderColor: `${alpha(greyColor[500], 0.4)}`,
                boxShadow:
                  '0 -1px 1px rgba(0, 0, 0, 0.1) inset, 0px 2px 4px rgba(0, 0, 0, 0.1)',
                background: `${alpha('#FFF', 0.3)}`,
              },
              '&:hover fieldset': {
                borderColor: greyColor[400],
              },
              '&.Mui-focused fieldset': {
                borderColor: brandColor[400],
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: '14px',
            },
            ...theme.applyDarkStyles({
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: `${alpha(greyColor[500], 0.6)}`,
                  boxShadow:
                    '0 1px 1px rgba(255, 255, 255, 0.1) inset, 0px 2px 4px rgba(0, 0, 0, 0.8)',
                  background: `${alpha(greyColor[800], 0.4)}`,
                },
              },
            }),
          },
        },
      },
    },
    typography: {
      ...typographyBase,
      ...fontHeader,
      h1: {
        ...fontHeader,
        fontSize: 60,
        lineHeight: 1.2,
      },
      h2: {
        ...fontHeader,
        fontSize: 48,
        lineHeight: 1.2,
      },
      h3: {
        ...fontHeader,
        fontSize: 42,
        lineHeight: 1.2,
      },
      h4: {
        ...fontHeader,
        fontSize: 36,
        lineHeight: 1.5,
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
      },
    },
  } as const;
}
