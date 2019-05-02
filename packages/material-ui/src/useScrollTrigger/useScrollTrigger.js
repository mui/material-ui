import React from 'react';

function getScrollY(ref = window) {
  if (ref && ref.pageYOffset !== undefined) {
    return ref.pageYOffset;
  }
  if (ref && ref.scrollTop !== undefined) {
    return ref.scrollTop;
  }
  return document
    ? (document.documentElement || document.body.parentNode || document.body).scrollTop
    : 0;
}

function defaultTrigger(props = {}) {
  const { event, store, directional = true, threshold = 100 } = props;
  const previous = store.current || 0;
  store.current = getScrollY(event.currentTarget);
  if (directional) {
    return store.current < previous
      ? false
      : !!(store.current > previous && store.current > threshold);
  }
  return store.current > threshold;
}

export default function useScrollTrigger(props = {}) {
  const { onEval = defaultTrigger, ...remaining } = props;
  const [target, setTarget] = React.useState();
  const store = React.useRef();
  const [trigger, setTrigger] = React.useState(false);

  const handleScroll = React.useCallback(
    event => {
      setTrigger(onEval({ event, store, ...remaining }));
    },
    // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onEval, JSON.stringify(remaining)],
  );

  React.useEffect(() => {
    (target || window).addEventListener('scroll', handleScroll);
    return () => {
      (target || window).removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, target]);

  return [trigger, setTarget];
}
