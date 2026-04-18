/// <reference path="./react-transition-group.d.ts" />
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useValueAsRef from '@mui/utils/useValueAsRef';
// Read-only bridge for RTG's TransitionGroup interop. The 68-byte context
// module has no heavy runtime — full RTG Transition/TransitionGroup stay out
// of the bundle.
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

  // RTG context bridge — two independent values:
  //   shouldEnterOnMount: whether to run the enter animation on initial mount
  //   isAppearing: value passed to enter callbacks (computed in performEnter)
  // A child added to a running RTG TransitionGroup still enters, but its
  // callbacks receive isAppearing=false because the parent already mounted.
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
  // Tracks the last status we fired lifecycle callbacks for — lets the
  // status-reactive effect dedupe against StrictMode's double-invocation.
  const lastFiredStatusRef = React.useRef<InternalStatus>(status);
  // Captured isAppearing for the currently-running enter transition. Saved
  // synchronously in performEnter so the status-reactive effect can read the
  // right value when it eventually fires onEntering/onEntered.
  const isAppearingRef = React.useRef(false);

  // Keep latest prop callbacks accessible from long-lived closures (scheduled
  // setTimeouts can fire well after props change).
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

  const cancelPendingCallback = () => {
    if (nextCallbackRef.current !== null) {
      nextCallbackRef.current.cancel();
      nextCallbackRef.current = null;
    }
  };

  const makeCallback = (handler: () => void): CancellableCallback => {
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
  };

  const scheduleTransitionEnd = (timeoutValue: number | undefined, handler: () => void) => {
    const done = makeCallback(handler);
    const node = propsRef.current.nodeRef.current;
    const listener = propsRef.current.addEndListener;
    const noTimeoutOrListener = timeoutValue == null && !listener;

    if (!node || noTimeoutOrListener) {
      setTimeout(done, 0);
      return;
    }
    if (listener) {
      // RTG calls addEndListener(done) when nodeRef is used, but MUI still
      // supports the direct consumer shape addEndListener(node, done). The
      // arity check preserves both contracts without changing the wrappers in
      // Fade/Grow/Slide/Zoom/Collapse.
      if (listener.length >= 2) {
        (listener as (node: HTMLElement, done: () => void) => void)(node, done);
      } else {
        (listener as (done: () => void) => void)(done);
      }
    }
    if (timeoutValue != null) {
      setTimeout(done, timeoutValue);
    }
  };

  const performEnter = (mounting: boolean) => {
    const current = propsRef.current;
    const isAppearing = current.parentGroup ? current.parentGroup.isMounting : mounting;
    isAppearingRef.current = isAppearing;

    // Skip animation on updates (not mount) when enter=false. Matches RTG:
    // `(!mounting && !enter) || config.disabled`. onEnter does not fire in
    // this branch — only the terminal onEntered (via the status effect).
    if (!mounting && !current.enter) {
      statusRef.current = 'entered';
      setStatus('entered');
      return;
    }

    current.onEnter?.(isAppearing);
    statusRef.current = 'entering';
    setStatus('entering');
  };

  const performExit = () => {
    const current = propsRef.current;

    if (!current.exit) {
      statusRef.current = 'exited';
      setStatus('exited');
      return;
    }

    current.onExit?.();
    statusRef.current = 'exiting';
    setStatus('exiting');
  };

  const updateStatus = (mounting: boolean, nextStatus: 'entering' | 'exiting' | null) => {
    if (nextStatus !== null) {
      cancelPendingCallback();
      if (nextStatus === 'entering') {
        const current = propsRef.current;
        // Forced reflow separates the mount-render from the entering-render
        // so CSS transitions run on nodes that just became visible.
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
  };

  // Mount effect — useEnhancedEffect is required here because the initial
  // appear transition can force reflow and must happen before paint. Kept
  // re-runnable for StrictMode's double-mount: the cleanup cancels the
  // pending callback, then the second mount replays the same enter from the
  // same start state.
  useEnhancedEffect(() => {
    mountedRef.current = true;
    if (appearPendingRef.current !== null) {
      updateStatus(true, 'entering');
    }
    return () => {
      mountedRef.current = false;
      cancelPendingCallback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // In-change / status-reconciliation effect — mirrors RTG's componentDidUpdate
  // plus getDerivedStateFromProps. Runs after every commit past the initial
  // mount; drives the state machine based on current inProp + status.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally runs after every commit; `statusRef`/`updateStatus` read via refs
  useEnhancedEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    const current = statusRef.current;

    if (inProp) {
      if (current === 'unmounted') {
        // RTG's getDerivedStateFromProps pre-step: render the node at 'exited'
        // before starting the enter animation so onEnter gets a live nodeRef.
        statusRef.current = 'exited';
        setStatus('exited');
      } else if (current !== 'entering' && current !== 'entered') {
        updateStatus(false, 'entering');
      }
    } else if (current === 'entering' || current === 'entered') {
      updateStatus(false, 'exiting');
    } else if (current === 'exited' && propsRef.current.unmountOnExit) {
      statusRef.current = 'unmounted';
      setStatus('unmounted');
    }
  });

  // Status-reactive lifecycle effect — fires the lifecycle callback for each
  // committed status change. The lastFiredStatusRef guard dedupes StrictMode's
  // double-invocation so onEntering/onExiting/onEntered/onExited fire once
  // per real status transition even though effects run twice.
  useEnhancedEffect(() => {
    // Transitions into or out of 'unmounted' are synthetic setup hops
    // (RTG does these in getDerivedStateFromProps). Sync the ref but do
    // not fire any lifecycle callback — otherwise opening a component with
    // mountOnEnter/unmountOnExit would emit onExited before the enter.
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
  });

  if (status === 'unmounted') {
    return null;
  }

  // Clear the RTG TransitionGroupContext for descendants so nested MUI
  // transitions don't inherit the outer group's mount state. Matches RTG's
  // own `<TransitionGroupContext.Provider value={null}>` render wrapper.
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
