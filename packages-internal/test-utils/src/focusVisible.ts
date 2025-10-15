import { act, fireEvent } from './createRenderer';

export default function focusVisible(element: HTMLElement) {
  act(() => {
    element.blur();
  });
  fireEvent.keyDown(document.body, { key: 'Tab' });
  act(() => {
    element.focus();
  });
}

export function simulatePointerDevice() {
  // first focus on a page triggers focus visible until a pointer event
  // has been dispatched
  fireEvent.pointerDown(document.body);
}

export function simulateKeyboardDevice() {
  fireEvent.keyDown(document.body, { key: 'TAB' });
}

/**
 * See https://issues.chromium.org/issues/40719291 for more details.
 */
export function programmaticFocusTriggersFocusVisible(): boolean {
  try {
    // So far this only applies to Chrome 86 beta which is the only tested browser supporting this pseudo class.
    document.createElement('button').matches(':focus-visible');
    return true;
  } catch (error) {
    return false;
  }
}
