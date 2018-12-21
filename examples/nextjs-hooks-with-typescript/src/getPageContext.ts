/* eslint-disable no-underscore-dangle */

import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProviderProps } from "@material-ui/core/styles/MuiThemeProvider";
import { createGenerateClassName } from "@material-ui/styles";
import { GenerateClassName, SheetsRegistry } from "jss";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700]
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    }
  },
  typography: {
    useNextVariants: true
  }
});

export interface PageContext extends MuiThemeProviderProps {
  generateClassName: GenerateClassName<string>; // not sure what goes here
  sheetsRegistry: SheetsRegistry;
}

function createPageContext(): PageContext {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
    children: undefined
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
