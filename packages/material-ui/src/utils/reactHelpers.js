import React from 'react';
import clsx from 'clsx';

export function cloneElementWithClassName(child, className) {
  return React.cloneElement(child, {
    className: clsx(child.props.className, className),
  });
}

export function cloneChildrenWithClassName(children, className) {
  return React.Children.map(
    children,
    child => React.isValidElement(child) && cloneElementWithClassName(child, className),
  );
}

export function isMuiElement(element, muiNames) {
  return React.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}
