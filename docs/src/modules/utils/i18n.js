import PropTypes from 'prop-types';
import * as React from 'react';
import { useRouter } from 'next/router';
import replaceHtmlLinks from 'docs/src/modules/utils/replaceHtmlLinks';

function mapTranslations(req) {
  const translations = {};
  req.keys().forEach((filename) => {
    const match = filename.match(new RegExp(`-([a-z]{2}).json$`));

    if (match) {
      translations[match[1]] = req(filename);
    } else {
      translations.en = req(filename);
    }
  });
  return translations;
}

const req = require.context('docs/translations', false, /translations.*\.json$/);
const translations = mapTranslations(req);

function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
}

const UserLanguageContext = React.createContext({ userLanguage: '', setUserLanguage: () => {} });
if (process.env.NODE_ENV !== 'production') {
  UserLanguageContext.displayName = 'UserLanguage';
}

export function UserLanguageProvider(props) {
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

const warnedOnce = {};

export function useTranslate() {
  const router = useRouter();
  const userLanguage = useUserLanguage();

  return React.useMemo(
    () =>
      function translate(key, options = {}) {
        // TODO: remove this logic once the migration to new structure is done.
        function pointToNewHref(translation) {
          if (typeof translation === 'string') {
            return replaceHtmlLinks(translation, router.asPath);
          }
          return translation;
        }
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
          return pointToNewHref(getPath(translations.en, key));
        }

        return pointToNewHref(translation);
      },
    [userLanguage, router.asPath],
  );
}
