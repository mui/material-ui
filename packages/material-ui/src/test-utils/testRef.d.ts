import * as React from 'react';
import createMount from './createMount';

/**
 * Utility method to make assertions about the ref on an element
 * @param onRef - Make your assertions here
 */
export default function testRef<T>(
  element: React.ReactElement<{ innerRef: React.RefObject<T> }>,
  mount: ReturnType<typeof createMount>,
  onRef: (ref: T) => void,
): void;
