export default function ownerDocument(node: Node | null | undefined): Document {
  return (node && node.ownerDocument) || document;
}
