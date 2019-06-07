import React from 'react';

// This variable will be true once the server-side hydration is completed.
let hydrationCompleted = false;

function deepEqual(a, b) {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

function useMediaQuery(queryInput, options = {}) {
  const multiple = Array.isArray(queryInput);
  let queries = multiple ? queryInput : [queryInput];
  queries = queries.map(query => query.replace('@media ', ''));

  const { defaultMatches = false, noSsr = false, ssrMatchMedia = null } = options;

  const [matches, setMatches] = React.useState(() => {
    if (hydrationCompleted || noSsr) {
      return queries.map(query => window.matchMedia(query).matches);
    }
    if (ssrMatchMedia) {
      return queries.map(query => ssrMatchMedia(query).matches);
    }

    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return queries.map(() => defaultMatches);
  });

  React.useEffect(() => {
    hydrationCompleted = true;

    const queryLists = queries.map(query => window.matchMedia(query));
    setMatches(prev => {
      const next = queryLists.map(queryList => queryList.matches);
      return deepEqual(prev, next) ? prev : next;
    });

    function handleMatchesChange() {
      setMatches(queryLists.map(queryList => queryList.matches));
    }

    queryLists.forEach(queryList => {
      queryList.addListener(handleMatchesChange);
    });
    return () => {
      queryLists.forEach(queryList => {
        queryList.removeListener(handleMatchesChange);
      });
    };
  }, queries); // eslint-disable-line react-hooks/exhaustive-deps

  return multiple ? matches : matches[0];
}

export function testReset() {
  hydrationCompleted = false;
}

export default useMediaQuery;
