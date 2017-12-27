import isWindow from 'dom-helpers/query/isWindow';
import ownerDocument from 'dom-helpers/ownerDocument';

export function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

// Do we have a scroll bar?
export default function isOverflowing(container) {
  const doc = ownerDocument(container);
  const win = isWindow(doc);

  /* istanbul ignore next */
  if (!win && !isBody(container)) {
    return container.scrollHeight > container.clientHeight;
  }

  // Takes in account potential non zero margin on the body.
  const style = window.getComputedStyle(doc.body);
  const marginLeft = parseInt(style.getPropertyValue('margin-left'), 10);
  const marginRight = parseInt(style.getPropertyValue('margin-right'), 10);

  return marginLeft + doc.body.clientWidth + marginRight < win.innerWidth;
}
