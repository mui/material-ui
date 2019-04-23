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
    return keyboardModality;
  }, []);
}
