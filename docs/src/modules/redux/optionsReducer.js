/* eslint-disable no-console */

import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';
import memoize from '@material-ui/system/memoize';
import mapTranslations from 'docs/src/modules/utils/mapTranslations';

const req = require.context('docs/translations', false, /translations.*\.json$/);
const translations = mapTranslations(req, 'json');

function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
}

const warnOnce = {};

const getT = memoize(userLanguage => (key, options = {}) => {
  const { ignoreWarning = false } = options;
  const wordings = translations[userLanguage];

  if (!wordings) {
    console.error(`Missing language: ${userLanguage}.`);
    return '…';
  }

  const translation = getPath(wordings, key);

  if (!translation) {
    const fullKey = `${userLanguage}:${key}`;
    if (!ignoreWarning && !warnOnce[fullKey]) {
      console.error(`Missing translation for ${fullKey}.`);
      warnOnce[fullKey] = true;
    }
    return getPath(translations.en, key);
  }

  return translation;
});

const mapping = {
  [ACTION_TYPES.OPTIONS_CHANGE]: (state, action) => {
    const newState = {
      codeVariant: action.payload.codeVariant || state.codeVariant,
      userLanguage: action.payload.userLanguage || state.userLanguage,
    };
    return newState;
  },
};

function optionsReducer(state = {}, action) {
  let newState = { ...state };

  if (!newState.codeVariant) {
    newState.codeVariant = CODE_VARIANTS.JS;
  }
  if (!newState.userLanguage) {
    newState.userLanguage = 'en';
  }

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  newState.t = getT(newState.userLanguage);

  return newState;
}

export default optionsReducer;
