'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import useForkRef from '../utils/useForkRef';
import useEventCallback from '../utils/useEventCallback';
import useLazyRipple from '../useLazyRipple';
import TouchRipple from './TouchRipple';

/**
 * Material's ripple, injected into ButtonBase's `ripple` slot.
 *
 * It gets a ref to the element it sits inside and binds its own listeners to
 * that node, so every line of ripple code stays on this side of the seam. The
 * unstyled ButtonBase renders this slot and hands it a ref; it has no handlers
 * of its own for mouse, touch or keyboard ripple.
 *
 * These are native listeners on the button, where the old code used React
 * handlers composed with the user's callbacks. A native listener on the element
 * runs before React's delegated ones, so the ripple now reacts before the
 * consumer's `onMouseDown` rather than after it.
 */
const ButtonBaseRipple = React.forwardRef(function ButtonBaseRipple(props, ref) {
  const { ownerState, rootRef, touchRippleRef, ...other } = props;
  const { centerRipple, focusRipple, focusVisible, disableTouchRipple } = ownerState;

  const ripple = useLazyRipple();
  const handleRippleRef = useForkRef(ref, ripple.ref, touchRippleRef);

  /**
   * Once mounted, act on the instance directly. `LazyRipple` routes every call
   * through a promise, which puts the state update in a later microtask than
   * the event that caused it; from a DOM listener that lands outside React's
   * batching. Only the first interaction, which has to mount first, waits.
   */
  const act = React.useCallback(
    (action, event, cb) => {
      if (ripple.ref.current) {
        ripple.ref.current[action](event, cb);
      } else {
        ripple[action](event, cb);
      }
    },
    [ripple],
  );

  // A remount with the same props must not pulsate twice, and React replays
  // effects on mount in development.
  const pulsated = React.useRef(false);

  React.useEffect(() => {
    if (!focusVisible) {
      pulsated.current = false;
      return;
    }
    if (focusRipple && !pulsated.current) {
      pulsated.current = true;
      act('pulsate');
    }
  }, [act, focusRipple, focusVisible]);

  const handleStart = useEventCallback((event) => {
    act('start', event);
  });

  const handleStop = useEventCallback((event) => {
    act('stop', event);
  });

  const handleKeyDown = useEventCallback((event) => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !event.repeat && focusVisible && event.key === ' ') {
      act('stop', event, () => {
        act('start', event);
      });
    }
  });

  const handleKeyUp = useEventCallback((event) => {
    if (focusRipple && event.key === ' ' && focusVisible && !event.defaultPrevented) {
      act('stop', event, () => {
        act('pulsate', event);
      });
    }
  });

  React.useEffect(() => {
    const node = rootRef?.current;
    if (!node) {
      return undefined;
    }

    // Blur stops the ripple whatever `disableTouchRipple` says, matching the
    // handler it replaces.
    const bindings = [['blur', handleStop]];

    if (!disableTouchRipple) {
      bindings.push(
        ['mousedown', handleStart],
        ['touchstart', handleStart],
        ['mouseup', handleStop],
        ['mouseleave', handleStop],
        ['dragleave', handleStop],
        ['contextmenu', handleStop],
        ['touchend', handleStop],
        ['touchmove', handleStop],
      );
    }

    if (focusRipple) {
      bindings.push(['keydown', handleKeyDown], ['keyup', handleKeyUp]);
    }

    bindings.forEach(([type, handler]) => node.addEventListener(type, handler));
    return () => {
      bindings.forEach(([type, handler]) => node.removeEventListener(type, handler));
    };
  }, [
    rootRef,
    disableTouchRipple,
    focusRipple,
    handleStart,
    handleStop,
    handleKeyDown,
    handleKeyUp,
  ]);

  if (!ripple.shouldMount) {
    return null;
  }

  return <TouchRipple ref={handleRippleRef} center={centerRipple} {...other} />;
});

ButtonBaseRipple.propTypes = {
  /**
   * ButtonBase's state, which carries `centerRipple`, `focusRipple`,
   * `focusVisible` and `disableTouchRipple`.
   */
  ownerState: PropTypes.object.isRequired,
  /**
   * A ref to the element this slot renders inside, to bind listeners to.
   */
  rootRef: PropTypes.shape({ current: PropTypes.any }),
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
};

export default ButtonBaseRipple;
