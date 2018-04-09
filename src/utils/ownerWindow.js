// @flow

import ownerDocument from 'dom-helpers/ownerDocument';

const ownerWindow = (node: Node, fallback: window = window) => {
  const doc: Document = ownerDocument(node);
  return doc.defaultView || doc.parentView || fallback;
};

export default ownerWindow;
