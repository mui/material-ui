export default function requirePropFactory(componentNameInError, Component) {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  // eslint-disable-next-line react/forbid-foreign-prop-types
  const prevPropTypes = Component ? { ...Component.propTypes } : null;

  const requireProp =
    (requiredProp) =>
    (props, propName, componentName, location, propFullName, ...args) => {
      const propFullNameSafe = propFullName || propName;

      const defaultTypeChecker = prevPropTypes?.[propFullNameSafe];

      if (defaultTypeChecker) {
        const typeCheckerResult = defaultTypeChecker(
          props,
          propName,
          componentName,
          location,
          propFullName,
          ...args,
        );
        if (typeCheckerResult) {
          return typeCheckerResult;
        }
      }

      if (typeof props[propName] !== 'undefined' && !props[requiredProp]) {
        return new Error(
          `The prop \`${propFullNameSafe}\` of ` +
            `\`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`,
        );
      }

      return null;
    };
  return requireProp;
}
