/* eslint-disable camelcase */

import React from 'react';

// This variable will be true once the server-side hydration is completed.
let hydrationCompleted = false;

function useMounted() {
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef.current;
}

function unstable_useMediaQuery(queryInput, options = {}) {
  const query = queryInput.replace('@media ', '');
  const {
    defaultMatches: defaultMatchesInput = false,
    noSsr = false,
    ssrMatchMedia = null,
  } = options;

  let defaultMatches = defaultMatchesInput;
  const mounted = useMounted();

  if (mounted) {
    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
  } else if (hydrationCompleted || noSsr) {
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

  React.useEffect(() => {
    hydrationCompleted = true;

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
  }, [query]);

  return matches;
}

export function testReset() {
  hydrationCompleted = false;
}

export default unstable_useMediaQuery;
