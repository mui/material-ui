import secret from 'prop-types/lib/ReactPropTypesSecret';

function chainPropType(propType, check) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  return (props, propName, componentName, location, propFullName) => {
    const err = check(props, propName, componentName, location, propFullName, secret);

    if (err) {
      return err;
    }

    return propType(props, propName, componentName, location, propFullName, secret);
  };
}

export default chainPropType;
