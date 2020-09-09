import { act, fireEvent } from './createClientRender';

export default function focusVisible(element: HTMLElement) {
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
