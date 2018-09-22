import warning from 'warning';
import getDisplayName from '../utils/getDisplayName';

function mergeClasses(options = {}) {
  const { baseClasses, newClasses, Component, noBase = false } = options;

  if (!newClasses) {
    return baseClasses;
  }

  return {
    ...baseClasses,
    ...Object.keys(newClasses).reduce((accumulator, key) => {
      warning(
        baseClasses[key] || noBase || !newClasses[key],
        [
          `Material-UI: the key \`${key}\` ` +
            `provided to the classes property is not implemented in ${getDisplayName(Component)}.`,
          `You can only override one of the following: ${Object.keys(baseClasses).join(',')}`,
        ].join('\n'),
      );

      warning(
        !newClasses[key] || typeof newClasses[key] === 'string',
        [
          `Material-UI: the key \`${key}\` ` +
            `provided to the classes property is not valid for ${getDisplayName(Component)}.`,
          `You need to provide a non empty string instead of: ${newClasses[key]}.`,
        ].join('\n'),
      );

      if (newClasses[key]) {
        accumulator[key] = `${baseClasses[key]} ${newClasses[key]}`;
      }

      return accumulator;
    }, {}),
  };
}

export default mergeClasses;
