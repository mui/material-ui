import React from 'react';
import { assert } from 'chai';

function assertDOMNode(node) {
  // duck typing a DOM node
  assert.ok(node.nodeName);
}

/**
 *
 * @param {React.ReactElement} element - The element should have a component wrapped
 *                                       in withStyles as the root
 * @param {function} mount - Should be returnvalue of createMount
 * @param {function} onRef - Callback, first arg is the ref.
 *                           Assert that the ref is a DOM node by default
 */
export default function testRef(element, mount, onRef = assertDOMNode) {
  const ref = React.createRef();
  mount(<React.Fragment>{React.cloneElement(element, { innerRef: ref })}</React.Fragment>);
  onRef(ref.current);
}
