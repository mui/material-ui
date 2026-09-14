import * as React from 'react';
import type { StyleEngine } from '@mui/internal-core-docs/styleEngine';
import StyleEngineWrapper from './Wrapper';

/**
 * The styled-components engine for the docs. Both halves reach `styled-components` only through
 * `import()`, so it stays out of the app bundle.
 */
const styledComponentsEngine: StyleEngine = {
  Wrapper: StyleEngineWrapper,
  createDocumentPlugin: async () => {
    const { ServerStyleSheet } = await import('styled-components');
    const sheet = new ServerStyleSheet();

    return {
      enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      resolveProps: async (initialProps) => {
        const styles = [sheet.getStyleElement(), ...React.Children.toArray(initialProps.styles)];
        // After `getStyleElement()`, which throws once the sheet is sealed.
        sheet.seal();
        return { ...initialProps, styles };
      },
    };
  },
};

export default styledComponentsEngine;
