import React from 'react';

// This variable will be true once the server-side hydration is completed.
let hydrationCompleted = false;

function useMediaQuery(queryInput, options = {}) {
  const query = queryInput.replace('@media ', '');
  const { defaultMatches = false, noSsr = false, ssrMatchMedia = null } = options;

  const [matches, setMatches] = React.useState(() => {
    if (hydrationCompleted || noSsr) {
      return window.matchMedia(query).matches;
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }

    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return defaultMatches;
  });

  React.useEffect(() => {
    hydrationCompleted = true;

    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

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

export default useMediaQuery;
