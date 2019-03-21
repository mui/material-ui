/* eslint-disable react/no-danger, react/prop-types */

import React from 'react';
import { SheetsRegistry } from 'jss';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import theme from './.cache/theme';

// Keep track of sheetsRegistry for each page
const globalLeak = new Map();

export const wrapRootElement = ({ element, pathname }) => {
  const sheetsRegistry = new SheetsRegistry();
  globalLeak.set(pathname, sheetsRegistry);

  return (
    <StylesProvider sheetsRegistry={sheetsRegistry} sheetsManager={new Map()}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </StylesProvider>
  );
};

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  // onRenderBody is called in develop mode. It's strange?
  if (!pathname) {
    return;
  }

  const sheetsRegistry = globalLeak.get(pathname);
  setHeadComponents([
    <style
      id="jss-server-side"
      key="jss-server-side"
      dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }}
    />,
  ]);
  globalLeak.delete(pathname);
};
