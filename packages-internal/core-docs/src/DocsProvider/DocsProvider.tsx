import * as React from 'react';
import { Translations, UserLanguageProvider } from '../i18n';
import { AdConfig, AdProvider } from '../Ad';
import {
  LANGUAGES,
  LANGUAGES_IGNORE_PAGES,
  LANGUAGES_IN_PROGRESS,
  LANGUAGES_SSR,
} from '../constants';

export interface DocsConfig {
  LANGUAGES: string[];
  LANGUAGES_SSR: string[];
  LANGUAGES_IN_PROGRESS: string[];
  LANGUAGES_IGNORE_PAGES: (pathname: string) => boolean;
}

export const DEFAULT_DOCS_CONFIG: DocsConfig = {
  LANGUAGES,
  LANGUAGES_SSR,
  LANGUAGES_IN_PROGRESS,
  LANGUAGES_IGNORE_PAGES,
};

const DocsConfigContext = React.createContext<DocsConfig>(DEFAULT_DOCS_CONFIG);

export interface DocsProviderProps {
  config?: DocsConfig;
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
    <DocsConfigContext.Provider value={config || DEFAULT_DOCS_CONFIG}>
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
    return DEFAULT_DOCS_CONFIG;
  }
  return config;
}
