import * as React from 'react';
import PropTypes from 'prop-types';
import MuiError from '@mui/utils/macros/MuiError.macro';
import { deepmerge } from '@mui/utils';
import { GlobalStyles } from '@mui/styled-engine';
import cssVarsParser from './cssVarsParser';
import ThemeProvider from '../ThemeProvider';
import systemGetInitColorSchemeScript, {
  DEFAULT_ATTRIBUTE,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  DEFAULT_MODE_STORAGE_KEY,
} from './getInitColorSchemeScript';
import useCurrentColorScheme from './useCurrentColorScheme';

export const DISABLE_CSS_TRANSITION =
  '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';

export default function createCssVarsProvider(options) {
  const {
    theme: defaultTheme = {},
    attribute: defaultAttribute = DEFAULT_ATTRIBUTE,
    modeStorageKey: defaultModeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey: defaultColorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    defaultMode: designSystemMode = 'light',
    defaultColorScheme: designSystemColorScheme,
    disableTransitionOnChange: designSystemTransitionOnChange = false,
    shouldSkipGeneratingVar: designSystemShouldSkipGeneratingVar,
    resolveTheme,
    excludeVariablesFromRoot,
  } = options;

  if (
    !defaultTheme.colorSchemes ||
    (typeof designSystemColorScheme === 'string' &&
      !defaultTheme.colorSchemes[designSystemColorScheme]) ||
    (typeof designSystemColorScheme === 'object' &&
      !defaultTheme.colorSchemes[designSystemColorScheme?.light]) ||
    (typeof designSystemColorScheme === 'object' &&
      !defaultTheme.colorSchemes[designSystemColorScheme?.dark])
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
    theme: themeProp = defaultTheme,
    modeStorageKey = defaultModeStorageKey,
    colorSchemeStorageKey = defaultColorSchemeStorageKey,
    attribute = defaultAttribute,
    defaultMode = designSystemMode,
    defaultColorScheme = designSystemColorScheme,
    disableTransitionOnChange = designSystemTransitionOnChange,
    storageWindow = typeof window === 'undefined' ? undefined : window,
    documentNode = typeof document === 'undefined' ? undefined : document,
    colorSchemeNode = typeof document === 'undefined' ? undefined : document.documentElement,
    colorSchemeSelector = ':root',
    shouldSkipGeneratingVar = designSystemShouldSkipGeneratingVar,
  }) {
    const ctx = React.useContext(ColorSchemeContext);
    const nested = !!ctx;
    const hasMounted = React.useRef(false);

    const { colorSchemes = {}, components = {}, ...restThemeProp } = themeProp;
    const allColorSchemes = Object.keys(colorSchemes);
    const defaultLightColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;

    // The `useCurrentColorScheme` result is neglected if CssVarsProvider is a nested provider.
    const {
      mode: stateMode,
      setMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme: stateColorScheme,
      setColorScheme,
    } = useCurrentColorScheme({
      supportedColorSchemes: allColorSchemes,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey,
      colorSchemeStorageKey,
      defaultMode,
      storageWindow,
    });

    // 1. Get the `mode` and `colorScheme` values. Use the upper provider state if exists.
    const mode = ctx?.mode ?? stateMode;
    const colorScheme = ctx?.colorScheme ?? stateColorScheme;

    const calculatedMode = (() => {
      if (!mode) {
        // This scope occurs on the server
        if (defaultMode === 'system') {
          return designSystemMode;
        }
        return defaultMode;
      }
      return mode;
    })();
    const calculatedColorScheme = (() => {
      if (!colorScheme) {
        // This scope occurs on the server
        if (calculatedMode === 'dark') {
          return defaultDarkColorScheme;
        }
        // use light color scheme, if default mode is 'light' | 'system'
        return defaultLightColorScheme;
      }
      return colorScheme;
    })();

    // 2. Start composing the theme object on the server.
    const theme = {
      ...restThemeProp,
      components,
      colorSchemes,
      vars: {},
      getColorSchemeSelector: (targetColorScheme) => `[${attribute}="${targetColorScheme}"] &`,
    };

    /**
     * It makes the codebase more complex but required to support existing projects using Material UI
     * to migrate to CSS variables.
     *
     * For example: `{ background: alpha(theme.palette.{some color}, 0.2) }`
     * The theme.palette.* must exist on the server.
     *
     * ==========================================================================================
     *
     * Clone the value of the `theme.colorSchemes.{colorScheme}` and attach it back to the theme.
     *
     * E.g. if the `colorScheme` is dark:
     *
     * theme before: {
     *  colorSchemes: {
     *    light: { palette: { ...lightPalette }, ...lightTokens },
     *    dark: { palette: { ...darkPalette }, ...darkTokens }
     *  }
     * }
     *
     * theme after: {
     *  colorSchemes: { ... }, // same as before
     *  palette: { ...darkPalette, colorScheme: 'dark' },
     *  ...darkTokens
     * }
     */
    const scheme = theme.colorSchemes[calculatedColorScheme] || {};
    Object.keys(scheme).forEach((schemeKey) => {
      if (scheme[schemeKey] && typeof scheme[schemeKey] === 'object') {
        // shallow merge the 1st level structure of the theme to support Material You theme structure.
        theme[schemeKey] = {
          ...theme[schemeKey],
          ...scheme[schemeKey],
        };
      } else {
        theme[schemeKey] = scheme[schemeKey];
      }
    });
    if (theme.palette) {
      theme.palette = { ...theme.palette, colorScheme: calculatedColorScheme };
    }

    // 3. Create CSS variables and store them in objects (to be generated in stylesheets in the final step)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const styles = generateCssThemeVars({
      theme: { ...restThemeProp, colorSchemes },
      defaultMode,
      defaultColorScheme,
      rootSelector: colorSchemeSelector,
      colorSchemeSelector: (key) =>
        `${colorSchemeSelector === ':root' ? '' : colorSchemeSelector}[${attribute}="${key}"]`,
      shouldSkipGeneratingVar,
      onGenerateVars: (vars) => {
        // attach `vars` to the theme to refer to a CSS variable.
        theme.vars = deepmerge(theme.vars, vars);
      },
    });

    // [Skipped if nested]
    // 5. Declaring effects
    // 5.1 Updates the selector value to use the current color scheme which tells CSS to use the proper stylesheet.
    React.useEffect(() => {
      if (nested) {
        return;
      }
      if (colorScheme && colorSchemeNode) {
        // attaches attribute to <html> because the css variables are attached to :root (html)
        colorSchemeNode.setAttribute(attribute, colorScheme);
      }
    }, [colorScheme, attribute, colorSchemeNode, nested]);

    // [Skipped if nested]
    // 5.2 Remove the CSS transition when color scheme changes to create instant experience.
    // credit: https://github.com/pacocoursey/next-themes/blob/b5c2bad50de2d61ad7b52a9c5cdc801a78507d7a/index.tsx#L313
    React.useEffect(() => {
      if (nested) {
        return undefined;
      }
      let timer;
      if (disableTransitionOnChange && hasMounted.current && documentNode) {
        const css = documentNode.createElement('style');
        css.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
        documentNode.head.appendChild(css);

        // Force browser repaint
        (() => window.getComputedStyle(documentNode.body))();

        timer = setTimeout(() => {
          documentNode.head.removeChild(css);
        }, 1);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [colorScheme, disableTransitionOnChange, documentNode, nested]);
    React.useEffect(() => {
      hasMounted.current = true;
      return () => {
        hasMounted.current = false;
      };
    }, []);

    const contextValue = React.useMemo(
      () => ({
        mode,
        systemMode,
        setMode,
        lightColorScheme,
        darkColorScheme,
        colorScheme,
        setColorScheme,
        allColorSchemes,
      }),
      [
        allColorSchemes,
        colorScheme,
        darkColorScheme,
        lightColorScheme,
        mode,
        setColorScheme,
        setMode,
        systemMode,
      ],
    );

    const element = (
      <ThemeProvider theme={resolveTheme ? resolveTheme(theme) : theme}>{children}</ThemeProvider>
    );

    if (ctx) {
      // If nested, the context and stylesheet are not created.
      return element;
    }

    return (
      <ColorSchemeContext.Provider value={contextValue}>
        <GlobalStyles styles={styles} />
        {element}
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
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: PropTypes.any,
    /**
     * The CSS selector for attaching the generated custom properties
     */
    colorSchemeSelector: PropTypes.string,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: PropTypes.string,
    /**
     * The initial color scheme used.
     */
    defaultColorScheme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * The initial mode used.
     */
    defaultMode: PropTypes.string,
    /**
     * Disable CSS transitions when switching between modes or color schemes
     */
    disableTransitionOnChange: PropTypes.bool,
    /**
     * The document to attach the attribute to
     */
    documentNode: PropTypes.any,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: PropTypes.string,
    /**
     * A function to determine if the key, value should be attached as CSS Variable
     */
    shouldSkipGeneratingVar: PropTypes.func,
    /**
     * The window that attaches the 'storage' event listener
     * @default window
     */
    storageWindow: PropTypes.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: PropTypes.object,
  };

  /**
   * @internal
   */
  const defaultColorSchemeSelector = (key) => `[${defaultAttribute}="${key}"]`;
  /**
   * Low level API for generating CSS theme variables. Useful for creating nested CSS variables scopes.
   *
   * It receives a raw theme as an input and generates ready-to-use stylesheets that contain CSS variables for all color schemes.
   * It also attaches an object to `theme.vars.*` that can be used as references to CSS variables, and other utilities.
   *
   * Note: The generated CSS variables are prefixed by `theme.cssVarPrefix` input.
   */
  const generateCssThemeVars = ({
    theme = defaultTheme,
    defaultMode = designSystemMode,
    defaultColorScheme = designSystemColorScheme,
    shouldSkipGeneratingVar = designSystemShouldSkipGeneratingVar,
    rootSelector = ':root',
    colorSchemeSelector = defaultColorSchemeSelector,
    onGenerateVars,
  }) => {
    const { colorSchemes = {}, cssVarPrefix } = theme;

    const { css: rootCss, vars: rootVars } = cssVarsParser(theme, {
      prefix: cssVarPrefix,
      shouldSkipGeneratingVar,
    });
    onGenerateVars?.(rootVars);

    const defaultColorSchemeStyleSheet = {};
    const otherColorSchemesStyleSheet = {};
    Object.entries(colorSchemes).forEach(([key, scheme]) => {
      const { css, vars } = cssVarsParser(scheme, {
        prefix: cssVarPrefix,
        shouldSkipGeneratingVar,
      });
      onGenerateVars?.(vars);

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
        if (excludeVariablesFromRoot) {
          const excludedVariables = {};
          excludeVariablesFromRoot(cssVarPrefix).forEach((cssVar) => {
            excludedVariables[cssVar] = css[cssVar];
            delete css[cssVar];
          });
          // treat excluded variables as scoped color scheme
          defaultColorSchemeStyleSheet[colorSchemeSelector(key)] = excludedVariables;
        }
        defaultColorSchemeStyleSheet[`${rootSelector}, ${colorSchemeSelector(key)}`] = css;
      } else {
        otherColorSchemesStyleSheet[colorSchemeSelector(key)] = css;
      }
    });

    return {
      [rootSelector]: rootCss,
      ...defaultColorSchemeStyleSheet,
      ...otherColorSchemesStyleSheet,
    };
  };

  const defaultLightColorScheme =
    typeof designSystemColorScheme === 'string'
      ? designSystemColorScheme
      : designSystemColorScheme.light;
  const defaultDarkColorScheme =
    typeof designSystemColorScheme === 'string'
      ? designSystemColorScheme
      : designSystemColorScheme.dark;

  const getInitColorSchemeScript = (params) =>
    systemGetInitColorSchemeScript({
      attribute: defaultAttribute,
      colorSchemeStorageKey: defaultColorSchemeStorageKey,
      defaultMode: designSystemMode,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey: defaultModeStorageKey,
      ...params,
    });

  return {
    CssVarsProvider,
    useColorScheme,
    generateCssThemeVars,
    getInitColorSchemeScript,
  };
}
