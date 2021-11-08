import * as React from 'react';
import { Result, Mode } from './useCurrentColorScheme';

type RequiredDeep<T> = {
  [K in keyof T]-?: RequiredDeep<T[K]>;
};

export type BuildCssVarsTheme<ThemeInput> = ThemeInput extends {
  colorSchemes: Record<string, infer ColorSystems>;
}
  ? Omit<ThemeInput, 'colorSchemes'> &
      ColorSystems & { vars: Omit<ThemeInput, 'colorSchemes'> & ColorSystems }
  : never;

/**
 * DesignSystemColorScheme: is what a design system provide by default. Mostly, `light` and `dark`
 * ApplicationColorScheme: is what developer can extend from a design system. Ex, `comfort` `trueDark` ...any name that they want
 *
 * This type enhance customization experience by checking if developer has extended the colorScheme or not (usually via module augmentation)
 * If yes, they must provide the palette of the extended colorScheme. Otherwise `theme` is optional.
 */
type DecideTheme<
  DesignSystemTheme extends { colorSchemes: Record<DesignSystemColorScheme, any> },
  DesignSystemColorScheme extends string,
  ApplicationTheme extends { colorSchemes: Record<ApplicationColorScheme, any> },
  ApplicationColorScheme extends string | never,
> = [ApplicationColorScheme] extends [never]
  ? { theme?: DesignSystemTheme }
  : {
      theme: Omit<ApplicationTheme, 'colorSchemes'> & {
        colorSchemes: Partial<
          Record<
            DesignSystemColorScheme,
            DesignSystemTheme['colorSchemes'][DesignSystemColorScheme]
          >
        > &
          RequiredDeep<
            Record<ApplicationColorScheme, ApplicationTheme['colorSchemes'][ApplicationColorScheme]>
          >;
      };
    };

export interface ColorSchemeContextValue<SupportedColorScheme extends string>
  extends Result<SupportedColorScheme> {
  allColorSchemes: SupportedColorScheme[];
}

export default function createCssVarsProvider<
  DesignSystemThemeInput extends {
    colorSchemes: Record<DesignSystemColorScheme, any>;
  },
  DesignSystemColorScheme extends string,
  ApplicationThemeInput extends {
    colorSchemes: Record<ApplicationColorScheme, any>;
  } = never,
  ApplicationColorScheme extends string = never,
>(options: {
  /**
   * Design system default theme
   */
  theme: DesignSystemThemeInput;
  /**
   * Design system default color scheme
   */
  defaultColorScheme:
    | DesignSystemColorScheme
    | { light: DesignSystemColorScheme; dark: DesignSystemColorScheme };
  /**
   * Design system default mode
   * @default 'light'
   */
  defaultMode?: Mode;
  /**
   * CSS variable prefix
   * @default ''
   */
  prefix?: string;
  /**
   * A function to determine if the key, value should be attached as CSS Variable
   * `keys` is an array that represents the object path keys.
   *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
   *  then, keys = ['foo', 'bar']
   *        value = 'var(--test)'
   */
  shouldSkipGeneratingVar?: (keys: string[], value: string | number) => boolean;
}): {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      {
        /**
         * Application default mode (overrides design system `defaultMode` if specified)
         */
        defaultMode?: Mode;
        /**
         * Application default colorScheme (overrides design system `defaultColorScheme` if specified)
         */
        defaultColorScheme?:
          | DesignSystemColorScheme
          | ApplicationColorScheme
          | {
              light: DesignSystemColorScheme | ApplicationColorScheme;
              dark: DesignSystemColorScheme | ApplicationColorScheme;
            };
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
        /**
         * CSS variable prefix (overrides design system `prefix` if specified)
         */
        prefix?: string;
      } & DecideTheme<
        DesignSystemThemeInput,
        DesignSystemColorScheme,
        ApplicationThemeInput,
        ApplicationColorScheme
      >
    >,
  ) => React.ReactElement;
  useColorScheme: () => ColorSchemeContextValue<DesignSystemColorScheme | ApplicationColorScheme>;
  getInitColorSchemeScript: () => React.ReactElement;
};

// disable automatic export
export {};
