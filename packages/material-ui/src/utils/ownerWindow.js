import ownerDocument from './ownerDocument';

function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}

export default ownerWindow;
