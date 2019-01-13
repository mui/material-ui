import { create, SheetsRegistry } from 'jss';
import rtl from 'jss-rtl';
import { createGenerateClassName, jssPreset } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import themeInitialState from './themeInitialState';

function getTheme(uiTheme) {
  const theme = createMuiTheme({
    direction: uiTheme.direction,
    nprogress: { color: uiTheme.paletteType === 'light' ? '#000' : '#fff' },
    palette: { ...uiTheme.paletteColors, type: uiTheme.paletteType },
    typography: { useNextVariants: true },
  });

  // Expose the theme as a global variable so people can play with it.
  if (process.browser) {
    window.theme = theme;
  }

  return theme;
}

const theme = getTheme(themeInitialState);

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
  insertionPoint: 'insertion-point-jss',
});

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

let pageContext;

export function updatePageContext(uiTheme) {
  pageContext = {
    ...pageContext,
    theme: getTheme(uiTheme),
  };

  return pageContext;
}

export default function getPageContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}
