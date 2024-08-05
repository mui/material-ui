import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles } from '@mui/styled-engine';
import { useTheme as muiUseTheme } from '@mui/private-theming';
import ThemeProvider from '../ThemeProvider';
import InitColorSchemeScript, {
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  DEFAULT_MODE_STORAGE_KEY,
} from '../InitColorSchemeScript/InitColorSchemeScript';
import useCurrentColorScheme from './useCurrentColorScheme';

export const DISABLE_CSS_TRANSITION =
  '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';

export default function createCssVarsProvider(options) {
  const {
    themeId,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: defaultTheme = {},
    modeStorageKey: defaultModeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey: defaultColorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    disableTransitionOnChange: designSystemTransitionOnChange = false,
    defaultColorScheme,
    resolveTheme,
  } = options;

  const defaultContext = {
    allColorSchemes: [],
    colorScheme: undefined,
    darkColorScheme: undefined,
    lightColorScheme: undefined,
    mode: undefined,
    setColorScheme: () => {},
    setMode: () => {},
    systemMode: undefined,
  };

  const ColorSchemeContext = React.createContext(undefined);

  if (process.env.NODE_ENV !== 'production') {
    ColorSchemeContext.displayName = 'ColorSchemeContext';
  }

  const useColorScheme = () => React.useContext(ColorSchemeContext) || defaultContext;

  function CssVarsProvider(props) {
    const {
      children,
      theme: themeProp,
      modeStorageKey = defaultModeStorageKey,
      colorSchemeStorageKey = defaultColorSchemeStorageKey,
      disableTransitionOnChange = designSystemTransitionOnChange,
      storageWindow = typeof window === 'undefined' ? undefined : window,
      documentNode = typeof document === 'undefined' ? undefined : document,
      colorSchemeNode = typeof document === 'undefined' ? undefined : document.documentElement,
      disableNestedContext = false,
      disableStyleSheetGeneration = false,
    } = props;
    const hasMounted = React.useRef(false);
    const upperTheme = muiUseTheme();
    const ctx = React.useContext(ColorSchemeContext);
    const nested = !!ctx && !disableNestedContext;

    const initialTheme = React.useMemo(() => {
      if (themeProp) {
        return themeProp;
      }
      return typeof defaultTheme === 'function' ? defaultTheme() : defaultTheme;
    }, [themeProp]);
    const scopedTheme = initialTheme[themeId];
    const {
      colorSchemes = {},
      components = {},
      cssVarPrefix,
      ...restThemeProp
    } = scopedTheme || initialTheme;
    const joinedColorSchemes = Object.keys(colorSchemes)
      .filter((k) => !!colorSchemes[k])
      .join(',');
    const allColorSchemes = React.useMemo(
      () => joinedColorSchemes.split(','),
      [joinedColorSchemes],
    );
    const defaultLightColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;
    const defaultMode =
      colorSchemes[defaultLightColorScheme] && colorSchemes[defaultDarkColorScheme]
        ? 'system'
        : colorSchemes[restThemeProp.defaultColorScheme]?.palette?.mode ||
          restThemeProp.palette?.mode;

    // 1. Get the data about the `mode`, `colorScheme`, and setter functions.
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

    let mode = stateMode;
    let colorScheme = stateColorScheme;

    if (nested) {
      mode = ctx.mode;
      colorScheme = ctx.colorScheme;
    }

    // `colorScheme` is undefined on the server and hydration phase
    const calculatedColorScheme = colorScheme || restThemeProp.defaultColorScheme;

    // 2. get the `vars` object that refers to the CSS custom properties
    const themeVars = restThemeProp.generateThemeVars?.() || restThemeProp.vars;

    // 3. Start composing the theme object
    const theme = {
      ...restThemeProp,
      components,
      colorSchemes,
      cssVarPrefix,
      vars: themeVars,
    };
    if (typeof theme.generateSpacing === 'function') {
      theme.spacing = theme.generateSpacing();
    }

    // 4. Resolve the color scheme and merge it to the theme
    if (calculatedColorScheme) {
      const scheme = colorSchemes[calculatedColorScheme];
      if (scheme && typeof scheme === 'object') {
        // 4.1 Merge the selected color scheme to the theme
        Object.keys(scheme).forEach((schemeKey) => {
          if (scheme[schemeKey] && typeof scheme[schemeKey] === 'object') {
            // shallow merge the 1st level structure of the theme.
            theme[schemeKey] = {
              ...theme[schemeKey],
              ...scheme[schemeKey],
            };
          } else {
            theme[schemeKey] = scheme[schemeKey];
          }
        });
      }
    }

    // 5. Declaring effects
    // 5.1 Updates the selector value to use the current color scheme which tells CSS to use the proper stylesheet.
    const colorSchemeSelector = restThemeProp.colorSchemeSelector;
    React.useEffect(() => {
      if (
        colorScheme &&
        colorSchemeNode &&
        colorSchemeSelector &&
        colorSchemeSelector !== 'media'
      ) {
        const selector = colorSchemeSelector;
        let rule = colorSchemeSelector;
        if (selector === 'class') {
          rule = `.%s`;
        }
        if (selector === 'data') {
          rule = `[data-%s]`;
        }
        if (selector?.startsWith('data-') && !selector.includes('%s')) {
          // 'data-mui-color-scheme' -> '[data-mui-color-scheme="%s"]'
          rule = `[${selector}="%s"]`;
        }
        if (rule.startsWith('.')) {
          colorSchemeNode.classList.remove(
            ...allColorSchemes.map((scheme) => rule.substring(1).replace('%s', scheme)),
          );
          colorSchemeNode.classList.add(rule.substring(1).replace('%s', colorScheme));
        } else {
          const matches = rule.replace('%s', colorScheme).match(/\[([^\]]+)\]/);
          if (matches) {
            const [attr, value] = matches[1].split('=');
            if (!value) {
              // for attributes like `data-theme-dark`, `data-theme-light`
              // remove all the existing data attributes before setting the new one
              allColorSchemes.forEach((scheme) => {
                colorSchemeNode.removeAttribute(attr.replace(colorScheme, scheme));
              });
            }
            colorSchemeNode.setAttribute(attr, value ? value.replace(/"|'/g, '') : '');
          } else {
            colorSchemeNode.setAttribute(rule, colorScheme);
          }
        }
      }
    }, [colorScheme, colorSchemeSelector, colorSchemeNode, allColorSchemes]);

    // 5.2 Remove the CSS transition when color scheme changes to create instant experience.
    // credit: https://github.com/pacocoursey/next-themes/blob/b5c2bad50de2d61ad7b52a9c5cdc801a78507d7a/index.tsx#L313
    React.useEffect(() => {
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
    }, [colorScheme, disableTransitionOnChange, documentNode]);
    React.useEffect(() => {
      hasMounted.current = true;
      return () => {
        hasMounted.current = false;
      };
    }, []);

    const contextValue = React.useMemo(
      () => ({
        allColorSchemes,
        colorScheme,
        darkColorScheme,
        lightColorScheme,
        mode,
        setColorScheme,
        setMode,
        systemMode,
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

    let shouldGenerateStyleSheet = true;
    if (
      disableStyleSheetGeneration ||
      restThemeProp.cssVariables === false ||
      (nested && upperTheme?.cssVarPrefix === cssVarPrefix)
    ) {
      shouldGenerateStyleSheet = false;
    }

    const element = (
      <React.Fragment>
        {shouldGenerateStyleSheet && (
          <React.Fragment>
            {(theme.generateStyleSheets?.() || []).map((styles, index) => (
              <GlobalStyles key={index} styles={styles} />
            ))}
          </React.Fragment>
        )}
        <ThemeProvider
          themeId={scopedTheme ? themeId : undefined}
          theme={resolveTheme ? resolveTheme(theme) : theme}
        >
          {children}
        </ThemeProvider>
      </React.Fragment>
    );

    if (nested) {
      return element;
    }

    return (
      <ColorSchemeContext.Provider value={contextValue}>{element}</ColorSchemeContext.Provider>
    );
  }

  CssVarsProvider.propTypes = {
    /**
     * The component tree.
     */
    children: PropTypes.node,
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: PropTypes.any,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: PropTypes.string,
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: PropTypes.bool,
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: PropTypes.bool,
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: PropTypes.bool,
    /**
     * The document to attach the attribute to.
     */
    documentNode: PropTypes.any,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: PropTypes.string,
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: PropTypes.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: PropTypes.object,
  };

  const defaultLightColorScheme =
    typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
  const defaultDarkColorScheme =
    typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;

  const getInitColorSchemeScript = (params) =>
    InitColorSchemeScript({
      colorSchemeStorageKey: defaultColorSchemeStorageKey,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey: defaultModeStorageKey,
      ...params,
    });

  return { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
}
