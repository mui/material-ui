export default function requirePropFactory(componentNameInError) {
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
