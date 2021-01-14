export default function requirePropFactory(componentNameInError, Component) {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  const requireProp = (requiredProp) => (
    props,
    propName,
    componentName,
    location,
    propFullName,
  ) => {
    const propFullNameSafe = propFullName || propName;

    const defaultPropType = Component?.propTypes?.[propFullNameSafe];
    let defaultPropTypeVal = null;

    if(defaultPropType) {
      console.log("Default prop type existed");
      defaultPropTypeVal = defaultPropType(props, propName, componentName, location, propFullName)
    }

    if (typeof props[propName] !== 'undefined' && !props[requiredProp]) {
      return new Error(
        `The prop \`${propFullNameSafe}\` of ` +
          `\`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`,
      );
    }

    return defaultPropTypeVal;
  };
  return requireProp;
}
