import ownerDocument from './ownerDocument';

function ownerWindow(node, fallback = window) {
  const doc = ownerDocument(node);
  return doc.defaultView || doc.parentView || fallback;
}

export default ownerWindow;
