'use client';
import * as React from 'react';

function defaultTrigger(store, options) {
  const { disableHysteresis = false, threshold = 100, target } = options;
  const previous = store.current;

  if (target) {
    // Get vertical scroll
    store.current = target.pageYOffset !== undefined ? target.pageYOffset : target.scrollTop;
  }

  if (!disableHysteresis && previous !== undefined) {
    if (store.current < previous) {
      return false;
    }
  }

  return store.current > threshold;
}

const defaultTarget = typeof window !== 'undefined' ? window : null;

export default function useScrollTrigger(options = {}) {
  const { getTrigger = defaultTrigger, target = defaultTarget, ...other } = options;
  const store = React.useRef();
  const [trigger, setTrigger] = React.useState(() => getTrigger(store, other));

  React.useEffect(() => {
    const handleScroll = () => {
      setTrigger(getTrigger(store, { target, ...other }));
    };

    handleScroll(); // Re-evaluate trigger when dependencies change
    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      target.removeEventListener('scroll', handleScroll, { passive: true });
    };
    // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, getTrigger, JSON.stringify(other)]);

  return trigger;
}
