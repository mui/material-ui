// @flow weak
/* eslint-disable no-underscore-dangle */

import { create } from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss';
import { createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

export function getTheme(dark) {
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: pink,
      type: dark ? 'dark' : 'light',
    },
  });

  return theme;
}

const theme = getTheme(false);

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;
jss.options.insertionPoint = 'insertion-point-jss';

function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}

export function setContext() {
  // Singleton hack as there is no way to pass variables from _document.js to pages yet.
  global.__INIT_MATERIAL_UI__ = createContext();
}

export function getContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return global.__INIT_MATERIAL_UI__;
  }

  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
