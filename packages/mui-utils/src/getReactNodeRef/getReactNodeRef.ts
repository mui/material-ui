import * as React from 'react';
import getReactElementRef from '../getReactElementRef';

/**
 * Returns the ref of a React element handling differences between React 19 and older versions.
 * It will throw runtime error if the element is not a valid React element.
 *
 * @param element React.ReactElement
 * @returns React.Ref<any> | null
 *
 * @deprecated Use getReactElementRef instead
 */

export default function getReactNodeRef(element: React.ReactElement): React.Ref<any> | null {
  return getReactElementRef(element);
}
