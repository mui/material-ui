import * as React from 'react';
import { useRouter } from 'next/router';
import { deepmerge } from '@mui/utils';
import { ThemeProvider, createTheme, PaletteColorOptions } from '@mui/material/styles';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { colorChannel, getContrastRatio, lighten, darken } from '@mui/system/colorManipulator';
import CssBaseline from '@mui/material/CssBaseline';
import { getCookie, pathnameToLanguage } from 'docs/src/modules/utils/helpers';
// @ts-ignore to bypass type checking in MUI X repo
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';
import { getDesignTokens, getThemedComponents } from '@mui/docs/branding';
import SkipLink from 'docs/src/modules/components/SkipLink';
// @ts-ignore to bypass type checking in MUI X repo
import MarkdownLinks from 'docs/src/modules/components/MarkdownLinks';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    primaryDark?: PaletteColorOptions;
  }
}

const { palette: lightPalette, typography, ...designTokens } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');
const themeOptions = {
  colorSchemes: {
    light: {
      palette: lightPalette,
    },
    dark: {
      palette: darkPalette,
    },
  },
  ...designTokens,
  typography: deepmerge(typography, {
    h1: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-common-white)',
      },
    },
    h2: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-grey-100)',
      },
    },
    h5: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-primary-300)',
      },
    },
  }),
  ...getThemedComponents(),
};

export function setDocsColors(primary: Record<string, string>, secondary: Record<string, string>) {
  function injectPalette(prefix: string, palette: string, color: string) {
    // simplified logic of `createPalette` to avoid `useTheme`.
    const light = lighten(color, 0.2);
    const dark = darken(color, 0.3);
    const contrastText = getContrastRatio(color, '#fff') >= 3 ? '#fff' : 'rgba(0, 0, 0, 0.87)';

    document.documentElement.style.setProperty(`--${prefix}-palette-${palette}-main`, color);
    document.documentElement.style.setProperty(
      `--${prefix}-palette-${palette}-mainChannel`,
      colorChannel(color),
    );
    document.documentElement.style.setProperty(`--${prefix}-palette-${palette}-light`, light);
    document.documentElement.style.setProperty(
      `--${prefix}-palette-${palette}-lightChannel`,
      colorChannel(light),
    );
    document.documentElement.style.setProperty(`--${prefix}-palette-${palette}-dark`, dark);
    document.documentElement.style.setProperty(
      `--${prefix}-palette-${palette}-darkChannel`,
      colorChannel(dark),
    );
    document.documentElement.style.setProperty(
      `--${prefix}-palette-${palette}-contrastText`,
      contrastText,
    );
    document.documentElement.style.setProperty(
      `--${prefix}-palette-${palette}-contrastTextChannel`,
      colorChannel(contrastText),
    );
  }
  if (typeof document !== 'undefined') {
    injectPalette('muidocs', 'primary', primary.main);
    injectPalette('muidocs', 'secondary', secondary.main);

    ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].forEach((key) => {
      document.documentElement.style.setProperty(`--muidocs-palette-primary-${key}`, primary[key]);
      document.documentElement.style.setProperty(
        `--muidocs-palette-secondary-${key}`,
        secondary[key],
      );
    });

    injectPalette('mui', 'primary', primary.main);
    injectPalette('mui', 'secondary', secondary.main);
  }
}

export function resetDocsColor() {
  if (typeof document !== 'undefined') {
    document.documentElement.style.removeProperty('--muidocs-palette-primary-main');
    document.documentElement.style.removeProperty('--muidocs-palette-primary-mainChannel');
    document.documentElement.style.removeProperty('--muidocs-palette-primary-light');
    document.documentElement.style.removeProperty('--muidocs-palette-primary-lightChannel');
    document.documentElement.style.removeProperty('--muidocs-palette-primary-dark');
    document.documentElement.style.removeProperty('--muidocs-palette-primary-darkChannel');
    document.documentElement.style.removeProperty('--muidocs-palette-primary-contrastText');
    document.documentElement.style.removeProperty('--muidocs-palette-primary-contrastTextChannel');
    document.documentElement.style.removeProperty('--muidocs-palette-secondary-main');
    document.documentElement.style.removeProperty('--muidocs-palette-secondary-mainChannel');
    document.documentElement.style.removeProperty('--muidocs-palette-secondary-light');
    document.documentElement.style.removeProperty('--muidocs-palette-secondary-lightChannel');
    document.documentElement.style.removeProperty('--muidocs-palette-secondary-dark');
    document.documentElement.style.removeProperty('--muidocs-palette-secondary-darkChannel');
    document.documentElement.style.removeProperty('--muidocs-palette-secondary-contrastText');
    document.documentElement.style.removeProperty(
      '--muidocs-palette-secondary-contrastTextChannel',
    );
    document.documentElement.style.removeProperty('--mui-palette-primary-main');
    document.documentElement.style.removeProperty('--mui-palette-secondary-main');
    document.documentElement.style.removeProperty('--mui-palette-primary-light');
    document.documentElement.style.removeProperty('--mui-palette-secondary-light');
    document.documentElement.style.removeProperty('--mui-palette-primary-dark');
    document.documentElement.style.removeProperty('--mui-palette-secondary-dark');
    document.documentElement.style.removeProperty('--mui-palette-primary-contrastText');
    document.documentElement.style.removeProperty('--mui-palette-secondary-contrastText');
    document.documentElement.style.removeProperty('--mui-palette-primary-mainChannel');
    document.documentElement.style.removeProperty('--mui-palette-secondary-mainChannel');
    document.documentElement.style.removeProperty('--mui-palette-primary-lightChannel');
    document.documentElement.style.removeProperty('--mui-palette-secondary-lightChannel');
    document.documentElement.style.removeProperty('--mui-palette-primary-darkChannel');
    document.documentElement.style.removeProperty('--mui-palette-secondary-darkChannel');
    document.documentElement.style.removeProperty('--mui-palette-primary-contrastTextChannel');
    document.documentElement.style.removeProperty('--mui-palette-secondary-contrastTextChannel');

    ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].forEach((key) => {
      document.documentElement.style.removeProperty(`--muidocs-palette-primary-${key}`);
      document.documentElement.style.removeProperty(`--muidocs-palette-secondary-${key}`);
    });
  }
}

export function setDocsSpacing(value: number) {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--muidocs-spacing', `${value}px`);
    document.documentElement.style.setProperty('--mui-spacing', `${value}px`);
  }
}

export function resetDocsSpacing() {
  if (typeof document !== 'undefined') {
    document.documentElement.style.removeProperty('--muidocs-spacing');
    document.documentElement.style.removeProperty('--mui-spacing');
  }
}

export default function BrandingCssVarsProvider(props: {
  children: React.ReactNode;
  direction?: 'ltr' | 'rtl';
}) {
  const { direction = 'ltr', children } = props;
  const { asPath } = useRouter();
  const { canonicalAs } = pathnameToLanguage(asPath);
  const theme = React.useMemo(() => {
    return createTheme({
      cssVariables: {
        cssVarPrefix: 'muidocs',
        colorSchemeSelector: 'data-mui-color-scheme',
        nativeColorSyntax: true,
      },
      direction,
      ...themeOptions,
    });
  }, [direction]);
  useEnhancedEffect(() => {
    const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null');
    if (nextPaletteColors) {
      setDocsColors(nextPaletteColors.primary, nextPaletteColors.secondary);
    }
  }, []);
  useEnhancedEffect(() => {
    // This is required to ensure that the layer order is declared first in the head
    // because when the direction is RTL on the client, emotion reinserts the RTL styles back to the top of the insertion point.
    if (direction === 'rtl') {
      const head = document.querySelector('head');
      if (head) {
        const style = document.createElement('style');
        style.textContent =
          '@layer theme, docsearch, mui, mui.global, mui.default, mui.theme, mui.custom, mui.sx, utilities;';
        head.prepend(style);
      }
    }
  }, [direction]);
  return (
    <ThemeProvider
      theme={theme}
      disableTransitionOnChange
      // TODO: remove `forceThemeRerender` once custom theme on some demos rely on CSS variables instead of `theme.palette.mode`
      forceThemeRerender={canonicalAs.startsWith('/x/') || canonicalAs.startsWith('/toolpad/')}
    >
      <NextNProgressBar />
      <CssBaseline />
      <SkipLink />
      <MarkdownLinks />
      {children}
    </ThemeProvider>
  );
}
