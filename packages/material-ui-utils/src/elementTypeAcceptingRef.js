import * as PropTypes from 'prop-types';
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
   * Blacklisting instead of whitelisting
   *
   * Blacklisting will miss some components, such as React.Fragment. Those will at least
   * trigger a warning in React.
   * We can't whitelist because there is no safe way to detect React.forwardRef
   * or class components. "Safe" means there's no public API.
   *
   */
  if (typeof propValue === 'function' && !isClassComponent(propValue)) {
    warningHint = 'Did you accidentally provide a plain function component instead?';
  }

  if (warningHint !== undefined) {
    return new Error(
      `Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` +
        `Expected an element type that can hold a ref. ${warningHint} ` +
        'For more information see https://material-ui.com/guides/composition/#caveat-with-refs',
    );
  }

  return null;
}

export default chainPropTypes(PropTypes.elementType, elementTypeAcceptingRef);
