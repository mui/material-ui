import React from 'react';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import theme from './.cache/theme';

// Keep track of sheets for each page
const globalLeak = new Map();

export const wrapRootElement = ({ element, pathname }) => {
  const sheets = new ServerStyleSheets();
  globalLeak.set(pathname, sheets);

  return sheets.collect(<ThemeProvider theme={theme}>{element}</ThemeProvider>);
};

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  // onRenderBody is called in develop mode. It's strange?
  if (!pathname) {
    return;
  }

  const sheets = globalLeak.get(pathname);
  setHeadComponents([sheets.getStyleElement()]);
  globalLeak.delete(pathname);
};
