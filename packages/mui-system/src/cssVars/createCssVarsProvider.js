import * as React from 'react';
import PropTypes from 'prop-types';
import MuiError from '@mui/utils/macros/MuiError.macro';
import { GlobalStyles } from '@mui/styled-engine';
import { deepmerge } from '@mui/utils';
import cssVarsParser from './cssVarsParser';
import getInitColorSchemeScript, {
  DEFAULT_ATTRIBUTE,
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
  const { theme: baseTheme = {}, defaultColorScheme: designSystemColorScheme } = options;
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
    theme: themeProp = {},
    storageKey = DEFAULT_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
    defaultColorScheme = designSystemColorScheme,
  }) {
    const [colorScheme, setColorScheme] = React.useState(
      resolveMode(storageKey, defaultColorScheme),
    );

    React.useEffect(() => {
      if (colorScheme) {
        document.body.setAttribute(attribute, colorScheme);
        localStorage.setItem(storageKey, colorScheme);
      }
    }, [colorScheme, attribute, storageKey]);

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

    const { colorSchemes: baseColorSchemes = {}, ...restBaseTheme } = baseTheme;
    const { colorSchemes: colorSchemesProp = {}, ...restThemeProp } = themeProp;

    let mergedTheme = deepmerge(restBaseTheme, restThemeProp);
    const colorSchemes = deepmerge(baseColorSchemes, colorSchemesProp);

    const { css: rootCss, vars: rootVars } = cssVarsParser(mergedTheme);

    mergedTheme = {
      ...mergedTheme,
      ...colorSchemes[colorScheme],
      vars: rootVars,
    };

    const styleSheet = {};

    Object.entries(colorSchemes).forEach(([key, scheme]) => {
      const { css, vars } = cssVarsParser(scheme);
      if (key === colorScheme) {
        mergedTheme.vars = {
          ...mergedTheme.vars,
          ...vars,
        };
      }
      if (key === defaultColorScheme) {
        styleSheet[':root'] = deepmerge(rootCss, css);
      } else {
        styleSheet[`[${attribute}="${key}"]`] = css;
      }
    });

    return (
      <ColorSchemeContext.Provider
        value={{
          colorScheme,
          setColorScheme,
          allColorSchemes: Object.keys(colorSchemes),
        }}
      >
        <GlobalStyles styles={styleSheet} />
        <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>
      </ColorSchemeContext.Provider>
    );
  }

  CssVarsProvider.propTypes = {
    attribute: PropTypes.string,
    /**
     * Your component tree.
     */
    children: PropTypes.node,
    /**
     * The initial color scheme for first visit.
     */
    defaultColorScheme: PropTypes.string,
    /**
     * The key used to store current color scheme.
     */
    storageKey: PropTypes.string,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: PropTypes.object,
  };

  return { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
}
