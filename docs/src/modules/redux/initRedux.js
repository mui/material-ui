/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import optionsReducer from 'docs/src/modules/redux/optionsReducer';
import notificationsReducer from 'docs/src/modules/redux/notificationsReducer';
import { createLogger } from 'redux-logger';

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = (x) => x;

if (
  process.env.NODE_ENV !== 'production' &&
  process.browser &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

export default function create(initialState) {
  let middleware = [];

  if (
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    !window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // redux-logger needs this feature
    Object.hasOwnProperty('assign')
  ) {
    middleware = [...middleware, createLogger()];
  }

  return createStore(
    combineReducers({
      options: optionsReducer,
      notifications: notificationsReducer,
    }),
    initialState, // Hydrate the store with server-side data
    compose(applyMiddleware(...middleware), devtools),
  );
}
