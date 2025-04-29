import type { CSSObject } from '@mui/system';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { createTheme, ThemeOptions, Theme, alpha } from '@mui/material/styles';

interface ApplyDarkStyles {
  (scheme: CSSObject): CSSObject;
}

declare module '@mui/material/styles' {
  interface Theme {
    applyDarkStyles: ApplyDarkStyles;
  }

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
      radioSubtle: string;
      linearSubtle: string;
    };
  }

  interface TypeText {
    tertiary: string;
  }

  interface TypographyVariantsOptions {
    fontWeightSemiBold?: number;
    fontWeightExtraBold?: number;
    fontFamilyCode?: string;
    fontFamilySystem?: string;
  }

  interface TypographyVariants {
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

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    danger: true;
  }
  interface SvgIconPropsSizeOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xl2: true;
    xl3: true;
    xl4: true;
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
  50: 'hsl(210, 100%, 96%)',
  100: 'hsl(210, 100%, 90%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 70%)',
  400: 'hsl(210, 100%, 60%)',
  main: 'hsl(210, 100%, 45%)',
  500: 'hsl(210, 100%, 45%)',
  600: 'hsl(210, 100%, 42%)',
  700: 'hsl(210, 100%, 38%)',
  800: 'hsl(210, 100%, 30%)',
  900: 'hsl(210, 100%, 23%)',
};
export const blueDark = {
  50: 'hsl(210, 14%, 92%)',
  100: 'hsl(210, 14%, 87%)',
  200: 'hsl(210, 14%, 72%)',
  300: 'hsl(210, 14%, 56%)',
  main: 'hsl(210, 14%, 56%)',
  400: 'hsl(210, 14%, 36%)',
  500: 'hsl(210, 14%, 28%)',
  600: 'hsl(210, 14%, 22%)',
  700: 'hsl(210, 14%, 13%)',
  800: 'hsl(210, 14%, 9%)',
  900: 'hsl(210, 14%, 7%)',
};
export const grey = {
  50: 'hsl(215, 15%, 97%)',
  100: 'hsl(215, 15%, 92%)',
  200: 'hsl(215, 15%, 89%)',
  300: 'hsl(215, 15%, 82%)',
  400: 'hsl(215, 15%, 75%)',
  500: 'hsl(215, 15%, 65%)',
  600: 'hsl(215, 15%, 50%)',
  700: 'hsl(215, 15%, 40%)',
  800: 'hsl(215, 15%, 22%)',
  900: 'hsl(215, 15%, 12%)',
};
export const error = {
  50: 'hsl(355, 98%, 97%)',
  100: 'hsl(355, 98%, 93%)',
  200: 'hsl(355, 98%, 87%)',
  300: 'hsl(355, 98%, 80%)',
  400: 'hsl(355, 98%, 74%)',
  500: 'hsl(355, 98%, 66%)',
  main: 'hsl(355, 98%, 66%)',
  600: 'hsl(355, 98%, 46%)',
  700: 'hsl(355, 98%, 39%)',
  800: 'hsl(355, 98%, 29%)',
  900: 'hsl(355, 98%, 17%)',
};
export const success = {
  50: 'hsl(144, 72%, 95%)',
  100: 'hsl(144, 72%, 87%)',
  200: 'hsl(144, 72%, 77%)',
  300: 'hsl(144, 72%, 66%)',
  400: 'hsl(144, 72%, 56%)',
  500: 'hsl(144, 72%, 46%)',
  600: 'hsl(144, 72%, 41%)',
  700: 'hsl(144, 72%, 37%)',
  800: 'hsl(144, 72%, 32%)',
  900: 'hsl(144, 72%, 21%)',
};
export const warning = {
  50: 'hsl(48, 100%, 96%)',
  100: 'hsl(48, 100%, 88%)',
  200: 'hsl(48, 100%, 82%)',
  300: 'hsl(48, 100%, 64%)',
  400: 'hsl(48, 100%, 48%)',
  500: 'hsl(48, 100%, 44%)',
  main: 'hsl(48, 100%, 44%)',
  600: 'hsl(40, 100%, 40%)',
  700: 'hsl(36, 100%, 34%)',
  800: 'hsl(36, 100%, 27%)',
  900: 'hsl(36, 100%, 18%)',
};

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
      divider: mode === 'dark' ? alpha(blueDark[500], 0.3) : grey[100],
      primaryDark: blueDark,
      mode,
      ...(mode === 'dark' && {
        background: {
          default: blueDark[900],
          paper: alpha(blueDark[800], 0.8),
        },
      }),
      common: {
        black: 'hsl(200, 10%, 4%)',
      },
      text: {
        ...(mode === 'light' && {
          primary: grey[900],
          secondary: grey[800],
          tertiary: grey[700],
        }),
        ...(mode === 'dark' && {
          primary: '#fff',
          secondary: grey[400],
          tertiary: grey[500],
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
          main: success[600],
        }),
        ...(mode === 'light' && {
          main: success[700],
        }),
      },
      warning,
      gradients: {
        radioSubtle:
          mode === 'dark'
            ? `radial-gradient(100% 100% at 100% 100%, transparent 0, ${alpha(blue[900], 0.3)} 300%)`
            : `radial-gradient(100% 90% at 50% 0, transparent 0, ${alpha(blue[100], 0.3)} 300%)`,
        linearSubtle:
          mode === 'dark'
            ? `linear-gradient(0deg, ${alpha(blue[900], 0.1)}, ${alpha(blueDark[900], 0.5)})`
            : `linear-gradient(0deg, ${alpha(blue[50], 0.4)}, ${alpha(grey[50], 0.1)})`,
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
        fontSize: defaultTheme.typography.pxToRem(16),
        lineHeight: 24 / 16,
        letterSpacing: 0,
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        lineHeight: 21 / 14,
        letterSpacing: 0,
      },
      caption: {
        display: 'inline-block',
        fontSize: defaultTheme.typography.pxToRem(12),
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
      return (this as Theme).applyStyles('dark', css);
    },
  }) as ThemeOptions;

export function getThemedComponents(): ThemeOptions {
  return {};
}

export const brandingDarkTheme = createTheme({
  ...getDesignTokens('dark'),
  ...getThemedComponents(),
});

export const brandingLightTheme = createTheme({
  ...getDesignTokens('light'),
  ...getThemedComponents(),
});
