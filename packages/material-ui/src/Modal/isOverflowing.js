import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';

// Do we have a vertical scrollbar?
export default function isOverflowing(container) {
  const doc = ownerDocument(container);
  const win = ownerWindow(doc);

  if (doc.body === container) {
    return win.innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}
