import * as React from 'react';

function create(createState) {
  let state;
  const listeners = new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace ? nextState : { ...state, ...nextState };
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribeWithSelector = (listener, selector, equalityFn = Object.is) => {
    let currentSlice = selector(state);
    function listenerToAdd() {
      const nextSlice = selector(state);
      if (!equalityFn(currentSlice, nextSlice)) {
        const previousSlice = currentSlice;
        listener((currentSlice = nextSlice), previousSlice);
      }
    }
    listeners.add(listenerToAdd);
    return () => listeners.delete(listenerToAdd);
  };
  const subscribe = (listener, selector, equalityFn) => {
    if (selector || equalityFn) {
      return subscribeWithSelector(listener, selector, equalityFn);
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => listeners.clear();
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
}

function useStateValue(stateObj, property) {
  const [value, setValue] = React.useState(stateObj.getState()[property]);
  React.useEffect(() => {
    return stateObj.subscribe(
      (newValue) => {
        setValue(newValue);
      },
      (state) => state[property],
    );
  }, [stateObj, property, value]);
  return value;
}

const nProgressState = create(() => ({
  value: undefined,
  initialDelay: 300,
}));

export function useProgressValue() {
  return useStateValue(nProgressState, 'value');
}

export function useInitialDelay() {
  return useStateValue(nProgressState, 'initialDelay');
}

export function getInitialDelay() {
  return nProgressState.getState().initialDelay;
}

export const setProgressValue = (value) => {
  nProgressState.setState({
    value,
  });
};

export const setProgressInitialDelay = (initialDelay) => {
  nProgressState.setState({
    initialDelay,
  });
};
