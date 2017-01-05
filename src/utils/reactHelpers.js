// @flow weak

import { cloneElement, Children, isValidElement } from 'react';

export function cloneChildrenWithClassName(children, className) {
  return Children.map(children, (child) => {
    return isValidElement(child) && cloneElement(child, {
      className: child.props.hasOwnProperty('className') ?
        `${child.props.className} ${className}` : className,
    });
  });
}
