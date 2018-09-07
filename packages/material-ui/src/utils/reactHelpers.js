/* eslint-disable import/prefer-default-export */

import React from 'react';
import classNames from 'classnames';

export function cloneElementWithClassName(child, className) {
  return React.cloneElement(child, {
    className: classNames(child.props.className, className),
  });
}

export function cloneChildrenWithClassName(children, className) {
  return React.Children.map(children, child => {
    return React.isValidElement(child) && cloneElementWithClassName(child, className);
  });
}

export function isMuiElement(element, muiNames) {
  return React.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}

export function isMuiComponent(element, muiNames) {
  return muiNames.indexOf(element.muiName) !== -1;
}

/**
 * passes {instanceRef} to {toRef}
 *
 * useful if you want to expose the ref of an inner component to the public api
 * while still using this inside the component
 * @param {ReactInstance} instanceRef
 * @param {RefObject | RefCallback | any} toRef
 */
export function forwardRef(instanceRef, toRef) {
  if (typeof toRef === 'function') {
    toRef(instanceRef);
  } else if (toRef && 'current' in toRef) {
    toRef.current = instanceRef;
  }
}
