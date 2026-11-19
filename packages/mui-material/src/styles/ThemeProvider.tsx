'use client';
import * as React from 'react';
import type { DefaultTheme } from '@mui/system';
import { useThemeWithoutDefault } from '@mui/system';
import type { StorageManager, ThemeProviderRender } from '@mui/system/cssVars';
import { unstable_useRenderElement as useRenderElement } from '@mui/system/cssVars';
import ThemeProviderNoVars from './ThemeProviderNoVars';
import type { CssThemeVariables } from './createThemeNoVars';
import { CssVarsProvider, useColorScheme } from './ThemeProviderWithVars';
import type { CssVarsTheme } from './createThemeWithVars';
import createTheme from './createTheme';
import THEME_ID from './identifier';

type ThemeProviderCssVariablesProps = CssThemeVariables extends { enabled: true }
  ? {
      /**
       * The node for attaching the `theme.colorSchemeSelector`.
       * Only the top-level provider uses it by default; an `isolated` provider uses it when it's given.
       * @default document
       */
      colorSchemeNode?: Element | null | undefined;
      /**
       * If `true`, the provider creates its own context and generate stylesheet as if it is a root `ThemeProvider`.
       * @deprecated Use the `isolated` prop instead.
       */
      disableNestedContext?: boolean | undefined;
      /**
       * If `true`, the style sheet for CSS theme variables won't be generated.
       *
       * This is useful for controlling nested ThemeProvider behavior.
       * @default false
       */
      disableStyleSheetGeneration?: boolean | undefined;
      /**
       * If `true`, theme values are recalculated when the mode changes.
       * The `theme.colorSchemes.{mode}.*` nodes will be shallow merged to the top-level of the theme.
       * @default false
       */
      forceThemeRerender?: boolean | undefined;
      /**
       * If `true`, the provider doesn't follow an outer provider: it sets all its CSS theme variables
       * on its element instead of `:root`, and has its own mode, set with `defaultMode` and `useColorScheme()`.
       * Use it for an embedded widget, a sibling of the top-level provider, or a section with its own mode.
       * Its mode is only stored when `modeStorageKey` or `colorSchemeStorageKey` is set.
       * @default false
       */
      isolated?: boolean | undefined;
    }
  : {};

export interface ThemeProviderProps<Theme = DefaultTheme> extends ThemeProviderCssVariablesProps {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  /**
   * The element that wraps the children. A nested provider sets its CSS theme variables on it.
   * Nested providers render a `div` with `display: contents` by default, and the top-level provider renders no element.
   *
   * Pass an element, e.g. `<tbody />`, to render it with the provider's props merged in,
   * or a function that receives the props to spread on the element and the state.
   */
  render?: ThemeProviderRender | undefined;
  /**
   * The document used to perform `disableTransitionOnChange` feature
   * @default document
   */
  documentNode?: Document | null | undefined;
  /**
   * The default mode when the local storage has no mode yet,
   * requires the theme to have `colorSchemes` with light and dark.
   * It only applies to a top-level or `isolated` provider, since a nested provider follows the outer mode.
   * @default 'system'
   */
  defaultMode?: 'light' | 'dark' | 'system' | undefined;
  /**
   * The window that attaches the 'storage' event listener
   * @default window
   */
  storageWindow?: Window | null | undefined;
  /**
   * The storage manager to be used for storing the mode and color scheme
   * @default using `window.localStorage`
   */
  storageManager?: StorageManager | null | undefined;
  /**
   * localStorage key used to store application `mode`
   * @default 'mui-mode'
   */
  modeStorageKey?: string | undefined;
  /**
   * localStorage key used to store `colorScheme`
   * @default 'mui-color-scheme'
   */
  colorSchemeStorageKey?: string | undefined;
  /*
   * If `true`, ThemeProvider will not rerender and the initial value of `mode` comes from the local storage.
   * For SSR applications, you must ensure that the server render output must match the initial render output on the client.
   * @default false
   */
  noSsr?: boolean | undefined;
  /**
   * Disable CSS transitions when switching between modes or color schemes
   * @default false
   */
  disableTransitionOnChange?: boolean | undefined;
}

/**
 * The `render` element of a provider whose theme has no CSS theme variables, so it has nothing to scope.
 */
function Element(props: { render: ThemeProviderRender; children?: React.ReactNode }) {
  const { render, children } = props;
  const { mode, colorScheme } = useColorScheme();
  return useRenderElement(render, { children }, undefined, { mode, colorScheme });
}

function getMuiTheme(theme: any) {
  return THEME_ID in theme ? theme[THEME_ID] : theme;
}

/**
 * A copy of the outer theme with changes, e.g. `{ ...outer, palette }`, still has the outer CSS theme variables,
 * so it's created again from its values. Only `components` doesn't change any variable.
 */
function isOutdatedCopy(theme: any, outerTheme: any) {
  return (
    theme !== outerTheme &&
    theme.vars === outerTheme.vars &&
    Object.keys(theme).some((key) => key !== 'components' && theme[key] !== outerTheme[key])
  );
}

/**
 * Calls a function theme with the outer theme. When it returns a theme with CSS theme variables,
 * the result is applied like an object theme, so that its variables are scoped like any nested theme.
 * Returns `undefined` for the other function themes, which the provider without CSS theme variables calls.
 */
function useFunctionThemeWithVars(theme: ThemeProviderProps<any>['theme']) {
  const outerTheme = useThemeWithoutDefault<any>(null);
  return React.useMemo(() => {
    if (typeof theme !== 'function' || !outerTheme) {
      return undefined;
    }
    const result = theme(outerTheme);
    const muiTheme = result && typeof result === 'object' ? getMuiTheme(result) : undefined;
    if (!muiTheme?.vars || !('colorSchemes' in muiTheme)) {
      return undefined;
    }
    if (!isOutdatedCopy(muiTheme, getMuiTheme(outerTheme))) {
      return result;
    }
    const recreated = createTheme(muiTheme);
    return THEME_ID in result ? { ...result, [THEME_ID]: recreated } : recreated;
  }, [theme, outerTheme]);
}

export default function ThemeProvider<Theme = DefaultTheme>({
  theme: themeProp,
  ...props
}: ThemeProviderProps<Theme>) {
  const theme = useFunctionThemeWithVars(themeProp) ?? themeProp;
  const noVarsTheme = React.useMemo(() => {
    if (typeof theme === 'function') {
      return theme;
    }
    const muiTheme = getMuiTheme(theme) as ThemeProviderProps['theme'];
    if (!('colorSchemes' in muiTheme)) {
      if (!('vars' in muiTheme)) {
        // For non-CSS variables themes, set `vars` to null to prevent theme inheritance from the upper theme.
        // The example use case is the docs demo that uses ThemeProvider to customize the theme while the upper theme is using CSS variables.
        return { ...theme, vars: null };
      }
      return theme;
    }
    return null;
  }, [theme]);

  if (noVarsTheme) {
    const { render, children, isolated, ...noVarsProps } = props as typeof props & {
      isolated?: boolean | undefined;
    };
    return (
      <ThemeProviderNoVars theme={noVarsTheme} {...noVarsProps}>
        {render === undefined ? children : <Element render={render}>{children}</Element>}
      </ThemeProviderNoVars>
    );
  }
  return <CssVarsProvider theme={theme as unknown as CssVarsTheme} {...props} />;
}
