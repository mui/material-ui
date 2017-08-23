// @flow

import addEventListener from 'dom-helpers/events/on';
import removeEventListener from 'dom-helpers/events/off';

export default function(node: Node, event: string, handler: EventHandler, capture?: boolean) {
  addEventListener(node, event, handler, capture);
  return {
    remove() {
      removeEventListener(node, event, handler, capture);
    },
  };
}
