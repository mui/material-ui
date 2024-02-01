import * as React from 'react';
import invariant from 'invariant';

export interface DocsConfig {
  LANGUAGES: string[];
  LANGUAGES_SSR: string[];
  LANGUAGES_IN_PROGRESS: string[];
  LANGUAGES_IGNORE_PAGES: (pathname: string) => boolean;
}

const DocsConfigContext = React.createContext<DocsConfig | null>(null);

export interface DocsProviderProps {
  config: DocsConfig;
  children?: React.ReactNode;
}

export function DocsProvider({ config, children }: DocsProviderProps) {
  return <DocsConfigContext.Provider value={config}>{children}</DocsConfigContext.Provider>;
}

export function useDocsConfig() {
  const config = React.useContext(DocsConfigContext);
  invariant(
    config,
    'Could not find docs config context value; please ensure the component is wrapped in a <DocsProvider>',
  );
  return config;
}
