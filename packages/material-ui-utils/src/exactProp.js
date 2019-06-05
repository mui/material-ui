// This module is based on https://github.com/airbnb/prop-types-exact repository.
// However, in order to reduce the number of dependencies and to remove some extra safe checks
// the module was forked.

// Only exported for test purposes.
export const specialProperty = 'exact-prop: \u200b';

function exactProp(propTypes) {
  if (process.env.NODE_ENV === 'production') {
    return propTypes;
  }

  return {
    ...propTypes,
    [specialProperty]: props => {
      const unsupportedProps = Object.keys(props).filter(prop => !propTypes.hasOwnProperty(prop));
      if (unsupportedProps.length > 0) {
        return new Error(
          `The following properties are not supported: ${unsupportedProps
            .map(prop => `\`${prop}\``)
            .join(', ')}. Please remove them.`,
        );
      }
      return null;
    },
  };
}

export default exactProp;
