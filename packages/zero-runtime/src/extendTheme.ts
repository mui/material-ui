import { prepareCssVars } from '@mui/system/cssVars';
import type { SxConfig } from '@mui/system/styleFunctionSx';

export interface ThemeInput {
  /**
   * The prefix to be used for the CSS variables.
   */
  cssVarPrefix?: string;
  /**
   * The color schemes to be used for the theme.
   */
  colorSchemes?: Record<string, any>;
  /**
   * The default color scheme to be used for the theme.
   * Required when `colorSchemes` is provided.
   */
  defaultColorScheme?: string;
  /**
   * If provided, the `prefers-color-scheme` media query will be used to apply the CSS variables based on the `light` and `dark` color schemes.
   */
  prefersColorScheme?: {
    light: string;
    dark: string;
  };
  /**
   * If provided, it will be used to create a selector for the color scheme.
   * This is useful if you want to use class or data-* attributes to apply the color scheme.
   */
  getColorSchemeSelector?: (colorScheme: string) => string;
  /**
   * A function to skip generating a CSS variable for a specific path or value.
   */
  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
  components?: Partial<
    Record<
      string,
      {
        styleOverrides?: Record<string, any>;
        defaultProps: Record<string, any>;
      }
    >
  >;
}

export interface Theme extends ThemeInput {
  vars: Record<string, string>;
  generateCssVars: (colorScheme?: string) => { css: Record<string, string> };
  unstable_sxConfig?: SxConfig;
}

/**
 * A utility to tell zero-runtime to generate CSS variables for the theme.
 */
export default function extendTheme<T extends ThemeInput>(theme: T) {
  const { cssVarPrefix, shouldSkipGeneratingVar, prefersColorScheme, ...otherTheme } = theme;

  if (theme.colorSchemes && !theme.defaultColorScheme) {
    throw new Error('Zero: `defaultColorScheme` is required when `colorSchemes` is provided.');
  }

  const parserConfig = {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar,
  };
  const { vars, generateCssVars } = prepareCssVars(otherTheme, parserConfig);

  return {
    ...theme,
    vars,
    generateCssVars,
  };
}
