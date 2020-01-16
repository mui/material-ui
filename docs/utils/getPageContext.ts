import { SheetsRegistry } from 'jss';
import { createGenerateClassName } from '@material-ui/core/styles';

export interface PageContext {
  generateClassName: any;
  sheetsManager: Map<string, string>;
  sheetsRegistry: SheetsRegistry;
}

export default function(): PageContext {
  return {
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}
