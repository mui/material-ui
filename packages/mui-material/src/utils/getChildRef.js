import * as React from 'react';

export default function getChildRef(children) {
  if (!children || !React.isValidElement(children) || React.Children.count(children) !== 1) {
    return null;
  }
  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to children in React 18
  // below check is to ensure 'ref' is accessible in both cases
  return children.props.propertyIsEnumerable('ref') ? children.props.ref : children.ref;
}
