import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';

const mapping = {
  [ACTION_TYPES.OPTIONS_CHANGE]: (state, action) => {
    const newState = {
      codeVariant: action.payload.codeVariant || state.codeVariant,
      userLanguage: action.payload.userLanguage || state.userLanguage,
    };
    return newState;
  },
};

export default function optionsReducer(state = {}, action) {
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

  return newState;
}
