import * as React from 'react';
import PropTypes from 'prop-types';
import MuiError from '@mui/utils/macros/MuiError.macro';
import { GlobalStyles } from '@mui/styled-engine';
import { deepmerge } from '@mui/utils';
import cssVarsParser from './cssVarsParser';
import ThemeProvider from '../ThemeProvider';
import getInitColorSchemeScript, {
  DEFAULT_ATTRIBUTE,
  DEFAULT_MODE_STORAGE_KEY,
} from './getInitColorSchemeScript';
import useCurrentColorScheme from './useCurrentColorScheme';

export default function createCssVarsProvider(options) {
  const {
    theme: baseTheme = {},
    defaultMode: desisgnSystemMode = 'light',
    defaultColorScheme: designSystemColorScheme,
    prefix: designSystemPrefix = '',
  } = options;

  if (
    !baseTheme.colorSchemes ||
    (typeof designSystemColorScheme === 'string' &&
      !baseTheme.colorSchemes[designSystemColorScheme]) ||
    (typeof designSystemColorScheme === 'object' &&
      !baseTheme.colorSchemes[designSystemColorScheme?.light]) ||
    (typeof designSystemColorScheme === 'object' &&
      !baseTheme.colorSchemes[designSystemColorScheme?.dark])
  ) {
    console.error(`MUI: \`${designSystemColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
  }
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
    prefix = designSystemPrefix,
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
    defaultMode = desisgnSystemMode,
    defaultColorScheme = designSystemColorScheme,
  }) {
    const { colorSchemes: baseColorSchemes = {}, ...restBaseTheme } = baseTheme;
    const { colorSchemes: colorSchemesProp = {}, ...restThemeProp } = themeProp;

    let mergedTheme = deepmerge(restBaseTheme, restThemeProp);

    const colorSchemes = deepmerge(baseColorSchemes, colorSchemesProp);
    const allColorSchemes = Object.keys(colorSchemes);

    const defaultLightColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;
    const { mode, setMode, lightColorScheme, darkColorScheme, colorScheme, setColorScheme } =
      useCurrentColorScheme({
        supportedColorSchemes: allColorSchemes,
        defaultLightColorScheme,
        defaultDarkColorScheme,
        modeStorageKey,
        defaultMode,
      });
    const resolvedColorScheme = (() => {
      if (!colorScheme) {
        // This scope occurs on the server
        if (defaultMode === 'dark') {
          return defaultDarkColorScheme;
        }
        // use light color scheme, if default mode is 'light' | 'auto'
        return defaultLightColorScheme;
      }
      return colorScheme;
    })();

    const { css: rootCss, vars: rootVars } = cssVarsParser(mergedTheme, { prefix });

    mergedTheme = {
      ...mergedTheme,
      ...colorSchemes[resolvedColorScheme],
      vars: rootVars,
    };

    const styleSheet = {};

    Object.entries(colorSchemes).forEach(([key, scheme]) => {
      const { css, vars } = cssVarsParser(scheme, { prefix });
      if (key === resolvedColorScheme) {
        mergedTheme.vars = {
          ...mergedTheme.vars,
          ...vars,
        };
      }
      const resolvedDefaultColorScheme = (() => {
        if (typeof defaultColorScheme === 'string') {
          return defaultColorScheme;
        }
        if (defaultMode === 'dark') {
          return defaultColorScheme.dark;
        }
        return defaultColorScheme.light;
      })();
      if (key === resolvedDefaultColorScheme) {
        styleSheet[':root'] = css;
      } else {
        styleSheet[`[${attribute}="${key}"]`] = css;
      }
    });

    React.useEffect(() => {
      if (colorScheme) {
        document.body.setAttribute(attribute, colorScheme);
      }
    }, [colorScheme, attribute]);

    return (
      <ColorSchemeContext.Provider
        value={{
          mode,
          setMode,
          lightColorScheme,
          darkColorScheme,
          colorScheme,
          setColorScheme,
          allColorSchemes,
        }}
      >
        <GlobalStyles styles={{ ':root': rootCss }} />
        <GlobalStyles styles={styleSheet} />
        <ThemeProvider theme={mergedTheme}>{children}</ThemeProvider>
      </ColorSchemeContext.Provider>
    );
  }

  CssVarsProvider.propTypes = {
    /**
     * The body attribute name to attach colorScheme.
     */
    attribute: PropTypes.string,
    /**
     * Your component tree.
     */
    children: PropTypes.node,
    /**
     * The initial color scheme used.
     */
    defaultColorScheme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * The initial mode used.
     */
    defaultMode: PropTypes.string,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: PropTypes.string,
    /**
     * css variable prefix
     */
    prefix: PropTypes.string,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: PropTypes.object,
  };

  return { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
}
