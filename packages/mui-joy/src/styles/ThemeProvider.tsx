import * as React from 'react';
import { deepmerge } from '@mui/utils';
import { ThemeProvider as SystemThemeProvider, useTheme as useSystemTheme } from '@mui/system';
import defaultTheme, { JoyTheme } from './defaultTheme';
import { Components } from './components';

type Partial3Level<T> = {
  [K in keyof T]?: T[K] extends Record<any, any>
    ? {
        [J in keyof T[K]]?: T[K][J] extends Record<any, any>
          ? {
              [P in keyof T[K][J]]?: T[K][J][P];
            }
          : T[K][J];
      }
    : T[K];
};

export const useTheme = () => {
  return useSystemTheme(defaultTheme);
};

export default function ThemeProvider({
  children,
  theme,
}: React.PropsWithChildren<{
  theme?: Partial3Level<Omit<JoyTheme, 'vars'>> & {
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
