import type {} from '@mui/material/themeCssVarsAugmentation';
import { createTheme, ThemeOptions, alpha } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    highlighted: true;
  }
}
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

const customTheme = createTheme();

export const brand = {
  50: 'hsl(210, 100%, 97%)',
  100: 'hsl(210, 100%, 90%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 65%)',
  400: 'hsl(210, 98%, 48%)',
  500: 'hsl(210, 98%, 42%)',
  600: 'hsl(210, 98%, 55%)',
  700: 'hsl(210, 100%, 35%)',
  800: 'hsl(210, 100%, 16%)',
  900: 'hsl(210, 100%, 21%)',
};

export const gray = {
  50: 'hsl(220, 60%, 99%)',
  100: 'hsl(220, 35%, 94%)',
  200: 'hsl(220, 35%, 88%)',
  300: 'hsl(220, 25%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 25%, 35%)',
  700: 'hsl(220, 25%, 25%)',
  800: 'hsl(220, 25%, 10%)',
  900: 'hsl(220, 30%, 5%)',
};

export const green = {
  50: 'hsl(120, 80%, 98%)',
  100: 'hsl(120, 75%, 94%)',
  200: 'hsl(120, 75%, 87%)',
  300: 'hsl(120, 61%, 77%)',
  400: 'hsl(120, 44%, 53%)',
  500: 'hsl(120, 59%, 30%)',
  600: 'hsl(120, 70%, 25%)',
  700: 'hsl(120, 75%, 16%)',
  800: 'hsl(120, 84%, 10%)',
  900: 'hsl(120, 87%, 6%)',
};

export const orange = {
  50: 'hsl(45, 100%, 97%)',
  100: 'hsl(45, 92%, 90%)',
  200: 'hsl(45, 94%, 80%)',
  300: 'hsl(45, 90%, 65%)',
  400: 'hsl(45, 90%, 40%)',
  500: 'hsl(45, 90%, 35%)',
  600: 'hsl(45, 91%, 25%)',
  700: 'hsl(45, 94%, 20%)',
  800: 'hsl(45, 95%, 16%)',
  900: 'hsl(45, 93%, 12%)',
};

export const red = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 92%, 90%)',
  200: 'hsl(0, 94%, 80%)',
  300: 'hsl(0, 90%, 65%)',
  400: 'hsl(0, 90%, 40%)',
  500: 'hsl(0, 90%, 30%)',
  600: 'hsl(0, 91%, 25%)',
  700: 'hsl(0, 94%, 20%)',
  800: 'hsl(0, 95%, 16%)',
  900: 'hsl(0, 93%, 12%)',
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      light: brand[200],
      main: brand[500],
      dark: brand[800],
      contrastText: brand[50],
      ...(mode === 'dark' && {
        contrastText: brand[50],
        light: brand[300],
        main: brand[400],
        dark: brand[800],
      }),
    },
    info: {
      light: brand[100],
      main: brand[300],
      dark: brand[600],
      contrastText: gray[50],
      ...(mode === 'dark' && {
        contrastText: brand[300],
        light: brand[500],
        main: brand[700],
        dark: brand[900],
      }),
    },
    warning: {
      light: orange[300],
      main: orange[400],
      dark: orange[800],
      ...(mode === 'dark' && {
        light: orange[400],
        main: orange[500],
        dark: orange[700],
      }),
    },
    error: {
      light: red[300],
      main: red[400],
      dark: red[800],
      ...(mode === 'dark' && {
        light: red[400],
        main: red[500],
        dark: red[700],
      }),
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
      default: 'hsl(0, 0%, 100%)',
      paper: gray[50],
      ...(mode === 'dark' && { default: 'hsl(220, 30%, 3%)', paper: gray[900] }),
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
      warning: orange[400],
      ...(mode === 'dark' && { primary: 'hsl(0, 0%, 100%)', secondary: gray[400] }),
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
      fontSize: customTheme.typography.pxToRem(48),
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: customTheme.typography.pxToRem(36),
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: customTheme.typography.pxToRem(30),
      lineHeight: 1.2,
    },
    h4: {
      fontSize: customTheme.typography.pxToRem(24),
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: customTheme.typography.pxToRem(20),
      fontWeight: 600,
    },
    h6: {
      fontSize: customTheme.typography.pxToRem(18),
      fontWeight: 600,
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

export default function getDashboardTheme(mode: PaletteMode): ThemeOptions {
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
            transition: 'all 100ms ease-in',
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
              padding: '0 0.5rem',
            }),
            ...(ownerState.size === 'medium' && {
              height: '2.5rem', // 40px
            }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                color: 'white',
                backgroundColor: gray[900],
                backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
                boxShadow: `inset 0 2px 0 ${gray[600]}, inset 0 -2px 0 hsl(220, 0%, 0%)`,
                border: `1px solid ${gray[700]}`,
                '&:hover': {
                  backgroundImage: 'none',
                  backgroundColor: gray[700],
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: gray[800],
                },
              }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'secondary' && {
                color: 'white',
                backgroundColor: brand[300],
                backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
                boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
                border: `1px solid ${brand[500]}`,
                '&:hover': {
                  backgroundColor: brand[700],
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: brand[700],
                  backgroundImage: 'none',
                },
              }),
            ...(ownerState.variant === 'outlined' && {
              color: gray[600],
              border: '1px solid',
              borderColor: gray[200],
              backgroundColor: gray[50],
              '&:hover': {
                backgroundColor: gray[100],
                borderColor: gray[400],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
            }),
            ...(ownerState.variant === 'outlined' &&
              ownerState.color === 'secondary' && {
                color: brand[700],
                border: '1px solid',
                borderColor: brand[200],
                backgroundColor: brand[50],
                '&:hover': {
                  backgroundColor: brand[100],
                  borderColor: brand[400],
                },
                '&:active': {
                  backgroundColor: alpha(brand[200], 0.7),
                },
              }),
            ...(ownerState.variant === 'text' && {
              color: gray[600],
              '&:hover': {
                backgroundColor: gray[100],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
            }),
            ...(ownerState.variant === 'text' &&
              ownerState.color === 'secondary' && {
                color: brand[700],
                '&:hover': {
                  backgroundColor: alpha(brand[100], 0.5),
                },
                '&:active': {
                  backgroundColor: alpha(brand[200], 0.7),
                },
              }),
            ...(theme.palette.mode === 'dark' && {
              ...(ownerState.variant === 'contained' &&
                ownerState.color === 'primary' && {
                  color: 'black',
                  backgroundColor: gray[50],
                  backgroundImage: `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
                  boxShadow:
                    'inset 0 2px 0 hsl(220, 0%, 100%), inset 0 -2px 0 hsl(220, 30%, 90%)',
                  border: `1px solid ${gray[100]}`,
                  '&:hover': {
                    backgroundImage: 'none',
                    backgroundColor: gray[300],
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: gray[400],
                  },
                }),
              ...(ownerState.variant === 'outlined' && {
                color: gray[50],
                border: '1px solid',
                borderColor: gray[700],
                backgroundColor: gray[800],
                '&:hover': {
                  borderColor: gray[500],
                },
                '&:active': {
                  backgroundColor: gray[900],
                },
              }),
              ...(ownerState.variant === 'outlined' &&
                ownerState.color === 'secondary' && {
                  color: brand[50],
                  border: '1px solid',
                  borderColor: brand[900],
                  backgroundColor: alpha(brand[900], 0.3),
                  '&:hover': {
                    borderColor: brand[500],
                  },
                  '&:active': {
                    backgroundColor: alpha(brand[900], 0.5),
                  },
                }),
              ...(ownerState.variant === 'text' && {
                color: gray[50],
                '&:hover': {
                  backgroundColor: gray[700],
                },
                '&:active': {
                  backgroundColor: alpha(gray[700], 0.7),
                },
              }),
              ...(ownerState.variant === 'text' &&
                ownerState.color === 'secondary' && {
                  color: brand[100],
                  '&:hover': {
                    backgroundColor: alpha(brand[900], 0.5),
                  },
                  '&:active': {
                    backgroundColor: alpha(brand[900], 0.3),
                  },
                }),
            }),
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            return {
              transition: 'all 100ms ease',
              backgroundColor: gray[50],
              borderRadius: theme.shape.borderRadius,
              border: `1px solid ${alpha(gray[200], 0.5)}`,
              boxShadow: 'none',
              ...(ownerState.variant === 'outlined' && {
                border: `1px solid ${gray[200]}`,
                boxShadow: 'none',
                background: `linear-gradient(to bottom, hsl(0, 0%, 100%), ${gray[50]})`,
              }),
              ...(theme.palette.mode === 'dark' && {
                backgroundColor: alpha(gray[800], 0.6),
                border: `1px solid ${alpha(gray[700], 0.3)}`,
                ...(ownerState.variant === 'outlined' && {
                  border: `1px solid ${alpha(gray[700], 0.4)}`,
                  boxShadow: 'none',
                  background: `linear-gradient(to bottom, ${gray[900]}, ${alpha(
                    gray[800],
                    0.5,
                  )})`,
                }),
              }),
            };
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            boxShadow: 'none',
            borderRadius: theme.shape.borderRadius,
            textTransform: 'none',
            fontWeight: theme.typography.fontWeightMedium,
            letterSpacing: 0,
            color: gray[600],
            border: '1px solid',
            borderColor: gray[200],
            backgroundColor: gray[50],
            '&:hover': {
              backgroundColor: gray[100],
              borderColor: gray[400],
            },
            '&:active': {
              backgroundColor: gray[200],
            },
            ...(ownerState.size === 'small' && {
              minWidth: '2rem',
              height: '2rem',
              padding: '0.25rem',
            }),
            ...(ownerState.size === 'medium' && {
              minWidth: '2.5rem',
              height: '2.5rem',
            }),
            ...(theme.palette.mode === 'dark' && {
              color: gray[50],
              border: '1px solid',
              borderColor: gray[700],
              backgroundColor: gray[800],
              '&:hover': {
                backgroundColor: gray[800],
                borderColor: gray[500],
              },
              '&:active': {
                backgroundColor: gray[900],
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
      MuiLinearProgress: {
        styleOverrides: {
          root: ({ theme }) => ({
            height: 8,
            borderRadius: 8,
            backgroundColor: gray[200],
            ...(theme.palette.mode === 'dark' && {
              backgroundColor: gray[800],
            }),
          }),
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
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            marginTop: 4,
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            backgroundImage: 'none',
            boxShadow:
              'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
            '& .MuiMenuItem-root': { borderRadius: 6, margin: '0 6px' },
            ...(theme.palette.mode === 'dark' && {
              boxShadow:
                'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
            }),
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            color: gray[900],
            borderRadius: theme.shape.borderRadius,
            border: '1px solid',
            borderColor: gray[200],
            '&:hover': {
              borderColor: gray[400],
            },
            '&.Mui-focused': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              borderColor: brand[400],
            },
            ...(ownerState.size === 'small' && {
              height: '2rem',
              padding: '0 0.5rem',
            }),
            ...(ownerState.size === 'medium' && {
              height: '2.5rem',
            }),
            ...(theme.palette.mode === 'dark' && {
              borderColor: gray[700],
              color: gray[300],
              '&:hover': {
                borderColor: gray[500],
              },
            }),
          }),
          notchedOutline: ({ theme }) => ({
            border: 'none',
          }),
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '10px',
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
            borderRadius: '10px',
            fontWeight: 500,
            ...(theme.palette.mode === 'dark' && {
              color: gray[400],
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
              '&.Mui-selected': { color: brand[300] },
            }),
          }),
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .Mui-selected': {
              color: theme.palette.grey[900],
            },
            ...(theme.palette.mode === 'dark' && {
              '& .Mui-selected': {
                color: '#fff',
              },
            }),
          }),
          indicator: ({ theme }) => ({
            backgroundColor: theme.palette.grey[800],
            ...(theme.palette.mode === 'dark' && {
              backgroundColor: theme.palette.grey[200],
            }),
          }),
        },
      },
      MuiTab: {
        styleOverrides: {
          root: ({ theme }) => ({
            textTransform: 'none',
            px: 4,
            minWidth: 'fit-content',
            color: theme.palette.grey[400],
            '&.Mui-selected': {
              color: theme.palette.grey[900],
            },
            ...(theme.palette.mode === 'dark' && {
              '&.Mui-selected': {
                color: '#fff',
              },
            }),
          }),
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.grey[500],
            ...(theme.palette.mode === 'dark' && {
              color: theme.palette.grey[400],
            }),
          }),
        },
      },
      MuiPickersPopper: {
        styleOverrides: {
          paper: ({ theme }) => ({
            marginTop: 4,
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            backgroundImage: 'none',
            boxShadow:
              'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
            '& .MuiMenuItem-root': { borderRadius: 6, margin: '0 6px' },
            ...(theme.palette.mode === 'dark' && {
              boxShadow:
                'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
            }),
          }),
        },
      },
      MuiPickersArrowSwitcher: {
        styleOverrides: {
          button: ({ theme }) => ({
            color: theme.palette.grey[500],
            ...(theme.palette.mode === 'dark' && {
              color: theme.palette.grey[400],
            }),
          }),
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          switchViewButton: {
            padding: 0,
            border: 'none',
          },
        },
      },
      MuiPickersMonth: {
        styleOverrides: {
          monthButton: ({ theme }) => ({
            fontSize: theme.typography.body1.fontSize,
            color: theme.palette.grey[600],
            padding: theme.spacing(0.5),
            borderRadius: theme.shape.borderRadius,
            '&.Mui-selected': {
              backgroundColor: gray[700],
            },
            '&:focus': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              '&.Mui-selected': { backgroundColor: gray[700] },
            },
            ...(theme.palette.mode === 'dark' && {
              color: theme.palette.grey[500],
              '&:focus': {
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
                '&.Mui-selected': { backgroundColor: gray[300] },
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                '&.Mui-selected': { backgroundColor: gray[100] },
              },
              '&.Mui-selected': {
                color: theme.palette.common.black,
                backgroundColor: gray[300],
              },
            }),
          }),
        },
      },
      MuiPickersYear: {
        styleOverrides: {
          yearButton: ({ theme }) => ({
            fontSize: theme.typography.body1.fontSize,
            color: theme.palette.grey[600],
            padding: theme.spacing(0.5),
            borderRadius: theme.shape.borderRadius,
            height: 'fit-content',
            '&.Mui-selected': {
              backgroundColor: gray[700],
            },
            '&:focus': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              '&.Mui-selected': { backgroundColor: gray[700] },
            },
            ...(theme.palette.mode === 'dark' && {
              color: theme.palette.grey[500],
              '&:focus': {
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
                '&.Mui-selected': { backgroundColor: gray[300] },
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                '&.Mui-selected': { backgroundColor: gray[100] },
              },
              '&.Mui-selected': {
                color: theme.palette.common.black,
                backgroundColor: gray[300],
              },
            }),
          }),
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontSize: theme.typography.body1.fontSize,
            color: theme.palette.grey[600],
            padding: theme.spacing(0.5),
            borderRadius: theme.shape.borderRadius,
            '&.Mui-selected': {
              backgroundColor: gray[700],
            },
            '&:focus': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              '&.Mui-selected': { backgroundColor: gray[700] },
            },
            ...(theme.palette.mode === 'dark' && {
              color: theme.palette.grey[500],
              '&:focus': {
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
                '&.Mui-selected': { backgroundColor: gray[300] },
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                '&.Mui-selected': { backgroundColor: gray[100] },
              },
              '&.Mui-selected': {
                color: theme.palette.common.black,
                backgroundColor: gray[300],
              },
            }),
          }),
        },
      },
      MuiChartsAxis: {
        styleOverrides: {
          root: {
            '& .MuiChartsAxis-line': {
              stroke: gray[300],
            },
            '& .MuiChartsAxis-tick': {
              stroke: gray[300],
            },
            '& .MuiChartsAxis-tickLabel': {
              fill: gray[400],
              fontWeight: 500,
            },
          },
        },
      },
    },
  };
}
