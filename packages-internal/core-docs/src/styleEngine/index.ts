import * as React from 'react';
import type { Direction } from '@mui/system';
import type { documentGetInitialProps } from '@mui/material-nextjs/v13-pagesRouter';

type DocumentOptions = NonNullable<Parameters<typeof documentGetInitialProps>[1]>;

export type DocumentPlugin = NonNullable<DocumentOptions['plugins']>[number];

export interface StyleEngineScopeProps {
  /** The subtree whose styles the engine controls. */
  children: React.ReactNode;
  /**
   * Where the engine emits its styles: an iframe's `<head>` for framed demos,
   * `undefined` for the page itself.
   */
  container?: HTMLElement;
  /** The reading direction to render for. */
  direction: Direction;
}

/**
 * A style engine the docs infrastructure does not configure itself. Emotion is
 * set up directly; a product whose demos use another engine provides both
 * halves here and passes the same object to `DocsApp` and to the document's
 * `createGetInitialProps`.
 */
export interface StyleEngine {
  /** Scopes the engine to `container` and `direction` on the client. */
  Wrapper?: React.ComponentType<StyleEngineScopeProps>;
  /** Called once per request to collect the engine's server-rendered styles. */
  createDocumentPlugin?: () => Promise<DocumentPlugin>;
}

export const StyleEngineContext = React.createContext<StyleEngine | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  StyleEngineContext.displayName = 'StyleEngineContext';
}
