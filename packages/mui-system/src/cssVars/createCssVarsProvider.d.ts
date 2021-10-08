import * as React from 'react';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

type BuildColorSchemes<
  ColorScheme extends string,
  ColorSchemeOverrides extends string,
  ColorSchemeTokens,
> = [ColorSchemeOverrides] extends [never]
  ? {
      colorSchemes?: PartialDeep<Record<ColorScheme, ColorSchemeTokens>>;
    }
  : {
      colorSchemes: PartialDeep<Record<ColorScheme, ColorSchemeTokens>> &
        Record<ColorSchemeOverrides, ColorSchemeTokens>;
    };

export interface ColorSchemeContextValue<ColorScheme extends string> {
  allColorSchemes: Array<ColorScheme>;
  colorScheme: ColorScheme | undefined;
  setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme | undefined>>;
}

export default function createCssVarsProvider<
  BaseTokens extends Record<string, any>,
  ColorSchemeTokens extends Record<string, any>,
  ColorScheme extends string,
  ColorSchemeOverrides extends string = never,
  Theme extends Record<string, any> = BaseTokens & ColorSchemeTokens,
>(
  ThemeContext: React.Context<Theme | undefined>,
  options: {
    baseTheme: BaseTokens;
    colorSchemes: Record<ColorScheme, ColorSchemeTokens> &
      Partial<Record<ColorSchemeOverrides, ColorSchemeTokens>>;
    defaultColorScheme: ColorScheme;
  },
): {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      BuildColorSchemes<ColorScheme, ColorSchemeOverrides, ColorSchemeTokens> & {
        defaultColorScheme?: ColorScheme;
        baseTheme?: PartialDeep<BaseTokens>;
        storageKey?: string;
        dataAttribute?: string;
      }
    >,
  ) => React.ReactElement;
  useColorScheme: () => ColorSchemeContextValue<ColorScheme | ColorSchemeOverrides>;
  getInitColorSchemeScript: () => React.ReactElement;
};
