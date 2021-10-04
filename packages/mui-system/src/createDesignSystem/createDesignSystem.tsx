import * as React from 'react';
import styledEngineStyled from '@mui/styled-engine';
import createCssVarsProvider from './createCssVarsProvider';

export default function createDesignSystem<
  ThemeStructure = {},
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

  const styled = (tag: any, args: any) => {
    return (styleFunction: any) => {
      const Component = styledEngineStyled(tag, args)(styleFunction);

      const StyledComponent = (props: any) => {
        const theme = useTheme();
        return <Component {...props} theme={theme} />;
      };
      return StyledComponent;
    };
  };

  return {
    ThemeProvider,
    useTheme,
    styled,
    ...createCssVarsProvider<ColorScheme>(ThemeProvider),
  };
}
