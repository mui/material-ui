import React from 'react';

/**
 *
 * @param {boolean} disabled
 * @returns true if called during a keyboard event
 */
export default function useKeyboardFocus(disabled) {
  /**
   * observed order of events in chrome:
   * keydown, focusin, keyup, keydown, focusout, focusin, keyup
   *
   * Meaning a keyboard focus only happens between keydown and keyup
   * the same events are fired when changing tabs. So we need to save on focusout
   * if the document lost focus.
   *
   * This is currently very wasteful. A single instance of those listeners per
   * tree should be enough
   */
  const keyboardEventRef = React.useRef(false);
  const documentHadFocusRef = React.useRef(true);

  React.useEffect(() => {
    if (disabled) {
      return undefined;
    }

    function handleKeyDown() {
      keyboardEventRef.current = true;
    }

    function handleKeyUp() {
      keyboardEventRef.current = false;
    }

    function handleBlur() {
      documentHadFocusRef.current = document.hasFocus();
    }

    function handleFocus() {
      documentHadFocusRef.current = true;
    }

    document.addEventListener('keydown', handleKeyDown, { passive: true });
    document.addEventListener('keyup', handleKeyUp, { passive: true });
    document.addEventListener('focusout', handleBlur, { passive: true });
    document.addEventListener('focusin', handleFocus, { passive: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { passive: true });
      document.removeEventListener('keyup', handleKeyUp, { passive: true });
      document.removeEventListener('focusout', handleBlur, { passive: true });
      document.removeEventListener('focusin', handleBlur, { passive: true });
    };
  }, [disabled]);

  return React.useCallback(() => {
    return keyboardEventRef.current && documentHadFocusRef.current;
  }, []);
}
