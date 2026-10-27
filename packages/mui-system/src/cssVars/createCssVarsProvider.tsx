'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { GlobalStyles } from '@mui/styled-engine';
import { useTheme as muiUseTheme } from '@mui/private-theming';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import type InitColorSchemeScript from '../InitColorSchemeScript';
import ThemeProvider from '../ThemeProvider';
import {
  buildInitColorSchemeScript,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  DEFAULT_MODE_STORAGE_KEY,
} from '../InitColorSchemeScript/InitColorSchemeScript';
import useCurrentColorScheme, { type Result } from './useCurrentColorScheme';
import type { StorageManager } from './localStorageManager';
import ThemeScopeContext from './ThemeScopeContext';
import {
  createScopedStyleSheets,
  getColorSchemeProps,
  type CssVarsByColorScheme,
} from './scopeCssVars';

export interface ColorSchemeContextValue<
  SupportedColorScheme extends string,
> extends Result<SupportedColorScheme> {
  allColorSchemes: SupportedColorScheme[];
}

export interface CssVarsProviderConfig<ColorScheme extends string> {
  /**
   * DOM attribute for applying color scheme
   * @default 'data-color-scheme'
   */
  attribute?: string | undefined;
  /**
   * localStorage key used to store application `mode`
   * @default 'mode'
   */
  modeStorageKey?: string | undefined;
  /**
   * localStorage key used to store `colorScheme`
   * @default 'color-scheme'
   */
  colorSchemeStorageKey?: string | undefined;
  /**
   * Design system default color scheme.
   * - provides string if the design system has one default color scheme (either light or dark)
   * - provides object if the design system has default light & dark color schemes
   */
  defaultColorScheme: ColorScheme | { light: ColorScheme; dark: ColorScheme };
  /**
   * Disable CSS transitions when switching between modes or color schemes
   * @default false
   */
  disableTransitionOnChange?: boolean | undefined;
  /**
   * If `true`, theme values are recalculated when the mode changes.
   * The `theme.colorSchemes.{mode}.*` nodes will be shallow merged to the top-level of the theme.
   * @default false
   */
  forceThemeRerender?: boolean | undefined;
}

type Identify<I extends string | undefined, T> = I extends string ? T | { [k in I]: T } : T;

export interface CreateCssVarsProviderResult<
  ColorScheme extends string,
  Identifier extends string | undefined = undefined,
> {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      Partial<CssVarsProviderConfig<ColorScheme>> & {
        theme?:
          | Identify<
              Identifier,
              {
                cssVariables?: false | undefined;
                cssVarPrefix?: string | undefined;
                colorSchemes: Partial<Record<ColorScheme, any>>;
                colorSchemeSelector?: 'media' | 'class' | 'data' | string | undefined;
              }
            >
          | undefined;
        /**
         * The default mode when the storage is empty,
         * require the theme to have `colorSchemes` with light and dark.
         * @default 'system'
         */
        defaultMode?: 'light' | 'dark' | 'system' | undefined;
        /**
         * The document used to perform `disableTransitionOnChange` feature
         * @default document
         */
        documentNode?: Document | null | undefined;
        /**
         * The node used to attach the color-scheme attribute
         * @default document
         */
        colorSchemeNode?: Element | null | undefined;
        /**
         * The storage manager to be used for storing the mode and color scheme.
         * @default using `window.localStorage`
         */
        storageManager?: StorageManager | null | undefined;
        /**
         * The window that attaches the 'storage' event listener
         * @default window
         */
        storageWindow?: Window | null | undefined;
        /**
         * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
         */
        disableNestedContext?: boolean | undefined;
        /**
         * If `true`, the style sheet won't be generated.
         *
         * This is useful for controlling nested CssVarsProvider behavior.
         * @default false
         */
        disableStyleSheetGeneration?: boolean | undefined;
        /**
         * If `true`, the CSS theme variables are set on its child element instead of `:root`,
         * so they don't affect the rest of the page. Use it for a provider that isn't nested in another one,
         * like an embedded widget. Nested providers are scoped automatically when their variables differ.
         *
         * A string is used as a readable part of the class name, and to suffix the storage keys.
         * @default false
         */
        scoped?: boolean | string | undefined;
      }
    >,
  ) => React.JSX.Element;
  useColorScheme: () => ColorSchemeContextValue<ColorScheme>;
  getInitColorSchemeScript: typeof InitColorSchemeScript;
}

/**
 * @internal
 */
export const DISABLE_CSS_TRANSITION =
  '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';

export default function createCssVarsProvider<
  ColorScheme extends string,
  Identifier extends string | undefined = undefined,
>(
  options: CssVarsProviderConfig<ColorScheme> & {
    /**
     * The design system's unique id for getting the corresponded theme when there are multiple design systems.
     */
    themeId?: Identifier | undefined;
    /**
     * Design system default theme
     *
     * - The structure inside `theme.colorSchemes[colorScheme]` should be exactly the same in all color schemes because
     * those object of the color scheme will be used when the color scheme is active.
     *
     *  {
     *    colorSchemes: {
     *      light: { ...lightColorSchemeValues },
     *      dark: { ...darkColorSchemeValues }
     *    }
     *  }
     *
     * - If colorScheme is 'light', the `lightColorSchemeValues` will be merged to theme as `{ ...theme, ...lightColorSchemeValues }`
     *   likewise, if colorScheme is 'dark', the `darkColorSchemeValues` will be merged to theme as `{ ...theme, ...darkColorSchemeValues }`
     *
     * - If the theme contains the same keys as the color scheme, their values will be merged.
     *  Ex. {
     *    colorSchemes: {
     *      light: { palette: { primary: { ... } } },
     *      dark: { palette: { primary: { ...} } }
     *    },
     *    palette: { shared: { ... } }
     *  }
     *
     *  becomes: {
     *    colorSchemes: { ... },
     *    palette: { shared: { ... }, primary: { ... } }
     *  }
     */
    theme: any;
    /**
     * A function to be called after the CSS variables are attached. The result of this function will be the final theme pass to ThemeProvider.
     *
     * The example usage is the variant generation in Joy. We need to combine the token from user-input and the default theme first, then generate
     * variants from those tokens.
     */
    resolveTheme?: ((theme: any) => any) | undefined; // the type is any because it depends on the design system.
  },
): CreateCssVarsProviderResult<ColorScheme, Identifier> {
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

  const ColorSchemeContext = React.createContext<any>(undefined);

  if (process.env.NODE_ENV !== 'production') {
    ColorSchemeContext.displayName = 'ColorSchemeContext';
  }

  const useColorScheme = () => React.useContext(ColorSchemeContext) || defaultContext;

  const defaultColorSchemes = {};
  const defaultComponents = {};

  // The scoped stylesheets only depend on the themes, so they're created once per pair of themes
  // instead of once per provider.
  type ScopedStyleSheets = ReturnType<typeof createScopedStyleSheets>;
  const scopedStyleSheetsCache: WeakMap<
    () => CssVarsByColorScheme,
    WeakMap<object, Map<string, ScopedStyleSheets>>
  > = new WeakMap();
  const noUpper = {};
  function getScopedStyleSheets(
    generate: () => CssVarsByColorScheme,
    upperGenerate: (() => CssVarsByColorScheme) | undefined,
    colorSchemeSelector: string | undefined,
    prefix: string,
    name: string | undefined,
  ) {
    let byUpper = scopedStyleSheetsCache.get(generate);
    if (!byUpper) {
      byUpper = new WeakMap();
      scopedStyleSheetsCache.set(generate, byUpper);
    }
    let byOptions = byUpper.get(upperGenerate ?? noUpper);
    if (!byOptions) {
      byOptions = new Map();
      byUpper.set(upperGenerate ?? noUpper, byOptions);
    }
    const key = `${colorSchemeSelector}|${prefix}|${name}`;
    if (!byOptions.has(key)) {
      byOptions.set(
        key,
        createScopedStyleSheets({
          css: generate(),
          upper: upperGenerate?.(),
          colorSchemeSelector,
          prefix,
          name,
        }),
      );
    }
    return byOptions.get(key) as ScopedStyleSheets;
  }

  // Stylesheets of the mounted providers that write to `:root`, to warn when they overwrite each other.
  const rootStyleSheets: Map<string, string[]> = new Map();
  let warnedMultipleRoots = false;

  function CssVarsProvider(props: any) {
    const {
      children,
      theme: themeProp,
      scoped = false,
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
    const hasMounted = React.useRef(false);
    const upperTheme = muiUseTheme();
    const ctx = React.useContext(ColorSchemeContext);
    const upperScope = React.useContext(ThemeScopeContext);
    const nested = !!ctx && !disableNestedContext;
    const scopeName = typeof scoped === 'string' ? scoped : undefined;
    // A scoped provider that isn't nested manages its own color scheme on its element.
    const isScopedRoot = !nested && !!scoped;
    const storageKeySuffix = isScopedRoot && scopeName ? `-${scopeName}` : '';
    const {
      modeStorageKey = `${defaultModeStorageKey}${storageKeySuffix}`,
      colorSchemeStorageKey = `${defaultColorSchemeStorageKey}${storageKeySuffix}`,
    } = props;

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
        ? initialMode
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
      // An unnamed scoped provider would share the storage keys of the page's provider, so it doesn't store its mode.
      storageManager:
        isScopedRoot && !scopeName && props.storageManager === undefined ? null : storageManager,
      storageWindow,
      noSsr,
    });

    let mode = stateMode;
    let colorScheme = stateColorScheme;

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

    // 5. Declaring effects
    // 5.1 Updates the selector value to use the current color scheme which tells CSS to use the proper stylesheet.
    // A scoped root renders it on its own element instead.
    const colorSchemeSelector = restThemeProp.colorSchemeSelector;
    const ownsColorSchemeNode = !isScopedRoot || props.colorSchemeNode !== undefined;
    useEnhancedEffect(() => {
      if (
        ownsColorSchemeNode &&
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
    }, [colorScheme, colorSchemeSelector, colorSchemeNode, allColorSchemes, ownsColorSchemeNode]);

    // 5.2 Remove the CSS transition when color scheme changes to create instant experience.
    // credit: https://github.com/pacocoursey/next-themes/blob/b5c2bad50de2d61ad7b52a9c5cdc801a78507d7a/index.tsx#L313
    React.useEffect(() => {
      let timer: any;
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
        setMode:
          process.env.NODE_ENV === 'production'
            ? setMode
            : (newMode: any) => {
                if (memoTheme.colorSchemeSelector === 'media') {
                  // #host-reference
                  console.error(
                    [
                      'MUI: The `setMode` function has no effect if `colorSchemeSelector` is `media` (`media` is the default value).',
                      'To toggle the mode manually, please configure `colorSchemeSelector` to use a class or data attribute.',
                      'To learn more, visit https://next.mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually',
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

    const canGenerateStyleSheet =
      !disableStyleSheetGeneration && restThemeProp.cssVariables !== false;
    const samePrefixAsUpper = nested && (upperTheme as any)?.cssVarPrefix === cssVarPrefix;

    // 6. Scope the CSS theme variables that can't go to `:root` to the provider's element.
    const generateCssVarsByColorScheme: (() => CssVarsByColorScheme) | undefined =
      restThemeProp.generateCssVarsByColorScheme;
    const upperGenerateCssVarsByColorScheme: (() => CssVarsByColorScheme) | undefined =
      samePrefixAsUpper ? (upperTheme as any).generateCssVarsByColorScheme : undefined;
    const upperColorSchemeSelector = nested ? (upperTheme as any)?.colorSchemeSelector : undefined;
    const scope = React.useMemo(() => {
      if (!canGenerateStyleSheet || !generateCssVarsByColorScheme) {
        return null;
      }
      if (nested) {
        // A nested theme with another prefix doesn't clash with the outer one, so it writes to `:root`.
        if (!upperGenerateCssVarsByColorScheme) {
          return null;
        }
        // It follows the outer color scheme.
        return getScopedStyleSheets(
          generateCssVarsByColorScheme,
          upperGenerateCssVarsByColorScheme,
          upperColorSchemeSelector,
          cssVarPrefix,
          scopeName,
        );
      }
      if (scoped) {
        return getScopedStyleSheets(
          generateCssVarsByColorScheme,
          undefined,
          colorSchemeSelector,
          cssVarPrefix,
          scopeName,
        );
      }
      return null;
    }, [
      canGenerateStyleSheet,
      generateCssVarsByColorScheme,
      upperGenerateCssVarsByColorScheme,
      upperColorSchemeSelector,
      colorSchemeSelector,
      cssVarPrefix,
      nested,
      scoped,
      scopeName,
    ]);

    const scopeClassName = scope?.className;
    const colorSchemeProps = React.useMemo(
      () =>
        isScopedRoot
          ? getColorSchemeProps(colorSchemeSelector, colorScheme)
          : ({} as Record<string, string>),
      [isScopedRoot, colorSchemeSelector, colorScheme],
    );
    const { className: colorSchemeClassName, ...colorSchemeAttributes } = colorSchemeProps;
    const scopeProps = React.useMemo(() => {
      if (!scopeClassName) {
        return undefined;
      }
      // Portaled elements aren't under the outer scopes' elements either, so they get them too.
      return {
        ...(nested ? upperScope : undefined),
        ...colorSchemeProps,
        className: clsx(nested && upperScope?.className, scopeClassName, colorSchemeClassName),
      };
    }, [scopeClassName, colorSchemeClassName, colorSchemeProps, nested, upperScope]);

    let shouldGenerateStyleSheet = true;
    if (
      disableStyleSheetGeneration ||
      restThemeProp.cssVariables === false ||
      (nested && (upperTheme as any)?.cssVarPrefix === cssVarPrefix) ||
      isScopedRoot
    ) {
      shouldGenerateStyleSheet = false;
    }

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        if (!shouldGenerateStyleSheet || nested || !memoTheme.generateStyleSheets) {
          return undefined;
        }
        const key = cssVarPrefix ?? '';
        const styleSheet = JSON.stringify(memoTheme.generateStyleSheets());
        const mounted = rootStyleSheets.get(key) ?? [];
        rootStyleSheets.set(key, [...mounted, styleSheet]);
        if (!warnedMultipleRoots && mounted.some((other) => other !== styleSheet)) {
          warnedMultipleRoots = true;
          console.warn(
            [
              'MUI: Several ThemeProviders with different themes write their CSS theme variables to `:root`, so they overwrite each other.',
              'Add the `scoped` prop to the ThemeProviders that should only apply to their children, like an embedded widget.',
            ].join('\n'),
          );
        }
        return () => {
          const current = rootStyleSheets.get(key) ?? [];
          const index = current.indexOf(styleSheet);
          rootStyleSheets.set(
            key,
            current.filter((_, i) => i !== index),
          );
        };
      }, [shouldGenerateStyleSheet, nested, memoTheme, cssVarPrefix]);
    }

    // The scope class goes on the single child, so the provider never renders an element of its own.
    const canCloneChild = React.isValidElement(children) && children.type !== React.Fragment;
    let scopedChildren = children;
    if (scopeClassName && canCloneChild) {
      const child = children as React.ReactElement<{ className?: string | undefined }>;
      scopedChildren = React.cloneElement(child, {
        ...colorSchemeAttributes,
        className: clsx(child.props.className, scopeClassName, colorSchemeClassName),
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const warnedChildren = React.useRef(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        if (scopeClassName && !canCloneChild && !warnedChildren.current) {
          warnedChildren.current = true;
          console.error(
            [
              "MUI: The CSS theme variables of this ThemeProvider can't be applied because its children aren't a single element.",
              'Wrap its children in one element, for example a `div`, so it can set them on it.',
            ].join('\n'),
          );
        }
      }, [scopeClassName, canCloneChild]);
    }

    // The tree is the same whether the theme needs a scope or not, so switching themes keeps the children's state.
    const element = (
      <React.Fragment>
        <ThemeProvider themeId={scopedTheme ? themeId : undefined} theme={memoTheme}>
          <ThemeScopeContext.Provider value={scopeProps ?? (nested ? upperScope : undefined)}>
            {scopedChildren}
          </ThemeScopeContext.Provider>
        </ThemeProvider>
        {shouldGenerateStyleSheet && (
          <GlobalStyles styles={memoTheme.generateStyleSheets?.() || []} />
        )}
        {scope && <GlobalStyles styles={scope.styles} />}
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
     * If `true`, the CSS theme variables are set on its child element instead of `:root`.
     */
    scoped: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
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

  const getInitColorSchemeScript = (params: any) =>
    buildInitColorSchemeScript({
      colorSchemeStorageKey: defaultColorSchemeStorageKey,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey: defaultModeStorageKey,
      ...params,
    });

  return {
    CssVarsProvider,
    useColorScheme,
    getInitColorSchemeScript,
  } as unknown as CreateCssVarsProviderResult<ColorScheme, Identifier>;
}
