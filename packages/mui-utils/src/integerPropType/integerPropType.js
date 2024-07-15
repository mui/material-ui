export function getTypeByValue(value) {
  const valueType = typeof value;
  switch (valueType) {
    case 'number':
      if (Number.isNaN(value)) {
        return 'NaN';
      }
      if (!Number.isFinite(value)) {
        return 'Infinity';
      }
      if (value !== Math.floor(value)) {
        return 'float';
      }

      return 'number';
    case 'object':
      if (value === null) {
        return 'null';
      }

      return value.constructor.name;
    default:
      return valueType;
  }
}

function requiredInteger(props, propName, componentName, location) {
  const propValue = props[propName];

  if (propValue == null || !Number.isInteger(propValue)) {
    const propType = getTypeByValue(propValue);

    return new RangeError(
      `Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`,
    );
  }

  return null;
}

function validator(props, propName, ...other) {
  const propValue = props[propName];

  if (propValue === undefined) {
    return null;
  }

  return requiredInteger(props, propName, ...other);
}

function validatorNoop() {
  return null;
}

validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;

export default process.env.NODE_ENV === 'production' ? validatorNoop : validator;
