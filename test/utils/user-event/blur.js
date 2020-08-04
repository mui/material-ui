import { getActiveElement, isFocusable, eventWrapper } from './utils';

function blur(element) {
  if (!isFocusable(element)) return;

  const wasActive = getActiveElement(element.ownerDocument) === element;
  if (!wasActive) return;

  eventWrapper(() => element.blur());
}

export default blur;
