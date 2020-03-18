export default function ownerDocument(node) {
  return (node && node.ownerDocument) || document;
}
