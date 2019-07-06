import ownerDocument from './ownerDocument';

function ownerWindow(node, fallback = window) {
  const doc = ownerDocument(node);
  return doc.defaultView || fallback;
}

export default ownerWindow;
