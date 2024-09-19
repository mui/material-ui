import * as React from 'react';
import MuiError from '@mui/internal-babel-macros/MuiError.macro';

/**
 * Returns the ref of a React node handling differences between React 19 and older versions.
 * It will return null if the node is not a valid React element.
 *
 * @param element React.ReactElement
 * @returns React.Ref<any> | null
 */
export default function getReactNodeRef(
  element: React.ReactElement,
): React.Ref<any> | null | undefined {
  if (typeof element !== 'object') {
    throw new MuiError('MUI: `getReactNodeRef(element)` expects a React element.');
  }

  if (Array.isArray(element)) {
    return undefined;
  }

  if (element.type === React.Fragment) {
    return null;
  }

  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to children in older versions
  const ref = element.props?.propertyIsEnumerable('ref')
    ? (element.props as any).ref
    : // @ts-expect-error element.ref is not included in the ReactElement type
      // We cannot check for it, but isValidElement is true at this point
      // https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/70189
      element.ref;

  if (!ref) {
    return null;
  }

  return ref;
}
