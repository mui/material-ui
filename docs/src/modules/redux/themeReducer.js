import actionTypes from 'docs/src/modules/redux/actionTypes';
import themeInitialState from 'docs/src/modules/styles/themeInitialState';

const mapping = {
  [actionTypes.THEME_CHANGE_PALETTE_TYPE]: (state, action) => ({
    ...state,
    paletteType: action.payload.paletteType,
  }),
  [actionTypes.THEME_CHANGE_DIRECTION]: (state, action) => ({
    ...state,
    direction: action.payload.direction,
  }),
  [actionTypes.THEME_CHANGE_PALETTE_COLORS]: (state, action) => ({
    ...state,
    paletteColors: action.payload.paletteColors,
  }),
};

function themeReducer(state = themeInitialState, action) {
  let newState = state;

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  return newState;
}

export default themeReducer;
