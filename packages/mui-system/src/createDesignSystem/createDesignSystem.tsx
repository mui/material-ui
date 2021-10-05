import * as React from 'react';
import { deepmerge } from '@mui/utils';
import createCssVarsProvider from './cssVars/createCssVarsProvider';
import createStyled from '../createStyled';

type PartialDeep<T extends Record<string, any>> = {
  [K in keyof T]?: T[K] extends Record<string, any> ? PartialDeep<T[K]> : T[K];
};

export default function createDesignSystem<
  BaseTheme extends Record<string, any>,
  ColorSchemeTokens extends Record<string, any>,
  DefaultColorScheme extends string,
  ColorSchemeOverrides extends string,
  Theme extends Record<string, any> = BaseTheme & ColorSchemeTokens,
>({
  baseTheme,
  colorSchemes,
  defaultColorScheme,
}: {
  baseTheme: BaseTheme;
  colorSchemes: Record<DefaultColorScheme, ColorSchemeTokens> &
    Partial<Record<ColorSchemeOverrides, ColorSchemeTokens>>;
  defaultColorScheme: DefaultColorScheme;
}) {
  let defaultTheme = {
    ...baseTheme,
    ...colorSchemes[defaultColorScheme],
  } as Theme;

  defaultTheme = {
    ...defaultTheme,
    vars: defaultTheme,
  };

  const ThemeContext = React.createContext<Theme | undefined>(defaultTheme);

  const useTheme = () => {
    const value = React.useContext(ThemeContext);
    if (!value) {
      throw new Error('useTheme cannot be used outside of ThemeProvider');
    }
    return value;
  };

  const ThemeProvider = ({
    children,
    theme,
  }: React.PropsWithChildren<{ theme: PartialDeep<Theme> }>) => {
    let mergedTheme = deepmerge(defaultTheme, theme);
    mergedTheme = { ...mergedTheme, vars: mergedTheme };
    return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
  };

  const styled = createStyled<Theme>({ defaultTheme, useTheme });

  return {
    useTheme,
    ThemeProvider,
    styled,
    ...createCssVarsProvider<
      BaseTheme,
      ColorSchemeTokens,
      DefaultColorScheme,
      ColorSchemeOverrides,
      Theme
    >(ThemeContext, {
      baseTheme,
      colorSchemes,
      defaultColorScheme,
    }),
  };
}
