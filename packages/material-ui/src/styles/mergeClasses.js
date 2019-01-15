import warning from 'warning';
import { getDisplayName } from '@material-ui/utils';

function mergeClasses(options = {}) {
  const { baseClasses, newClasses, Component } = options;

  if (!newClasses) {
    return baseClasses;
  }

  const nextClasses = { ...baseClasses };

  Object.keys(newClasses).forEach(key => {
    if (Component) {
      warning(
        baseClasses[key] || !newClasses[key],
        [
          `Material-UI: the key \`${key}\` ` +
            `provided to the classes property is not implemented in ${getDisplayName(Component)}.`,
          `You can only override one of the following: ${Object.keys(baseClasses).join(',')}.`,
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
    }

    if (newClasses[key]) {
      nextClasses[key] = `${baseClasses[key]} ${newClasses[key]}`;
    }
  });

  return nextClasses;
}

export default mergeClasses;
