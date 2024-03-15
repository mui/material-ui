import deepMerge from 'lodash/merge';
import { prepareCssVars } from '@mui/system/cssVars';
import type { SxConfig } from '@mui/system/styleFunctionSx';
import type { CSSObject } from '../base';

export interface ThemeInput<ColorScheme extends string = string> {
  /**
   * The prefix to be used for the CSS variables.
   */
  cssVarPrefix?: string;
  /**
   * The color schemes to be used for the theme.
   */
  colorSchemes?: Record<ColorScheme, any>;
  /**
   * The default color scheme to be used for the theme. It must be one of the keys from `theme.colorSchemes`.
   * Required when `colorSchemes` is provided.
   * @default 'light'
   */
  defaultColorScheme?: ColorScheme;
  /**
   * If provided, it will be used to create a selector for the color scheme.
   * This is useful if you want to use class or data-* attributes to apply the color scheme.
   *
   * The default selector is `:root`.
   *
   * @example
   * // class selector
   * (colorScheme) => colorScheme ? `.theme-${colorScheme}` : ":root"
   *
   * @example
   * // data-* attribute selector
   * (colorScheme) => colorScheme ? `[data-theme="${colorScheme}"`] : ":root"
   */
  getSelector?: (
    colorScheme: ColorScheme | undefined,
    css: Record<string, any>,
  ) => string | Record<string, any>;
  /**
   * A function to skip generating a CSS variable for a specific path or value.
   *
   * Note: properties with function as a value are always skipped.
   *
   * @example
   * // skip the `meta.*` fields from generating CSS variables and `theme.vars`
   * (keys, value) => keys[0] === 'meta'
   *
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

export type ExtendTheme<
  Options extends {
    colorScheme: string;
    tokens: Record<string, any>;
  } = {
    colorScheme: string;
    tokens: Record<string, any>;
  },
> = ThemeInput<Options['colorScheme']> &
  Options['tokens'] & {
    vars: Options['tokens'];
    applyStyles: (
      colorScheme: Options['colorScheme'],
      styles: CSSObject<any>,
    ) => Record<string, CSSObject<any>>;
    getColorSchemeSelector: (colorScheme: Options['colorScheme']) => string;
    generateCssVars: (colorScheme?: Options['colorScheme']) => {
      css: Record<string, string | number>;
      selector: string | Record<string, any>;
    };
    unstable_sxConfig?: SxConfig;
  };

export type Theme = ExtendTheme;

/**
 * A utility to tell zero-runtime to generate CSS variables for the theme.
 */
export function extendTheme<
  Options extends {
    colorScheme: string;
    tokens: Record<string, any>;
  } = {
    colorScheme: string;
    tokens: Record<string, any>;
  },
>(theme: ThemeInput) {
  const {
    cssVarPrefix,
    shouldSkipGeneratingVar,
    getSelector = defaultGetSelector,
    defaultColorScheme = 'light',
    ...otherTheme
  } = theme;

  function defaultGetSelector(
    colorScheme: string | undefined,
    css: Record<string, any>,
  ): string | Record<string, any> {
    if (colorScheme === 'light' && defaultColorScheme !== 'light') {
      return {
        '@media (prefers-color-scheme: light)': {
          ':root': css,
        },
      };
    }
    if (colorScheme === 'dark' && defaultColorScheme !== 'dark') {
      return {
        '@media (prefers-color-scheme: dark)': {
          ':root': css,
        },
      };
    }
    return ':root';
  }

  if (
    theme.colorSchemes &&
    (!defaultColorScheme || !Object.keys(theme.colorSchemes).includes(defaultColorScheme))
  ) {
    throw new Error(
      `Zero: \`defaultColorScheme\` must be one of ${JSON.stringify(
        theme.colorSchemes,
      )}, but got "\`${theme.defaultColorScheme}\`".`,
    );
  }

  const parserConfig = {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar,
    getSelector,
  };
  const { generateCssVars } = prepareCssVars(otherTheme, parserConfig);

  let { vars } = generateCssVars();
  Object.entries(theme.colorSchemes || {}).forEach(([key]) => {
    vars = deepMerge(vars, generateCssVars(key).vars);
  });

  const finalTheme = {
    ...theme,
    defaultColorScheme,
    vars,
    generateCssVars,
  } as unknown as ExtendTheme<{ colorScheme: Options['colorScheme']; tokens: Options['tokens'] }>;

  finalTheme.getColorSchemeSelector = (colorScheme: string) => {
    if (!theme.getSelector) {
      return `@media (prefers-color-scheme: ${colorScheme})`;
    }
    return `:where(${theme.getSelector(colorScheme, {})}) &`;
  };

  finalTheme.applyStyles = function applyStyles(colorScheme, styles) {
    return {
      [this.getColorSchemeSelector(colorScheme)]: styles,
    };
  };

  return finalTheme;
}
