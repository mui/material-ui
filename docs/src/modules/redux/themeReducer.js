import actionTypes from 'docs/src/modules/redux/actionTypes';

const initialState = {
  paletteType: 'light',
  direction: 'ltr',
};

const mapping = {
  [actionTypes.THEME_CHANGE_PALETTE_TYPE]: (state, action) => ({
    ...state,
    paletteType: action.payload.paletteType,
  }),
  [actionTypes.THEME_CHANGE_DIRECTION]: (state, action) => ({
    ...state,
    direction: action.payload.direction,
  }),
};

function themeReducer(state = initialState, action) {
  let newState = state;

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  return newState;
}

export default themeReducer;
