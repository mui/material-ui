import * as React from 'react';

/**
 * Returns the ref of a React element handling differences between React 19 and older versions.
 * It will throw runtime error if the element is not a valid React element.
 *
 * @param element React.ReactElement
 * @returns React.Ref<any> | null
 */
export default function getReactElementRef(element: React.ReactElement): React.Ref<any> | null {
  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to children in older versions
  return element.props.propertyIsEnumerable('ref')
    ? (element.props as any).ref
    : // @ts-expect-error element.ref is not included in the ReactElement type
      // We cannot check for it, but isValidElement is true at this point
      // https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/70189
      element.ref;
}
