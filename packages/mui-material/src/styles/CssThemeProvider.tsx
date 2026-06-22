'use client';
import * as React from 'react';
import PrivateThemeProvider from '@mui/private-theming/ThemeProvider';
import type { DefaultTheme } from '@mui/system';
import RtlProvider from '@mui/system/RtlProvider';
import DefaultPropsProvider from '@mui/system/DefaultPropsProvider';
import useColorSchemeSetup from '@mui/system/cssVars/useColorSchemeSetup';
import CssVarsInjector from './CssVarsInjector';
import THEME_ID from './identifier';
import { defaultConfig } from '../InitColorSchemeScript/InitColorSchemeScript';

export interface CssColorSchemeContextValue {
  allColorSchemes: string[];
  colorScheme: string | undefined;
  mode: 'light' | 'dark' | 'system' | undefined;
  systemMode: 'light' | 'dark' | undefined;
  lightColorScheme: string;
  darkColorScheme: string;
  setMode: (mode: 'light' | 'dark' | 'system' | null) => void;
  setColorScheme: (
    colorScheme: string | null | Partial<{ light: string | null; dark: string | null }>,
  ) => void;
}

export const CssColorSchemeContext = React.createContext<CssColorSchemeContextValue | undefined>(
  undefined,
);

if (process.env.NODE_ENV !== 'production') {
  CssColorSchemeContext.displayName = 'CssColorSchemeContext';
}

export function useCssColorScheme(): CssColorSchemeContextValue {
  const ctx = React.useContext(CssColorSchemeContext);
  if (!ctx) {
    throw /* minify-error */ new Error(
      'MUI: `useCssColorScheme` must be called inside a `CssThemeProvider`. ' +
        'See https://mui.com/r/css-theme-provider for more info.',
    );
  }
  return ctx;
}

// ---------------------------------------------------------------------------

export interface CssThemeProviderProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  /**
   * A theme created with `createTheme({ cssVariables: true })`.
   * The theme must expose `generateStyleSheets` so the CSS variables can
   * be injected into the document. Plain themes (without `cssVariables`)
   * are not supported because the imported component CSS files reference
   * variables that would never be generated, leaving components unstyled.
   */
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  /**
   * The document to inject the `<style>` tag of CSS variables into.
   * Forwarded to `CssVarsInjector` so the provider works correctly when
   * rendered inside an iframe.
   * @default document
   */
  documentNode?: Document | undefined;
  /**
   * A nonce attribute to add to the injected `<style>` tag.
   */
  nonce?: string | undefined;
  /**
   * If `true`, the component will not render on the server, and will instead render a placeholder
   * @default false
   */
  noSsr?: boolean | undefined; // For future use when SSR support is added. Not used currently.
  /**
   * The default color-scheme mode on first visit (before localStorage is set).
   * `'system'` follows the OS preference.
   * @default 'system'
   */
  defaultMode?: 'light' | 'dark' | 'system' | undefined;
  /**
   * If `true`, CSS transitions are disabled while the color scheme is switching
   * to prevent a flash of the intermediate state.
   * @default false
   */
  disableTransitionOnChange?: boolean | undefined;
  /**
   * The DOM node to receive the color-scheme attribute (e.g. `data-mui-color-scheme`).
   * @default document.documentElement
   */
  colorSchemeNode?: HTMLElement | null | undefined;
  /**
   * The `window` object used to listen for `storage` events (localStorage sync
   * across tabs). Pass `null` to disable cross-tab sync.
   * @default window
   */
  storageWindow?: Window | null | undefined;
  /**
   * localStorage key used to persist the mode.
   * @default 'mui-mode'
   */
  modeStorageKey?: string | undefined;
  /**
   * localStorage key used to persist the color scheme.
   * @default 'mui-color-scheme'
   */
  colorSchemeStorageKey?: string | undefined;
  /**
   * Overrides the auto-derived `<style>` tag id (`{cssVarPrefix}-css-vars`).
   * Use this when multiple `CssThemeProvider` instances share the same
   * `cssVarPrefix` but must inject into separate `<style>` tags so they
   * don't overwrite each other.
   */
  styleId?: string | undefined;
}

interface ThemeLike {
  generateStyleSheets?: (() => Array<Record<string, any>>) | undefined;
  cssVarPrefix?: string | undefined;
  components?: Record<string, any> | undefined;
  direction?: 'ltr' | 'rtl' | undefined;
  colorSchemes?: Record<string, any> | undefined;
  colorSchemeSelector?: string | undefined;
  defaultColorScheme?: string | undefined;
}

function resolveTheme(theme: any): ThemeLike {
  return (THEME_ID in theme ? theme[THEME_ID] : theme) as ThemeLike;
}

/**
 * A lightweight ThemeProvider for the CSS-only path.
 *
 * Unlike the default `ThemeProvider`, this component does not pull in Emotion.
 * It provides:
 *
 * 1. CSS variable injection via `CssVarsInjector`.
 * 2. Color-scheme management (localStorage persistence, OS preference, DOM
 *    attribute sync) via `useCurrentColorScheme` + `CssColorSchemeContext`.
 * 3. `RtlProvider` and `DefaultPropsProvider` for direction and defaultProps.
 *
 * Use `useCssColorScheme()` inside this tree to read/set the active mode.
 *
 * The theme **must** be created with `cssVariables: true`. Otherwise the
 * imported `.css` files reference variables that are never generated and
 * components render unstyled.
 */
export default function CssThemeProvider<Theme = DefaultTheme>({
  theme: themeInput,
  children,
  documentNode,
  nonce,
  noSsr = false,
  defaultMode = 'system',
  disableTransitionOnChange = false,
  colorSchemeNode = typeof document === 'undefined' ? undefined : document.documentElement,
  storageWindow = typeof window === 'undefined' ? undefined : window,
  modeStorageKey = defaultConfig.modeStorageKey,
  colorSchemeStorageKey = defaultConfig.colorSchemeStorageKey,
  styleId,
}: CssThemeProviderProps<Theme>) {
  const resolved = React.useMemo(() => {
    if (typeof themeInput === 'function') {
      throw /* minify-error */ new Error(
        'MUI: CssThemeProvider does not accept a theme function. ' +
          'Pass a theme object created with `createTheme({ cssVariables: true })` instead. ' +
          'See https://mui.com/r/css-theme-provider for more info.',
      );
    }
    return resolveTheme(themeInput);
  }, [themeInput]);

  if (typeof resolved.generateStyleSheets !== 'function') {
    throw /* minify-error */ new Error(
      'MUI: CssThemeProvider requires a theme created with `cssVariables: true`. ' +
        'Without it, the imported component CSS files reference variables that are never generated, ' +
        'leaving components unstyled. ' +
        'See https://mui.com/r/css-theme-provider for more info.',
    );
  }

  const {
    allColorSchemes,
    colorScheme,
    mode,
    systemMode,
    lightColorScheme,
    darkColorScheme,
    setMode,
    setColorScheme,
  } = useColorSchemeSetup({
    colorSchemes: resolved.colorSchemes ?? {},
    colorSchemeSelector: resolved.colorSchemeSelector,
    defaultLightColorScheme: defaultConfig.defaultLightColorScheme,
    defaultDarkColorScheme: defaultConfig.defaultDarkColorScheme,
    modeStorageKey,
    colorSchemeStorageKey,
    defaultMode,
    storageWindow,
    colorSchemeNode,
    documentNode,
    disableTransitionOnChange,
    noSsr,
  });

  const contextValue = React.useMemo<CssColorSchemeContextValue>(
    () => ({
      allColorSchemes,
      colorScheme,
      mode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      setMode,
      setColorScheme: setColorScheme as CssColorSchemeContextValue['setColorScheme'],
    }),
    [
      allColorSchemes,
      colorScheme,
      mode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      setMode,
      setColorScheme,
    ],
  );

  const rtl = resolved.direction === 'rtl';

  return (
    <CssColorSchemeContext.Provider value={contextValue}>
      <RtlProvider value={rtl}>
        <DefaultPropsProvider value={resolved.components}>
          <PrivateThemeProvider theme={resolved}>
            <CssVarsInjector theme={resolved} documentNode={documentNode} nonce={nonce} styleId={styleId} />
            {children}
          </PrivateThemeProvider>
        </DefaultPropsProvider>
      </RtlProvider>
    </CssColorSchemeContext.Provider>
  );
}
