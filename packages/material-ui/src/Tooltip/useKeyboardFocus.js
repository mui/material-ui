import React from 'react';

let prepared = false;
let keyboardModality = false;
let documentHadFocus = true;

function handleKeyDown() {
  keyboardModality = true;
}

function handlePointerDown() {
  keyboardModality = false;
}

function handleBlur() {
  documentHadFocus = document.hasFocus();
}

function handleFocus() {
  documentHadFocus = true;
}

export function prepare() {
  prepared = true;
  document.addEventListener('keydown', handleKeyDown, { passive: true });
  document.addEventListener('mousedown', handlePointerDown, { passive: true });
  document.addEventListener('pointerdown', handlePointerDown, { passive: true });
  document.addEventListener('touchstart', handlePointerDown, { passive: true });
  document.addEventListener('focusout', handleBlur, { passive: true });
  document.addEventListener('focusin', handleFocus, { passive: true });
}

export function teardown() {
  document.removeEventListener('keydown', handleKeyDown, { passive: true });
  document.removeEventListener('mousedown', handlePointerDown, { passive: true });
  document.removeEventListener('pointerdown', handlePointerDown, { passive: true });
  document.removeEventListener('touchstart', handlePointerDown, { passive: true });
  document.removeEventListener('focusout', handleBlur, { passive: true });
  document.removeEventListener('focusin', handleBlur, { passive: true });
  prepared = false;
}

/**
 *
 * @returns true if called during a keyboard event
 */
export default function useKeyboardFocus() {
  React.useEffect(() => {
    if (!prepared) {
      prepare();
    }
  }, []);

  return React.useCallback(() => {
    return keyboardModality && documentHadFocus;
  }, []);
}
