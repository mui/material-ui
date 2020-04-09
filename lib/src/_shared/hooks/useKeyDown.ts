import * as React from 'react';

export const useIsomorphicEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

type KeyHandlers = Record<number, () => void>;

export function runKeyHandler(e: KeyboardEvent | React.KeyboardEvent, keyHandlers: KeyHandlers) {
  const handler = keyHandlers[e.keyCode];
  if (handler) {
    handler();
    // if event was handled prevent other side effects (e.g. page scroll)
    e.preventDefault();
  }
}

export function useKeyDownHandler(active: boolean, keyHandlers: KeyHandlers) {
  const keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;

  return React.useCallback(
    (e: React.KeyboardEvent) => {
      if (active) {
        runKeyHandler(e, keyHandlersRef.current);
      }
    },
    [active]
  );
}

export function useGlobalKeyDown(active: boolean, keyHandlers: KeyHandlers) {
  const keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;

  useIsomorphicEffect(() => {
    if (active) {
      const handleKeyDown = (event: KeyboardEvent) => {
        runKeyHandler(event, keyHandlersRef.current);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [active]);
}

export const keycode = {
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Enter: 13,
  Home: 36,
  End: 35,
  PageUp: 33,
  PageDown: 34,
  Esc: 27,
};
