import * as React from 'react';
import { deepmerge } from '@mui/utils';
import {
  CssVarsProvider as JoyCssVarsProvider,
  useColorScheme as useJoyColorScheme,
  extendTheme,
  THEME_ID as JOY_THEME_ID,
} from '@mui/joy/styles';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { ThemeOptionsContext, highDensity } from 'docs/src/modules/components/ThemeContext';
import BrandingCssVarsProvider from './BrandingCssVarsProvider';

const defaultTheme = createTheme({
  experimental_modularCssLayers: true,
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
});

function JoyModeObserver() {
  const themeOptions = React.useContext(ThemeOptionsContext);
  const { setMode } = useJoyColorScheme();
  React.useEffect(() => {
    if (themeOptions.paletteMode) {
      setMode(themeOptions.paletteMode);
    }
  }, [themeOptions.paletteMode, setMode]);
  return null;
}

export function DemoPageThemeProvider({
  children,
  hasJoy,
}: React.PropsWithChildren<{
  /**
   * Set to true if the children render Joy UI components.
   * Otherwise, Joy UI components will throw errors because they try to get fields that does not exist in material theme.
   */
  hasJoy?: boolean;
}>) {
  const themeOptions = React.useContext(ThemeOptionsContext);
  const joyTheme = React.useMemo(() => (hasJoy ? extendTheme() : undefined), [hasJoy]);
  return (
    <BrandingCssVarsProvider {...themeOptions}>
      {/* The ThemeProvider below generate default Material UI CSS variables and attach to html for all the demo on the page */}
      {/* This is more performant than generating variables in each demo. */}
      <ThemeProvider theme={defaultTheme} />
      {hasJoy ? (
        <JoyCssVarsProvider theme={{ [JOY_THEME_ID]: joyTheme! }}>
          <JoyModeObserver />
          {children}
        </JoyCssVarsProvider>
      ) : (
        children
      )}
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
    const resultTheme = createTheme(
      {
        experimental_modularCssLayers: true,
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
    /* - a function will skip the CSS vars generation logic */
    <ThemeProvider
      theme={() =>
        upperTheme && JOY_THEME_ID in upperTheme
          ? { ...theme, [JOY_THEME_ID]: upperTheme?.[JOY_THEME_ID] }
          : theme
      }
    >
      {children}
    </ThemeProvider>
  );
}
