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

export const DISABLE_CSS_TRANSITION =
  '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';

export default function createCssVarsProvider(options) {
  const {
    theme: baseTheme = {},
    defaultMode: desisgnSystemMode = 'light',
    defaultColorScheme: designSystemColorScheme,
    disableTransitionOnChange = false,
    enableColorScheme = true,
    prefix: designSystemPrefix = '',
    shouldSkipGeneratingVar,
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
    const hasMounted = React.useRef(null);

    // eslint-disable-next-line prefer-const
    let { components = {}, ...mergedTheme } = deepmerge(restBaseTheme, restThemeProp);
    const colorSchemes = deepmerge(baseColorSchemes, colorSchemesProp);

    const allColorSchemes = Object.keys(colorSchemes);

    const defaultLightColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;
    const {
      mode,
      setMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme,
      setColorScheme,
    } = useCurrentColorScheme({
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

    const { css: rootCss, vars: rootVars } = cssVarsParser(mergedTheme, {
      prefix,
      basePrefix: designSystemPrefix,
      shouldSkipGeneratingVar,
    });

    mergedTheme = {
      ...mergedTheme,
      ...colorSchemes[resolvedColorScheme],
      components,
      colorSchemes,
      vars: rootVars,
    };

    const styleSheet = {};

    Object.entries(colorSchemes).forEach(([key, scheme]) => {
      const { css, vars } = cssVarsParser(scheme, {
        prefix,
        basePrefix: designSystemPrefix,
        shouldSkipGeneratingVar,
      });
      mergedTheme.vars = deepmerge(mergedTheme.vars, vars);
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

    React.useEffect(() => {
      if (!mode || !enableColorScheme) {
        return undefined;
      }
      const priorColorScheme = document.documentElement.style.getPropertyValue('color-scheme');
      // `color-scheme` tells browser to render built-in elements according to its value: `light` or `dark`
      if (mode === 'system') {
        document.documentElement.style.setProperty('color-scheme', systemMode);
      } else {
        document.documentElement.style.setProperty('color-scheme', mode);
      }

      return () => {
        document.documentElement.style.setProperty('color-scheme', priorColorScheme);
      };
    }, [mode, systemMode]);

    React.useEffect(() => {
      let timer;
      if (disableTransitionOnChange && hasMounted.current) {
        // credit: https://github.com/pacocoursey/next-themes/blob/b5c2bad50de2d61ad7b52a9c5cdc801a78507d7a/index.tsx#L313
        const css = document.createElement('style');
        css.appendChild(document.createTextNode(DISABLE_CSS_TRANSITION));
        document.head.appendChild(css);

        // Force browser repaint
        (() => window.getComputedStyle(document.body))();

        timer = setTimeout(() => {
          document.head.removeChild(css);
        }, 1);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [colorScheme]);

    React.useEffect(() => {
      hasMounted.current = true;
    }, []);

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
     * The component tree.
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
     * CSS variable prefix.
     */
    prefix: PropTypes.string,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: PropTypes.object,
  };

  return { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
}
