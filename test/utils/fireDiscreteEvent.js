function withMissingActWarningsIgnored(callback) {
  const originalConsoleError = console.error;
  console.error = function silenceMissingActWarnings(message, ...args) {
    const isMissingActWarning = /not wrapped in act\(...\)/.test(message);
    if (!isMissingActWarning) {
      originalConsoleError.call(console, message, ...args);
    }
  };
  try {
    callback();
  } finally {
    console.error = originalConsoleError;
  }
}

// -----------------------------------------
// WARNING ⚠️ WARNING ⚠️ WARNING ⚠️ WARNING
//
// Do not add events here because you want to ignore "missing act()" warnings.
// Only add events if you made sure that React actually considers these as "discrete".
// Be aware that "discrete events" are an implementation detail of React.
// To test discrete events we cannot use `fireEvent` from `@testing-library/react` because they are all wrapped in `act`.
// `act` overrides the "discrete event" semantics with "batching" semantics: https://github.com/facebook/react/blob/3fbd47b86285b6b7bdeab66d29c85951a84d4525/packages/react-reconciler/src/ReactFiberWorkLoop.old.js#L1061-L1064
// -----------------------------------------

// eslint-disable-next-line import/prefer-default-export -- there are more than one discrete events.
export function click(element) {
  // TODO: Why are there different semantics between `element.click` and `dtlFireEvent.click`
  return withMissingActWarningsIgnored(() => element.click());
}
