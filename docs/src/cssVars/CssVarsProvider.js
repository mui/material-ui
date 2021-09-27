/* eslint-disable react/prop-types */
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeContext as StyledEngineThemeContext, GlobalStyles } from '@mui/styled-engine';
import { ThemeProvider as MuiThemeProvider } from '@mui/private-theming';
import { createCssVars } from './cssVars';

const ModeContext = React.createContext();

export const useModeToggle = () => React.useContext(ModeContext);

const storageKey = 'mui-mode';

export function getInitColorModeScript(options = {}) {
  const { preferSystem } = options;
  if (preferSystem) {
    return `(function() { try {
      var mode = localStorage.getItem('${storageKey}');
      if (mode) {
        if (mode === 'system') {
          const media = window.matchMedia('(prefers-color-scheme: dark)')
          if (media.matches) {
            document.body.dataset.theme = 'dark';
          }
        } else {
          document.body.dataset.theme = mode;
        }
      }
    } catch (e) {} })();`;
  }
  return `(function() { try {
    var mode = localStorage.getItem('${storageKey}');
    if (mode) {
      document.body.dataset.theme = mode;
    }
  } catch (e) {} })();`;
}

const resolveMode = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback;
  }
  let value;
  try {
    value = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return value || fallback;
};

export default function CssVarsProvider({
  children,
  themes,
  preferSystem,
  fallbackMode = 'light',
}) {
  const [mode, setMode] = React.useState(resolveMode(storageKey, 'light'));
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  let activeTheme = themes[mode];
  const styleSheet = {};

  Object.entries(themes).forEach(([themeKey, theme]) => {
    const { css, vars } = createCssVars(theme);
    if (themeKey === fallbackMode) {
      styleSheet[':root'] = css;
    } else {
      styleSheet[`[data-theme="${themeKey}"]`] = css;
    }
    if (themeKey === mode) {
      activeTheme = { ...activeTheme, vars };
    }
  });

  React.useEffect(() => {
    alert('blocking render');
  }, []);

  React.useEffect(() => {
    if (preferSystem) {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [preferSystem, setMode, prefersDarkMode]);

  React.useEffect(() => {
    document.body.dataset.theme = mode;
    localStorage.setItem(storageKey, mode);
  }, [mode]);

  // localStorage event handling
  React.useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === storageKey) {
        const storageMode = event.newValue;
        if (storageMode) {
          setMode(storageMode);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [setMode]);

  return (
    <React.Fragment>
      <GlobalStyles styles={styleSheet} />
      <ModeContext.Provider value={{ mode, setMode, allModes: Object.keys(themes) }}>
        <MuiThemeProvider theme={activeTheme}>
          <StyledEngineThemeContext.Provider value={activeTheme}>
            {children}
          </StyledEngineThemeContext.Provider>
        </MuiThemeProvider>
      </ModeContext.Provider>
    </React.Fragment>
  );
}
