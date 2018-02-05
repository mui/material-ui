// @flow
/* eslint-disable import/prefer-default-export */

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';

export function cloneChildrenWithClassName(children: Node, className: string) {
  return React.Children.map(children, child => {
    return (
      React.isValidElement(child) &&
      React.cloneElement(child, {
        className: classNames(child.props.className, className),
      })
    );
  });
}

export function isMuiElement(element: any, muiNames: Array<string>) {
  return React.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}

export function isMuiComponent(element: any, muiNames: Array<string>) {
  return muiNames.indexOf(element.muiName) !== -1;
}
