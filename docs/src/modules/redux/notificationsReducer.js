import { ACTION_TYPES } from 'docs/src/modules/constants';

const mapping = {
  [ACTION_TYPES.NOTIFICATIONS_CHANGE]: (state, action) => {
    const newState = {
      ...state,
      ...action.payload,
    };
    return newState;
  },
};

export default function notificationsReducer(state = {}, action) {
  let newState = { ...state };

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  return newState;
}
