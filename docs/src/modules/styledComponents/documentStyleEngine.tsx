import * as React from 'react';
import { ServerStyleSheet } from 'styled-components';
import type { DocumentStyleEngine } from '@mui/internal-core-docs/Document';

/**
 * Collects styled-components styles for one SSR pass and emits them ahead of
 * the props already resolved by the document.
 */
const documentStyleEngine: DocumentStyleEngine = () => {
  const sheet = new ServerStyleSheet();

  return {
    plugin: {
      enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      resolveProps: async (initialProps) => ({
        ...initialProps,
        styles: [sheet.getStyleElement(), ...React.Children.toArray(initialProps.styles)],
      }),
    },
    dispose: () => sheet.seal(),
  };
};

export default documentStyleEngine;
