'use client';
import * as React from 'react';
import { DefaultTheme } from '@mui/system';
import ThemeProviderNoVars from './ThemeProviderNoVars';
import { CssThemeVariables } from './createThemeNoVars';
import { CssVarsProvider } from './ThemeProviderWithVars';
import { CssVarsTheme } from './createThemeWithVars';
import THEME_ID from './identifier';

type ThemeProviderCssVariablesProps = CssThemeVariables extends { enabled: true }
  ? {
      /**
       * The node for attaching the `theme.colorSchemeSelector`.
       * @default document
       */
      colorSchemeNode?: Element | null;
      /**
       * If `true`, the provider creates its own context and generate stylesheet as if it is a root `ThemeProvider`.
       */
      disableNestedContext?: boolean;
      /**
       * If `true`, the style sheet for CSS theme variables won't be generated.
       *
       * This is useful for controlling nested ThemeProvider behavior.
       * @default false
       */
      disableStyleSheetGeneration?: boolean;
    }
  : {};

export interface ThemeProviderProps<Theme = DefaultTheme> extends ThemeProviderCssVariablesProps {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  /**
   * The document used to perform `disableTransitionOnChange` feature
   * @default document
   */
  documentNode?: Document | null;
  /**
   * The window that attaches the 'storage' event listener
   * @default window
   */
  storageWindow?: Window | null;
  /**
   * localStorage key used to store application `mode`
   * @default 'mui-mode'
   */
  modeStorageKey?: string;
  /**
   * localStorage key used to store `colorScheme`
   * @default 'mui-color-scheme'
   */
  colorSchemeStorageKey?: string;
  /**
   * Disable CSS transitions when switching between modes or color schemes
   * @default false
   */
  disableTransitionOnChange?: boolean;
}

export default function ThemeProvider<Theme = DefaultTheme>({
  theme,
  ...props
}: ThemeProviderProps<Theme>) {
  if (typeof theme === 'function') {
    return <ThemeProviderNoVars theme={theme} {...props} />;
  }
  const muiTheme = (THEME_ID in theme ? theme[THEME_ID] : theme) as ThemeProviderProps['theme'];
  if (!('colorSchemes' in muiTheme)) {
    return <ThemeProviderNoVars theme={theme} {...props} />;
  }
  return <CssVarsProvider theme={theme as unknown as CssVarsTheme} {...props} />;
}
