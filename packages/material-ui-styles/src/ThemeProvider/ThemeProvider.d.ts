import * as React from 'react';

export const ThemeContext: React.Context<any>;

export interface ThemeProviderProps<Theme> {
  children: React.ReactNode;
  theme: Theme | ((outerTheme: Theme) => Theme);
}

export default function ThemeProvider<Theme>(
  props: ThemeProviderProps<Theme>,
): React.ReactElement<any>;
