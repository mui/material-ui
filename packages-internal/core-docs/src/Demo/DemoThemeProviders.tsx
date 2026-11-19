import * as React from 'react';
import { deepmerge } from '@mui/utils';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import { createTheme, useTheme, enhanceHighContrast } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeOptionsContext, highDensity } from '../ThemeContext';
import { BrandingCssVarsProvider } from '../branding';

const defaultTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  motion: {
    reducedMotion: 'system',
  },
});

export function DemoPageThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const themeOptions = React.useContext(ThemeOptionsContext);
  return (
    <BrandingCssVarsProvider {...themeOptions}>
      {/* The default Material UI CSS variables, on html for all the demos of the page, */}
      {/* which is more performant than generating them in each demo. */}
      {/* A nested ThemeProvider would set them on its own element instead of html. */}
      <GlobalStyles styles={defaultTheme.generateStyleSheets?.() || []} />
      {children}
    </BrandingCssVarsProvider>
  );
}

export function DemoInstanceThemeProvider({
  children,
  runtimeTheme,
}: React.PropsWithChildren<{ runtimeTheme: any }>) {
  const { dense, direction } = React.useContext(ThemeOptionsContext);
  const upperTheme = useTheme();
  const upperMode = upperTheme?.palette?.mode;

  const theme = React.useMemo(() => {
    const resultTheme = enhanceHighContrast(
      createTheme(
        {
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
          },
          colorSchemes: {
            light: true,
            dark: true,
          },
          direction: direction as 'ltr' | 'rtl',
          motion: {
            reducedMotion: 'system',
          },
        },
        dense ? highDensity : {},
      ),
    );
    if (upperMode) {
      Object.assign(resultTheme, resultTheme.colorSchemes[upperMode]);
    }
    if (runtimeTheme && Object.prototype.toString.call(runtimeTheme) === '[object Object]') {
      try {
        return deepmerge(resultTheme, runtimeTheme);
      } catch {
        return resultTheme;
      }
    }
    return resultTheme;
  }, [runtimeTheme, dense, direction, upperMode]);

  return (
    /* - use a function to ensure that the upper theme (branding theme) is not spread to the demo theme */
    /* - the system ThemeProvider skips the CSS variables logic: the variables come from the page, */
    /*   see `DemoPageThemeProvider`, and the theme already follows the upper mode */
    <SystemThemeProvider theme={() => theme}>{children}</SystemThemeProvider>
  );
}
