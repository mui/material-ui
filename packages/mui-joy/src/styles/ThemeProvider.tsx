import * as React from 'react';
import { deepmerge } from '@mui/utils';
import { ThemeProvider as SystemThemeProvider, useTheme as useSystemTheme } from '@mui/system';
import defaultTheme, { JoyTheme } from './defaultTheme';
import { Components } from './components';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

export const useTheme = () => {
  return useSystemTheme(defaultTheme);
};

export default function ThemeProvider({
  children,
  theme,
}: React.PropsWithChildren<{
  theme?: PartialDeep<Omit<JoyTheme, 'vars'>> & {
    components?: Components;
  };
}>) {
  const { components, ...filteredTheme } = theme || {};
  let mergedTheme = deepmerge(defaultTheme, filteredTheme);
  mergedTheme = {
    ...mergedTheme,
    vars: mergedTheme,
    components,
  } as JoyTheme & { components: Components };
  return <SystemThemeProvider theme={mergedTheme}>{children}</SystemThemeProvider>;
}
