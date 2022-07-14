import { deepmerge } from '@mui/utils';
import type {} from '@mui/material/themeCssVarsAugmentation';
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import { createTheme, ThemeOptions, Theme, alpha } from '@mui/material/styles';

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

  interface Palette {
    primaryDark: PaletteColor;
  }
}

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    fontWeightSemiBold?: number;
    fontWeightExtraBold?: number;
    fontFamilyCode?: string;
    fontFamilySystem?: string;
  }

  interface Typography {
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
    fontFamilyCode: string;
    fontFamilySystem: string;
  }
}

// TODO: enable this once types conflict is fixed
// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     code: true;
//   }
// }

const defaultTheme = createTheme();

export const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  main: '#007FFF',
  500: '#007FFF',
  600: '#0072E5', // vs blueDark 900: WCAG 4.6 AAA (large), APCA 36 Not for reading text
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};
export const blueDark = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  main: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C', // contrast 13.64:1
  800: '#001E3C',
  900: '#0A1929',
};
export const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7', // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
  400: '#B2BAC2', // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
  500: '#A0AAB4', // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
  600: '#6F7E8C', // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
  700: '#3E5060', // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
  800: '#2D3843', // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
  900: '#1A2027',
};
export const error = {
  50: '#FFF0F1',
  100: '#FFDBDE',
  200: '#FFBDC2',
  300: '#FF99A2',
  400: '#FF7A86',
  500: '#FF505F',
  main: '#EB0014', // contrast 4.63:1
  600: '#EB0014',
  700: '#C70011',
  800: '#94000D',
  900: '#570007',
};
export const success = {
  50: '#E9FBF0',
  100: '#C6F6D9',
  200: '#9AEFBC',
  300: '#6AE79C',
  400: '#3EE07F',
  500: '#21CC66',
  600: '#1DB45A',
  700: '#1AA251',
  800: '#178D46',
  900: '#0F5C2E',
};
export const warning = {
  50: '#FFF9EB',
  100: '#FFF3C1',
  200: '#FFECA1',
  300: '#FFDC48', // vs blueDark900: WCAG 10.4 AAA, APCA 72 Ok for text
  400: '#F4C000', // vs blueDark900: WCAG 6.4 AA normal, APCA 48 Only large text
  500: '#DEA500', // vs blueDark900: WCAG 8 AAA normal, APCA 58 Only large text
  main: '#DEA500',
  600: '#D18E00', // vs blueDark900: WCAG 6.4 AA normal, APCA 48 Only large text
  700: '#AB6800', // vs white bg: WCAG 4.4 AA large, APCA 71 Ok for text
  800: '#8C5800', // vs white bg: WCAG 5.9 AAA large, APCA 80 Best for text
  900: '#5A3600', // vs white bg: WCAG 10.7 AAA, APCA 95 Best for text
};
// context on the Advanced Perceptual Contrast Algorithm (APCA) used above here: https://github.com/w3c/wcag/issues/695

const systemFont = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

export const getMetaThemeColor = (mode: 'light' | 'dark') => {
  const themeColor = {
    light: grey[50],
    dark: blueDark[800],
  };
  return themeColor[mode];
};

export const getDesignTokens = (mode: 'light' | 'dark') =>
  ({
    palette: {
      primary: {
        ...blue,
        ...(mode === 'dark' && {
          main: blue[400],
        }),
      },
      divider: mode === 'dark' ? alpha(blue[100], 0.08) : grey[100],
      primaryDark: blueDark,
      mode,
      ...(mode === 'dark' && {
        background: {
          default: blueDark[800],
          paper: blueDark[900],
        },
      }),
      common: {
        black: '#1D1D1D',
      },
      ...(mode === 'light' && {
        text: {
          primary: grey[900],
          secondary: grey[700],
        },
      }),
      ...(mode === 'dark' && {
        text: {
          primary: '#fff',
          secondary: grey[400],
        },
      }),
      grey,
      error,
      success: {
        ...success,
        ...(mode === 'dark' && {
          main: '#1DB45A', // contrast 6.17:1 (blueDark.800)
        }),
        ...(mode === 'light' && {
          main: '#1AA251', // contrast 3.31:1
        }),
      },
      warning,
    },
    shape: {
      borderRadius: 10,
    },
    spacing: 10,
    typography: {
      fontFamily: ['"IBM Plex Sans"', ...systemFont].join(','),
      fontFamilyCode: [
        'Consolas',
        'Menlo',
        'Monaco',
        'Andale Mono',
        'Ubuntu Mono',
        'monospace',
      ].join(','),
      fontFamilyTagline: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
      fontFamilySystem: systemFont.join(','),
      fontWeightSemiBold: 600,
      fontWeightExtraBold: 800,
      h1: {
        fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
        fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)',
        fontWeight: 800,
        lineHeight: 78 / 70,
        ...(mode === 'light' && {
          color: blueDark[900],
        }),
      },
      h2: {
        fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
        fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
        fontWeight: 800,
        lineHeight: 44 / 36,
        color: mode === 'dark' ? grey[100] : blueDark[700],
      },
      h3: {
        fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(36),
        lineHeight: 44 / 36,
        letterSpacing: 0.2,
      },
      h4: {
        fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(28),
        lineHeight: 42 / 28,
        letterSpacing: 0.2,
      },
      h5: {
        fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(24),
        lineHeight: 36 / 24,
        letterSpacing: 0.1,
        color: mode === 'dark' ? blue[300] : blue.main,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(20),
        lineHeight: 30 / 20,
      },
      button: {
        textTransform: 'initial',
        fontWeight: 700,
        letterSpacing: 0,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
        lineHeight: 24 / 18,
        letterSpacing: 0,
        fontWeight: 500,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(16), // 16px
        lineHeight: 24 / 16,
        letterSpacing: 0,
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14), // 14px
        lineHeight: 21 / 14,
        letterSpacing: 0,
      },
      caption: {
        display: 'inline-block',
        fontSize: defaultTheme.typography.pxToRem(12), // 12px
        lineHeight: 18 / 12,
        letterSpacing: 0,
        fontWeight: 700,
      },
      allVariants: {
        scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
      },
    },
  } as ThemeOptions);

export function getThemedComponents(theme: Theme): { components: Theme['components'] } {
  return {
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          sizeLarge: {
            padding: '0.875rem 1rem',
            ...theme.typography.body1,
            lineHeight: 21 / 16,
            fontWeight: 700,
          },
          sizeSmall: {
            padding: theme.spacing(0.5, 1),
            marginLeft: theme.spacing(-1),
          },
          containedPrimary: {
            backgroundColor: (theme.vars || theme).palette.primary[500],
            color: '#fff',
          },
        },
        variants: [
          {
            // @ts-ignore internal repo module augmentation issue
            props: { variant: 'code' },
            style: {
              border: '1px solid',
              ...(!theme.vars
                ? {
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[400]
                        : theme.palette.grey[800],
                    borderColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[400]
                        : theme.palette.grey[300],
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[700]
                        : theme.palette.grey[50],
                  }
                : {
                    color: theme.vars.palette.grey[800],
                    borderColor: theme.vars.palette.grey[300],
                    backgroundColor: theme.vars.palette.grey[50],
                    [theme.getColorSchemeSelector('dark')]: {
                      color: theme.vars.palette.grey[400],
                      borderColor: theme.vars.palette.primaryDark[300],
                      backgroundColor: theme.vars.palette.primaryDark[700],
                    },
                  }),
              fontFamily: theme.typography.fontFamilyCode,
              fontWeight: 400,
              fontSize: defaultTheme.typography.pxToRem(13), // 14px
              lineHeight: 21 / 14,
              letterSpacing: 0,
              WebkitFontSmoothing: 'subpixel-antialiased',
              '&:hover, &.Mui-focusVisible': {
                borderColor: (theme.vars || theme).palette.primary.main,
                ...(!theme.vars
                  ? {
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? theme.palette.primaryDark[600]
                          : theme.palette.primary[50],
                      '& .MuiButton-endIcon': {
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.primary[300]
                            : theme.palette.primary.main,
                      },
                    }
                  : {
                      backgroundColor: theme.vars.palette.primary[50],
                      [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: theme.vars.palette.primaryDark[600],
                      },
                      '& .MuiButton-endIcon': {
                        color: theme.vars.palette.primary.main,
                        [theme.getColorSchemeSelector('dark')]: {
                          color: theme.vars.palette.primary[300],
                        },
                      },
                    }),
              },
              '& .MuiButton-startIcon': {
                color: (theme.vars || theme).palette.grey[400],
              },
              '& .MuiButton-endIcon': {
                display: 'inline-block',
                position: 'absolute',
                right: 0,
                marginRight: 10,
                ...(!theme.vars
                  ? {
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.grey[400]
                          : theme.palette.grey[700],
                    }
                  : {
                      color: theme.vars.palette.grey[400],
                      [theme.getColorSchemeSelector('dark')]: {
                        color: theme.vars.palette.grey[700],
                      },
                    }),
              },
            },
          },
          {
            // @ts-ignore internal repo module augmentation issue
            props: { variant: 'link' },
            style: {
              fontSize: theme.typography.pxToRem(14),
              fontWeight: 700,
              ...(!theme.vars
                ? {
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary[300]
                        : theme.palette.primary[600],
                  }
                : {
                    color: theme.vars.palette.primary[600],
                    [theme.getColorSchemeSelector('dark')]: {
                      color: theme.vars.palette.primary[300],
                    },
                  }),
              mb: 1,
              '& svg': {
                ml: -0.5,
              },
            },
          },
        ],
      },
      MuiIconButton: {
        variants: [
          {
            props: { color: 'primary' },
            style: {
              height: 34,
              width: 34,
              border: `1px solid`,
              ...(!theme.vars
                ? {
                    borderColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[700]
                        : theme.palette.grey[200],
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary[300]
                        : theme.palette.primary[500],
                    '&:hover': {
                      borderColor:
                        theme.palette.mode === 'dark'
                          ? theme.palette.primaryDark[600]
                          : theme.palette.grey[300],
                      background:
                        theme.palette.mode === 'dark'
                          ? alpha(theme.palette.primaryDark[700], 0.4)
                          : theme.palette.grey[50],
                    },
                  }
                : {
                    borderColor: theme.vars.palette.grey[200],
                    color: theme.vars.palette.primary[500],
                    [theme.getColorSchemeSelector('dark')]: {
                      borderColor: theme.vars.palette.grey[700],
                      color: theme.vars.palette.primary[300],
                    },
                    '&:hover': {
                      borderColor: theme.vars.palette.grey[300],
                      background: theme.vars.palette.grey[50],
                      [theme.getColorSchemeSelector('dark')]: {
                        borderColor: theme.vars.palette.primaryDark[600],
                        background: alpha(theme.palette.primaryDark[700], 0.4),
                      },
                    },
                  }),
              borderRadius: theme.shape.borderRadius,
            },
          },
        ],
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            minWidth: 160,
            color: (theme.vars || theme).palette.text.secondary,
            backgroundImage: 'none',
            border: '1px solid',
            ...(!theme.vars
              ? {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[900]
                      : theme.palette.background.paper,
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[700]
                      : theme.palette.grey[200],
                }
              : {
                  backgroundColor: theme.vars.palette.background.paper,
                  borderColor: theme.vars.palette.grey[200],
                  [theme.getColorSchemeSelector('dark')]: {
                    backgroundColor: theme.vars.palette.primaryDark[900],
                    borderColor: theme.vars.palette.primaryDark[700],
                  },
                }),
            '& .MuiMenuItem-root': {
              fontSize: theme.typography.pxToRem(14),
              fontWeight: 500,
              '&:hover, &:focus': {
                ...(!theme.vars
                  ? {
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? alpha(theme.palette.primaryDark[700], 0.4)
                          : theme.palette.grey[50],
                    }
                  : {
                      backgroundColor: theme.vars.palette.grey[50],
                      [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
                      },
                    }),
              },
              '&.Mui-selected': {
                fontWeight: 500,
                ...(!theme.vars
                  ? {
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary[300]
                          : theme.palette.primary[600],
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? theme.palette.primaryDark[700]
                          : alpha(theme.palette.primary[100], 0.6),
                    }
                  : {
                      color: theme.vars.palette.primary[600],
                      backgroundColor: alpha(theme.palette.primary[100], 0.6),
                      [theme.getColorSchemeSelector('dark')]: {
                        color: theme.vars.palette.primary[300],
                        backgroundColor: theme.vars.palette.primaryDark[700],
                      },
                    }),
              },
            },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            boxShadow: `0px 4px 20px ${
              theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(170, 180, 190, 0.3)'
            }`,
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            [theme.breakpoints.up('md')]: {
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary[100], 0.08)
                : theme.palette.grey[100],
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: {
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary[300]
                : theme.palette.primary[600],
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            '&:hover': {
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[200]
                  : theme.palette.primary[700],
            },
            '&.MuiTypography-body1 > svg': {
              marginTop: 2,
            },
            '& svg:last-child': {
              marginLeft: 2,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState: { color, variant } }) => ({
            fontWeight: 500,
            ...(variant === 'outlined' &&
              color === 'default' && {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900],
                backgroundColor: 'transparent',
                borderColor:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.grey[100], 0.1)
                    : theme.palette.grey[200],
                '&:hover': {
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[300]
                      : theme.palette.grey[900],
                },
              }),
            ...(variant === 'outlined' &&
              color === 'primary' && {
                '&:hover': {
                  color: theme.palette.primary[500],
                },
              }),
            ...(variant === 'filled' &&
              color === 'default' && {
                border: '1px solid transparent',
                color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary[700],
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primaryDark[500], 0.8)
                    : alpha(theme.palette.primary[100], 0.5),
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[600]
                      : theme.palette.primary[100],
                },
              }),
            // for labelling product in the search
            // @ts-ignore internal repo module augmentation issue
            ...(variant === 'light' && {
              ...(color === 'default' && {
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary[200]
                    : theme.palette.primary[700],
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primaryDark[700], 0.5)
                    : alpha(theme.palette.primary[100], 0.3),
              }),
              ...(color === 'warning' && {
                color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.warning[900],
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.warning[900]
                    : theme.palette.warning[100],
              }),
              ...(color === 'success' && {
                color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.success[900],
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.success[900]
                    : theme.palette.success[100],
              }),
            }),
          }),
          deleteIcon: {
            color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary[700],
            '&:hover': {
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.grey[100]
                  : theme.palette.primary[900],
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            padding: '8px',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: theme.typography.pxToRem(14),
            color:
              theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[700],
            borderRadius: 0,
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primaryDark[700], 0.4)
                  : theme.palette.grey[50],
            },
            '&.Mui-selected': {
              color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary[500],
              borderRadius: 10,
              border: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? `${theme.palette.primary[700]} !important`
                  : `${theme.palette.primary[500]} !important`,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.primary[50],
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[600]
                    : theme.palette.primary[100],
              },
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ArrowDropDownRounded,
        },
        styleOverrides: {
          iconFilled: {
            top: 'calc(50% - .25em)',
          },
        },
      },
      MuiTab: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : '#fff',
            '&[href]': {
              textDecorationLine: 'none',
            },
          },
          outlined: {
            display: 'block',
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[500]
                : theme.palette.grey[200],
            ...(theme.palette.mode === 'dark' && {
              backgroundColor: theme.palette.primaryDark[700],
            }),
            'a&, button&': {
              '&:hover': {
                boxShadow: `0px 4px 20px ${
                  theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(170, 180, 190, 0.3)'
                }`,
              },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1, 2),
            borderColor: theme.palette.divider,
          },
          head: {
            color: theme.palette.text.primary,
            fontWeight: 700,
          },
          body: {
            color: theme.palette.text.secondary,
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : '#fff',
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            color:
              theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[700],
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[500]
                : theme.palette.grey[200],
            '&.Mui-selected': {
              color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary[500],
              borderColor:
                theme.palette.mode === 'dark'
                  ? `${theme.palette.primary[700]} !important`
                  : `${theme.palette.primary[500]} !important`,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.primary[50],
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[600]
                    : theme.palette.primary[100],
              },
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            padding: '5px 9px',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 32,
            height: 20,
            padding: 0,
            '& .MuiSwitch-switchBase': {
              '&.Mui-checked': {
                transform: 'translateX(11px)',
                color: '#fff',
              },
            },
          },
          switchBase: {
            height: 20,
            width: 20,
            padding: 0,
            color: '#fff',
            '&.Mui-checked + .MuiSwitch-track': {
              opacity: 1,
            },
          },
          track: {
            opacity: 1,
            borderRadius: 32,
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
          },
          thumb: {
            flexShrink: 0,
            width: '14px',
            height: '14px',
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
            color:
              theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[700],
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[500]
                : theme.palette.grey[200],
            '&.Mui-selected': {
              color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary[500],
              borderColor:
                theme.palette.mode === 'dark'
                  ? `${theme.palette.primary[700]} !important`
                  : `${theme.palette.primary[500]} !important`,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.primary[50],
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[600]
                    : theme.palette.primary[100],
              },
            },
          },
        },
      },
      MuiCssBaseline: {
        defaultProps: {
          enableColorScheme: true,
        },
      },
    },
  };
}

const darkTheme = createTheme(getDesignTokens('dark'));
export const brandingDarkTheme = deepmerge(darkTheme, getThemedComponents(darkTheme));
