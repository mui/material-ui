import ownerDocument from './ownerDocument';

export default function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
