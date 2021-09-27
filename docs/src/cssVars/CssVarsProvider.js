/* eslint-disable react/prop-types */
import * as React from 'react';
import { ThemeContext as StyledEngineThemeContext, GlobalStyles } from '@mui/styled-engine';
import { ThemeProvider as MuiThemeProvider } from '@mui/private-theming';
import { createCssVars } from './cssVars';

const ModeContext = React.createContext();

export const useModeToggle = () => React.useContext(ModeContext);

const storageKey = 'mui-mode';

export function getInitColorModeScript() {
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

export default function CssVarsProvider({ children, themes, fallbackMode = 'light' }) {
  const [mode, setMode] = React.useState(resolveMode(storageKey, 'light'));
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
    setTimeout(() => {
      // setTimeout to demonstrate flash
      document.body.dataset.theme = mode;
      localStorage.setItem(storageKey, mode);
    }, [300]);
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
