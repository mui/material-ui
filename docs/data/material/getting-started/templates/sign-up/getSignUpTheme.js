import * as React from 'react';

import { createTheme, alpha } from '@mui/material/styles';

import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const customTheme = createTheme();

export const brand = {
  50: '#F0F7FF',
  100: '#CCE5FF',
  200: '#99CCFF',
  300: '#4CA6FF',
  400: '#027AF2',
  500: '#026BD4',
  600: '#025AB1',
  700: '#004080',
  800: '#002951',
  900: '#001F3D',
};

export const secondary = {
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

export const gray = {
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

export const green = {
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

export const red = {
  50: '#FFF0F0',
  100: '#FDCECE',
  200: '#FC9C9C',
  300: '#F65555',
  400: '#C20A0A',
  500: '#910808',
  600: '#790606',
  700: '#630303',
  800: '#4F0202',
  900: '#3B0202',
};

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      light: brand[200],
      main: brand[500],
      dark: brand[800],
      contrastText: brand[50],
      ...(mode === 'dark' && {
        contrastText: brand[100],
        light: brand[300],
        main: brand[400],
        dark: brand[800],
      }),
    },
    secondary: {
      light: secondary[300],
      main: secondary[500],
      dark: secondary[800],
      ...(mode === 'dark' && {
        light: secondary[400],
        main: secondary[500],
        dark: secondary[900],
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
      light: green[300],
      main: green[400],
      dark: green[800],
      ...(mode === 'dark' && {
        light: green[400],
        main: green[500],
        dark: green[700],
      }),
    },
    grey: {
      ...gray,
    },
    divider: mode === 'dark' ? alpha(gray[600], 0.3) : alpha(gray[300], 0.5),
    background: {
      default: '#fff',
      paper: gray[50],
      ...(mode === 'dark' && { default: gray[900], paper: gray[800] }),
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
      ...(mode === 'dark' && { primary: '#fff', secondary: gray[400] }),
    },
    action: {
      selected: `${alpha(brand[200], 0.2)}`,
      ...(mode === 'dark' && {
        selected: alpha(brand[800], 0.2),
      }),
    },
  },
  typography: {
    fontFamily: ['"Inter", "sans-serif"'].join(','),
    h1: {
      fontSize: customTheme.typography.pxToRem(60),
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: customTheme.typography.pxToRem(48),
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: customTheme.typography.pxToRem(42),
      lineHeight: 1.2,
    },
    h4: {
      fontSize: customTheme.typography.pxToRem(36),
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: customTheme.typography.pxToRem(20),
      fontWeight: 600,
    },
    h6: {
      fontSize: customTheme.typography.pxToRem(18),
    },
    subtitle1: {
      fontSize: customTheme.typography.pxToRem(18),
    },
    subtitle2: {
      fontSize: customTheme.typography.pxToRem(16),
    },
    body1: {
      fontSize: customTheme.typography.pxToRem(15),
      fontWeight: 400,
    },
    body2: {
      fontSize: customTheme.typography.pxToRem(14),
      fontWeight: 400,
    },
    caption: {
      fontSize: customTheme.typography.pxToRem(12),
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default function getSignUpTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            boxSizing: 'border-box',
            transition: 'all 120ms ease-in',
            '&:focus-visible': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            boxShadow: 'none',
            borderRadius: theme.shape.borderRadius,
            textTransform: 'none',
            ...(ownerState.size === 'small' && {
              height: '2rem', // 32px
            }),
            ...(ownerState.size === 'medium' && {
              height: '2.5rem', // 40px
            }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                color: 'white',
                backgroundColor: brand[300],
                backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
                boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
                border: `1px solid ${brand[500]}`,
                '&:hover': {
                  backgroundColor: brand[600],
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: brand[600],
                  boxShadow: `inset 0 2.5px 0 ${alpha(brand[700], 0.4)}`,
                  backgroundImage: 'none',
                },
              }),
            ...(ownerState.variant === 'outlined' && {
              color: brand[600],
              backgroundColor: alpha(brand[300], 0.1),
              borderColor: alpha(brand[200], 0.8),
              boxShadow: `inset 0 2px ${alpha(brand[50], 0.5)}, inset 0 -2px ${alpha(brand[200], 0.2)}`,
              '&:hover': {
                backgroundColor: alpha(brand[300], 0.2),
                borderColor: alpha(brand[300], 0.5),
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: alpha(brand[300], 0.3),
                boxShadow: `inset 0 2.5px 0 ${alpha(brand[400], 0.2)}`,
                backgroundImage: 'none',
              },
            }),
            ...(ownerState.variant === 'outlined' &&
              ownerState.color === 'secondary' && {
                backgroundColor: alpha(gray[300], 0.1),
                borderColor: alpha(gray[300], 0.5),
                color: gray[700],
                '&:hover': {
                  backgroundColor: alpha(gray[300], 0.3),
                  borderColor: alpha(gray[300], 0.5),
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: alpha(gray[300], 0.4),
                  boxShadow: `inset 0 2.5px 0 ${alpha(gray[400], 0.2)}`,
                  backgroundImage: 'none',
                },
              }),
            ...(ownerState.variant === 'text' &&
              ownerState.color === 'primary' && {
                color: brand[600],
                '&:hover': {
                  backgroundColor: alpha(brand[300], 0.3),
                },
              }),
            ...(ownerState.variant === 'text' &&
              ownerState.color === 'info' && {
                color: gray[700],
                '&:hover': {
                  backgroundColor: alpha(gray[300], 0.3),
                },
              }),
            ...(theme.palette.mode === 'dark' && {
              ...(ownerState.variant === 'outlined' && {
                color: brand[200],
                backgroundColor: alpha(brand[600], 0.1),
                borderColor: alpha(brand[600], 0.6),
                boxShadow: `inset 0 2.5px ${alpha(brand[400], 0.1)}, inset 0 -2px ${alpha(gray[900], 0.5)}`,
                '&:hover': {
                  backgroundColor: alpha(brand[700], 0.2),
                  borderColor: alpha(brand[700], 0.5),
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: alpha(brand[800], 0.2),
                  boxShadow: `inset 0 2.5px 0 ${alpha(brand[900], 0.4)}`,
                  backgroundImage: 'none',
                },
              }),
              ...(ownerState.variant === 'text' &&
                ownerState.color === 'info' && {
                  color: gray[200],
                  '&:hover': {
                    backgroundColor: alpha(gray[700], 0.3),
                  },
                }),
              ...(ownerState.variant === 'outlined' &&
                ownerState.color === 'secondary' && {
                  color: gray[300],
                  backgroundColor: alpha(gray[600], 0.1),
                  borderColor: alpha(gray[700], 0.5),
                  boxShadow: `inset 0 2.5px ${alpha(gray[600], 0.1)}, inset 0 -2px ${alpha(gray[900], 0.5)}`,
                  '&:hover': {
                    backgroundColor: alpha(gray[700], 0.2),
                    borderColor: alpha(gray[700], 0.5),
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: alpha(gray[800], 0.2),
                    boxShadow: `inset 0 2.5px 0 ${alpha(gray[900], 0.4)}`,
                    backgroundImage: 'none',
                  },
                }),
              ...(ownerState.variant === 'text' &&
                ownerState.color === 'primary' && {
                  color: brand[200],
                  '&:hover': {
                    backgroundColor: alpha(brand[700], 0.3),
                  },
                }),
            }),
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            backgroundColor: gray[50],
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${alpha(gray[200], 0.8)}`,
            boxShadow: 'none',
            ...(ownerState.variant === 'outlined' && {
              boxShadow: 'none',
              background: `linear-gradient(to bottom, #FFF, ${gray[50]})`,
            }),
            ...(theme.palette.mode === 'dark' && {
              backgroundColor: alpha(gray[800], 0.4),
              border: `1px solid ${gray[800]}`,
              ...(ownerState.variant === 'outlined' && {
                boxShadow: 'none',
                background: `linear-gradient(to bottom, ${gray[900]}, ${alpha(
                  gray[800],
                  0.5,
                )})`,
              }),
            }),
          }),
        },
      },
      MuiCheckbox: {
        defaultProps: {
          disableRipple: true,
          icon: <CheckBoxOutlineBlankRoundedIcon sx={{ color: 'rgba(0,0,0,0)' }} />,
          checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            margin: 10,
            height: 16,
            width: 16,
            borderRadius: 5,
            border: '1px solid ',
            borderColor: alpha(gray[300], 0.8),
            boxShadow: '0 0 0 1.5px rgba(0, 0, 0, 0.04) inset',
            transition: 'border-color 120ms ease-in',
            backgroundColor: alpha(gray[100], 0.4),
            '&:hover': {
              borderColor: brand[300],
            },
            '&.Mui-focusVisible': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              borderColor: brand[400],
            },
            '&.Mui-checked': {
              color: 'white',
              backgroundColor: brand[500],
              '&:hover': {
                borderColor: brand[300],
                backgroundColor: brand[600],
              },
            },
            ...(theme.palette.mode === 'dark' && {
              borderColor: alpha(gray[700], 0.5),
              boxShadow: '0 0 0 1.5px rgb(0, 0, 0) inset',
              backgroundColor: alpha(gray[900], 0.8),
              '&:hover': {
                borderColor: brand[300],
              },
              '&.Mui-checked': {
                color: 'white',
                backgroundColor: brand[600],
                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.2) inset',
                '&:hover': {
                  borderColor: brand[300],
                  backgroundColor: brand[800],
                },
              },
              '&.Mui-focusVisible': {
                borderColor: brand[400],
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
              },
            }),
          }),
        },
      },
      MuiDialog: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiDialog-paper': {
              borderRadius: '10px',
              border: '1px solid',
              borderColor: theme.palette.divider,
            },
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: `${alpha(gray[200], 0.8)}`,
            ...(theme.palette.mode === 'dark' && {
              borderColor: `${alpha(gray[700], 0.4)}`,
            }),
          }),
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            typography: theme.typography.caption,
            marginBottom: 8,
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            ...(ownerState.size === 'small' && {
              height: '2rem',
              width: '2rem',
            }),
            ...(ownerState.size === 'medium' && {
              height: '2.5rem',
              width: '2.rem',
            }),
            color: brand[500],
            '&:hover': {
              backgroundColor: alpha(brand[300], 0.3),
              borderColor: brand[200],
            },
            ...(theme.palette.mode === 'dark' && {
              color: brand[200],
              '&:hover': {
                backgroundColor: alpha(brand[600], 0.3),
                borderColor: brand[700],
              },
            }),
          }),
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            border: 'none',
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            color: brand[600],
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
              backgroundColor: brand[200],
              opacity: 0.7,
              transition: 'width 0.3s ease, opacity 0.3s ease',
            },
            '&:hover::before': {
              width: '100%',
              opacity: 1,
            },
            '&:focus-visible': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '4px',
              borderRadius: '2px',
            },
            ...(theme.palette.mode === 'dark' && {
              color: brand[200],
            }),
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            border: 'none',
          },
          input: {
            paddingLeft: 10,
          },
          root: ({ theme, ownerState }) => ({
            'input:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 1000px ${brand[100]} inset, 0 0 0 1px ${brand[200]}`,
              maxHeight: '4px',
              borderRadius: '8px',
            },
            '& .MuiInputBase-input': {
              '&::placeholder': {
                opacity: 0.7,
                color: gray[500],
              },
            },
            boxSizing: 'border-box',
            flexGrow: 1,
            height: '40px',
            borderRadius: theme.shape.borderRadius,
            border: '1px solid',
            borderColor: alpha(gray[300], 0.8),
            boxShadow: '0 0 0 1.5px rgba(0, 0, 0, 0.02) inset',
            transition: 'border-color 120ms ease-in',
            backgroundColor: alpha(gray[100], 0.4),
            '&:hover': {
              borderColor: brand[300],
            },
            '&.Mui-focused': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              borderColor: brand[400],
            },
            ...(ownerState.color === 'error' && {
              borderColor: red[200],
              color: red[500],
              '& + .MuiFormHelperText-root': {
                color: red[500],
              },
            }),
            ...(theme.palette.mode === 'dark' && {
              'input:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 1000px ${brand[900]} inset, 0 0 0 1px ${brand[600]}`,
                maxHeight: '6px',
                borderRadius: '8px',
              },
              '& .MuiInputBase-input': {
                '&::placeholder': {
                  opacity: 1,
                  color: gray[500],
                },
              },
              borderColor: alpha(gray[700], 0.5),
              boxShadow: '0 0 0 1.5px rgb(0, 0, 0) inset',
              backgroundColor: alpha(gray[900], 0.8),
              transition: 'border-color 120ms ease-in',
              '&:hover': {
                borderColor: brand[300],
              },
              '&.Mui-focused': {
                borderColor: brand[400],
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
              },
              ...(ownerState.color === 'error' && {
                borderColor: red[700],
                color: red[300],
                '& + .MuiFormHelperText-root': {
                  color: red[300],
                },
              }),
            }),
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: 'none',
            backgroundColor: gray[100],
            ...(theme.palette.mode === 'dark' && {
              backgroundColor: alpha(gray[900], 0.6),
            }),
          }),
        },
      },
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
            boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
            '& .Mui-selected': {
              color: brand[500],
            },
            ...(theme.palette.mode === 'dark' && {
              '& .Mui-selected': {
                color: '#fff',
              },
              boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
            }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: '12px 16px',
            textTransform: 'none',
            borderRadius: theme.shape.borderRadius,
            fontWeight: 500,
            ...(theme.palette.mode === 'dark' && {
              color: gray[400],
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
              '&.Mui-selected': { color: brand[300] },
            }),
          }),
        },
      },
    },
  };
}
