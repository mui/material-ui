// @flow
/* eslint-disable import/prefer-default-export */

import { cloneElement, Children, isValidElement, type ChildrenArray } from 'react';

export function cloneChildrenWithClassName(children: ChildrenArray<*>, className: string) {
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

export function isMuiElement(element: any, muiNames: Array<string>) {
  return isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}

export function isMuiComponent(element: any, muiNames: Array<string>) {
  return muiNames.indexOf(element.muiName) !== -1;
}
