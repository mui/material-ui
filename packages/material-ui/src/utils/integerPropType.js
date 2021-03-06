// IE 11 support
function ponyfillIsInteger(x) {
  // eslint-disable-next-line no-restricted-globals
  return typeof x === 'number' && isFinite(x) && Math.floor(x) === x;
}

const isInteger = Number.isInteger || ponyfillIsInteger;

function requiredInteger(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];

  if (propValue == null || !isInteger(propValue)) {
    const propType = typeof propValue;
    return new RangeError(
      `Invalid ${location} \`${propFullName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`,
    );
  }

  return null;
}

function validator(props, propName, ...rest) {
  const propValue = props[propName];

  if (propValue === undefined) {
    return null;
  }

  return requiredInteger(props, propName, ...rest);
}

function validatorNoop() {
  return null;
}

validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;

export default process.env.NODE_ENV === 'production' ? validatorNoop : validator;
