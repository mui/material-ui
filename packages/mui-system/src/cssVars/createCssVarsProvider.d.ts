import * as React from 'react';
import getInitColorSchemeScript from './getInitColorSchemeScript';
import { Mode, Result } from './useCurrentColorScheme';

export interface ColorSchemeContextValue<SupportedColorScheme extends string>
  extends Result<SupportedColorScheme> {
  allColorSchemes: SupportedColorScheme[];
}

export interface CssVarsProviderConfig<ColorScheme extends string> {
  /**
   * Design system default color scheme.
   * - provides string if the design system has one default color scheme (either light or dark)
   * - provides object if the design system has default light & dark color schemes
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

export interface CreateCssVarsProviderResult<ColorScheme extends string, ThemeInput> {
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
}

export default function createCssVarsProvider<
  ColorScheme extends string,
  ThemeInput extends { colorSchemes?: Partial<Record<ColorScheme, any>> },
>(
  options: CssVarsProviderConfig<ColorScheme> & {
    /**
     * Design system default theme
     *
     * The structure inside `theme.colorSchemes[colorScheme]` should be exactly the same in all color schemes because
     * those object of the color scheme will be used when the color scheme is active.
     *
     *  {
     *    colorSchemes: {
     *      light: { ...lightColorSchemeValues },
     *      dark: { ...darkColorSchemeValues }
     *    }
     *  }
     *
     *  If colorScheme is 'light', the `lightColorSchemeValues` will be merged to theme as `{ ...theme, ...lightColorSchemeValues }`
     *  likewise, if colorScheme is 'dark', the `darkColorSchemeValues` will be merged to theme as `{ ...theme, ...darkColorSchemeValues }`
     *
     *  !!! Don't provided the same keys as in colorSchemes to theme because they will be replaced internally when the selected colorScheme is calculated.
     *  Ex. {
     *    colorSchemes: {
     *      light: { palette: { ... } },
     *      dark: { palette: { ... } }
     *    },
     *    palette: { ... }, // This values will be replaced by the `palette` from the light | dark color scheme at runtime.
     *  }
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
): CreateCssVarsProviderResult<ColorScheme, ThemeInput>;

// disable automatic export
export {};
