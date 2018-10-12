function chainPropType(propType, check) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  return function validate(...args) {
    const err = check(...args);

    if (err) {
      return err;
    }

    return propType(...args);
  };
}

export default chainPropType;
