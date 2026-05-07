'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  hide,
  arrow,
  detectOverflow,
  Placement,
  Middleware,
} from '@floating-ui/react-dom';
import { useRtl } from '@mui/system/RtlProvider';
import ownerDocument from '@mui/utils/ownerDocument';
import useForkRef from '@mui/utils/useForkRef';
import Portal from '../Portal';
import {
  FloatingPopupProps,
  FloatingPopupChildrenProps,
  VirtualElement,
} from './FloatingPopup.types';

// Adapted from BasePopper.tsx flipPlacement() — flips start/end for RTL
function flipPlacement(placement: Placement, isRtl: boolean): Placement {
  if (!isRtl) {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

// Adapted from BasePopper.tsx isHTMLElement() — local utility
function isHTMLElement(element: HTMLElement | VirtualElement): element is HTMLElement {
  return (element as HTMLElement).nodeType !== undefined;
}

// Custom middleware that computes anchor dimensions and available space,
// returning data via middlewareData (React-friendly) instead of imperative DOM mutation.
const anchorMetrics: Middleware = {
  name: 'anchorMetrics',
  async fn(state) {
    const overflow = await detectOverflow(state);
    const { rects, placement } = state;

    // Snap anchor dimensions to device pixels (from Base UI pattern)
    const dpr = window.devicePixelRatio || 1;
    const { x, y, width, height } = rects.reference;
    const anchorWidth = (Math.round((x + width) * dpr) - Math.round(x * dpr)) / dpr;
    const anchorHeight = (Math.round((y + height) * dpr) - Math.round(y * dpr)) / dpr;

    // Compute available space from overflow on the placement side
    const side = placement.split('-')[0];
    const availableWidth =
      rects.floating.width + Math.max(0, -overflow.left) + Math.max(0, -overflow.right);
    const availableHeight =
      side === 'top' || side === 'bottom'
        ? rects.floating.height + Math.max(0, -overflow[side])
        : rects.floating.height + Math.max(0, -overflow.top) + Math.max(0, -overflow.bottom);

    return {
      data: { anchorWidth, anchorHeight, availableWidth, availableHeight },
    };
  },
};

function buildDefaultMiddleware(): Middleware[] {
  return [offset(0), flip(), shift(), anchorMetrics, hide({ strategy: 'referenceHidden' })];
}

/**
 * FloatingPopup — opt-in replacement for Popper.js-based positioning.
 * Uses @floating-ui/react-dom under the hood.
 *
 * Designed to be used via `slots={{ popper: FloatingPopup }}` on
 * Autocomplete and Tooltip.
 *
 * Demos:
 *
 * - [Autocomplete](https://next.mui.com/material-ui/react-autocomplete/)
 * - [Tooltip](https://next.mui.com/material-ui/react-tooltip/)
 *
 * API:
 *
 * - [FloatingPopup API](https://next.mui.com/material-ui/api/floating-popup/)
 */
const FloatingPopup = React.forwardRef<HTMLDivElement, FloatingPopupProps>(
  function FloatingPopup(inProps, forwardedRef) {
    const {
      anchorEl: anchorElProp,
      open,
      placement: placementProp = 'bottom',
      strategy: strategyProp = 'absolute',
      middleware: middlewareProp,
      transform: transformProp = true,
      children,
      transition = false,
      arrowRef: arrowRefProp,
      arrowPadding = 0,
      disablePortal = false,
      container: containerProp,
      keepMounted = false,
      className,
      style,
      id,
      popperRef: popperRefProp,
      // Root element override (from slotProps.popper.component via useSlot)
      // @ts-ignore — injected by useSlot when slotProps.popper.component is provided
      as: RootComponent = 'div',
      // Destructure and discard Popper.js / useSlot props to prevent DOM leaks
      // @ts-ignore — Popper.js compat
      popperOptions,
      // @ts-ignore — Popper.js compat
      modifiers,
      // @ts-ignore — BasePopper wrapper injects this; we use useRtl() directly
      direction,
      // @ts-ignore — MUI internal from useSlot/appendOwnerState
      ownerState,
      ...other
    } = inProps as FloatingPopupProps & Record<string, any>;

    // Resolve placement — auto* not supported by floating-ui, fall back to 'bottom'
    const safePlacement: Placement =
      typeof placementProp === 'string' && placementProp.startsWith('auto')
        ? 'bottom'
        : placementProp;

    const hasWarnedAutoPlacement = React.useRef(false);
    if (process.env.NODE_ENV !== 'production') {
      if (safePlacement !== placementProp && !hasWarnedAutoPlacement.current) {
        hasWarnedAutoPlacement.current = true;
        console.warn(
          'FloatingPopup: "auto" placement is not supported. ' +
            'Use the autoPlacement() middleware instead. Falling back to "bottom".',
        );
      }
    }

    // RTL — handled internally, no direction prop needed
    const isRtl = useRtl();
    const rtlPlacement = flipPlacement(safePlacement, isRtl);

    // Resolve anchorEl (function or element)
    const resolvedAnchorEl = typeof anchorElProp === 'function' ? anchorElProp() : anchorElProp;

    // Build middleware — arrow() uses Derivable pattern to read RefObject.current lazily
    const middleware = React.useMemo(() => {
      const stack = middlewareProp ? [...middlewareProp] : buildDefaultMiddleware();
      // Always append arrow() when arrowRef is present, even with custom middleware.
      // The arrow is a parent concern (e.g. Tooltip's ArrowSlot), not a middleware concern —
      // users passing custom middleware shouldn't need to know about arrow positioning.
      if (arrowRefProp) {
        // arrow(() => ...) is a Derivable — evaluated on every positioning computation,
        // not at middleware creation time. This avoids stale closure when arrowRef is a RefObject
        // (referentially stable, .current changes after mount without triggering useMemo).
        stack.push(
          arrow(() => ({
            element: ('current' in arrowRefProp ? arrowRefProp.current : arrowRefProp) as Element,
            padding: arrowPadding,
          })),
        );
      }
      return stack;
    }, [middlewareProp, arrowRefProp, arrowPadding]);

    // Core positioning
    const {
      refs,
      floatingStyles,
      placement: computedPlacement,
      middlewareData,
      isPositioned,
      update,
    } = useFloating({
      elements: { reference: resolvedAnchorEl as Element | null },
      placement: rtlPlacement,
      strategy: strategyProp,
      middleware,
      transform: transformProp,
      whileElementsMounted: autoUpdate,
    });

    // Merge forwardedRef with floating-ui's setFloating ref
    const mergedRef = useForkRef(refs.setFloating, forwardedRef);

    // Imperative handle — exposes .update() for followCursor compat
    React.useImperativeHandle(popperRefProp, () => ({ update }), [update]);

    // Force recomputation when RefObject.current becomes available (before first paint).
    // No dep array — RefObject is referentially stable so deps can't track .current changes.
    // update() is cheap (one computePosition call) and idempotent.
    React.useLayoutEffect(() => {
      if (
        arrowRefProp &&
        typeof arrowRefProp === 'object' &&
        'current' in arrowRefProp &&
        arrowRefProp.current
      ) {
        update();
      }
    });

    // Apply arrow styles imperatively to the arrow DOM element (same approach as Popper.js's
    // arrow modifier, which writes styles directly). This is necessary because the arrow element
    // is rendered by the parent (e.g. Tooltip's ArrowSlot), not by FloatingPopup's render prop.
    React.useLayoutEffect(() => {
      const arrowElement =
        arrowRefProp && typeof arrowRefProp === 'object' && 'current' in arrowRefProp
          ? arrowRefProp.current
          : (arrowRefProp as HTMLElement | null);
      if (!arrowElement || !middlewareData.arrow) {
        return;
      }
      const { x, y } = middlewareData.arrow;
      Object.assign(arrowElement.style, {
        left: x != null ? `${x}px` : '',
        top: y != null ? `${y}px` : '',
        position: 'absolute',
      });
    }, [arrowRefProp, middlewareData.arrow]);

    // Transition state (same pattern as BasePopper)
    const [exited, setExited] = React.useState(true);
    const handleEnter = () => setExited(false);
    const handleExited = () => setExited(true);

    if (!keepMounted && !open && (!transition || exited)) {
      return null;
    }

    const display = !open && keepMounted && (!transition || exited) ? 'none' : undefined;
    const anchorHidden = Boolean(middlewareData.hide?.referenceHidden);
    const metrics = middlewareData.anchorMetrics as
      | {
          anchorWidth: number;
          anchorHeight: number;
          availableWidth: number;
          availableHeight: number;
        }
      | undefined;
    const arrowStyles: React.CSSProperties = {
      position: 'absolute',
      top: middlewareData.arrow?.y,
      left: middlewareData.arrow?.x,
    };

    const childrenProps: FloatingPopupChildrenProps = {
      placement: computedPlacement,
      ...(transition && {
        TransitionProps: {
          in: open,
          onEnter: handleEnter,
          onExited: handleExited,
        },
      }),
      arrowStyles,
      anchorHidden,
      isPositioned,
    };

    // Resolve Portal container (isHTMLElement matches BasePopper pattern)
    const container =
      containerProp ||
      (resolvedAnchorEl && isHTMLElement(resolvedAnchorEl as HTMLElement | VirtualElement)
        ? ownerDocument(resolvedAnchorEl as HTMLElement).body
        : ownerDocument(null).body);

    return (
      <Portal disablePortal={disablePortal} container={container}>
        <RootComponent
          ref={mergedRef}
          data-popper-placement={computedPlacement}
          {...(anchorHidden && { 'data-anchor-hidden': '' })}
          className={className}
          style={
            {
              ...floatingStyles,
              display,
              visibility: isPositioned ? undefined : ('hidden' as const),
              ...(metrics && {
                '--anchor-width': `${metrics.anchorWidth}px`,
                '--anchor-height': `${metrics.anchorHeight}px`,
                '--available-width': `${metrics.availableWidth}px`,
                '--available-height': `${metrics.availableHeight}px`,
              }),
              ...style,
            } as React.CSSProperties
          }
          id={id}
          {...other}
        >
          {typeof children === 'function' ? children(childrenProps) : children}
        </RootComponent>
      </Portal>
    );
  },
);

FloatingPopup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  anchorEl: PropTypes.oneOfType([
    (props, propName) => {
      if (props[propName] == null) {
        return new Error(`Prop '${propName}' is required but wasn't specified`);
      }
      if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
        return new Error(`Expected prop '${propName}' to be of type Element`);
      }
      return null;
    },
    PropTypes.func,
    PropTypes.shape({
      getBoundingClientRect: PropTypes.func.isRequired,
    }),
  ]),
  /**
   * @ignore
   */
  arrowPadding: PropTypes.number,
  /**
   * The arrow element to position. Preferred: pass the element from `useState`.
   * Also works: `RefObject` (resolved lazily via Derivable pattern + useLayoutEffect).
   */
  arrowRef: PropTypes.oneOfType([
    (props, propName) => {
      if (props[propName] == null) {
        return new Error(`Prop '${propName}' is required but wasn't specified`);
      }
      if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
        return new Error(`Expected prop '${propName}' to be of type Element`);
      }
      return null;
    },
    PropTypes.shape({
      current: (props, propName) => {
        if (props[propName] == null) {
          return null;
        }
        if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
          return new Error(`Expected prop '${propName}' to be of type Element`);
        }
        return null;
      },
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.number,
    PropTypes.shape({
      '__@toStringTag@4090': PropTypes.oneOf(['BigInt']).isRequired,
      toLocaleString: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      valueOf: PropTypes.func.isRequired,
    }),
    PropTypes.shape({
      '__@iterator@3853': PropTypes.func.isRequired,
    }),
    PropTypes.shape({
      children: PropTypes.node,
      key: PropTypes.string,
      props: PropTypes.any.isRequired,
      type: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    }),
    PropTypes.shape({
      '__@toStringTag@4090': PropTypes.string.isRequired,
      catch: PropTypes.func.isRequired,
      finally: PropTypes.func.isRequired,
      then: PropTypes.func.isRequired,
    }),
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * @ignore
   */
  container: PropTypes.oneOfType([
    (props, propName) => {
      if (props[propName] == null) {
        return new Error(`Prop '${propName}' is required but wasn't specified`);
      }
      if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
        return new Error(`Expected prop '${propName}' to be of type Element`);
      }
      return null;
    },
    PropTypes.func,
  ]),
  /**
   * @ignore
   */
  disablePortal: PropTypes.bool,
  /**
   * @ignore
   */
  keepMounted: PropTypes.bool,
  /**
   * @ignore
   */
  middleware: PropTypes.arrayOf(
    PropTypes.shape({
      fn: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      options: PropTypes.any,
    }),
  ),
  /**
   * @ignore
   */
  open: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * @ignore
   */
  popperRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        update: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  strategy: PropTypes.oneOf(['absolute', 'fixed']),
  /**
   * @ignore
   */
  transform: PropTypes.bool,
  /**
   * @ignore
   */
  transition: PropTypes.bool,
} as any;

export default FloatingPopup;
