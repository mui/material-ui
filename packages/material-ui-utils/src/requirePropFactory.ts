export default function requirePropFactory(componentNameInError: string): any {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  const requireProp = (requiredProp: string): any => (
    props: {[key: string]: any},
    propName: string,
    componentName: string,
    location: string,
    propFullName: string,
  ) => {
    const propFullNameSafe = propFullName || propName;

    if (typeof props[propName] !== 'undefined' && !props[requiredProp]) {
      return new Error(
        `The prop \`${propFullNameSafe}\` of ` +
          `\`${componentNameInError}\` must be used on \`${requiredProp}\`.`,
      );
    }

    return null;
  };
  return requireProp;
}
