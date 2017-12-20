const requirePropFactory = (componentNameInError: string): any => {
  const requireProp = (requiredProp: string) => (
    props: any,
    propName: string,
    componentName?: string,
    location?: string,
    propFullName?: string,
  ) => {
    const propFullNameSafe = propFullName || propName;

    if (typeof props[propName] !== 'undefined' && !props[requiredProp]) {
      return new Error(
        `The property \`${propFullNameSafe}\` of ` +
          `\`${componentNameInError}\` must be used on \`${requiredProp}\`.`,
      );
    }

    return null;
  };
  return requireProp;
};

export default requirePropFactory;
