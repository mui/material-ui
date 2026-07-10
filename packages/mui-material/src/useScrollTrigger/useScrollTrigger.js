'use client';
import * as React from 'react';

function defaultTrigger(store, options) {
  const { disableHysteresis = false, threshold = 100, target } = options;
  const previous = store.current;
  const previousScrollHeight = store.scrollHeight;

  if (target) {
    // Get vertical scroll
    store.current = target.pageYOffset !== undefined ? target.pageYOffset : target.scrollTop;
    store.scrollHeight =
      target.document !== undefined
        ? target.document.documentElement.scrollHeight
        : target.scrollHeight;
  }

  if (!disableHysteresis && previous !== undefined) {
    if (previousScrollHeight !== undefined && store.scrollHeight !== previousScrollHeight) {
      // The scrollable area was resized since the last scroll event, for example by a
      // Collapse transition inside a sticky AppBar. The resize itself can shift the
      // scroll position (scroll anchoring), so the direction of this change doesn't
      // reflect the user's scroll intent. Keep the previous value to avoid the
      // trigger from flip-flopping. See https://github.com/mui/material-ui/issues/46589
      return store.trigger;
    }
    if (store.current < previous) {
      store.trigger = false;
      return false;
    }
    if (store.trigger) {
      // A resize can leave the scroll position below the threshold while triggered.
      // With hysteresis, only scrolling up should untrigger.
      return true;
    }
  }

  store.trigger = store.current > threshold;
  return store.trigger;
}

const defaultTarget = typeof window !== 'undefined' ? window : null;

export default function useScrollTrigger(options = {}) {
  const { getTrigger = defaultTrigger, target = defaultTarget, ...other } = options;
  const store = React.useRef();
  const [trigger, setTrigger] = React.useState(() => getTrigger(store, other));
  React.useEffect(() => {
    if (target === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      return setTrigger(false);
    }
    const handleScroll = () => {
      setTrigger(getTrigger(store, { target, ...other }));
    };

    handleScroll(); // Re-evaluate trigger when dependencies change
    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      target.removeEventListener('scroll', handleScroll, { passive: true });
    };
    // See Option 3. https://github.com/react/react/issues/14476#issuecomment-471199055
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, getTrigger, JSON.stringify(other)]);

  return trigger;
}
