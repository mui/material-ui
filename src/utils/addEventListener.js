// @flow weak

import addEventListener from 'dom-helpers/events/on';
import removeEventListener from 'dom-helpers/events/off';

export default function (node, event, handler, capture) {
  addEventListener(node, event, handler, capture);
  return {
    remove() {
      removeEventListener(node, event, handler, capture);
    },
  };
}
