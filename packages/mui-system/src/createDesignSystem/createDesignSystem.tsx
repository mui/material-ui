import * as React from 'react';
import createCssVarsProvider from './createCssVarsProvider';
import createStyled from '../createStyled';

export default function createDesignSystem<
  ThemeStructure extends object = {},
  ColorScheme extends string = 'light',
>(options: { defaultTheme: ThemeStructure }) {
  const { defaultTheme } = options;
  const ThemeContext = React.createContext(defaultTheme);

  const useTheme = () => React.useContext(ThemeContext);

  const ThemeProvider = ({
    theme,
    children,
  }: React.PropsWithChildren<{ theme: ThemeStructure }>) => {
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
  };

  const styled = createStyled<ThemeStructure>({ defaultTheme, useTheme });

  return {
    ThemeProvider,
    useTheme,
    styled,
    ...createCssVarsProvider<ColorScheme>(ThemeProvider),
  };
}
