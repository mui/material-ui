import * as React from 'react';

/**
 * Selector for the first highlighted or focus frame — the content the user
 * cares about. Anchoring to this keeps the focused code visually stable
 * in both expand and collapse directions.
 */
const ANCHOR_SELECTOR = ['[data-frame-type="highlighted"]', '[data-frame-type="focus"]'].join(', ');

/**
 * Whether the browser supports `interpolate-size: allow-keywords` —
 * determines which CSS transition path is active and thus how long
 * the rAF loop needs to run.
 *
 * - Enhanced: 300ms for both expand and collapse
 * - Fallback: 300ms collapse, 1500ms expand (max-height)
 */
const supportsInterpolateSize =
  typeof CSS !== 'undefined' && CSS.supports('interpolate-size', 'allow-keywords');

function getTransitionTimeout(direction: 'collapse' | 'expand'): number {
  if (supportsInterpolateSize) {
    // @supports path: height 0.3s ease in both directions
    return 350;
  }
  // Fallback path: max-height 0.3s collapse, 1.5s expand
  return direction === 'collapse' ? 350 : 1550;
}

const GUTTER_STATE_ATTRIBUTE = 'data-scrollbar-gutter';
const gutterCleanupTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout> | Animation>();
const gutterFlipTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();
const scrollbackAnimations = new WeakMap<HTMLElement, Animation>();

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/**
 * Schedules `callback` to run after `duration` ms on the browser's animation
 * timeline (via a no-op WAAPI animation), so DevTools' animation speed slider
 * scales the delay in step with CSS transitions. Falls back to `setTimeout`
 * when WAAPI isn't available.
 *
 * Returns the `Animation` (or timer id) so callers can cancel it. Cancelling
 * the returned `Animation` does NOT invoke `callback` (the rejected
 * `finished` promise is swallowed), matching `clearTimeout` semantics.
 */
function scheduleOnAnimationTimeline(
  target: HTMLElement,
  duration: number,
  callback: () => void,
): Animation | ReturnType<typeof setTimeout> {
  if (typeof target.animate === 'function') {
    const anim = target.animate([{ opacity: 1 }, { opacity: 1 }], { duration, fill: 'none' });
    anim.finished.then(callback, () => {
      // Swallow rejection from `Animation.cancel()` so cancelling the schedule
      // doesn't fire the cleanup callback (which would otherwise stomp on a
      // freshly-registered next-state cleanup).
    });
    return anim;
  }
  return setTimeout(callback, duration);
}

function cancelScheduled(handle: Animation | ReturnType<typeof setTimeout> | undefined) {
  if (handle === undefined) {
    return;
  }
  // Guard the `instanceof` so we don't throw a `ReferenceError` in browsers
  // that lack WAAPI (where `scheduleOnAnimationTimeline` falls back to
  // `setTimeout` and `Animation` is undefined as a global).
  if (typeof Animation !== 'undefined' && handle instanceof Animation) {
    handle.cancel();
  } else {
    clearTimeout(handle as ReturnType<typeof setTimeout>);
  }
}

/**
 * Smoothly slides the `<code>` element back to the left edge over `duration`
 * ms using an ease-out cubic via the Web Animations API.
 *
 * Used during collapse instead of tweening `pre.scrollLeft` because the
 * scrollbar-gutter animation forces `overflow-x: hidden` on the pre, which
 * snaps `scrollLeft` to 0 instantly. Animating a transform on the inner
 * `code` element produces the same visual effect, isn't reset by the overflow
 * change, and is naturally clipped by the pre's hidden overflow. Driving it
 * through `Element.animate` keeps the styles off the element's `style`
 * attribute and runs on the compositor, so it doesn't fight the existing
 * CSS transitions on `code` (e.g. `margin-bottom`).
 *
 * Honors `prefers-reduced-motion` by snapping immediately.
 */
function smoothCollapseScrollLeft(pre: HTMLElement, duration: number): Animation | null {
  const startLeft = pre.scrollLeft;
  if (startLeft <= 0) {
    return null;
  }
  const code = pre.querySelector<HTMLElement>('code');
  if (!code || typeof code.animate !== 'function') {
    return null;
  }

  // Cancel any leftover scroll-back animation from a previous toggle so we
  // don't end up with two transforms competing on the same element.
  scrollbackAnimations.get(pre)?.cancel();
  scrollbackAnimations.delete(pre);

  // Reset the actual scroll position now; the WAAPI animation visually
  // compensates by translating the element from `-startLeft` back to `0`.
  pre.scrollLeft = 0;

  if (prefersReducedMotion() || duration <= 0) {
    return null;
  }

  const anim = code.animate(
    [{ transform: `translateX(${-startLeft}px)` }, { transform: 'translateX(0)' }],
    {
      duration,
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      fill: 'none',
    },
  );
  scrollbackAnimations.set(pre, anim);
  const onSettle = () => {
    if (scrollbackAnimations.get(pre) === anim) {
      scrollbackAnimations.delete(pre);
    }
  };
  anim.finished.then(onSettle, onSettle);
  return anim;
}

function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

/**
 * Measures the horizontal scrollbar height of a `<pre>` element by
 * temporarily forcing `overflow-x: scroll`.
 */
function measureScrollbarHeight(pre: HTMLElement): number {
  const prevOverflow = pre.style.overflowX;
  pre.style.overflowX = 'scroll';
  const scrollbarHeight = pre.offsetHeight - pre.clientHeight;
  pre.style.overflowX = prevOverflow;
  return scrollbarHeight;
}

function clearGutterState(pre: HTMLElement) {
  cancelScheduled(gutterCleanupTimers.get(pre));
  gutterCleanupTimers.delete(pre);
  const flipTimer = gutterFlipTimers.get(pre);
  if (flipTimer !== undefined) {
    clearTimeout(flipTimer);
    gutterFlipTimers.delete(pre);
  }
  pre.removeAttribute(GUTTER_STATE_ATTRIBUTE);
}

/**
 * Cancels every animation and timer associated with `pre` (scroll-back
 * transform, gutter cleanup, gutter from→to flip). Used on hook unmount so
 * we don't leave WAAPI animations or pending callbacks pointing at a node
 * that's been removed from the document.
 */
function cancelAllForPre(pre: HTMLElement) {
  scrollbackAnimations.get(pre)?.cancel();
  scrollbackAnimations.delete(pre);
  clearGutterState(pre);
}

/**
 * Smoothly transitions the horizontal scrollbar gutter on collapse by
 * swapping the real scrollbar for equivalent padding-bottom, then
 * animating that padding down to the CSS base value.
 *
 * Skips the animation when content doesn't overflow (no scrollbar exists)
 * or when the browser uses overlay scrollbars (zero height).
 */
function animateScrollbarGutter(pre: HTMLElement) {
  const scrollbarHeight = measureScrollbarHeight(pre);
  if (scrollbarHeight === 0) {
    return; // Overlay scrollbars, nothing to do
  }

  // Only animate if content actually overflows (scrollbar is visible)
  if (pre.scrollWidth <= pre.clientWidth) {
    return;
  }

  clearGutterState(pre);
  pre.setAttribute(GUTTER_STATE_ATTRIBUTE, 'collapse-from');

  // Move into the transition state on the next macrotask. Tracked so the
  // flip can be cancelled if the component unmounts before it fires.
  const flipTimer = setTimeout(() => {
    gutterFlipTimers.delete(pre);
    pre.setAttribute(GUTTER_STATE_ATTRIBUTE, 'collapse-to');
  }, 0);
  gutterFlipTimers.set(pre, flipTimer);

  // Schedule cleanup on the animation timeline so DevTools throttling
  // scales it together with the CSS `margin-bottom` transition that's
  // doing the actual gutter shrink.
  const timeout = getTransitionTimeout('collapse');
  const cleanup = scheduleOnAnimationTimeline(pre, timeout + 30, () => {
    clearGutterState(pre);
  });
  gutterCleanupTimers.set(pre, cleanup);
}

/**
 * Smoothly transitions the horizontal scrollbar gutter on expand by
 * reserving the eventual scrollbar space via padding-bottom first,
 * then letting CSS swap to real overflow-x at the end of the transition.
 *
 * This is primarily needed for the max-size split-frame case where hidden
 * overflow lines can make the scrollbar appear late during expansion.
 */
function animateScrollbarGutterExpand(pre: HTMLElement) {
  const scrollbarHeight = measureScrollbarHeight(pre);
  if (scrollbarHeight === 0) {
    return; // Overlay scrollbars, nothing to do
  }

  // The <code> element uses `min-width: fit-content`, so its scrollWidth
  // reflects the widest line including hidden frames. If that doesn't
  // exceed the container, no scrollbar will appear after expansion.
  const code = pre.querySelector('code');
  if (code && code.scrollWidth <= pre.clientWidth) {
    return;
  }

  clearGutterState(pre);
  pre.setAttribute(GUTTER_STATE_ATTRIBUTE, 'expand-from');

  // Move into the transition state on the next macrotask. Tracked so the
  // flip can be cancelled if the component unmounts before it fires.
  const flipTimer = setTimeout(() => {
    gutterFlipTimers.delete(pre);
    pre.setAttribute(GUTTER_STATE_ATTRIBUTE, 'expand-to');
  }, 0);
  gutterFlipTimers.set(pre, flipTimer);

  // Schedule cleanup on the animation timeline so the `overflow-x` flip back
  // to `auto` lines up with the CSS `margin-bottom` and height transitions
  // even when DevTools throttles animation speed.
  const timeout = getTransitionTimeout('expand');
  const cleanup = scheduleOnAnimationTimeline(pre, timeout + 30, () => {
    clearGutterState(pre);
  });
  gutterCleanupTimers.set(pre, cleanup);
}

export default function useScrollAnchor() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLLabelElement>(null);
  // Tracks the cleanup for the currently in-flight `anchorScroll` call so a
  // new toggle (or unmount) can abort it cleanly instead of leaving a
  // ResizeObserver and window listeners holding references to detached
  // nodes.
  const activeSessionCleanupRef = React.useRef<(() => void) | null>(null);
  // Tracks the most recently animated `<pre>` so unmount can cancel any
  // running scroll-back / gutter animations on it. Captured here because
  // `containerRef.current` may already be null by the time the effect
  // cleanup runs.
  const lastPreRef = React.useRef<HTMLElement | null>(null);

  // CSS `overflow-anchor: none` on hidden frames (set in CSS) nudges native
  // scroll anchoring toward the visible highlighted/focus content. In Chromium
  // and Firefox this usually handles most compensation synchronously, while the
  // ResizeObserver below smooths any remaining drift so the transition appears
  // stable and visually "fixed" to the user. In browsers without native
  // overflow-anchor support (e.g. Safari), the observer is the primary
  // compensation mechanism.

  React.useEffect(() => {
    return () => {
      activeSessionCleanupRef.current?.();
      activeSessionCleanupRef.current = null;
      const pre = lastPreRef.current;
      if (pre) {
        cancelAllForPre(pre);
        lastPreRef.current = null;
      }
    };
  }, []);

  const anchorScroll = React.useCallback((direction: 'collapse' | 'expand') => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // Abort any in-flight session before starting a new one; otherwise the
    // previous ResizeObserver and window listeners would race with this one.
    activeSessionCleanupRef.current?.();
    activeSessionCleanupRef.current = null;

    const primaryAnchor = container.querySelector<HTMLElement>(ANCHOR_SELECTOR);
    const toggleAnchor = toggleRef.current;

    let anchor = primaryAnchor ?? toggleAnchor;
    if (direction === 'collapse' && primaryAnchor && !isElementInViewport(primaryAnchor)) {
      anchor = toggleAnchor ?? primaryAnchor;
    }

    if (!anchor) {
      return;
    }

    // On collapse, animate the scrollbar gutter (padding swap) to avoid
    // an instant height shrink when horizontal scrollbar space disappears.
    // On expand, do the inverse only for truncated/max-size demos where
    // scrollbar space can appear late and look like a snap.
    const pre = container.querySelector<HTMLElement>('pre');
    if (pre) {
      lastPreRef.current = pre;
      if (direction === 'collapse') {
        // Smoothly return horizontal scroll to the left edge so the focused
        // region (which usually starts at column 0) is visible after collapse,
        // and so the fade overlay isn't masking scrolled-away content. We
        // animate via a transform on the inner `code` element rather than
        // tweening `pre.scrollLeft`, because the gutter animation below sets
        // `overflow-x: hidden` which would snap `scrollLeft` to 0 instantly.
        // Both animations start in the same frame: the scroll-back resets
        // `scrollLeft` to 0 up front, so the gutter swap's `overflow-x`
        // change has nothing left to snap.
        smoothCollapseScrollLeft(pre, 300);
        animateScrollbarGutter(pre);
      }
      if (direction === 'expand') {
        // Cancel any in-flight collapse scroll-back so its leftover transform
        // can't drift the code horizontally during the expand transition.
        scrollbackAnimations.get(pre)?.cancel();
        scrollbackAnimations.delete(pre);
        if (pre.querySelector('[data-collapsible]')) {
          animateScrollbarGutterExpand(pre);
        }
      }
    }

    const initialTop = anchor.getBoundingClientRect().top;
    let active = true;
    let cleanupTimer: ReturnType<typeof setTimeout>;

    // Use ResizeObserver to compensate only when the container layout
    // actually changes, rather than polling every animation frame.
    // Callbacks fire after layout, so getBoundingClientRect() reads
    // already-computed values without forcing an extra reflow.
    const observer = new ResizeObserver(() => {
      if (!active) {
        return;
      }
      const delta = anchor.getBoundingClientRect().top - initialTop;
      if (Math.abs(delta) > 0.5) {
        window.scrollBy(0, delta);
      }
    });

    // Stop compensating if the user interacts (scroll, click, keyboard),
    // since UI changes like tab switches can invalidate anchor measurements.
    function cleanup() {
      if (!active) {
        return;
      }
      active = false;
      clearTimeout(cleanupTimer);
      observer.disconnect();
      window.removeEventListener('wheel', stopOnUserInteraction);
      window.removeEventListener('touchmove', stopOnUserInteraction);
      window.removeEventListener('pointerdown', stopOnUserInteraction);
      window.removeEventListener('keydown', stopOnUserInteraction);
      if (activeSessionCleanupRef.current === cleanup) {
        activeSessionCleanupRef.current = null;
      }
    }
    activeSessionCleanupRef.current = cleanup;

    function stopOnUserInteraction() {
      cleanup();
    }
    window.addEventListener('wheel', stopOnUserInteraction, { passive: true, once: true });
    window.addEventListener('touchmove', stopOnUserInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', stopOnUserInteraction, { passive: true, once: true });
    window.addEventListener('keydown', stopOnUserInteraction, { passive: true, once: true });

    observer.observe(container);

    // Safety cleanup after the CSS transition completes.
    const timeout = getTransitionTimeout(direction);
    cleanupTimer = setTimeout(cleanup, timeout + 500);
  }, []);

  return { containerRef, toggleRef, anchorScroll };
}
