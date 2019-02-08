/* eslint-disable no-console */

import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';
import memoize from '@material-ui/system/memoize';
import mapTranslations from 'docs/src/modules/utils/mapTranslations';

const req = require.context('docs/translations', false, /translations.*\.json$/);
const translations = mapTranslations(req, 'json');

const getT = memoize(userLanguage => key => {
  const wordings = translations[userLanguage];

  if (!wordings) {
    console.error(`Missing language: ${userLanguage}.`);
    return '…';
  }

  const translation = wordings[key];

  if (!translation) {
    console.error(`Missing translation for ${userLanguage}:${key}.`);
    return `${userLanguage}:${key}`;
  }

  return translation;
});

const mapping = {
  [ACTION_TYPES.OPTIONS_CHANGE]: (state, action) => {
    const newState = {
      codeVariant: action.payload.codeVariant || state.codeVariant,
      userLanguage: action.payload.userLanguage || state.userLanguage,
    };
    newState.t = getT(newState.userLanguage);
    return newState;
  },
};

const initialState = {
  codeVariant: CODE_VARIANTS.JS,
  userLanguage: 'en',
  t: getT('en'),
};

function optionsReducer(state = initialState, action) {
  let newState = state;

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  return newState;
}

export default optionsReducer;
