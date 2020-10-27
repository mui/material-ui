import * as React from 'react';
import { useSelector } from 'react-redux';
import mapTranslations from './mapTranslations';

const req = require.context('docs/translations', false, /translations.*\.json$/);
const translations = mapTranslations(req, 'json');

function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
}

const warnOnce = {};

export function useTranslate() {
  const userLanguage = useSelector((state) => state.options.userLanguage);

  return React.useMemo(
    () =>
      function translate(key, options = {}) {
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
          if (!ignoreWarning && !warnOnce[fullKey] && typeof window !== 'undefined') {
            console.error(`Missing translation for ${fullKey}.`);
            warnOnce[fullKey] = true;
          }
          return getPath(translations.en, key);
        }

        return translation;
      },
    [userLanguage],
  );
}

export function useUserLanguage() {
  return useSelector((state) => state.options.userLanguage);
}
