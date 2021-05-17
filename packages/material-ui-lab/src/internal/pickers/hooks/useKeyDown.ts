import * as React from 'react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@material-ui/utils';

type KeyHandlers = Record<number, () => void>;

function runKeyHandler(event: KeyboardEvent | React.KeyboardEvent, keyHandlers: KeyHandlers) {
  // tslint:disable-next-line deprecation IE11
  const handler = keyHandlers[event.keyCode];
  if (handler) {
    handler();
    // if event was handled prevent other side effects (e.g. page scroll)
    event.preventDefault();
  }
}

export function useGlobalKeyDown(active: boolean, keyHandlers: KeyHandlers) {
  const keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;

  useEnhancedEffect(() => {
    if (active) {
      const handleKeyDown = (nativeEvent: KeyboardEvent) => {
        runKeyHandler(nativeEvent, keyHandlersRef.current);
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

    return undefined;
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
