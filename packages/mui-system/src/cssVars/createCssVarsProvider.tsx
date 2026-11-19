'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { GlobalStyles, internal_useNonce as useNonce } from '@mui/styled-engine';
import { useTheme as muiUseTheme } from '@mui/private-theming';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import type InitColorSchemeScript from '../InitColorSchemeScript';
import ThemeProvider from '../ThemeProvider';
import ColorSchemeScript, {
  buildInitColorSchemeScript,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  DEFAULT_MODE_STORAGE_KEY,
} from '../InitColorSchemeScript/InitColorSchemeScript';
import useCurrentColorScheme from './useCurrentColorScheme';
import type { Result } from './useCurrentColorScheme';
import type { StorageManager } from './localStorageManager';
import ThemeScopeContext from './ThemeScopeContext';
import {
  createColorSchemeSelectorGetter,
  createIsolatedStyleSheets,
  createScopedStyleSheets,
  getColorSchemeRule,
  getIsolatedColorSchemeRule,
  ISOLATED_ATTRIBUTE,
  SCHEME_ATTRIBUTE,
} from './scopeCssVars';
import type { CssVarsByColorScheme } from './scopeCssVars';
import useRenderElement from './useRenderElement';
import type { ThemeProviderRender } from './useRenderElement';

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
         * It only applies to a top-level or `isolated` provider, since a nested provider follows the outer mode.
         * @default 'system'
         */
        defaultMode?: 'light' | 'dark' | 'system' | undefined;
        /**
         * The document used to perform `disableTransitionOnChange` feature
         * @default document
         */
        documentNode?: Document | null | undefined;
        /**
         * The node used to attach the color-scheme attribute.
         * Only the top-level provider uses it by default; an `isolated` provider uses it when it's given.
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
         * @deprecated Use the `isolated` prop instead.
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
         * The element that wraps the children. A nested provider sets its CSS theme variables on it.
         * Nested providers render a `div` with `display: contents` by default, and the top-level provider renders no element.
         *
         * Pass an element, e.g. `<tbody />`, to render it with the provider's props merged in,
         * or a function that receives the props to spread on the element and the state.
         */
        render?: ThemeProviderRender | undefined;
        /**
         * If `true`, the provider doesn't follow an outer provider: it sets all its CSS theme variables
         * on its element instead of `:root`, and has its own mode, set with `defaultMode` and `useColorScheme()`.
         * Use it for an embedded widget, a sibling of the top-level provider, or a section with its own mode.
         * Its mode is only stored when `modeStorageKey` or `colorSchemeStorageKey` is set.
         * @default false
         */
        isolated?: boolean | undefined;
      }
    >,
  ) => React.JSX.Element;
  useColorScheme: () => ColorSchemeContextValue<ColorScheme>;
  getInitColorSchemeScript: typeof InitColorSchemeScript;
}

// React 17 has no `useId`; spread into a plain object so reading the missing property returns `undefined`
// instead of throwing under strict ESM. See #41190 (comment).
const safeReact = { ...React };
const maybeReactUseId: undefined | (() => string) = safeReact.useId;

const noCssVars = (): CssVarsByColorScheme => ({ root: {}, colorSchemes: [] });

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

  // The provider that owns the color scheme of the providers nested in it: the top-level one or an isolated one.
  interface Owner {
    // The rule that the color schemes of nested providers follow, see `getColorSchemeRule()`.
    colorSchemeRule: string | undefined;
    // How many isolated providers it's nested in, the fallback for its id on React 17.
    depth: number;
  }
  const OwnerContext = React.createContext<Owner | undefined>(undefined);

  // The scoped stylesheets only depend on the themes, so they're created once per pair of themes
  // instead of once per provider.
  type ScopedStyleSheets = ReturnType<typeof createScopedStyleSheets>;
  const scopedStyleSheetsCache: WeakMap<
    () => CssVarsByColorScheme,
    WeakMap<object, Map<string, ScopedStyleSheets>>
  > = new WeakMap();
  const noUpper = {};
  function getCachedStyleSheets(
    generate: () => CssVarsByColorScheme,
    upperGenerate: (() => CssVarsByColorScheme) | undefined,
    key: string,
    create: () => ScopedStyleSheets,
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
    if (!byOptions.has(key)) {
      byOptions.set(key, create());
    }
    return byOptions.get(key) as ScopedStyleSheets;
  }
  function getScopedStyleSheets(
    generate: () => CssVarsByColorScheme,
    upperGenerate: () => CssVarsByColorScheme,
    colorSchemeRule: string | undefined,
    prefix: string,
  ) {
    return getCachedStyleSheets(generate, upperGenerate, `${colorSchemeRule}|${prefix}`, () =>
      createScopedStyleSheets({ css: generate(), upper: upperGenerate(), colorSchemeRule, prefix }),
    );
  }
  function getIsolatedStyleSheets(
    generate: () => CssVarsByColorScheme,
    prefix: string,
    lightColorScheme: string,
    darkColorScheme: string,
  ) {
    return getCachedStyleSheets(
      generate,
      undefined,
      `isolated|${lightColorScheme}|${darkColorScheme}|${prefix}`,
      () =>
        createIsolatedStyleSheets({ css: generate(), prefix, lightColorScheme, darkColorScheme }),
    );
  }

  // Stylesheets of the mounted providers that write to `:root`, to warn when they overwrite each other.
  const rootStyleSheets: Map<string, string[]> = new Map();
  let warnedMultipleRoots = false;
  let warnedDisableNestedContext = false;
  let warnedNestedDefaultMode = false;

  function CssVarsProvider(props: any) {
    const {
      children,
      theme: themeProp,
      render,
      isolated: isolatedProp = false,
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
    const hasMounted = React.useRef(false);
    const elementRef = React.useRef<Element>(null);
    const nonce = useNonce();
    const upperTheme = muiUseTheme();
    const ctx = React.useContext(ColorSchemeContext);
    const owner = React.useContext(OwnerContext);
    const upperScope = React.useContext(ThemeScopeContext);
    // `React.useId` is invariant at runtime, so it's called on every render or never.
    const reactId = maybeReactUseId?.();
    // `disableNestedContext` is the former name of `isolated`.
    const isolated = isolatedProp || disableNestedContext;
    // A nested provider follows the outer provider. The top-level provider writes to `:root` and owns the page's mode,
    // and an isolated provider owns a mode of its own on its element.
    const nested = !!ctx && !isolated;
    const isRoot = !ctx && !isolated;

    if (process.env.NODE_ENV !== 'production') {
      if (disableNestedContext && !warnedDisableNestedContext) {
        warnedDisableNestedContext = true;
        console.warn('MUI: The `disableNestedContext` prop is deprecated. Use `isolated` instead.');
      }
      if (nested && props.defaultMode !== undefined && !warnedNestedDefaultMode) {
        warnedNestedDefaultMode = true;
        console.warn(
          [
            'MUI: The `defaultMode` prop of a nested ThemeProvider has no effect, since it follows the mode of the outer provider.',
            'Add the `isolated` prop to give it a mode of its own.',
          ].join('\n'),
        );
      }
    }

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

    // An isolated provider only uses the storage when it's given a key or a storage manager, since with the
    // default keys it would overwrite the mode of the page's provider.
    const isolatedStorage =
      props.storageManager !== undefined
        ? props.storageManager !== null
        : props.modeStorageKey !== undefined || props.colorSchemeStorageKey !== undefined;

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
      storageManager: isolated && !isolatedStorage ? null : storageManager,
      storageWindow,
      noSsr,
    });

    let mode = stateMode;
    let colorScheme = stateColorScheme;

    if (nested) {
      mode = ctx.mode;
      colorScheme = ctx.colorScheme;
    }
    if (isolated && !isolatedStorage) {
      // Without the storage, the mode is known on the server, so the provider renders its marker there.
      mode = stateMode ?? defaultMode;
      if (!colorScheme && mode !== 'system') {
        colorScheme = mode === 'dark' ? defaultDarkColorScheme : defaultLightColorScheme;
      }
    }

    // The rule that the color schemes of the theme follow, see `getColorSchemeRule()`.
    // The top-level provider follows its own selector, and nested providers follow their owner.
    // An isolated provider follows its own marker: its id and its color scheme, whatever the page's selector is.
    // In `system` mode, the OS is the same for the whole page, so it follows the media query,
    // which renders correctly on the server.
    const isolatedId = reactId ?? String((owner?.depth ?? 0) + 1);
    const followsMedia = isolated && !isolatedStorage && mode === 'system';
    let colorSchemeRule: string | undefined;
    if (isolated) {
      colorSchemeRule = followsMedia ? 'media' : getIsolatedColorSchemeRule(isolatedId);
    } else if (nested) {
      colorSchemeRule = owner?.colorSchemeRule;
    } else {
      colorSchemeRule = getColorSchemeRule(restThemeProp.colorSchemeSelector);
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
      if (!isRoot && theme.vars) {
        // `applyStyles()` and the styles that use `theme.getColorSchemeSelector()` follow the owner's color scheme.
        theme.getColorSchemeSelector = createColorSchemeSelectorGetter(colorSchemeRule);
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
    }, [
      restThemeProp,
      calculatedColorScheme,
      components,
      colorSchemes,
      cssVarPrefix,
      isRoot,
      colorSchemeRule,
    ]);

    // 5. Declaring effects
    // 5.1 Updates the selector value to use the current color scheme which tells CSS to use the proper stylesheet.
    // Only the top-level provider owns the page's node. An isolated provider sets it on its element instead,
    // unless it's given a node, and a nested provider follows the outer provider, which sets it.
    const colorSchemeSelector = restThemeProp.colorSchemeSelector;
    const ownsColorSchemeNode = isRoot || (isolated && props.colorSchemeNode !== undefined);
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
        if (nonce) {
          css.setAttribute('nonce', nonce);
        }
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
    }, [colorScheme, disableTransitionOnChange, documentNode, nonce]);
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
                // An isolated provider sets its mode on its own marker, whatever the selector is.
                if (memoTheme.colorSchemeSelector === 'media' && !isolated) {
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
        isolated,
      ],
    );

    const canGenerateStyleSheet =
      !disableStyleSheetGeneration && restThemeProp.cssVariables !== false;
    const samePrefixAsUpper = nested && (upperTheme as any)?.cssVarPrefix === cssVarPrefix;

    // 6. Scope the CSS theme variables that can't go to `:root` to the provider's element.
    const generateCssVarsByColorScheme: (() => CssVarsByColorScheme) | undefined =
      restThemeProp.generateCssVarsByColorScheme;
    // A nested theme with another prefix doesn't share any variable with the outer one, so it writes all of them.
    const upperGenerateCssVarsByColorScheme: () => CssVarsByColorScheme =
      (samePrefixAsUpper && (upperTheme as any).generateCssVarsByColorScheme) || noCssVars;
    const scope = React.useMemo(() => {
      if (!canGenerateStyleSheet || !generateCssVarsByColorScheme) {
        return null;
      }
      if (isolated) {
        return getIsolatedStyleSheets(
          generateCssVarsByColorScheme,
          cssVarPrefix,
          defaultLightColorScheme,
          defaultDarkColorScheme,
        );
      }
      if (nested) {
        return getScopedStyleSheets(
          generateCssVarsByColorScheme,
          upperGenerateCssVarsByColorScheme,
          colorSchemeRule,
          cssVarPrefix,
        );
      }
      return null;
    }, [
      canGenerateStyleSheet,
      generateCssVarsByColorScheme,
      upperGenerateCssVarsByColorScheme,
      colorSchemeRule,
      cssVarPrefix,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      nested,
      isolated,
    ]);

    const scopeClassName = scope?.className;
    // The marker of an isolated provider, on its element and its portal roots.
    const markerProps = React.useMemo(() => {
      if (!isolated) {
        return undefined;
      }
      const result: Record<string, string> = {};
      if (!followsMedia) {
        result[ISOLATED_ATTRIBUTE] = isolatedId;
      }
      if (colorScheme) {
        result[SCHEME_ATTRIBUTE] = colorScheme;
      }
      return result;
    }, [isolated, followsMedia, isolatedId, colorScheme]);
    const scopeProps = React.useMemo(() => {
      if (isolated) {
        return { ...markerProps, className: scopeClassName };
      }
      if (nested && scopeClassName) {
        // Portaled elements aren't under the outer scopes' elements either, so they get them too.
        return { ...upperScope, className: clsx(upperScope?.className, scopeClassName) };
      }
      return nested ? upperScope : undefined;
    }, [isolated, nested, markerProps, scopeClassName, upperScope]);
    const ownerValue = React.useMemo(
      () => ({ colorSchemeRule, depth: isolated ? (owner?.depth ?? 0) + 1 : 0 }),
      [colorSchemeRule, isolated, owner],
    );

    let shouldGenerateStyleSheet = true;
    if (disableStyleSheetGeneration || restThemeProp.cssVariables === false || !isRoot) {
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
              'Add the `isolated` prop to the ThemeProviders that should only apply to their children, like an embedded widget.',
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

    // Nested and isolated providers always render an element, so the tree doesn't change when their variables start
    // or stop differing. The top-level provider writes to `:root`, so it only renders the `render` element.
    const rendersElement = !isRoot || render !== undefined;
    const rendersDefaultElement = rendersElement && render === undefined;
    const defaultClassName = generateUtilityClass('MuiThemeProvider', 'root');
    // Only an isolated provider with a stored mode needs a script, since the server doesn't know the mode.
    // It sets the marker before the first paint, like `InitColorSchemeScript` does for the page.
    const rendersScript =
      isolated && isolatedStorage && props.storageManager === undefined && allColorSchemes.length > 1;
    const elementProps: Record<string, any> = {
      ...markerProps,
      className: clsx(rendersDefaultElement && defaultClassName, scopeClassName) || undefined,
      // The script changes the marker before hydration.
      suppressHydrationWarning: rendersScript || undefined,
      children: rendersScript ? (
        <React.Fragment>
          <ColorSchemeScript
            colorSchemeNode={`document.currentScript.closest('[${ISOLATED_ATTRIBUTE}]')`}
            attribute={SCHEME_ATTRIBUTE}
            defaultMode={defaultMode}
            defaultLightColorScheme={defaultLightColorScheme}
            defaultDarkColorScheme={defaultDarkColorScheme}
            modeStorageKey={modeStorageKey}
            colorSchemeStorageKey={colorSchemeStorageKey}
            nonce={nonce}
          />
          {children}
        </React.Fragment>
      ) : (
        children
      ),
    };
    const providerElement = useRenderElement(render, elementProps, elementRef, {
      mode,
      colorScheme,
    });
    const content = rendersElement ? providerElement : children;

    if (process.env.NODE_ENV !== 'production') {
      const needsElement = (!!scopeClassName || !!markerProps) && render !== undefined;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const warnedElement = React.useRef(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        if (needsElement && !elementRef.current && !warnedElement.current) {
          warnedElement.current = true;
          console.error(
            [
              "MUI: The CSS theme variables of this ThemeProvider can't be applied because the element of its `render` prop didn't receive its props.",
              'Spread the props that the `render` function receives on the element it returns, including the `ref`.',
            ].join('\n'),
          );
        }
      });
    }

    // The tree is the same whether the theme needs a scope or not, so switching themes keeps the children's state.
    const element = (
      <React.Fragment>
        <ThemeProvider themeId={scopedTheme ? themeId : undefined} theme={memoTheme}>
          <ThemeScopeContext.Provider value={scopeProps}>
            {content}
          </ThemeScopeContext.Provider>
        </ThemeProvider>
        {shouldGenerateStyleSheet && (
          <GlobalStyles styles={memoTheme.generateStyleSheets?.() || []} />
        )}
        {rendersDefaultElement && (
          <GlobalStyles styles={{ [`.${defaultClassName}`]: { display: 'contents' } }} />
        )}
        {scope && <GlobalStyles styles={scope.styles} />}
      </React.Fragment>
    );

    if (nested) {
      return element;
    }

    return (
      <ColorSchemeContext.Provider value={contextValue}>
        <OwnerContext.Provider value={ownerValue}>{element}</OwnerContext.Provider>
      </ColorSchemeContext.Provider>
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
     * @deprecated Use the `isolated` prop instead.
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
     * If `true`, the provider doesn't follow an outer provider: it sets all its CSS theme variables
     * on its element and has its own mode.
     */
    isolated: PropTypes.bool,
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
     * The element that wraps the children.
     */
    render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
