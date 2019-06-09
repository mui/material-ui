import * as React from 'react';

const useIsomorphicEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

type KeyHandlers = Record<KeyboardEvent['key'], () => void>;

export function runKeyHandler(e: KeyboardEvent, keyHandlers: KeyHandlers) {
  const handler = keyHandlers[e.key];
  if (handler) {
    handler();
    // if event was handled prevent other side effects (e.g. page scroll)
    e.preventDefault();
  }
}

export function useKeyDown(active: boolean, keyHandlers: KeyHandlers) {
  const keyHandlersRef = React.useRef(keyHandlers);
  useIsomorphicEffect(() => {
    keyHandlersRef.current = keyHandlers;
  });

  React.useEffect(() => {
    if (active) {
      const handleKeyDown = (event: KeyboardEvent) => {
        runKeyHandler(event, keyHandlers);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [active, keyHandlers]);
}
