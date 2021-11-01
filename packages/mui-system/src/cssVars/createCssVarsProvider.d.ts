import * as React from 'react';

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

export interface ColorSchemeContextValue<DesignSystemColorScheme extends string> {
  allColorSchemes: DesignSystemColorScheme[];
  colorScheme: DesignSystemColorScheme | undefined;
  setColorScheme: React.Dispatch<React.SetStateAction<DesignSystemColorScheme | undefined>>;
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
  defaultColorScheme: DesignSystemColorScheme;
  prefix?: string;
}): {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      {
        defaultColorScheme?: DesignSystemColorScheme | ApplicationColorScheme;
        storageKey?: string;
        attribute?: string;
        prefix?: string;
      } & DecideTheme<ApplicationThemeInput, DesignSystemColorScheme, ApplicationColorScheme>
    >,
  ) => React.ReactElement;
  useColorScheme: () => ColorSchemeContextValue<DesignSystemColorScheme | ApplicationColorScheme>;
  getInitColorSchemeScript: () => React.ReactElement;
};

// disable automatic export
export {};
