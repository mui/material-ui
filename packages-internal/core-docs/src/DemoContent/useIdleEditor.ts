import * as React from 'react';

const EDITOR_IDLE_DELAY_MS = 1500;
const EDITOR_IDLE_TIMEOUT_MS = 5000;

const INPUT_EVENTS = [
  'pointerdown',
  'pointermove',
  'keydown',
  'scroll',
  'wheel',
  'touchstart',
] as const;

/** Initializes visible editors after page loading and a quiet input interval. */
export function useIdleEditor(
  element: HTMLElement | null,
  onIdle: () => void,
  mode: 'idle' | 'disabled',
) {
  React.useEffect(() => {
    if (mode !== 'idle' || !element || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    let visible = false;
    let requested = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelIdle: (() => void) | undefined;

    const cancel = () => {
      clearTimeout(timer);
      cancelIdle?.();
    };

    const canInitialize = () =>
      visible &&
      !requested &&
      document.readyState === 'complete' &&
      document.visibilityState === 'visible';

    const schedule = () => {
      cancel();

      if (!canInitialize()) {
        return;
      }

      timer = setTimeout(() => {
        // Continuous rendering can starve idle callbacks even after input stops.
        const initialize = () => {
          if (!canInitialize()) {
            return;
          }

          const bounds = element.getBoundingClientRect();

          if (
            bounds.width === 0 ||
            bounds.height === 0 ||
            getComputedStyle(element).visibility === 'hidden'
          ) {
            return;
          }

          requested = true;
          onIdle();
        };

        if (window.requestIdleCallback) {
          const handle = window.requestIdleCallback(initialize, {
            timeout: EDITOR_IDLE_TIMEOUT_MS,
          });

          cancelIdle = () => window.cancelIdleCallback(handle);
        } else {
          const handle = setTimeout(initialize, 0);

          cancelIdle = () => clearTimeout(handle);
        }
      }, EDITOR_IDLE_DELAY_MS);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible =
        entry.isIntersecting &&
        entry.intersectionRect.width > 0 &&
        entry.intersectionRect.height > 0;
      schedule();
    });

    observer.observe(element);
    window.addEventListener('load', schedule);
    document.addEventListener('visibilitychange', schedule);

    for (const event of INPUT_EVENTS) {
      window.addEventListener(event, schedule, { capture: true, passive: true });
    }

    return () => {
      cancel();
      observer.disconnect();
      window.removeEventListener('load', schedule);
      document.removeEventListener('visibilitychange', schedule);

      for (const event of INPUT_EVENTS) {
        window.removeEventListener(event, schedule, { capture: true });
      }
    };
  }, [element, onIdle, mode]);
}
