import deepmerge from '@mui/utils/deepmerge';
import * as React from 'react';
import defaultTranslations from '../translations';
import { translate, Translate, TranslateOptions, Translations } from './utils';

const TranslationsContext = React.createContext(defaultTranslations);

interface TranslationsProviderProps {
  translations?: Record<string, Translations>;
  children: React.ReactNode;
}

function TranslationsProvider({ translations = {}, children }: TranslationsProviderProps) {
  const currentTranslations = React.useContext(TranslationsContext);
  const mergedTranslations = React.useMemo(
    () => deepmerge(currentTranslations, translations),
    [currentTranslations, translations],
  );

  return (
    <TranslationsContext.Provider value={mergedTranslations}>
      {children}
    </TranslationsContext.Provider>
  );
}

interface UserLanguageContextValue {
  userLanguage: string;
  setUserLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const UserLanguageContext = React.createContext<UserLanguageContextValue>({
  userLanguage: '',
  setUserLanguage: () => {},
});
if (process.env.NODE_ENV !== 'production') {
  UserLanguageContext.displayName = 'UserLanguage';
}

export interface UserLanguageProviderProps {
  children: React.ReactNode;
  translations?: Record<string, Translations>;
  defaultUserLanguage: string;
}

export function UserLanguageProvider(props: UserLanguageProviderProps) {
  const { children, translations, defaultUserLanguage } = props;

  const [userLanguage, setUserLanguage] = React.useState(defaultUserLanguage);

  const contextValue = React.useMemo(() => {
    return { userLanguage, setUserLanguage };
  }, [userLanguage]);

  return (
    <TranslationsProvider translations={translations}>
      <UserLanguageContext.Provider value={contextValue}>{children}</UserLanguageContext.Provider>
    </TranslationsProvider>
  );
}

export function useUserLanguage() {
  return React.useContext(UserLanguageContext).userLanguage;
}

export function useSetUserLanguage() {
  return React.useContext(UserLanguageContext).setUserLanguage;
}

export function useTranslate(): Translate {
  const userLanguage = useUserLanguage();

  const translations = React.useContext(TranslationsContext);

  return React.useMemo(
    () =>
      (key: string, options: TranslateOptions = {}) =>
        translate(key, translations, userLanguage, options),
    [userLanguage, translations],
  );
}
