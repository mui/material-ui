/// <reference path="./react-transition-group.d.ts" />
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useValueAsRef from '@mui/utils/useValueAsRef';
// Material UI transitions must still work inside react-transition-group's TransitionGroup.
// Import only its context module; do not import its Transition or TransitionGroup components.
import TransitionGroupContext from 'react-transition-group/TransitionGroupContext';
import { reflow } from '../transitions/utils';

type RenderedTransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
type InternalStatus = RenderedTransitionStatus | 'unmounted';

interface ResolvedTimeouts {
  appear: number | undefined;
  enter: number | undefined;
  exit: number | undefined;
}

interface CancellableCallback {
  (): void;
  cancel: () => void;
}

type TransitionEndListener =
  | ((done: () => void) => void)
  | ((node: HTMLElement, done: () => void) => void);

interface InternalTransitionProps {
  in?: boolean | undefined;
  appear?: boolean | undefined;
  enter?: boolean | undefined;
  exit?: boolean | undefined;
  timeout?:
    | number
    | null
    | { appear?: number | undefined; enter?: number | undefined; exit?: number | undefined }
    | undefined;
  nodeRef: React.RefObject<HTMLElement | null>;
  mountOnEnter?: boolean | undefined;
  unmountOnExit?: boolean | undefined;
  addEndListener?: TransitionEndListener | undefined;
  onEnter?: ((isAppearing: boolean) => void) | undefined;
  onEntering?: ((isAppearing: boolean) => void) | undefined;
  onEntered?: ((isAppearing: boolean) => void) | undefined;
  onExit?: (() => void) | undefined;
  onExiting?: (() => void) | undefined;
  onExited?: (() => void) | undefined;
  children: (
    status: RenderedTransitionStatus,
    childProps: Record<string, unknown>,
  ) => React.ReactNode;
  [key: string]: unknown;
}

function resolveTimeouts(timeout: InternalTransitionProps['timeout']): ResolvedTimeouts {
  if (timeout == null) {
    return { appear: undefined, enter: undefined, exit: undefined };
  }
  if (typeof timeout === 'number') {
    return { appear: timeout, enter: timeout, exit: timeout };
  }
  const enter = timeout.enter;
  const exit = timeout.exit;
  const appear = timeout.appear !== undefined ? timeout.appear : enter;
  return { appear, enter, exit };
}

function Transition(props: InternalTransitionProps): React.ReactNode {
  const {
    in: inProp = false,
    appear = false,
    enter = true,
    exit = true,
    mountOnEnter = false,
    unmountOnExit = false,
    timeout,
    addEndListener,
    nodeRef,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    children,
    ...childProps
  } = props;

  const parentGroup = React.useContext(TransitionGroupContext);

  // react-transition-group's TransitionGroup tells children whether the group
  // is still mounting. Material UI needs two values from that:
  // - shouldEnterOnMount: whether this child should run an enter animation now.
  // - isAppearing: the value passed to enter callbacks.
  // A child added after the group mounted still enters, but callbacks receive
  // isAppearing=false because the parent group is no longer mounting.
  const shouldEnterOnMount = parentGroup && !parentGroup.isMounting ? enter : appear;

  const initialStatusRef = React.useRef<InternalStatus | null>(null);
  if (initialStatusRef.current === null) {
    if (inProp) {
      initialStatusRef.current = shouldEnterOnMount ? 'exited' : 'entered';
    } else if (mountOnEnter || unmountOnExit) {
      initialStatusRef.current = 'unmounted';
    } else {
      initialStatusRef.current = 'exited';
    }
  }

  const [status, setStatus] = React.useState<InternalStatus>(initialStatusRef.current);
  const statusRef = React.useRef<InternalStatus>(status);
  statusRef.current = status;

  const appearPendingRef = React.useRef(
    inProp && shouldEnterOnMount ? ('entering' as const) : null,
  );
  const mountedRef = React.useRef(false);
  const nextCallbackRef = React.useRef<CancellableCallback | null>(null);
  // Remember which status already fired lifecycle callbacks. React StrictMode
  // can run effects twice in development; this prevents duplicate callbacks.
  const lastFiredStatusRef = React.useRef<InternalStatus>(status);
  // Store the isAppearing value for the current enter transition. performEnter
  // sets it before the status effect later calls onEntering/onEntered.
  const isAppearingRef = React.useRef(false);

  // Transition end callbacks can run after props changed. Read props through
  // this ref so delayed work uses the latest callbacks and timeout settings.
  const propsRef = useValueAsRef({
    timeout,
    addEndListener,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    enter,
    exit,
    mountOnEnter,
    unmountOnExit,
    nodeRef,
    parentGroup,
  });

  // Effects below depend on these helpers. Keep their identity stable; they read
  // changing props through propsRef.
  const cancelPendingCallback = React.useCallback(() => {
    if (nextCallbackRef.current !== null) {
      nextCallbackRef.current.cancel();
      nextCallbackRef.current = null;
    }
  }, []);

  const makeCallback = React.useCallback((handler: () => void): CancellableCallback => {
    let active = true;
    const wrapped = (() => {
      if (active) {
        active = false;
        nextCallbackRef.current = null;
        handler();
      }
    }) as CancellableCallback;
    wrapped.cancel = () => {
      active = false;
    };
    nextCallbackRef.current = wrapped;
    return wrapped;
  }, []);

  const scheduleTransitionEnd = React.useCallback(
    (timeoutValue: number | undefined, handler: () => void) => {
      const done = makeCallback(handler);
      const node = propsRef.current.nodeRef.current;
      const listener = propsRef.current.addEndListener;
      const noTimeoutOrListener = timeoutValue == null && !listener;

      if (!node || noTimeoutOrListener) {
        setTimeout(done, 0);
        return;
      }
      if (listener) {
        // With nodeRef, react-transition-group calls addEndListener(done).
        // Material UI has long supported addEndListener(node, done). Keep both call
        // shapes so existing transition wrappers do not have to change.
        if (listener.length >= 2) {
          (listener as (node: HTMLElement, done: () => void) => void)(node, done);
        } else {
          (listener as (done: () => void) => void)(done);
        }
      }
      if (timeoutValue != null) {
        setTimeout(done, timeoutValue);
      }
    },
    [makeCallback, propsRef],
  );

  const performEnter = React.useCallback(
    (mounting: boolean) => {
      const current = propsRef.current;
      const isAppearing = current.parentGroup ? current.parentGroup.isMounting : mounting;
      isAppearingRef.current = isAppearing;

      // On updates, enter=false skips the enter animation. Move straight to
      // entered; the status effect will call onEntered, but onEnter/onEntering
      // must not fire.
      if (!mounting && !current.enter) {
        statusRef.current = 'entered';
        setStatus('entered');
        return;
      }

      current.onEnter?.(isAppearing);
      statusRef.current = 'entering';
      setStatus('entering');
    },
    [propsRef],
  );

  const performExit = React.useCallback(() => {
    const current = propsRef.current;

    if (!current.exit) {
      statusRef.current = 'exited';
      setStatus('exited');
      return;
    }

    current.onExit?.();
    statusRef.current = 'exiting';
    setStatus('exiting');
  }, [propsRef]);

  const updateStatus = React.useCallback(
    (mounting: boolean, nextStatus: 'entering' | 'exiting' | null) => {
      if (nextStatus !== null) {
        cancelPendingCallback();
        if (nextStatus === 'entering') {
          const current = propsRef.current;
          // If the node was just mounted, read layout before entering so the
          // browser applies the starting styles before the animation begins.
          if (current.mountOnEnter || current.unmountOnExit) {
            const node = current.nodeRef.current;
            if (node) {
              reflow(node);
            }
          }
          performEnter(mounting);
        } else {
          performExit();
        }
      } else if (propsRef.current.unmountOnExit && statusRef.current === 'exited') {
        statusRef.current = 'unmounted';
        setStatus('unmounted');
      }
    },
    [cancelPendingCallback, performEnter, performExit, propsRef],
  );

  // Runs on mount. useEnhancedEffect is needed because the initial appear
  // transition may read layout before paint. In StrictMode development builds,
  // React mounts, cleans up, and mounts again; cleanup cancels pending work and
  // the second mount restarts the same transition.
  useEnhancedEffect(() => {
    mountedRef.current = true;
    if (appearPendingRef.current !== null) {
      updateStatus(true, 'entering');
    }
    return () => {
      mountedRef.current = false;
      cancelPendingCallback();
    };
  }, [cancelPendingCallback, updateStatus]);

  // Reconcile the rendered status after `in` or status changes:
  // - opening from unmounted first renders the child as exited so refs exist.
  // - unmountOnExit removes the child after the exited state commits.
  // This matches react-transition-group's observable status steps without
  // running work after unrelated commits.
  useEnhancedEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    const current = statusRef.current;

    if (inProp) {
      if (current === 'unmounted') {
        // Opening from unmounted needs one render with the child present so
        // refs are attached before the enter animation starts.
        statusRef.current = 'exited';
        setStatus('exited');
      } else if (current !== 'entering' && current !== 'entered') {
        updateStatus(false, 'entering');
      }
    } else if (current === 'entering' || current === 'entered') {
      updateStatus(false, 'exiting');
    } else if (current === 'exited' && unmountOnExit) {
      statusRef.current = 'unmounted';
      setStatus('unmounted');
    }
  }, [inProp, status, unmountOnExit, updateStatus]);

  // Fire lifecycle callbacks for committed status changes. The guard prevents
  // duplicate callbacks in StrictMode; propsRef keeps delayed callbacks fresh.
  useEnhancedEffect(() => {
    // `unmounted` is bookkeeping, not a real transition state. Do not fire
    // callbacks when moving into or out of it; otherwise the first open with
    // mountOnEnter/unmountOnExit would look like a completed exit.
    if (status === 'unmounted' || lastFiredStatusRef.current === 'unmounted') {
      lastFiredStatusRef.current = status;
      return;
    }
    const prev = lastFiredStatusRef.current;
    if (prev === status) {
      return;
    }
    lastFiredStatusRef.current = status;

    const current = propsRef.current;
    if (status === 'entering') {
      current.onEntering?.(isAppearingRef.current);
      const timeouts = resolveTimeouts(current.timeout);
      const enterTimeout = isAppearingRef.current ? timeouts.appear : timeouts.enter;
      scheduleTransitionEnd(enterTimeout, () => {
        statusRef.current = 'entered';
        setStatus('entered');
      });
    } else if (status === 'exiting') {
      current.onExiting?.();
      const timeouts = resolveTimeouts(current.timeout);
      scheduleTransitionEnd(timeouts.exit, () => {
        statusRef.current = 'exited';
        setStatus('exited');
      });
    } else if (status === 'entered') {
      current.onEntered?.(isAppearingRef.current);
    } else if (status === 'exited') {
      current.onExited?.();
    }
  }, [propsRef, scheduleTransitionEnd, status]);

  if (status === 'unmounted') {
    return null;
  }

  // Nested Material UI transitions should not inherit this transition's parent group.
  // A null context keeps an outer TransitionGroup from controlling them.
  return (
    <TransitionGroupContext.Provider value={null}>
      {children(status as RenderedTransitionStatus, childProps)}
    </TransitionGroupContext.Provider>
  );
}

Transition.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  addEndListener: PropTypes.func,
  /**
   * @ignore
   */
  appear: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  enter: PropTypes.bool,
  /**
   * @ignore
   */
  exit: PropTypes.bool,
  /**
   * @ignore
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  mountOnEnter: PropTypes.bool,
  /**
   * @ignore
   */
  nodeRef: PropTypes.shape({
    current: (props, propName) => {
      if (props[propName] == null) {
        return null;
      }
      if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
        return new Error(`Expected prop '${propName}' to be of type Element`);
      }
      return null;
    },
  }).isRequired,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * @ignore
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
  /**
   * @ignore
   */
  unmountOnExit: PropTypes.bool,
} as any;

export default Transition;
export type { InternalTransitionProps, RenderedTransitionStatus };
