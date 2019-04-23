import React from 'react';

let prepared = false;
let keyboardModality = false;

function handleKeyDown() {
  keyboardModality = true;
}

function handlePointerDown() {
  keyboardModality = false;
}

export function prepare() {
  prepared = true;
  document.addEventListener('keydown', handleKeyDown, { passive: true });
  document.addEventListener('mousedown', handlePointerDown, { passive: true });
  document.addEventListener('pointerdown', handlePointerDown, { passive: true });
  document.addEventListener('touchstart', handlePointerDown, { passive: true });
}

export function teardown() {
  document.removeEventListener('keydown', handleKeyDown, { passive: true });
  document.removeEventListener('mousedown', handlePointerDown, { passive: true });
  document.removeEventListener('pointerdown', handlePointerDown, { passive: true });
  document.removeEventListener('touchstart', handlePointerDown, { passive: true });
  prepared = false;
}

/**
 * @returns true if called during a focus event that applied focus-visible
 */
export default function useKeyboardFocus() {
  React.useEffect(() => {
    if (!prepared) {
      prepare();
    }
  }, []);

  /**
   * implementation notes:
   * 1. Why no event key whitelist?
   *    - shortcuts can be changed
   *    - has to be maintained
   *    - pressing any character in a dropdown selects the first item starting with that character
   * 2. if :focus-visible pseudo selector is available we use this one i.e. use UA heuristic
   * 3. if no :focus-visible we consider it keyboard focus if
   *    - between the last keydown and the focus was no pointerdown
   *    - this includes a window regaining focus due to e.g. tab switch
   */

  return React.useCallback(event => {
    let isFocusVisible = null;
    // throws if the selector is not implemented
    try {
      isFocusVisible = event.target.matches(':focus-visible');
    } catch (err) {
      //
    }

    // if the UA implements the selector we use their heuristic otherwise
    // we fallback to ours
    return isFocusVisible === null ? keyboardModality : isFocusVisible;
  }, []);
}
