/**
 * This module is taken from https://github.com/react-bootstrap/react-prop-types.
 * It's not a dependency to reduce build size / install time.
 * It should be pretty stable.
 */
import warning from 'warning';

const warned = {};

export default function deprecated(validator, reason) {
  return function validate(
    props, propName, componentName, location, propFullName, ...args
  ) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    if (props[propName] != null) {
      const messageKey = `${componentName}.${propName}`;

      warning(warned[messageKey],
        `The ${location} \`${propFullNameSafe}\` of ` +
        `\`${componentNameSafe}\` is deprecated. ${reason}`
      );

      warned[messageKey] = true;
    }

    return validator(
      props, propName, componentName, location, propFullName, ...args
    );
  };
}
