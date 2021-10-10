import * as React from 'react';
import PropTypes from 'prop-types';
import MuiError from '@mui/utils/macros/MuiError.macro';
import { GlobalStyles } from '@mui/styled-engine';
import { deepmerge } from '@mui/utils';
import getDataset from './getDataset';
import cssVarsParser from './cssVarsParser';
import getInitColorSchemeScript, {
  DEFAULT_DATA_ATTRIBUTE,
  DEFAULT_STORAGE_KEY,
} from './getInitColorSchemeScript';

const resolveMode = (key, fallback) => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  let value;
  try {
    value = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return value || fallback;
};

export default function createCssVarsProvider(ThemeContext, options) {
  const { theme: baseTheme, defaultMode: designSystemMode } = options;
  const ModeContext = React.createContext(undefined);

  const useMode = () => {
    const value = React.useContext(ModeContext);
    if (!value) {
      throw new MuiError('MUI: `useMode` must be called under <CssVarsProvider />');
    }
    return value;
  };

  function CssVarsProvider({
    children,
    theme: themeProp,
    storageKey = DEFAULT_STORAGE_KEY,
    dataAttribute = DEFAULT_DATA_ATTRIBUTE,
    defaultMode = designSystemMode,
  }) {
    const dataAttributeCamel = getDataset(dataAttribute);

    const [mode, setMode] = React.useState(resolveMode(storageKey, defaultMode));

    React.useEffect(() => {
      if (mode) {
        document.body.dataset[dataAttributeCamel] = mode;
        localStorage.setItem(storageKey, mode);
      }
    }, [mode, dataAttributeCamel, storageKey]);

    // localStorage event handling
    React.useEffect(() => {
      const handleStorage = (event) => {
        if (event.key === storageKey) {
          const storageColorScheme = event.newValue;
          if (storageColorScheme) {
            setMode(storageColorScheme);
          }
        }
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }, [setMode, storageKey]);

    let mergedTheme = themeProp
      ? deepmerge(
          { ...baseTheme, ...(baseTheme.palette && { palette: baseTheme.palette[mode] }) },
          { ...themeProp, ...(themeProp.palette && { palette: themeProp.palette[mode] }) },
        )
      : { ...baseTheme, palette: baseTheme[mode] };

    const { css: rootCss, vars: rootVars } = cssVarsParser(mergedTheme);

    mergedTheme = {
      ...mergedTheme,
      vars: rootVars,
    };

    const styleSheet = {};

    const paletteModes =
      (themeProp ? deepmerge(baseTheme.palette, themeProp.palette) : baseTheme.palette) || {};

    Object.entries(paletteModes).forEach(([key, scheme]) => {
      const { css } = cssVarsParser(scheme);
      if (key === defaultMode) {
        styleSheet[':root'] = deepmerge(rootCss, css);
      } else {
        styleSheet[`[data-${dataAttribute}="${key}"]`] = css;
      }
    });

    return (
      <ModeContext.Provider
        value={{
          mode,
          setMode,
          allModes: Object.keys(paletteModes),
        }}
      >
        <GlobalStyles styles={styleSheet} />
        <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>
      </ModeContext.Provider>
    );
  }

  CssVarsProvider.propTypes = {
    /**
     * A theme object. You can provide a function to extend the outer theme.
     */
    children: PropTypes.node,
    dataAttribute: PropTypes.string,
    defaultMode: PropTypes.string,
    storageKey: PropTypes.string,
    theme: PropTypes.object,
  };

  return { CssVarsProvider, useMode, getInitColorSchemeScript };
}
