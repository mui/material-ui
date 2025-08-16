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
  const {
    getTrigger = defaultTrigger,
    target = defaultTarget,
    disableReentrant = true,
    reentrantLockDuration = 300,
    ...other
  } = options;
  const store = React.useRef();
  const [trigger, setTrigger] = React.useState(() => getTrigger(store, other));
  const lockTimeoutRef = React.useRef();
  const isLockedRef = React.useRef(false);

  React.useEffect(() => {
    if (target === null) {
      return setTrigger(false);
    }

    const handleScroll = () => {
      if (!disableReentrant && isLockedRef.current) {
        return;
      }

      const newTrigger = getTrigger(store, { target, ...other });

      setTrigger((prevTrigger) => {
        if (newTrigger !== prevTrigger) {
          // Lock updates for a period after state change if reentrant protection is enabled
          // This prevents rapid back-and-forth during Collapse animations
          if (!disableReentrant) {
            isLockedRef.current = true;

            if (lockTimeoutRef.current) {
              clearTimeout(lockTimeoutRef.current);
            }

            lockTimeoutRef.current = setTimeout(() => {
              isLockedRef.current = false;
            }, reentrantLockDuration);
          }

          return newTrigger;
        }
        return prevTrigger;
      });
    };

    handleScroll();

    target.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
      target.removeEventListener('scroll', handleScroll, { passive: true });
    };
    // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, getTrigger, JSON.stringify(other), disableReentrant, reentrantLockDuration]);

  return trigger;
}
