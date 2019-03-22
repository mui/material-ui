import * as React from 'react';
import createMount from './createMount';

/**
 * Utility method to make assertions about the ref on an element
 * @param element - The element should have a component wrapped
 *                                       in withStyles as the root
 * @param mount - Should be returnvalue of createMount
 * @param onRef - Callback, first arg is the ref.
 *                           Assert that the ref is a DOM node by default
 */
export default function testRef<T>(
  element: React.ReactElement<{ innerRef: React.RefObject<T> }>,
  mount: ReturnType<typeof createMount>,
  onRef?: (ref: T) => void,
): void;
