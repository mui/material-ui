// @flow
/* eslint-disable no-underscore-dangle */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = x => x;

if (
  process.env.NODE_ENV !== 'production' &&
  process.browser &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

function themeReducer(state = { dark: false }, action) {
  if (action.type === 'TOGGLE_THEME_SHADE') {
    return {
      ...state,
      dark: !state.dark,
    };
  }
  return state;
}

function create(initialState: Object) {
  let middlewares = [];

  if (
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    !window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    // eslint-disable-next-line global-require
    const createLogger = require('redux-logger').createLogger;

    middlewares = [...middlewares, createLogger()];
  }

  return createStore(
    combineReducers({
      theme: themeReducer,
    }),
    initialState, // Hydrate the store with server-side data
    compose(applyMiddleware(...middlewares), devtools),
  );
}

export default function initRedux(initialState: Object) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse store on the client-side
  if (!global.__INIT_REDUX_STORE__) {
    global.__INIT_REDUX_STORE__ = create(initialState);
  }

  return global.__INIT_REDUX_STORE__;
}
