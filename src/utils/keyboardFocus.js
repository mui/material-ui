// @flow weak

import keycode from 'keycode';
import addEventListener from '../utils/addEventListener';

const FOCUS_KEYS = ['tab', 'enter', 'space', 'esc', 'up', 'down', 'left', 'right'];

const internal = {
  listening: false,
  focusKeyPressed: false,
};

function isFocusKey(event) {
  return FOCUS_KEYS.indexOf(keycode(event)) !== -1;
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

export function focusKeyPressed(pressed) {
  if (typeof pressed !== 'undefined') {
    internal.focusKeyPressed = Boolean(pressed);
  }

  return internal.focusKeyPressed;
}
