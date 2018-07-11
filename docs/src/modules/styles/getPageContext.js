/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme, createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { darken } from '@material-ui/core/styles/colorManipulator';

function getTheme(uiTheme) {
  const theme = createMuiTheme({
    direction: uiTheme.direction,
    nprogress: {
      color: uiTheme.paletteType === 'light' ? '#000' : '#fff',
    },
    palette: { ...uiTheme.paletteColors, type: uiTheme.paletteType },
  });

  // Expose the theme as a global variable so people can play with it.
  if (process.browser) {
    window.theme = theme;
  }

  return theme;
}

const theme = getTheme({
  direction: 'ltr',
  paletteType: 'light',
  paletteColors: {
    primary: blue,
    secondary: {
      // Darken so we reach the AA contrast ratio level.
      main: darken(pink.A400, 0.08),
    },
  },
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

export function updatePageContext(uiTheme) {
  const pageContext = {
    ...global.__MUI_PAGE_CONTEXT__,
    theme: getTheme(uiTheme),
  };
  global.__MUI_PAGE_CONTEXT__ = pageContext;

  return pageContext;
}

export default function getPageContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side
  if (!global.__MUI_PAGE_CONTEXT__) {
    global.__MUI_PAGE_CONTEXT__ = createPageContext();
  }

  return global.__MUI_PAGE_CONTEXT__;
}
