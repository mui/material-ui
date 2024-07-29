import * as React from 'react';
import { DefaultTheme } from '@mui/system';
import ThemeProviderNoVars from './ThemeProviderNoVars';
import { CssVarsProvider } from './ThemeProviderWithVars';

export interface ThemeProviderProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  /**
   * [Configurable if `colorSchemes` is provided]
   * The document used to perform `disableTransitionOnChange` feature
   * @default document
   */
  documentNode?: Document | null;
  /**
   * [Configurable if `colorSchemes` is provided]
   * The node used to attach the color-scheme attribute
   * @default document
   */
  colorSchemeNode?: Element | null;
  /**
   * [Configurable if `colorSchemes` is provided]
   * The window that attaches the 'storage' event listener
   * @default window
   */
  storageWindow?: Window | null;
  /**
   * [Configurable if `customProperties` is not `false`]
   * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
   */
  disableNestedContext?: boolean;
  /**
   * [Configurable if `customProperties` is not `false`]
   * If `true`, the style sheet won't be generated.
   *
   * This is useful for controlling nested CssVarsProvider behavior.
   * @default false
   */
  disableStyleSheetGeneration?: boolean;
  /**
   * [Configurable if `colorSchemes` is provided]
   * Disable CSS transitions when switching between modes or color schemes
   * @default false
   */
  disableTransitionOnChange?: boolean;
}

export default function ThemeProvider<Theme = DefaultTheme>({
  theme,
  ...props
}: ThemeProviderProps<Theme>) {
  if (!('colorSchemes' in theme)) {
    return <ThemeProviderNoVars theme={theme} {...props} />;
  }
  // @ts-expect-error `theme` is created by `createTheme`, typing is handled there.
  return <CssVarsProvider theme={theme} {...props} />;
}
