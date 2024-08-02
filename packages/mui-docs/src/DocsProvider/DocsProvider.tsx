import * as React from 'react';
import { Translations, UserLanguageProvider } from '../i18n';
import { AdConfig, AdProvider } from '../Ad';

export interface DocsConfig {
  LANGUAGES: string[];
  LANGUAGES_SSR: string[];
  LANGUAGES_IN_PROGRESS: string[];
  LANGUAGES_IGNORE_PAGES: (pathname: string) => boolean;
}

const DocsConfigContext = React.createContext<DocsConfig | null>(null);

export interface DocsProviderProps {
  config: DocsConfig;
  adConfig?: Partial<AdConfig>;
  defaultUserLanguage: string;
  children?: React.ReactNode;
  translations?: Translations;
}

export function DocsProvider({
  config,
  adConfig,
  defaultUserLanguage,
  translations,
  children,
}: DocsProviderProps) {
  return (
    <DocsConfigContext.Provider value={config}>
      <AdProvider config={adConfig}>
        <UserLanguageProvider defaultUserLanguage={defaultUserLanguage} translations={translations}>
          {children}
        </UserLanguageProvider>
      </AdProvider>
    </DocsConfigContext.Provider>
  );
}

export function useDocsConfig() {
  const config = React.useContext(DocsConfigContext);
  if (!config) {
    throw new Error(
      'Could not find docs config context value; please ensure the component is wrapped in a <DocsProvider>',
    );
  }
  return config;
}
