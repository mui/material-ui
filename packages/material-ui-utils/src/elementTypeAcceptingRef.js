import * as PropTypes from 'prop-types';
import React from 'react';
import { isLazy, isMemo } from 'react-is';
import chainPropTypes from './chainPropTypes';

function isClassComponent(elementType) {
  // elementType.prototype?.isReactComponent
  const { prototype = {} } = elementType;

  return Boolean(prototype.isReactComponent);
}

function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;

  if (propValue == null) {
    return null;
  }

  let warningHint;

  /**
   * blacklisting instead of whitelisting
   *
   * blacklisting will miss some components like React.Fragment. Those will at least
   * trigger a warning in react.
   * We can't whitelist because there is no safe way to detect React.forwardRef
   * or class components. Safe means there's no public API.
   *
   */
  if (isLazy(propValue)) {
    warningHint = 'But you passed a React.lazy component.';
  } else if (isMemo(propValue)) {
    warningHint = 'But you passed a React.memo component.';
  } else if (typeof propValue === 'function' && !isClassComponent(propValue)) {
    warningHint = 'Did you accidentally provide a plain function component instead?';
  }

  if (warningHint !== undefined) {
    return new Error(
      `Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` +
        `Expected an element type that can hold a ref. ${warningHint}`,
    );
  }

  return null;
}

export default chainPropTypes(PropTypes.elementType, elementTypeAcceptingRef);
