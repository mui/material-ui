import * as React from 'react';
import { useTheme as muiUseTheme } from '@material-ui/private-theming';
import { ThemeContext } from '@material-ui/styled-engine';
import createTheme from './createTheme';

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const systemDefaultTheme = createTheme();

function useTheme(defaultTheme = systemDefaultTheme) {
  const muiContextTheme = muiUseTheme();
  const styledEngineContextTheme = React.useContext(ThemeContext);
  const contextTheme = muiContextTheme || styledEngineContextTheme;
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

export default useTheme;
