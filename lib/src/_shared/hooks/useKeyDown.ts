import * as React from 'react';

export const useIsomorphicEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

type KeyHandlers = Record<KeyboardEvent['key'], () => void>;

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
