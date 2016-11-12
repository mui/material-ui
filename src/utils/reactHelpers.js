// @flow weak

import { cloneElement, Children } from 'react';

export function cloneChildrenWithClassName(children, className) {
  return Children.map(children, (child) => {
    return cloneElement(child, {
      className: child.props.hasOwnProperty('className') ?
        `${child.props.className} ${className}` : className,
    });
  });
}
