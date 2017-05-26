// @flow weak
/* eslint-disable import/prefer-default-export */

import { cloneElement, Children, isValidElement } from 'react';

export function cloneChildrenWithClassName(children, className) {
  return Children.map(children, child => {
    return (
      isValidElement(child) &&
      cloneElement(child, {
        className: child.props.hasOwnProperty('className')
          ? `${child.props.className} ${className}`
          : className,
      })
    );
  });
}
