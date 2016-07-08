import on from 'dom-helpers/events/on';
import off from 'dom-helpers/events/off';

export default function addEventListener(
  node: Node,
  event: string,
  handler: EventListener,
  capture?: boolean
): RemoveEventListener {
  on(node, event, handler, capture);
  return {
    remove() {
      off(node, event, handler, capture);
    },
  };
}
