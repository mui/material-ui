/* eslint-disable camelcase, import/prefer-default-export */
import React from 'react';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.
import mediaQuery from 'css-mediaquery'; // Support SSR and old browsers

const browser = typeof window !== 'undefined';

function matches(query, valuesInput) {
  if (browser && window.matchMedia) {
    return window.matchMedia(query).matches;
  }

  let values = valuesInput;

  if (browser && !values) {
    values = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  return mediaQuery.match(query, values);
}

export function unstable_useMediaQuery(queryInput, options = {}) {
  const {
    noSSR = false,
    resizeInterval = 166, // Corresponds to 10 frames at 60 Hz.
    values,
  } = options;

  const query = queryInput.replace('@media ', '');
  const state = noSSR ? matches(query, values) : false;
  const [match, setMatch] = React.useState(state);

  if (browser) {
    const matchRef = React.useRef(state);
    React.useEffect(
      () => {
        const handleResize = debounce(() => {
          const newMatch = matches(query, values);

          if (newMatch !== matchRef.current) {
            setMatch(newMatch);
            matchRef.current = newMatch;
          }
        }, resizeInterval);

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
          handleResize.clear();
          window.removeEventListener('resize', handleResize);
        };
      },
      [query, resizeInterval, values],
    );
  }

  return match;
}
