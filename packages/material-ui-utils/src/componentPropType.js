const ReactIs = require('react-is');

/**
 * A factory that returns a propTypes validator that only accepts values that
 * are also accepted by React.createElement
 * e.g. "div", functional, class components, forwardRef etc.
 *
 * @param {boolean} isRequired If `true` returns a validator
 *                             that will throw if nullish values are passed
 */
function createComponentProp(isRequired) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  return function componentPropType(props, key, componentName, location, propFullName) {
    const prop = props[key];
    const propName = propFullName || key;
    let message;

    if (prop == null) {
      if (isRequired) {
        message =
          `The ${location} \`${propName}\` is marked as required in \`${componentName}\`, ` +
          `but its value is \`${typeof prop}\`.`;
      }
    } else if (!ReactIs.isValidElementType(prop)) {
      const preciseType = typeof prop;
      message =
        `Invalid ${location} \`${propName}\` of type \`${preciseType}\` ` +
        `supplied to \`${componentName}\`, expected a component.`;
    }

    if (message != null) {
      // change error message slightly on every check to prevent caching when testing
      // which would not trigger console errors on subsequent fails
      return new Error(`${message}${process.env.NODE_ENV === 'test' ? Date.now() : ''}`);
    }

    return null;
  };
}

const componentPropType = createComponentProp(false);
componentPropType.isRequired = createComponentProp(true);

export default componentPropType;
