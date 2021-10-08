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

const resolveColorScheme = (key, fallback) => {
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
  const { baseTheme, colorSchemes, defaultColorScheme: dsDefaultColorScheme } = options;
  const ColorSchemeContext = React.createContext(undefined);

  const useColorScheme = () => {
    const value = React.useContext(ColorSchemeContext);
    if (!value) {
      throw new MuiError('MUI: `useColorScheme` must be called under <CssVarsProvider />');
    }
    return value;
  };

  function CssVarsProvider({
    children,
    baseTheme: baseThemeProp,
    colorSchemes: colorSchemesProp,
    storageKey = DEFAULT_STORAGE_KEY,
    dataAttribute = DEFAULT_DATA_ATTRIBUTE,
    defaultColorScheme = dsDefaultColorScheme,
  }) {
    const dataAttributeCamel = getDataset(dataAttribute);

    const [colorScheme, setColorScheme] = React.useState(resolveColorScheme(storageKey, 'light'));

    React.useEffect(() => {
      if (colorScheme) {
        document.body.dataset[dataAttributeCamel] = colorScheme;
        localStorage.setItem(storageKey, colorScheme);
      }
    }, [colorScheme, dataAttributeCamel, storageKey]);

    // localStorage event handling
    React.useEffect(() => {
      const handleStorage = (event) => {
        if (event.key === storageKey) {
          const storageColorScheme = event.newValue;
          if (storageColorScheme) {
            setColorScheme(storageColorScheme);
          }
        }
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }, [setColorScheme, storageKey]);

    const mergedBaseTheme = deepmerge(baseTheme, baseThemeProp);

    const { css: rootCss, vars: rootVars } = cssVarsParser(mergedBaseTheme);

    let activeColorSchemeTokens = colorSchemes[colorScheme || defaultColorScheme];

    if (colorSchemesProp) {
      activeColorSchemeTokens = deepmerge(
        activeColorSchemeTokens,
        colorSchemesProp[colorScheme || defaultColorScheme],
      );
    }

    let activeTheme = {
      ...mergedBaseTheme,
      ...activeColorSchemeTokens,
      vars: rootVars,
    };

    const styleSheet = {};

    const totalColorSchemes = { ...colorSchemes, ...colorSchemesProp };

    Object.entries(totalColorSchemes).forEach(([key, scheme]) => {
      const { css, vars } = cssVarsParser(scheme);
      if (key === defaultColorScheme) {
        styleSheet[':root'] = deepmerge(rootCss, css);
      } else {
        styleSheet[`[data-${dataAttribute}="${key}"]`] = css;
      }
      activeTheme = { ...activeTheme, vars: deepmerge(activeTheme.vars, vars) };
    });

    return (
      <ColorSchemeContext.Provider
        value={{
          colorScheme,
          setColorScheme,
          allColorSchemes: Object.keys(totalColorSchemes),
        }}
      >
        <GlobalStyles styles={styleSheet} />
        <ThemeContext.Provider value={activeTheme}>{children}</ThemeContext.Provider>
      </ColorSchemeContext.Provider>
    );
  }

  CssVarsProvider.propTypes = {
    /**
     * A theme object. You can provide a function to extend the outer theme.
     */
    baseTheme: PropTypes.object,
    children: PropTypes.node,
    colorSchemes: PropTypes.object,
    dataAttribute: PropTypes.string,
    defaultColorScheme: PropTypes.string,
    storageKey: PropTypes.string,
  };

  return { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
}
