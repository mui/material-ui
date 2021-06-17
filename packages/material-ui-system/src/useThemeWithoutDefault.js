import * as React from 'react';
import { useTheme as muiUseTheme } from '@material-ui/private-theming';
import { ThemeContext } from '@material-ui/styled-engine';

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function useTheme(defaultTheme = null) {
  const muiContextTheme = muiUseTheme();
  const styledEngineContextTheme = React.useContext(ThemeContext);
  const contextTheme = muiContextTheme || styledEngineContextTheme;
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

export default useTheme;
