import * as React from 'react';
import getInitColorSchemeScript from './getInitColorSchemeScript';
import { Mode, Result } from './useCurrentColorScheme';

export interface ColorSchemeContextValue<SupportedColorScheme extends string>
  extends Result<SupportedColorScheme> {
  allColorSchemes: SupportedColorScheme[];
}

export interface CssVarsProviderConfig<ColorScheme extends string> {
  /**
   * Design system default color scheme
   */
  defaultColorScheme: ColorScheme | { light: ColorScheme; dark: ColorScheme };
  /**
   * Design system default mode
   * @default 'light'
   */
  defaultMode?: Mode;
  /**
   * Disable CSS transitions when switching between modes or color schemes
   * @default false
   */
  disableTransitionOnChange?: boolean;
  /**
   * Indicate to the browser which color scheme is used (light or dark) for rendering built-in UI
   * @default true
   */
  enableColorScheme?: boolean;
  /**
   * CSS variable prefix
   * @default ''
   */
  prefix?: string;
}

export default function createCssVarsProvider<
  ColorScheme extends string,
  ThemeInput extends { colorSchemes?: Partial<Record<ColorScheme, any>> },
>(
  options: CssVarsProviderConfig<ColorScheme> & {
    /**
     * Design system default theme
     */
    theme: any;
    /**
     * A function to determine if the key, value should be attached as CSS Variable
     * `keys` is an array that represents the object path keys.
     *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
     *  then, keys = ['foo', 'bar']
     *        value = 'var(--test)'
     */
    shouldSkipGeneratingVar?: (keys: string[], value: string | number) => boolean;
    /**
     * A function to be called after the CSS variables are attached. The result of this function will be the final theme pass to ThemeProvider.
     *
     * The example usage is the variant generation in Joy. We need to combine the token from user-input and the default theme first, then generate
     * variants from those tokens.
     */
    resolveTheme?: (theme: any) => any; // the type is any because it depends on the design system.
  },
): {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      Partial<CssVarsProviderConfig<ColorScheme>> & {
        theme?: ThemeInput;
        /**
         * localStorage key used to store application `mode`
         * @default 'mui-mode'
         */
        modeStorageKey?: string;
        /**
         * DOM attribute for applying color scheme
         * @default 'data-mui-color-scheme'
         */
        attribute?: string;
      }
    >,
  ) => React.ReactElement;
  useColorScheme: () => ColorSchemeContextValue<ColorScheme>;
  getInitColorSchemeScript: typeof getInitColorSchemeScript;
};

// disable automatic export
export {};
