// @flow weak

import keycode from 'keycode';
import warning from 'warning';
import contains from 'dom-helpers/query/contains';
import ownerDocument from 'dom-helpers/ownerDocument';

const internal = {
  focusKeyPressed: false,
};

export function focusKeyPressed(pressed) {
  if (typeof pressed !== 'undefined') {
    internal.focusKeyPressed = Boolean(pressed);
  }

  return internal.focusKeyPressed;
}

export function detectKeyboardFocus(instance, element, callback, attempt = 1) {
  warning(instance.keyboardFocusCheckTime, 'Material-UI: missing instance.keyboardFocusCheckTime');
  warning(
    instance.keyboardFocusMaxCheckTimes,
    'Material-UI: missing instance.keyboardFocusMaxCheckTimes',
  );

  instance.keyboardFocusTimeout = setTimeout(() => {
    const doc = ownerDocument(element);

    if (
      focusKeyPressed() &&
      (doc.activeElement === element || contains(element, doc.activeElement))
    ) {
      callback();
    } else if (attempt < instance.keyboardFocusMaxCheckTimes) {
      detectKeyboardFocus(instance, element, callback, attempt + 1);
    }
  }, instance.keyboardFocusCheckTime);
}

const FOCUS_KEYS = ['tab', 'enter', 'space', 'esc', 'up', 'down', 'left', 'right'];

function isFocusKey(event) {
  return FOCUS_KEYS.indexOf(keycode(event)) !== -1;
}

const handleKeyUpEvent = event => {
  if (isFocusKey(event)) {
    internal.focusKeyPressed = true;
  }
};

export function listenForFocusKeys(win) {
  // The event listener will only be added once per window.
  // Duplicate event listeners will be ignored by addEventListener.
  // Also, this logic is client side only, we don't need a teardown.
  win.addEventListener('keyup', handleKeyUpEvent);
}
