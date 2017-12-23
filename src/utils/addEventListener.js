// @flow

export default function(node: Node, event: string, handler: EventHandler, capture?: boolean) {
  node.addEventListener(event, handler, capture);
  return {
    remove() {
      node.removeEventListener(event, handler, capture);
    },
  };
}
