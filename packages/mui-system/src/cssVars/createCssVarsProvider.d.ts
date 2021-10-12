import * as React from 'react';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

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
  Theme extends { colorSchemes: Record<DesignSystemColorScheme | ApplicationColorScheme, any> },
  DesignSystemColorScheme extends string,
  ApplicationColorScheme extends string = never,
>(
  ThemeContext: React.Context<Theme | undefined>,
  options: {
    theme: Omit<Theme, 'colorSchemes'> & {
      colorSchemes: Record<
        DesignSystemColorScheme,
        Theme['colorSchemes'][DesignSystemColorScheme]
      > &
        Partial<
          Record<
            ApplicationColorScheme,
            Theme['colorSchemes'][DesignSystemColorScheme | ApplicationColorScheme]
          >
        >;
    };
    defaultColorScheme: DesignSystemColorScheme;
  },
): {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      {
        defaultColorScheme?: DesignSystemColorScheme | ApplicationColorScheme;
        storageKey?: string;
        attribute?: string;
      } & DecideTheme<Theme, DesignSystemColorScheme, ApplicationColorScheme>
    >,
  ) => React.ReactElement;
  useColorScheme: () => ColorSchemeContextValue<DesignSystemColorScheme | ApplicationColorScheme>;
  getInitColorSchemeScript: () => React.ReactElement;
};

// disable automatic export
export {};
