'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles } from '@mui/styled-engine';
import { useTheme as muiUseTheme } from '@mui/private-theming';
import ThemeProvider from '../ThemeProvider';
import {
  buildInitColorSchemeScript,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  DEFAULT_MODE_STORAGE_KEY,
} from '../InitColorSchemeScript/InitColorSchemeScript';
import useColorSchemeSetup, { DISABLE_CSS_TRANSITION } from './useColorSchemeSetup';

export { DISABLE_CSS_TRANSITION };

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

  const defaultColorSchemes = {};
  const defaultComponents = {};

  function CssVarsProvider(props) {
    const {
      children,
      theme: themeProp,
      modeStorageKey = defaultModeStorageKey,
      colorSchemeStorageKey = defaultColorSchemeStorageKey,
      disableTransitionOnChange = designSystemTransitionOnChange,
      storageManager,
      storageWindow = typeof window === 'undefined' ? undefined : window,
      documentNode = typeof document === 'undefined' ? undefined : document,
      colorSchemeNode = typeof document === 'undefined' ? undefined : document.documentElement,
      disableNestedContext = false,
      disableStyleSheetGeneration = false,
      defaultMode: initialMode = 'system',
      forceThemeRerender = false,
      noSsr,
    } = props;
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
    const restThemeProp = scopedTheme || initialTheme;
    const {
      colorSchemes = defaultColorSchemes,
      components = defaultComponents,
      cssVarPrefix,
    } = restThemeProp;
    const defaultLightColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;
    const defaultMode =
      colorSchemes[defaultLightColorScheme] && colorSchemes[defaultDarkColorScheme]
        ? initialMode
        : colorSchemes[restThemeProp.defaultColorScheme]?.palette?.mode ||
          restThemeProp.palette?.mode;

    // 1. Color-scheme state, DOM attribute sync, and transition suppression.
    //    Pass colorSchemeNode: null when nested so the inner provider does not
    //    fight the root provider over the DOM attribute.
    const {
      allColorSchemes,
      colorScheme: setupColorScheme,
      mode: setupMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      setMode,
      setColorScheme,
    } = useColorSchemeSetup({
      colorSchemes,
      colorSchemeSelector: restThemeProp.colorSchemeSelector,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey,
      colorSchemeStorageKey,
      defaultMode,
      storageManager,
      storageWindow,
      colorSchemeNode: nested ? null : colorSchemeNode,
      documentNode,
      disableTransitionOnChange,
      noSsr,
    });

    // When nested, defer to the root provider's mode/colorScheme so all
    // design-system instances stay in sync.
    let mode = setupMode;
    let colorScheme = setupColorScheme;

    if (nested) {
      mode = ctx.mode;
      colorScheme = ctx.colorScheme;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (forceThemeRerender && !restThemeProp.vars) {
        console.warn(
          [
            'MUI: The `forceThemeRerender` prop should only be used with CSS theme variables.',
            'Note that it will slow down the app when changing between modes, so only do this when you cannot find a better solution.',
          ].join('\n'),
        );
      }
    }

    // `colorScheme` is undefined on the server and hydration phase
    let calculatedColorScheme = colorScheme || restThemeProp.defaultColorScheme;
    if (restThemeProp.vars && !forceThemeRerender) {
      calculatedColorScheme = restThemeProp.defaultColorScheme;
    }

    const memoTheme = React.useMemo(() => {
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

      return resolveTheme ? resolveTheme(theme) : theme;
    }, [restThemeProp, calculatedColorScheme, components, colorSchemes, cssVarPrefix]);

    const contextValue = React.useMemo(
      () => ({
        allColorSchemes,
        colorScheme,
        darkColorScheme,
        lightColorScheme,
        mode,
        setColorScheme,
        setMode:
          process.env.NODE_ENV === 'production'
            ? setMode
            : (newMode) => {
                if (memoTheme.colorSchemeSelector === 'media') {
                  // #host-reference
                  console.error(
                    [
                      'MUI: The `setMode` function has no effect if `colorSchemeSelector` is `media` (`media` is the default value).',
                      'To toggle the mode manually, please configure `colorSchemeSelector` to use a class or data attribute.',
                      'To learn more, visit https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually',
                    ].join('\n'),
                  );
                }
                setMode(newMode);
              },
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
        memoTheme.colorSchemeSelector,
      ],
    );

    let shouldGenerateStyleSheet = true;
    if (
      disableStyleSheetGeneration ||
      restThemeProp.cssVariables === false ||
      // Same-prefix nested providers can reuse :root vars, but scoped themes
      // need their own stylesheet for their rootSelector.
      (nested &&
        upperTheme?.cssVarPrefix === cssVarPrefix &&
        (restThemeProp.rootSelector || ':root') === ':root')
    ) {
      shouldGenerateStyleSheet = false;
    }

    const element = (
      <React.Fragment>
        <ThemeProvider themeId={scopedTheme ? themeId : undefined} theme={memoTheme}>
          {children}
        </ThemeProvider>
        {shouldGenerateStyleSheet && (
          <GlobalStyles styles={memoTheme.generateStyleSheets?.() || []} />
        )}
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
     * The default mode when the storage is empty,
     * require the theme to have `colorSchemes` with light and dark.
     */
    defaultMode: PropTypes.string,
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
     * If `true`, theme values are recalculated when the mode changes.
     */
    forceThemeRerender: PropTypes.bool,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: PropTypes.string,
    /**
     * If `true`, the mode will be the same value as the storage without an extra rerendering after the hydration.
     * You should use this option in conjunction with `InitColorSchemeScript` component.
     */
    noSsr: PropTypes.bool,
    /**
     * The storage manager to be used for storing the mode and color scheme
     * @default using `window.localStorage`
     */
    storageManager: PropTypes.func,
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
    buildInitColorSchemeScript({
      colorSchemeStorageKey: defaultColorSchemeStorageKey,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey: defaultModeStorageKey,
      ...params,
    });

  return { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
}
