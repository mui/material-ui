import * as React from 'react';
import { deepmerge } from '@mui/utils';
import defaultTheme, { JoyTheme } from './defaultTheme';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

export const ThemeContext = React.createContext<JoyTheme | undefined>(undefined);

export const useTheme = () => React.useContext(ThemeContext) || defaultTheme;

export default function ThemeProvider({
  children,
  theme,
}: React.PropsWithChildren<{ theme?: PartialDeep<Omit<JoyTheme, 'vars'>> }>) {
  let mergedTheme = deepmerge(defaultTheme, theme);
  mergedTheme = { ...mergedTheme, vars: mergedTheme };
  return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
}
