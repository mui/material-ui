'use client';
import * as React from 'react';
import ownerDocument from '@mui/utils/ownerDocument';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useId from '@mui/utils/useId';
import type { PopperPlacementType, PopperProps } from '../Popper';
import { warnMenu2DuplicateValue } from './menu2Utils';

export interface UseMenu2ItemPopoverOptions {
  /**
   * The id of the popover surface. The hook generates one when you omit it.
   */
  id?: string | undefined;
}

/**
 * The handlers that the caller adds to the same item. `getItemProps` runs each
 * of them first, then runs its own, so both handlers run.
 */
export interface UseMenu2ItemPopoverItemHandlers {
  onBlur?: React.FocusEventHandler<HTMLElement> | undefined;
  onFocus?: React.FocusEventHandler<HTMLElement> | undefined;
  onMouseEnter?: React.MouseEventHandler<HTMLElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLElement> | undefined;
}

/**
 * The props for one menu item. `aria-describedby` names the popover on the
 * active item, and is `undefined` on every other item.
 */
export interface UseMenu2ItemPopoverItemProps extends Required<UseMenu2ItemPopoverItemHandlers> {
  'aria-describedby': string | undefined;
}

export interface UseMenu2ItemPopoverPopoverProps {
  anchorEl: HTMLElement | null;
  id: string | undefined;
  modifiers: PopperProps['modifiers'];
  open: boolean;
  placement: PopperPlacementType;
  style: React.CSSProperties;
}

export interface UseMenu2ItemPopoverPopover<Value> {
  /**
   * `true` while an item owns the popover and the menu around it stands still.
   * It stays `false` while the menu runs its open animation, so the popover
   * paints its first frame at the position of the settled menu.
   */
  open: boolean;
  /**
   * The props to spread on a `Popper`. Spread them first, then override.
   */
  props: UseMenu2ItemPopoverPopoverProps;
  /**
   * The value of the item that owns the popover.
   */
  value: Value | null;
}

export interface UseMenu2ItemPopoverReturnValue<Value> {
  /**
   * Closes the popover. Wire it to the `onOpenChange` of the menu.
   */
  close: () => void;
  /**
   * Returns the props for one menu item. `value` must identify the item, the
   * same rule that React applies to `key`, because the hook gives
   * `aria-describedby` to the item whose value is the active one. Pass the
   * handlers of the caller in `handlers`, so that the item keeps them. Spread
   * the props first: an `aria-describedby` that the caller writes after the
   * spread replaces the one of the hook.
   */
  getItemProps: (
    value: Value,
    handlers?: UseMenu2ItemPopoverItemHandlers,
  ) => UseMenu2ItemPopoverItemProps;
  /**
   * The state of the shared popover.
   */
  popover: UseMenu2ItemPopoverPopover<Value>;
}

interface ActiveMenu2Item<Value> {
  anchorEl: HTMLElement;
  /**
   * `false` while an ancestor of the item still moves. The popover waits,
   * because Popper measures the item once and keeps that position.
   */
  ready: boolean;
  value: Value;
}

const placement: PopperPlacementType = 'right-start';

// The card sits beside the item, and keeps a gap to the edge of the viewport.
const modifiers: PopperProps['modifiers'] = [
  { name: 'offset', options: { offset: [0, 8] } },
  { name: 'preventOverflow', options: { padding: 8 } },
];

// Material UI has no preview card primitive, so the card is made
// non-interactive here instead of by each caller. The style is inline, because
// the `sx` of the caller must not remove it.
const nonInteractiveStyle: React.CSSProperties = { pointerEvents: 'none' };

// Base UI sets this attribute on a popup that has not started its open
// animation yet, so no animation object exists on the element at that moment.
const startingStyleAttribute = 'data-starting-style';

// A transition of one of these properties leaves the element where it is, so
// the popover does not wait for it. The menu fades for 225ms but stops moving
// after its 150ms transform, and the card is placed, not painted, by the fade.
// The list is a deny list on purpose: an unknown property, and a keyframe
// animation that names no single property, counts as movement.
const staticTransitionProperties = new Set([
  'background-color',
  'border-bottom-color',
  'border-left-color',
  'border-right-color',
  'border-top-color',
  'box-shadow',
  'color',
  'fill',
  'opacity',
  'stroke',
  'visibility',
]);

/**
 * Returns the ancestors of the item below the body, where a page level
 * animation cannot block the popover.
 */
function getAnchorAncestors(anchorEl: HTMLElement): HTMLElement[] {
  const body = ownerDocument(anchorEl).body;
  const ancestors: HTMLElement[] = [];

  for (
    let node = anchorEl.parentElement;
    node !== null && node !== body;
    node = node.parentElement
  ) {
    ancestors.push(node);
  }

  return ancestors;
}

// The card opens after this long even when an ancestor keeps moving. The menu
// moves for 150ms, so a real menu open always settles well before the deadline.
const maxAnchorWait = 500;

/**
 * Reports whether an animation still reaches an end on its own. An animation
 * that never ends must not hold the card back, because the wait would never
 * finish.
 */
function endsOnItsOwn(animation: Animation): boolean {
  // `idle`, `paused` and `finished` all hold the element still, and nothing
  // promises that a paused or an idle animation ever runs again.
  if (animation.playState !== 'running') {
    return false;
  }
  // A stopped clock never advances the animation to its end.
  if (animation.playbackRate === 0) {
    return false;
  }
  const endTime = animation.effect?.getComputedTiming().endTime;
  // An animation that repeats for ever has an infinite end time.
  return typeof endTime !== 'number' || Number.isFinite(endTime);
}

// Returns every running animation that can move one of the ancestors.
function getMovingAnimations(ancestors: HTMLElement[]): Animation[] {
  const animations: Animation[] = [];

  ancestors.forEach((node) => {
    if (typeof node.getAnimations !== 'function') {
      return;
    }
    node.getAnimations().forEach((animation) => {
      if (!endsOnItsOwn(animation)) {
        return;
      }

      const { transitionProperty } = animation as Partial<CSSTransition>;
      if (transitionProperty === undefined || !staticTransitionProperties.has(transitionProperty)) {
        animations.push(animation);
      }
    });
  });

  return animations;
}

function hasStartingStyle(ancestors: HTMLElement[]): boolean {
  return ancestors.some((node) => node.hasAttribute(startingStyleAttribute));
}

/**
 * Reports whether every ancestor of the item stands still. A menu scales its
 * popup while it opens, which moves each item, so a popover that opens then
 * keeps a position inside the settled menu.
 */
function isAnchorSettled(anchorEl: HTMLElement): boolean {
  const ancestors = getAnchorAncestors(anchorEl);
  return !hasStartingStyle(ancestors) && getMovingAnimations(ancestors).length === 0;
}

/**
 * Calls `onSettled` once every ancestor of the item stands still, and returns a
 * function that stops the wait.
 *
 * The check runs once per frame instead of on `Animation.finished`, because an
 * animation can pause, stop its clock or repeat for ever, and its `finished`
 * promise then never settles. A frame also covers the replacement that the
 * browser starts for a transition it cancels, and the moment a delayed
 * transition starts. The deadline covers the rest: a frame never arrives on a
 * hidden page, and an ancestor animation can outlast the menu.
 */
function waitForAnchor(anchorEl: HTMLElement, onSettled: () => void): () => void {
  const view = ownerDocument(anchorEl).defaultView ?? window;
  let frame = 0;
  let timer = 0;
  let done = false;

  function stop() {
    done = true;
    view.cancelAnimationFrame(frame);
    view.clearTimeout(timer);
  }

  function finish() {
    if (!done) {
      stop();
      onSettled();
    }
  }

  function poll() {
    if (isAnchorSettled(anchorEl)) {
      finish();
      return;
    }
    frame = view.requestAnimationFrame(poll);
  }

  timer = view.setTimeout(finish, maxAnchorWait);
  poll();

  return stop;
}

/**
 * Shares one `Popper` between the items of a `Menu2`. The item that has focus,
 * or that the pointer is over, owns the popover and describes it.
 *
 * `popover.props` targets a
 * [`Popper`](https://mui.com/material-ui/react-popper/), not a `Popover`. A
 * `Popover` renders a `Modal`, and the modal sets `aria-hidden` on every
 * sibling of the popup. The `role="menu"` subtree of `Menu2` is a sibling, so
 * the items leave the accessibility tree and the description is never
 * announced. `Tooltip` uses `Popper` for the same reason. `Popper` has no
 * Paper, so the caller renders one.
 *
 * An interactive mode would arrive as `{ interactive: true }` in the options. It
 * would drop `nonInteractiveStyle`, and add open and close delays plus a hover
 * bridge. It would also drop `aria-describedby`, because interactive content
 * cannot be an accessible description.
 *
 * @example
 * const { getItemProps, popover, close } = useMenu2ItemPopover<Item>();
 * <Menu2Item {...getItemProps(item, { onFocus: handleFocus })}>{item.label}</Menu2Item>
 * <Popper {...popover.props}><Paper>{popover.value?.description}</Paper></Popper>
 *
 * @param options The options of the popover.
 */
export default function useMenu2ItemPopover<Value>(
  options: UseMenu2ItemPopoverOptions = {},
): UseMenu2ItemPopoverReturnValue<Value> {
  const id = useId(options.id);
  const [activeItem, setActiveItem] = React.useState<ActiveMenu2Item<Value> | null>(null);
  const anchorEl = activeItem === null ? null : activeItem.anchorEl;
  const open = activeItem !== null && activeItem.ready;

  const close = React.useCallback(() => {
    setActiveItem(null);
  }, []);

  // An item that activates while the menu opens holds the popover closed, so
  // the Popper paints nothing. Open it as soon as the menu stops moving.
  useEnhancedEffect(() => {
    if (activeItem === null || activeItem.ready) {
      return undefined;
    }

    const { anchorEl: pendingAnchorEl } = activeItem;

    return waitForAnchor(pendingAnchorEl, () => {
      setActiveItem((current) =>
        current !== null && current.anchorEl === pendingAnchorEl && !current.ready
          ? { ...current, ready: true }
          : current,
      );
    });
  }, [activeItem]);

  // A menu unmounts the active item without an event, for example when a
  // submenu closes. The popover then has no owner, so it closes.
  useEnhancedEffect(() => {
    if (anchorEl === null) {
      return undefined;
    }

    if (!anchorEl.isConnected) {
      close();
      return undefined;
    }

    const observer = new MutationObserver(() => {
      if (!anchorEl.isConnected) {
        close();
      }
    });
    observer.observe(ownerDocument(anchorEl), { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [anchorEl, close]);

  // The rendered result is the only reliable place to see a shared value: the
  // items can render in any component, so counting the calls gives false alarms.
  useEnhancedEffect(() => {
    if (process.env.NODE_ENV === 'production' || anchorEl === null || id === undefined) {
      return;
    }

    if (ownerDocument(anchorEl).querySelectorAll(`[aria-describedby="${id}"]`).length > 1) {
      warnMenu2DuplicateValue('useMenu2ItemPopover');
    }
  }, [anchorEl, id, open]);

  const getItemProps = (
    value: Value,
    handlers: UseMenu2ItemPopoverItemHandlers = {},
  ): UseMenu2ItemPopoverItemProps => {
    const activate = (event: React.SyntheticEvent<HTMLElement>) => {
      const element = event.currentTarget;
      setActiveItem({ anchorEl: element, ready: isAnchorSettled(element), value });
    };

    // Only the item that owns the popover clears it, so the pointer and the
    // keyboard can hand the popover to another item without closing it.
    const deactivate = (event: React.SyntheticEvent<HTMLElement>) => {
      const element = event.currentTarget;
      setActiveItem((current) =>
        current !== null && current.anchorEl === element ? null : current,
      );
    };

    return {
      // Not gated on `ready`: a screen reader announces the item when it takes
      // focus, so a description that arrives with the paint arrives too late.
      'aria-describedby':
        activeItem !== null && Object.is(activeItem.value, value) ? id : undefined,
      onBlur: (event) => {
        handlers.onBlur?.(event);
        deactivate(event);
      },
      onFocus: (event) => {
        handlers.onFocus?.(event);
        activate(event);
      },
      onMouseEnter: (event) => {
        handlers.onMouseEnter?.(event);
        activate(event);
      },
      onMouseLeave: (event) => {
        handlers.onMouseLeave?.(event);
        deactivate(event);
      },
    };
  };

  const popover = React.useMemo<UseMenu2ItemPopoverPopover<Value>>(
    () => ({
      open,
      props: {
        anchorEl,
        id,
        modifiers,
        open,
        placement,
        style: nonInteractiveStyle,
      },
      value: activeItem === null ? null : activeItem.value,
    }),
    [activeItem, anchorEl, id, open],
  );

  return { close, getItemProps, popover };
}
