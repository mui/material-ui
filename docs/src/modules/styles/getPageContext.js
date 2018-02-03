/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme, createGenerateClassName, jssPreset } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import { darken } from 'material-ui/styles/colorManipulator';

export function getTheme(theme) {
  return createMuiTheme({
    direction: theme.direction,
    palette: {
      primary: blue,
      secondary: {
        // Darken so we reach the AA contrast ratio level.
        main: darken(pink.A400, 0.08),
      },
      type: theme.paletteType,
    },
  });
}

const theme = getTheme({
  direction: 'ltr',
  paletteType: 'light',
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
jss.options.insertionPoint = 'insertion-point-jss';

function createPageContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName({
      productionPrefix: 'j', // Reduce the bandwidth usage.
    }),
  };
}

export default function getPageContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
