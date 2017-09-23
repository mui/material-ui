// @flow weak

const requirePropFalseFactory = componentNameInError => {
  const requirePropFalse = requiredFalseProp => (
    props,
    propName,
    componentName,
    location,
    propFullName,
  ) => {
    const propFullNameSafe = propFullName || propName;
    const requiredFalsePropArray = Array.isArray(requiredFalseProp)
      ? requiredFalseProp
      : [requiredFalseProp];

    for (let i = 0; i < requiredFalsePropArray.length; i += 1) {
      const testProp = requiredFalsePropArray[i];

      if (props[propName] && props[testProp]) {
        return new Error(
          `The property \`${propFullNameSafe}\` of ` +
            `\`${componentNameInError}\` should not be \`true\` at the ` +
            `same time as \`${testProp}\` is \`true\`.`,
        );
      }
    }

    return null;
  };

  return requirePropFalse;
};

export default requirePropFalseFactory;
