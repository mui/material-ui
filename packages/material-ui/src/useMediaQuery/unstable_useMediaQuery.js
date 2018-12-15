/* eslint-disable camelcase */

import React from 'react';

// This variable will be true once the server-side reconciliation is done.
let didMount = false;

function unstable_useMediaQuery(queryInput, options = {}) {
  const query = queryInput.replace('@media ', '');
  const {
    defaultMatches: defaultMatchesInput = false,
    noSsr = false,
    ssrMatchMedia = null,
  } = options;

  let defaultMatches = defaultMatchesInput;

  if (didMount || noSsr) {
    defaultMatches = window.matchMedia(query).matches;
  } else if (ssrMatchMedia) {
    defaultMatches = ssrMatchMedia(query).matches;
  }

  // Early exit for server-side rendering performance.
  /* istanbul ignore if */
  if (typeof window === 'undefined') {
    return defaultMatches;
  }

  const [matches, setMatches] = React.useState(defaultMatches);

  React.useEffect(
    () => {
      didMount = true;

      const queryList = window.matchMedia(query);
      if (matches !== queryList.matches) {
        setMatches(queryList.matches);
      }

      function handleMatchesChange(event) {
        setMatches(event.matches);
      }

      queryList.addListener(handleMatchesChange);
      return () => {
        queryList.removeListener(handleMatchesChange);
      };
    },
    [query],
  );

  return matches;
}

export function testReset() {
  didMount = false;
}

export default unstable_useMediaQuery;
