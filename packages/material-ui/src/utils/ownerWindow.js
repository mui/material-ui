// @flow

import ownerDocument from './ownerDocument';

function ownerWindow(node: Node, fallback: window = window) {
  const doc: Document = ownerDocument(node);
  return doc.defaultView || doc.parentView || fallback;
}

export default ownerWindow;
