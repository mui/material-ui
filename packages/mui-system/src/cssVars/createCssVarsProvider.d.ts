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
  Theme extends { colorSchemes: Record<DesignSystemColorScheme | ApplicationColorScheme, any> },
  DesignSystemColorScheme extends string,
  ApplicationColorScheme extends string | never,
> = [ApplicationColorScheme] extends [never]
  ? { theme?: Theme }
  : {
      theme: Omit<Theme, 'colorSchemes'> & {
        colorSchemes: Partial<
          Record<DesignSystemColorScheme, Theme['colorSchemes'][DesignSystemColorScheme]>
        > &
          RequiredDeep<
            Record<ApplicationColorScheme, Theme['colorSchemes'][ApplicationColorScheme]>
          >;
      };
    };

export interface ColorSchemeContextValue<SupportedColorScheme extends string>
  extends Result<SupportedColorScheme> {
  allColorSchemes: SupportedColorScheme[];
}

export default function createCssVarsProvider<
  DesignSystemThemeInput extends {
    colorSchemes: Record<DesignSystemColorScheme | ApplicationColorScheme, any>;
  },
  DesignSystemColorScheme extends string,
  ApplicationColorScheme extends string = never,
  ApplicationThemeInput extends {
    colorSchemes: Record<DesignSystemColorScheme | ApplicationColorScheme, any>;
  } = DesignSystemThemeInput,
>(options: {
  theme: Omit<DesignSystemThemeInput, 'colorSchemes'> & {
    colorSchemes: Record<
      DesignSystemColorScheme,
      DesignSystemThemeInput['colorSchemes'][DesignSystemColorScheme]
    > &
      Partial<
        Record<
          ApplicationColorScheme,
          DesignSystemThemeInput['colorSchemes'][DesignSystemColorScheme | ApplicationColorScheme]
        >
      >;
  };
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
      } & DecideTheme<ApplicationThemeInput, DesignSystemColorScheme, ApplicationColorScheme>
    >,
  ) => React.ReactElement;
  useColorScheme: () => ColorSchemeContextValue<DesignSystemColorScheme | ApplicationColorScheme>;
  getInitColorSchemeScript: () => React.ReactElement;
};

// disable automatic export
export {};
