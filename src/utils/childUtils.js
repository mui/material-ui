import React from 'react';

export function extendChildren(children, extendedProps, extendedChildren) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const newProps = typeof extendedProps === 'function' ?
      extendedProps(child) : extendedProps;

    const newChildren = typeof extendedChildren === 'function' ?
      extendedChildren(child) : extendedChildren ?
      extendedChildren : child.props.children;

    return React.cloneElement(child, newProps, newChildren);
  });
}

