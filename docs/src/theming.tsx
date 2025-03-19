import * as React from 'react';
import { deepmerge } from '@mui/utils';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  // @ts-ignore need to use deprecated API because MUI X repo still on Material UI v5
  experimental_extendTheme as extendTheme,
  // @ts-ignore to bypass type checking in MUI X repo because it still on Material UI v5
  createColorScheme,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { ThemeOptionsContext, highDensity } from 'docs/src/modules/components/ThemeContext';
import BrandingCssVarsProvider from './BrandingCssVarsProvider';

// TODO: use the `ThemeProvider` once the MUI X repo upgrade to Material UI v6+
const ThemeVarsProvider = typeof createColorScheme === 'function' ? ThemeProvider : CssVarsProvider;

export function DemoPageThemeProvider({ children }: React.PropsWithChildren) {
  const themeOptions = React.useContext(ThemeOptionsContext) as {
    dense: boolean;
    direction: 'ltr' | 'rtl';
    paletteMode: 'light' | 'dark';
  };
  const defaultTheme = React.useMemo(() => {
    if (typeof createColorScheme === 'function') {
      return createTheme({
        colorSchemes: { light: true, dark: true },
        cssVariables: {
          colorSchemeSelector: 'data-mui-color-scheme',
        },
      });
    }
    const initialTheme = extendTheme();
    return {
      ...initialTheme,
      ...initialTheme.colorSchemes[themeOptions.paletteMode],
      getColorSchemeSelector: (colorScheme: string) =>
        `*:where([data-mui-color-scheme="${colorScheme}"]) &`,
    };
  }, [themeOptions.paletteMode]);
  return (
    <BrandingCssVarsProvider {...themeOptions}>
      {/* The ThemeProvider below generate default Material UI CSS variables and attach to html for all the demo on the page */}
      {/* This is more performant than generating variables in each demo. */}
      <ThemeVarsProvider theme={defaultTheme} />
      {children}
    </BrandingCssVarsProvider>
  );
}

export function DemoInstanceThemeProvider({
  children,
  runtimeTheme,
}: React.PropsWithChildren<{ runtimeTheme: any }>) {
  const { dense, direction, paletteMode } = React.useContext(ThemeOptionsContext);

  const theme = React.useMemo(() => {
    let resultTheme;
    if (typeof createColorScheme === 'function') {
      resultTheme = createTheme(
        {
          // @ts-ignore to bypass type checking in MUI X repo
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
          },
          colorSchemes: {
            light: true,
            dark: true,
          },
          direction: direction as 'ltr' | 'rtl',
        },
        dense ? highDensity : {},
      );
    } else {
      resultTheme = extendTheme(
        {
          direction: direction as 'ltr' | 'rtl',
        },
        dense ? highDensity : {},
      );
      resultTheme = {
        ...resultTheme,
        ...resultTheme.colorSchemes[paletteMode],
        getColorSchemeSelector: (colorScheme: string) =>
          `*:where([data-mui-color-scheme="${colorScheme}"]) &`,
      };
    }
    if (runtimeTheme && Object.prototype.toString.call(runtimeTheme) === '[object Object]') {
      try {
        return deepmerge(resultTheme, runtimeTheme);
      } catch {
        return resultTheme;
      }
    }
    return resultTheme;
  }, [runtimeTheme, dense, direction, paletteMode]);

  return (
    /* - use a function to ensure that the upper theme (branding theme) is not spread to the demo theme */
    /* - a function will skip the CSS vars generation logic */
    <ThemeProvider theme={() => theme}>{children}</ThemeProvider>
  );
}
