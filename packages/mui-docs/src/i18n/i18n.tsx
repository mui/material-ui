import * as React from 'react';
import PropTypes from 'prop-types';

declare global {
  interface NodeRequire {
    context: (path: string, useSubdirectories: boolean, regex: RegExp) => RequireContext;
  }
}

interface RequireContext {
  (req: string): string;
  keys: () => string[];
}

function mapTranslations(req: RequireContext) {
  const translations: Record<string, string> = {};
  req.keys().forEach((filename) => {
    const match = filename.match(/-([a-z]{2}).json$/);

    if (match) {
      translations[match[1]] = req(filename);
    } else {
      translations.en = req(filename);
    }
  });
  return translations;
}

const req: RequireContext = require.context('docs/translations', false, /translations.*\.json$/);
const translations = mapTranslations(req);

function getPath(obj: any, path: string): any {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
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
  defaultUserLanguage: string;
}

export function UserLanguageProvider(props: UserLanguageProviderProps) {
  const { children, defaultUserLanguage } = props;

  const [userLanguage, setUserLanguage] = React.useState(defaultUserLanguage);

  const contextValue = React.useMemo(() => {
    return { userLanguage, setUserLanguage };
  }, [userLanguage]);

  return (
    <UserLanguageContext.Provider value={contextValue}>{children}</UserLanguageContext.Provider>
  );
}

UserLanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultUserLanguage: PropTypes.string,
};

export function useUserLanguage() {
  return React.useContext(UserLanguageContext).userLanguage;
}

export function useSetUserLanguage() {
  return React.useContext(UserLanguageContext).setUserLanguage;
}

const warnedOnce: Record<string, boolean> = {};

export interface TranslateOptions {
  ignoreWarning?: boolean;
}

export function useTranslate() {
  const userLanguage = useUserLanguage();

  return React.useMemo(
    () =>
      function translate(key: string, options: TranslateOptions = {}) {
        const { ignoreWarning = false } = options;
        const wordings = translations[userLanguage];

        if (!wordings) {
          console.error(`Missing language: ${userLanguage}.`);
          return '…';
        }

        const translation = getPath(wordings, key);

        if (!translation) {
          const fullKey = `${userLanguage}:${key}`;
          // No warnings in CI env
          if (!ignoreWarning && !warnedOnce[fullKey] && typeof window !== 'undefined') {
            console.error(`Missing translation for ${fullKey}`);
            warnedOnce[fullKey] = true;
          }
          return getPath(translations.en, key);
        }

        return translation;
      },
    [userLanguage],
  );
}
