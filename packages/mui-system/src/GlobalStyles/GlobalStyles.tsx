import * as React from 'react';
import { GlobalStyles as MuiGlobalStyles, Interpolation } from '@mui/styled-engine';
import useTheme from '../useTheme';
import { Theme as SystemTheme } from '../createTheme';

export interface GlobalStylesProps<Theme = SystemTheme> {
  styles: Interpolation<Theme>;
  defaultTheme?: Theme;
  identifier?: string;
}

export default function GlobalStyles<Theme = SystemTheme>({
  styles,
  identifier,
  defaultTheme = {} as Theme,
}: GlobalStylesProps<Theme>) {
  const upperTheme = useTheme(defaultTheme);

  const globalStyles =
    typeof styles === 'function'
      ? styles(identifier ? (upperTheme as any)[identifier] || upperTheme : upperTheme)
      : styles;

  return <MuiGlobalStyles styles={globalStyles as any} />;
}
