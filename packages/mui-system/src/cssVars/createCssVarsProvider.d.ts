import * as React from 'react';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

export type BuildCssVarsTheme<ThemeInput> = ThemeInput extends {
  colorSchemes: Record<string, infer Colors>;
}
  ? Omit<ThemeInput, 'colorSchemes'> & { vars: Omit<ThemeInput, 'colorSchemes'> & Colors }
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
  ? { theme?: PartialDeep<Theme> }
  : {
      theme: PartialDeep<Omit<Theme, 'colorSchemes'>> & {
        colorSchemes: PartialDeep<
          Record<DesignSystemColorScheme, Theme['colorSchemes'][DesignSystemColorScheme]>
        > &
          Record<ApplicationColorScheme, Theme['colorSchemes'][ApplicationColorScheme]>;
      };
    };

export interface ColorSchemeContextValue<DesignSystemColorScheme extends string> {
  allColorSchemes: DesignSystemColorScheme[];
  colorScheme: DesignSystemColorScheme | undefined;
  setColorScheme: React.Dispatch<React.SetStateAction<DesignSystemColorScheme | undefined>>;
}

export default function createCssVarsProvider<
  ThemeInput extends {
    colorSchemes: Record<DesignSystemColorScheme | ApplicationColorScheme, any>;
  },
  DesignSystemColorScheme extends string,
  ApplicationColorScheme extends string = never,
>(
  ThemeContext: React.Context<BuildCssVarsTheme<ThemeInput> | undefined>,
  options: {
    theme: Omit<ThemeInput, 'colorSchemes'> & {
      colorSchemes: Record<
        DesignSystemColorScheme,
        ThemeInput['colorSchemes'][DesignSystemColorScheme]
      > &
        Partial<
          Record<
            ApplicationColorScheme,
            ThemeInput['colorSchemes'][DesignSystemColorScheme | ApplicationColorScheme]
          >
        >;
    };
    defaultColorScheme: DesignSystemColorScheme;
    prefix?: string;
  },
): {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      {
        defaultColorScheme?: DesignSystemColorScheme | ApplicationColorScheme;
        storageKey?: string;
        attribute?: string;
        prefix?: string;
      } & DecideTheme<ThemeInput, DesignSystemColorScheme, ApplicationColorScheme>
    >,
  ) => React.ReactElement;
  useColorScheme: () => ColorSchemeContextValue<DesignSystemColorScheme | ApplicationColorScheme>;
  getInitColorSchemeScript: () => React.ReactElement;
};

// disable automatic export
export {};
