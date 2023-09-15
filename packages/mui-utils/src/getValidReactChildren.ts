// Copied from - https://github.com/chakra-ui/chakra-ui/blob/eb0316ddf96dd259433724062e923c33e6eee729/packages/utilities/react-children-utils/src/index.ts

import * as React from 'react';

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export default function getValidReactChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[];
}
