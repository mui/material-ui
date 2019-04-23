import React from 'react';

/**
 *
 * @param {boolean} disabled
 * @returns true if called during a keyboard event
 */
export default function useKeyboardFocus(disabled) {
  /**
   * This is currently very wasteful. A single instance of those listeners per
   * tree should be enough
   */
  const keyboardModalityRef = React.useRef(false);
  const documentHadFocusRef = React.useRef(true);

  React.useEffect(() => {
    if (disabled) {
      return undefined;
    }

    function handleKeyDown() {
      keyboardModalityRef.current = true;
    }

    function handlePointerDown() {
      keyboardModalityRef.current = false;
    }

    function handleBlur() {
      documentHadFocusRef.current = document.hasFocus();
    }

    function handleFocus() {
      documentHadFocusRef.current = true;
    }

    document.addEventListener('keydown', handleKeyDown, { passive: true });
    document.addEventListener('mousedown', handlePointerDown, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    document.addEventListener('focusout', handleBlur, { passive: true });
    document.addEventListener('focusin', handleFocus, { passive: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { passive: true });
      document.removeEventListener('mousedown', handlePointerDown, { passive: true });
      document.removeEventListener('pointerdown', handlePointerDown, { passive: true });
      document.removeEventListener('touchstart', handlePointerDown, { passive: true });
      document.removeEventListener('focusout', handleBlur, { passive: true });
      document.removeEventListener('focusin', handleBlur, { passive: true });
    };
  }, [disabled]);

  return React.useCallback(() => {
    return keyboardModalityRef.current && documentHadFocusRef.current;
  }, []);
}
