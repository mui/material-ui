import type {} from '@mui/material/themeCssVarsAugmentation';
import { ThemeOptions, alpha } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}
}

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

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      light: brandColor[300],
      main: brandColor[500],
      dark: brandColor[800],
      contrastText: brandColor[100],
      ...(mode === 'dark' && {
        contrastText: brandColor[100],
        light: brandColor[300],
        main: brandColor[500],
        dark: brandColor[800],
      }),
    },
    secondary: {
      light: secondaryColor[300],
      main: secondaryColor[500],
      dark: secondaryColor[800],
      ...(mode === 'dark' && {
        light: secondaryColor[400],
        main: secondaryColor[500],
        dark: secondaryColor[900],
      }),
    },
    warning: {
      main: '#F7B538',
      dark: '#F79F00',
      ...(mode === 'dark' && { main: '#F7B538', dark: '#F79F00' }),
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
      ...(mode === 'dark' && { light: '#D32F2F', main: '#D32F2F', dark: '#B22A2A' }),
    },
    success: {
      light: successColor[300],
      main: successColor[400],
      dark: successColor[800],
      ...(mode === 'dark' && {
        light: successColor[400],
        main: successColor[500],
        dark: successColor[700],
      }),
    },
    grey: {
      50: greyColor[50],
      100: greyColor[100],
      200: greyColor[200],
      300: greyColor[300],
      400: greyColor[400],
      500: greyColor[500],
      600: greyColor[600],
      700: greyColor[700],
      800: greyColor[800],
      900: greyColor[900],
    },
    background: {
      default: '#fff',
      paper: greyColor[50],
      ...(mode === 'dark' && { default: greyColor[900], paper: greyColor[800] }),
    },
    text: {
      primary: greyColor[800],
      secondary: greyColor[600],
      ...(mode === 'dark' && { primary: '#fff', secondary: greyColor[300] }),
    },
    action: {
      selected: `${alpha(brandColor[100], 0.2)}`,
      ...(mode === 'dark' && {
        selected: alpha(brandColor[800], 0.2),
      }),
    },
  },
  typography: {
    fontFamily: ['"Inter", "sans-serif"'].join(','),
    h1: {
      fontWeight: 600,
      lineHeight: 78 / 70,
      fontSize: 60,
      letterSpacing: -0.2,
    },
    h2: {
      fontSize: 48,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 42,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 36,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
    },
    body1: {
      fontWeight: 500,
      fontSize: '14px',
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
    },
    caption: {
      fontWeight: 400,
      fontSize: 12,
    },
  },
});

export default function getLPTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
          disableGutters: true,
        },
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
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
          }),
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
      MuiButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            boxShadow: 'none',
            borderRadius: '10px',
            ...(ownerState.size === 'small' && {
              maxHeight: '32px',
            }),
            ...(ownerState.size === 'medium' && {
              height: '40px',
            }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                color: brandColor[50],
                background: `linear-gradient(to bottom, ${brandColor[400]}, ${brandColor[600]})`,
                boxShadow: `inset 0 1px ${alpha(brandColor[300], 0.4)}`,
                outline: `1px solid  ${brandColor[700]}`,
                '&:hover': {
                  background: `linear-gradient(to bottom, ${brandColor[400]}, ${brandColor[500]})`,
                  boxShadow: `0 0 0 1px  ${alpha(brandColor[300], 0.5)}`,
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
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            backgroundColor: greyColor[50],
            borderRadius: '10px',
            border: `1px solid ${alpha(greyColor[200], 0.8)}`,
            boxShadow: 'none',
            ...(ownerState.variant === 'outlined' && {
              background: `linear-gradient(to bottom, ${greyColor[50]}, ${greyColor[100]})`,
              '&:hover': {
                borderColor: brandColor[300],
                boxShadow: `0 0 24px ${brandColor[100]}`,
              },
            }),
            ...theme.applyDarkStyles({
              backgroundColor: greyColor[900],
              border: `1px solid ${alpha(greyColor[700], 0.6)}`,
              ...(ownerState.variant === 'outlined' && {
                background: `linear-gradient(to bottom, ${greyColor[800]}, ${greyColor[900]})`,
                '&:hover': {
                  borderColor: brandColor[700],
                  boxShadow: `0 0 24px ${brandColor[800]}`,
                },
              }),
            }),
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
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
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            borderColor: `${alpha(greyColor[200], 0.8)}`,
            ...theme.applyDarkStyles({
              borderColor: `${alpha(greyColor[700], 0.6)}`,
            }),
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
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
              opacity: 0.7,
              transition: 'width 0.3s ease, opacity 0.3s ease',
            },
            '&:hover::before': {
              width: '100%',
              opacity: 1,
            },
            ...theme.applyDarkStyles({
              color: brandColor[200],
            }),
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            borderRadius: '10px',
            color: greyColor[500],
            fontWeight: 500,
            ...theme.applyDarkStyles({
              color: greyColor[300],
            }),
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            backgroundColor: greyColor[100],
            ...theme.applyDarkStyles({
              backgroundColor: greyColor[900],
            }),
          }),
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
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
              height: '100%',
              minHeight: '40px',
              border: 'none',
              borderRadius: '10px',
              outline: `1px solid ${alpha(greyColor[500], 0.3)}`,
              '& fieldset': {
                border: 'none',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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
                height: '100%',
                minHeight: '40px',
                border: 'none',
                borderRadius: '10px',
                outline: `1px solid ${alpha(greyColor[500], 0.6)}`,
                '& fieldset': {
                  border: 'none',
                  boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.4)',
                  background: `${alpha(greyColor[800], 0.4)}`,
                },
              },
            }),
          }),
        },
      },
    },
  };
}
