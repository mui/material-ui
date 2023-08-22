import { CSSObject } from '@mui/system';
import type {} from '@mui/material/themeCssVarsAugmentation';
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import { createTheme, ThemeOptions, Theme, alpha } from '@mui/material/styles';

interface ApplyDarkStyles {
  (scheme: CSSObject): CSSObject;
}

declare module '@mui/material/styles' {
  interface Theme {
    applyDarkStyles: ApplyDarkStyles;
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

  interface Palette {
    primaryDark: PaletteColor;
    gradients: {
      lightGrayRadio: string;
      stylizedRadio: string;
      linearSubtle: string;
    };
  }

  interface TypeText {
    tertiary: string;
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

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    grey: true;
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
  50: '#EAEDF1',
  100: '#DAE0E7',
  200: '#ACBAC8',
  300: '#7B91A7',
  main: '#7B91A7',
  400: '#4B5E71',
  500: '#3B4A59',
  600: '#2F3A46',
  700: '#1F262E', // contrast 13.64:1
  800: '#141A1F',
  900: '#101418',
};
export const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD', // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
  400: '#B0B8C4', // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
  500: '#9DA8B7', // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
  600: '#6B7A90', // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
  700: '#434D5B', // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
  800: '#303740', // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
  900: '#1C2025',
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
    light: blue[600],
    dark: blueDark[900],
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
      secondary: {
        ...grey,
        ...(mode === 'light' && {
          main: blueDark[100],
          contrastText: blueDark[600],
        }),
        ...(mode === 'dark' && {
          main: blueDark[700],
          contrastText: blueDark[600],
        }),
      },
      divider: mode === 'dark' ? alpha(blueDark[100], 0.08) : grey[100],
      primaryDark: blueDark,
      mode,
      ...(mode === 'dark' && {
        background: {
          default: blueDark[800],
          paper: blueDark[900],
        },
      }),
      common: {
        black: '#0B0D0E',
      },
      text: {
        ...(mode === 'light' && {
          primary: grey[900],
          secondary: grey[700],
          tertiary: grey[600],
        }),
        ...(mode === 'dark' && {
          primary: '#fff',
          secondary: grey[400],
          tertiary: grey[400],
        }),
      },
      grey: {
        ...grey,
        ...(mode === 'light' && {
          main: grey[100],
          contrastText: grey[600],
        }),
        ...(mode === 'dark' && {
          main: grey[700],
          contrastText: grey[600],
        }),
      },
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
      gradients: {
        lightGrayRadio:
          'radial-gradient(50% 50% at 50% 50%, #F0F7FF 0%, rgba(240, 247, 255, 0.05) 100%)',
        stylizedRadio:
          mode === 'dark'
            ? 'linear-gradient(rgba(0 0 0 / 0.1), rgba(0 0 0 / 0.1)), linear-gradient(254.86deg, rgba(0, 58, 117, 0.18) 0%, rgba(11, 13, 14, 0.3) 49.98%, rgba(0, 76, 153, 0.21) 100.95%)'
            : 'linear-gradient(rgba(255 255 255 / 0.3), rgba(255 255 255 / 0.3)), linear-gradient(254.86deg, rgba(194, 224, 255, 0.12) 0%, rgba(194, 224, 255, 0.12) 0%, rgba(255, 255, 255, 0.3) 49.98%, rgba(240, 247, 255, 0.3) 100.95%)',
        linearSubtle:
          mode === 'light'
            ? `linear-gradient(to top right, ${alpha(blue[50], 0.3)} 40%, ${alpha(
                grey[50],
                0.2,
              )} 100%)`
            : `linear-gradient(to top right, ${alpha(blue[900], 0.1)} 40%, ${alpha(
                blueDark[800],
                0.2,
              )} 100%)`,
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    typography: {
      fontFamily: ['"IBM Plex Sans"', ...systemFont].join(','),
      // Match VS Code
      // https://github.com/microsoft/vscode/blob/b38691f611d1ce3ef437c67a1b047c757b7b4e53/src/vs/editor/common/config/editorOptions.ts#L4578-L4580
      // https://github.com/microsoft/vscode/blob/d950552131d7350a45dac8b59bf179469c36c2ac/src/vs/editor/standalone/browser/standalone-tokens.css#L10
      fontFamilyCode: [
        'Menlo', // macOS
        'Consolas', // Windows
        '"Droid Sans Mono"', // Linux
        'monospace', // fallback
      ].join(','),
      fontFamilyTagline: ['"General Sans"', ...systemFont].join(','),
      fontFamilySystem: systemFont.join(','),
      fontWeightSemiBold: 600,
      fontWeightExtraBold: 800,
      h1: {
        fontFamily: ['"General Sans"', ...systemFont].join(','),
        fontSize: 'clamp(2.5rem, 1.125rem + 3.5vw, 3.5em)',
        fontWeight: 600,
        lineHeight: 78 / 70,
        letterSpacing: -0.2,
        ...(mode === 'light' && {
          color: blueDark[900],
        }),
      },
      h2: {
        fontFamily: ['"General Sans"', ...systemFont].join(','),
        fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
        fontWeight: 600,
        lineHeight: 44 / 36,
        letterSpacing: -0.2,
        color: mode === 'dark' ? grey[100] : blueDark[700],
      },
      h3: {
        fontFamily: ['"General Sans"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(36),
        lineHeight: 44 / 36,
        letterSpacing: 0.2,
      },
      h4: {
        fontFamily: ['"General Sans"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(30),
        lineHeight: 42 / 28,
        letterSpacing: 0.2,
      },
      h5: {
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
    /**
     * This utility exists to help transitioning to CSS variables page by page (prevent dark mode flicker).
     * It will use the proper styling method based on the theme because the component might be on the page that does not support CSS variables yet.
     *
     * 😓 Without this utility:
     * {
     *   ...theme.vars ? {
     *     color: theme.vars.palette.primary.main,
     *     [theme.getColorScheme('dark')]: {
     *       color: '#fff',
     *     }
     *   } : {
     *     color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
     *   }
     * }
     *
     * 🤩 Using the utility:
     * {
     *   color: (theme.vars || theme).palette.primary.main,
     *   ...theme.applyDarkStyles({
     *     color: '#fff',
     *   }),
     * }
     *
     * -------------------------------------------------------------------------------------------------
     * 💡 This util should be used in an array if the styles contain pseudo classes or nested selectors:
     *
     * ❌ There is a chance that the upper selectors could be overridden
     * {
     *    // the whole selector could be overridden
     *   '&::before': {
     *     color: ...
     *   },
     *   ...theme.applyDarkStyles({
     *      '&::before': {
     *        color: ...
     *      }
     *   })
     * }
     *
     * ✅ use an array (supports in both emotion and styled-components)
     * Only the `color` will be overridden in dark mode.
     *  [
     *    '&::before': {
     *      color: ...
     *    },
     *    theme.applyDarkStyles({
     *      '&::before': {
     *        color: ...
     *      }
     *    })
     *  ]
     */
    applyDarkStyles(css: Parameters<ApplyDarkStyles>[0]) {
      if ((this as Theme).vars) {
        // If CssVarsProvider is used as a provider,
        // returns ':where([data-mui-color-scheme="light|dark"]) &'
        const selector = (this as Theme)
          .getColorSchemeSelector('dark')
          .replace(/(\[[^\]]+\])/, ':where($1)');
        return {
          [selector]: css,
        };
      }
      if ((this as Theme).palette.mode === 'dark') {
        return css;
      }

      return undefined;
    },
  } as ThemeOptions);

export function getThemedComponents(): ThemeOptions {
  return {
    components: {
      MuiAlert: {
        styleOverrides: {
          root: {
            padding: '12px 16px',
          },
          standardWarning: ({ theme }) => [
            {
              backgroundColor: alpha(theme.palette.warning[50], 0.5),
              color: (theme.vars || theme).palette.grey[900],
              border: '1px solid',
              borderColor: alpha(theme.palette.warning[600], 0.3),
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.warning[700],
              },
            },
            theme.applyDarkStyles({
              backgroundColor: alpha(theme.palette.warning[700], 0.2),
              color: (theme.vars || theme).palette.warning[50],
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.warning[200],
              },
            }),
          ],
          icon: {
            paddingTop: 12,
            paddingBottom: 0,
          },
        },
      },
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
          root: ({ theme, ownerState }) => ({
            ...(ownerState.size === 'large' && {
              padding: theme.spacing('12px', '12px', '12px', '14px'),
              ...theme.typography.body1,
              lineHeight: 21 / 16,
              fontWeight: 700,
            }),
            ...(ownerState.variant === 'outlined' &&
              ownerState.color === 'secondary' && {
                color: (theme.vars || theme).palette.text.secondary,
                backgroundColor: alpha(theme.palette.primaryDark[50], 0.3),
                borderColor: (theme.vars || theme).palette.primaryDark[100],
                boxShadow: `0px 2px 2px ${alpha(
                  theme.palette.primaryDark[100],
                  0.2,
                )}, inset 0px 4px 4px ${alpha(theme.palette.primaryDark[100], 0.2)}`,
                '&:hover': {
                  background: (theme.vars || theme).palette.primaryDark[50],
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primaryDark[100],
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                  backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                  boxShadow: '0px 2px 2px #0B0D0E, inset 0px 4px 4px rgba(20, 25, 31, 0.3)',
                  '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.primaryDark[600],
                  },
                }),
              }),
            ...(ownerState.variant === 'outlined' &&
              ownerState.color === 'primary' && {
                color: (theme.vars || theme).palette.primary[500],
                backgroundColor: alpha(theme.palette.primary[50], 0.3),
                borderColor: (theme.vars || theme).palette.primary[100],
                boxShadow: `0px 2px 2px ${alpha(
                  theme.palette.primary[100],
                  0.2,
                )}, inset 0px 4px 4px ${alpha(theme.palette.primary[100], 0.1)}`,
                '&:hover': {
                  background: (theme.vars || theme).palette.primary[50],
                  borderColor: (theme.vars || theme).palette.primary[300],
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[200],
                  borderColor: (theme.vars || theme).palette.primary[900],
                  backgroundColor: alpha(theme.palette.primary[900], 0.4),
                  boxShadow: '0px 2px 2px #0B0D0E, inset 0px 4px 4px rgba(20, 25, 31, 0.3)',
                  '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.primary[900],
                    borderColor: (theme.vars || theme).palette.primary[700],
                  },
                }),
              }),
            ...(ownerState.size === 'small' && {
              padding: theme.spacing(0.5, 1),
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '6px',
            }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                color: '#FFF',
                background: `linear-gradient(180deg, ${
                  (theme.vars || theme).palette.primary[500]
                } 0%, ${(theme.vars || theme).palette.primary[600]} 100%)`,
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.primary[400],
                boxShadow: `0px 2px 4px ${alpha(
                  theme.palette.primary[700],
                  0.2,
                )}, inset 0px 4px 8px ${alpha(theme.palette.primary[200], 0.4)}`,
                textShadow: `0px 1px 1px ${alpha(theme.palette.grey[900], 0.3)}`,
                '&:hover': {
                  background: `linear-gradient(180deg, ${
                    (theme.vars || theme).palette.primary[500]
                  } 0%, ${(theme.vars || theme).palette.primary[400]} 100%)`,
                  boxShadow:
                    '0px 0px 8px rgba(0, 127, 255, 0.2), inset 0px 4px 8px rgba(102, 178, 255, 0.4)',
                },
                ...theme.applyDarkStyles({
                  boxShadow: `0px 2px 4px ${alpha(
                    theme.palette.common.black,
                    0.8,
                  )}, inset 0px 4px 8px ${alpha(theme.palette.primary[200], 0.4)}`,
                }),
              }),
          }),
        },
        variants: [
          {
            // @ts-ignore internal repo module augmentation issue
            props: { variant: 'code' },
            style: ({ theme }) => [
              {
                cursor: 'copy',
                padding: 0,
                width: 'max-content',
                backgroundColor: 'transparent',
                color: (theme.vars || theme).palette.grey[600],
                fontFamily: theme.typography.fontFamilyCode,
                fontWeight: 400,
                fontSize: defaultTheme.typography.pxToRem(12),
                lineHeight: 21 / 14,
                letterSpacing: 0,
                WebkitFontSmoothing: 'subpixel-antialiased',
                '& .MuiButton-startIcon': {
                  color: (theme.vars || theme).palette.grey[400],
                },
                '& .MuiButton-endIcon': {
                  display: 'inline-block',
                  position: 'absolute',
                  color: (theme.vars || theme).palette.primary.main,
                  right: -22,
                  top: -1,
                  opacity: 0,
                  transitionProperty: 'opacity',
                  transitionDuration: '100ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                },
                '&:hover, &.Mui-focusVisible': {
                  backgroundColor: 'transparent',
                  color: (theme.vars || theme).palette.primary.main,
                  '& .MuiButton-endIcon': {
                    color: (theme.vars || theme).palette.primary.main,
                    opacity: 1,
                  },
                },
              },
              theme.applyDarkStyles({
                '& .MuiButton-endIcon': {
                  color: (theme.vars || theme).palette.primary[300],
                },
                '&:hover, &.Mui-focusVisible': {
                  color: (theme.vars || theme).palette.primary[300],
                  '& .MuiButton-endIcon': {
                    opacity: 1,
                  },
                },
              }),
            ],
          },
          {
            // @ts-ignore internal repo module augmentation issue
            props: { variant: 'codeOutlined' },
            style: ({ theme }) => [
              {
                display: 'inline-block',
                justifyContent: 'start',
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                position: 'relative',
                border: '1px solid',
                color: (theme.vars || theme).palette.grey[900],
                backgroundColor: alpha(theme.palette.primary[50], 0.3),
                borderColor: (theme.vars || theme).palette.grey[200],
                boxShadow: `0px 2px 2px ${alpha(
                  theme.palette.primary[100],
                  0.2,
                )}, inset 0px 4px 4px ${alpha(theme.palette.primary[100], 0.2)}`,
                fontFamily: theme.typography.fontFamilyCode,
                fontWeight: 400,
                fontSize: defaultTheme.typography.pxToRem(12),
                lineHeight: 21 / 14,
                letterSpacing: 0,
                WebkitFontSmoothing: 'subpixel-antialiased',
                '& .MuiButton-endIcon': {
                  display: 'inline-block',
                  position: 'absolute',
                  top: 12,
                  right: 0,
                  marginRight: 10,
                  color: (theme.vars || theme).palette.grey[600],
                },
                '&:hover, &.Mui-focusVisible': {
                  borderColor: (theme.vars || theme).palette.primary.main,
                  backgroundColor: (theme.vars || theme).palette.primary[50],
                  color: (theme.vars || theme).palette.primary[600],
                  '& .MuiButton-endIcon': {
                    color: (theme.vars || theme).palette.primary.main,
                  },
                },
              } as const,
              theme.applyDarkStyles({
                color: (theme.vars || theme).palette.grey[500],
                borderColor: (theme.vars || theme).palette.primaryDark[600],
                backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                boxShadow: '0px 2px 2px #0B0D0E, inset 0px 4px 4px rgba(20, 25, 31, 0.3)',
                '& .MuiButton-endIcon': {
                  color: (theme.vars || theme).palette.grey[400],
                },
                '&:hover, &.Mui-focusVisible': {
                  backgroundColor: (theme.vars || theme).palette.primary[900],
                  color: (theme.vars || theme).palette.primary[100],
                  '& .MuiButton-endIcon': {
                    color: (theme.vars || theme).palette.primary[300],
                  },
                },
              }),
            ],
          },
          {
            // @ts-ignore internal repo module augmentation issue
            props: { variant: 'link' },
            style: ({ theme }) => ({
              fontSize: theme.typography.pxToRem(14),
              fontWeight: 700,
              color: (theme.vars || theme).palette.primary[600],
              ...theme.applyDarkStyles({
                color: (theme.vars || theme).palette.primary[300],
              }),
              mb: 1,
              '& svg': {
                ml: -0.5,
              },
            }),
          },
        ],
      },
      MuiIconButton: {
        variants: [
          {
            props: { color: 'primary' },
            style: ({ theme }) => [
              {
                height: 34,
                width: 34,
                border: `1px solid`,
                borderColor: (theme.vars || theme).palette.grey[200],
                color: (theme.vars || theme).palette.primary[500],
                borderRadius: theme.shape.borderRadius,
                boxShadow: `inset 0 1px 2px ${
                  (theme.vars || theme).palette.grey[50]
                }, 0 1px 0.5px ${alpha(theme.palette.grey[100], 0.6)}`,
                '&:hover': {
                  borderColor: (theme.vars || theme).palette.grey[300],
                  background: (theme.vars || theme).palette.grey[50],
                },
              },
              theme.applyDarkStyles({
                borderColor: (theme.vars || theme).palette.primaryDark[700],
                color: (theme.vars || theme).palette.primary[300],
                boxShadow: `inset 0 1px 1px ${
                  (theme.vars || theme).palette.primaryDark[900]
                }, 0 1px 0.5px ${(theme.vars || theme).palette.common.black}`,
                '&:hover': {
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                  background: alpha(theme.palette.primaryDark[700], 0.4),
                },
              }),
            ],
          },
        ],
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => [
            {
              minWidth: 160,
              color: (theme.vars || theme).palette.text.secondary,
              backgroundImage: 'none',
              border: '1px solid',
              backgroundColor: (theme.vars || theme).palette.background.paper,
              borderColor: (theme.vars || theme).palette.grey[200],
              '& .MuiMenuItem-root': {
                fontSize: theme.typography.pxToRem(14),
                fontWeight: 500,
                '&:hover, &:focus': {
                  backgroundColor: (theme.vars || theme).palette.grey[50],
                },
                '&.Mui-selected': {
                  fontWeight: 500,
                  color: (theme.vars || theme).palette.primary[600],
                  backgroundColor: alpha(theme.palette.primary[100], 0.6),
                },
              },
            },
            theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
              borderColor: (theme.vars || theme).palette.primaryDark[700],
              '& .MuiMenuItem-root': {
                '&:hover, &:focus': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                },
                '&.Mui-selected': {
                  color: (theme.vars || theme).palette.primary[300],
                  backgroundColor: alpha(theme.palette.primary[900], 0.4),
                },
              },
            }),
          ],
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: ({ theme }) => ({
            boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
            ...theme.applyDarkStyles({
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
            }),
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: (theme.vars || theme).palette.grey[100],
            ...theme.applyDarkStyles({
              borderColor: alpha(theme.palette.primary[100], 0.08),
            }),
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: {
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            '&.MuiTypography-body1 > svg': {
              marginTop: 2,
            },
            '& svg:last-child': {
              marginLeft: 2,
            },
          },
        },
        variants: [
          {
            props: { color: 'primary' },
            style: ({ theme }) => [
              {
                color: (theme.vars || theme).palette.primary[600],
                '&:hover': {
                  color: (theme.vars || theme).palette.primary[700],
                },
              },
              theme.applyDarkStyles({
                color: (theme.vars || theme).palette.primary[300],
                '&:hover': {
                  color: (theme.vars || theme).palette.primary[200],
                },
              }),
            ],
          },
        ],
      },
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState: { color, variant }, theme }) => ({
            fontWeight: theme.typography.fontWeightSemiBold,
            ...(variant === 'outlined' &&
              color === 'default' && {
                backgroundColor: alpha(theme.palette.grey[50], 0.5),
                color: (theme.vars || theme).palette.grey[900],
                borderColor: (theme.vars || theme).palette.grey[200],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[100],
                  color: (theme.vars || theme).palette.grey[900],
                },
                ...theme.applyDarkStyles({
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
                  color: (theme.vars || theme).palette.grey[300],
                  borderColor: alpha(theme.palette.primaryDark[500], 0.5),
                  '&:hover': {
                    color: (theme.vars || theme).palette.grey[300],
                    backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                  },
                }),
              }),
            ...(variant === 'outlined' &&
              color === 'primary' && {
                borderColor: (theme.vars || theme).palette.primary[200],
                ...theme.applyDarkStyles({
                  borderColor: alpha(theme.palette.primary[500], 0.3),
                }),
              }),
            ...(variant === 'filled' && {
              ...(color === 'default' && {
                border: '1px solid transparent',
                color: (theme.vars || theme).palette.primary[700],
                backgroundColor: alpha(theme.palette.primary[100], 0.5),
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
                ...theme.applyDarkStyles({
                  color: '#fff',
                  backgroundColor: alpha(theme.palette.primaryDark[500], 0.8),
                  '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.primaryDark[600],
                  },
                }),
              }),
              ...(color === 'primary' && {
                color: (theme.vars || theme).palette.primary[600],
                backgroundColor: alpha(theme.palette.primary[100], 0.4),
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[100],
                  backgroundColor: alpha(theme.palette.primary[800], 0.5),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary[900], 0.5),
                  },
                }),
              }),
            }),
            // for labelling product in the search
            // @ts-ignore internal repo module augmentation issue
            ...(variant === 'light' && {
              ...(color === 'default' && {
                color: (theme.vars || theme).palette.primary[700],
                backgroundColor: alpha(theme.palette.primary[100], 0.3),
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[200],
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
                }),
              }),
              ...(color === 'warning' && {
                color: (theme.vars || theme).palette.warning[900],
                backgroundColor: (theme.vars || theme).palette.warning[100],
                ...theme.applyDarkStyles({
                  color: '#fff',
                  backgroundColor: (theme.vars || theme).palette.warning[900],
                }),
              }),
              ...(color === 'success' && {
                color: (theme.vars || theme).palette.success[900],
                backgroundColor: (theme.vars || theme).palette.success[100],
                ...theme.applyDarkStyles({
                  color: '#fff',
                  backgroundColor: (theme.vars || theme).palette.success[900],
                }),
              }),
            }),
          }),
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
          root: ({ theme }) => [
            {
              padding: '8px',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: theme.typography.pxToRem(14),
              color: theme.palette.grey[700],
              borderRadius: 0,
              '&:hover': {
                backgroundColor: theme.palette.grey[50],
              },
              '&.Mui-selected': {
                borderRadius: 10,
                border: '1px solid',
                color: (theme.vars || theme).palette.primary[500],
                borderColor: `${(theme.vars || theme).palette.primary[500]} !important`,
                backgroundColor: (theme.vars || theme).palette.primary[50],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
              },
            } as const,
            theme.applyDarkStyles({
              color: theme.palette.grey[300],
              '&:hover': {
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
              },
              '&.Mui-selected': {
                color: '#fff',
                borderColor: `${(theme.vars || theme).palette.primary[700]} !important`,
                backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[600],
                },
              },
            }),
          ],
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
          root: ({ theme, ownerState }) => [
            {
              backgroundImage: 'none',
              backgroundColor: '#fff',
              '&[href]': {
                textDecorationLine: 'none',
              },
              ...(ownerState.variant === 'outlined' && {
                display: 'block',
                borderColor: (theme.vars || theme).palette.grey[100],
                '&[href]': {
                  textDecorationLine: 'none',
                  boxShadow: `inset 0 1px 2px ${
                    (theme.vars || theme).palette.grey[50]
                  }, 0 1px 0.5px ${alpha(theme.palette.grey[100], 0.6)}`,
                  '&:hover': {
                    borderColor: (theme.vars || theme).palette.primary[300],
                    boxShadow: `0px 4px 16px ${(theme.vars || theme).palette.grey[200]}`,
                  },
                },
                ':is(a&), :is(button&)': {
                  '&:hover': {
                    borderColor: (theme.vars || theme).palette.primary[300],
                    boxShadow: `0px 4px 16px ${(theme.vars || theme).palette.grey[200]}`,
                  },
                },
              }),
            },
            theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
              ...(ownerState.variant === 'outlined' && {
                borderColor: (theme.vars || theme).palette.primaryDark[600],
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
                '&[href]': {
                  textDecorationLine: 'none',
                  boxShadow: `inset 0 1px 1px ${
                    (theme.vars || theme).palette.primaryDark[900]
                  }, 0 1px 0.5px ${(theme.vars || theme).palette.common.black}`,
                  '&:hover': {
                    boxShadow: `0px 4px 24px ${(theme.vars || theme).palette.common.black}`,
                  },
                },
                ':is(a&), :is(button&)': {
                  '&:hover': {
                    boxShadow: `0px 4px 24px ${(theme.vars || theme).palette.common.black}`,
                  },
                },
              }),
            }),
          ],
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            padding: theme.spacing(1, 2),
            borderColor: (theme.vars || theme).palette.divider,
            ...(ownerState.variant === 'head' && {
              color: (theme.vars || theme).palette.text.primary,
              fontWeight: 700,
            }),
            ...(ownerState.variant === 'body' && {
              color: (theme.vars || theme).palette.text.secondary,
            }),
          }),
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: '#fff',
            ...theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
            }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => [
            {
              textTransform: 'none',
              fontWeight: 500,
              color: theme.palette.grey[700],
              borderColor: theme.palette.grey[200],
              ...(ownerState.size === 'small' && {
                padding: '0.375rem 0.75rem',
              }),
              '&.Mui-selected': {
                color: (theme.vars || theme).palette.primary[500],
                borderColor: `${(theme.vars || theme).palette.primary[500]} !important`,
                backgroundColor: (theme.vars || theme).palette.primary[50],
              },
            } as const,
            theme.applyDarkStyles({
              color: theme.palette.grey[300],
              borderColor: theme.palette.primaryDark[500],
              '&.Mui-selected': {
                color: (theme.vars || theme).palette.primary[200],
                borderColor: `${(theme.vars || theme).palette.primary[700]} !important`,
                backgroundColor: alpha(theme.palette.primary[900], 0.4),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary[900], 0.8),
                  borderColor: `${(theme.vars || theme).palette.primary[400]} !important`,
                },
              },
            }),
          ],
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 6,
            padding: '6px 12px',
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
          track: ({ theme }) => ({
            opacity: 1,
            borderRadius: 32,
            backgroundColor: theme.palette.grey[400],
            ...theme.applyDarkStyles({
              backgroundColor: theme.palette.grey[800],
            }),
          }),
          thumb: {
            flexShrink: 0,
            width: '14px',
            height: '14px',
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              textTransform: 'none',
              fontWeight: 700,
              color: theme.palette.grey[700],
              borderColor: theme.palette.grey[200],
              '&.Mui-selected': {
                color: (theme.vars || theme).palette.primary[500],
                borderColor: `${(theme.vars || theme).palette.primary[500]} !important`,
                backgroundColor: (theme.vars || theme).palette.primary[50],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
              },
            } as const,
            theme.applyDarkStyles({
              color: theme.palette.grey[300],
              borderColor: theme.palette.primaryDark[500],
              '&.Mui-selected': {
                color: '#fff',
                borderColor: `${(theme.vars || theme).palette.primary[700]} !important`,
                backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[600],
                },
              },
            }),
          ],
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

export const brandingDarkTheme = createTheme({
  ...getDesignTokens('dark'),
  ...getThemedComponents(),
});

export const brandingLightTheme = createTheme({
  ...getDesignTokens('light'),
  ...getThemedComponents(),
});
