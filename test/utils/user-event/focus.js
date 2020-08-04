import { getActiveElement, isFocusable, eventWrapper } from './utils';

function focus(element) {
  if (!isFocusable(element)) return;

  const isAlreadyActive = getActiveElement(element.ownerDocument) === element;
  if (isAlreadyActive) return;

  eventWrapper(() => element.focus());
}

export default focus;
