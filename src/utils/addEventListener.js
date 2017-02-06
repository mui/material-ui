// @flow weak

import addEventListener from 'dom-helpers/events/on';
import removeEventListener from 'dom-helpers/events/off';

export default function (node, event, handler, options) {
  addEventListener(node, event, handler, options);
  return {
    remove() {
      removeEventListener(node, event, handler, options);
    },
  };
}
