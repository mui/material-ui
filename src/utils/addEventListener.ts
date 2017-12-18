import * as addEventListener from 'dom-helpers/events/on';
import * as removeEventListener from 'dom-helpers/events/off';

export default function(
  eventTarget: EventTarget,
  event: string,
  handler: EventListener,
  capture?: boolean,
) {
  addEventListener(eventTarget, event, handler, capture);
  return {
    remove() {
      removeEventListener(eventTarget, event, handler, capture);
    },
  };
}
