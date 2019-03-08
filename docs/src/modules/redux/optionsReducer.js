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

const getT = memoize(userLanguage => (key, options = {}) => {
  const { ignoreWarning = false } = options;
  const wordings = translations[userLanguage];

  if (!wordings) {
    console.error(`Missing language: ${userLanguage}.`);
    return '…';
  }

  const translation = getPath(wordings, key);

  if (!translation) {
    if (!ignoreWarning) {
      console.error(`Missing translation for ${userLanguage}:${key}.`);
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

const initialState = {
  codeVariant: CODE_VARIANTS.JS,
  userLanguage: 'en',
};

function optionsReducer(state = initialState, action) {
  let newState = state;

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  newState.t = getT(newState.userLanguage);

  return newState;
}

export default optionsReducer;
