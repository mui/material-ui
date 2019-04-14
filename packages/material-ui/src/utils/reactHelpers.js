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

export function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function useForkRef(refA, refB) {
  /**
   * This will create a new function if the ref props change.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useCallback(
    refValue => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    },
    [refA, refB],
  );
}
