import * as React from 'react';
import { deepmerge } from '@mui/utils';
import defaultTheme, { DefaultTheme } from './defaultTheme';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

export const ThemeContext = React.createContext<DefaultTheme | undefined>(undefined);

export const useTheme = () => React.useContext(ThemeContext) || defaultTheme;

export default function ThemeProvider({
  children,
  theme,
}: React.PropsWithChildren<{ theme?: PartialDeep<Omit<DefaultTheme, 'vars'>> }>) {
  return (
    <ThemeContext.Provider value={deepmerge(defaultTheme, theme)}>{children}</ThemeContext.Provider>
  );
}
