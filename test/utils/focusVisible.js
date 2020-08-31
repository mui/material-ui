import { act, fireEvent } from './createClientRender';

/**
 * @param {HTMLElement} element
 */
export function focusVisible(element) {
  act(() => {
    element.blur();
    fireEvent.keyDown(document.body, { key: 'Tab' });
    element.focus();
  });
}

export function simulatePointerDevice() {
  // first focus on a page triggers focus visible until a pointer event
  // has been dispatched
  fireEvent.pointerDown(document.body);
}
