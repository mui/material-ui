// @flow weak

import keycode from 'keycode';
import contains from 'dom-helpers/query/contains';
import addEventListener from '../utils/addEventListener';

const FOCUS_KEYS = ['tab', 'enter', 'space', 'esc', 'up', 'down', 'left', 'right'];

const internal = {
  listening: false,
  focusKeyPressed: false,
};

function isFocusKey(event) {
  return FOCUS_KEYS.indexOf(keycode(event)) !== -1;
}

export function focusKeyPressed(pressed) {
  if (typeof pressed !== 'undefined') {
    internal.focusKeyPressed = Boolean(pressed);
  }

  return internal.focusKeyPressed;
}

export function detectKeyboardFocus(instance, element, cb, attempt = 1) {
  instance.keyboardFocusTimeout = setTimeout(() => {
    if (
      focusKeyPressed() &&
      (document.activeElement === element || contains(element, document.activeElement))
    ) {
      cb();
    } else if (attempt < instance.keyboardFocusMaxCheckTimes) {
      detectKeyboardFocus(instance, element, cb, attempt + 1);
    }
  }, instance.keyboardFocusCheckTime);
}

export function listenForFocusKeys() {
  if (!internal.listening) {
    addEventListener(window, 'keyup', (event) => {
      if (isFocusKey(event)) {
        internal.focusKeyPressed = true;
      }
    });
    internal.listening = true;
  }
}
