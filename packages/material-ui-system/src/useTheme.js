import * as React from 'react';
import { ThemeContext } from '@material-ui/styled-engine';
import createTheme from './createTheme';

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const systemDefaultTheme = createTheme();

function useTheme(defaultTheme = systemDefaultTheme) {
  const contextTheme = React.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

export default useTheme;
