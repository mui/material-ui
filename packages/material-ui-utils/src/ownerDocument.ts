export default function ownerDocument(node: Node | undefined): Document {
  return (node && node.ownerDocument) || document;
}
