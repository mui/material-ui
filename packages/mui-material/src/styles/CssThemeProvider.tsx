'use client';
import * as React from 'react';
import type { DefaultTheme } from '@mui/system';
import RtlProvider from '@mui/system/RtlProvider';
import DefaultPropsProvider from '@mui/system/DefaultPropsProvider';
import CssVarsInjector from './CssVarsInjector';
import THEME_ID from './identifier';

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
}

interface ThemeLike {
  generateStyleSheets?: (() => Array<Record<string, any>>) | undefined;
  cssVarPrefix?: string | undefined;
  components?: Record<string, any> | undefined;
  direction?: 'ltr' | 'rtl' | undefined;
}

function resolveTheme(theme: any): ThemeLike {
  return (THEME_ID in theme ? theme[THEME_ID] : theme) as ThemeLike;
}

/**
 * A lightweight ThemeProvider for the CSS-only path.
 *
 * Unlike the default `ThemeProvider`, this component does not pull in the
 * color-scheme switching logic of `CssVarsProvider`. It only:
 *
 * 1. Makes the theme available via `useTheme()` (for JS-only values such as
 *    `theme.breakpoints`, `theme.transitions.create`, `theme.spacing`).
 * 2. Injects the theme's CSS variables via `CssVarsInjector`.
 * 3. Sets up `RtlProvider` and `DefaultPropsProvider` so components honour
 *    direction and `theme.components.MuiX.defaultProps`.
 *
 * Use this provider when consuming Material UI components purely via the
 * shipped `.css` files (no Emotion `styled()` usage).
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
}: CssThemeProviderProps<Theme>) {
  const resolved = React.useMemo(() => {
    if (typeof themeInput === 'function') {
      // Functional themes are only meaningful when an outer theme exists.
      // CssThemeProvider is intended for the simple, top-level use case;
      // surfacing this as an error is clearer than silently doing nothing.
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

  const rtl = resolved.direction === 'rtl';

  // ToDo Silviu: CSS at build time is simpler. It might make people harder to migrate, especially for intensive usage of JS.
  // Enable the css layer. 1. Import the css file without layers. 2. For customization, use the css layer. For tw you use classnames, and for our css we use the layer.
  // Maybe css layer by default.
  // in the end, no theme provider, just a theme builder that will generate css files for that theme.
  return (
    // ToDo Silviu: Maybe export RTLProvide separately.
    <RtlProvider value={rtl}>
      <DefaultPropsProvider value={resolved.components}>
        <CssVarsInjector theme={resolved} documentNode={documentNode} nonce={nonce} />
        {children}
      </DefaultPropsProvider>
    </RtlProvider>
  );
}
