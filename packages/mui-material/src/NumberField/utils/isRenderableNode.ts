export default function isRenderableNode(node: React.ReactNode) {
  return node != null && typeof node !== 'boolean' && node !== '';
}
