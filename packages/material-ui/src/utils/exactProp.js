// @flow
// This module is based on https://github.com/airbnb/prop-types-exact repository.
// However, in order to reduce the number of dependencies and to remove some extra safe checks
// the module was forked.

export const specialProperty = 'exact-prop: \u200b';

export default function exactProp(propTypes: Object, componentNameInError: string) {
  return {
    ...propTypes,
    // eslint-disable-next-line prefer-arrow-callback
    [specialProperty]: props => {
      const unknownProps = Object.keys(props).filter(prop => !propTypes.hasOwnProperty(prop));
      if (unknownProps.length > 0) {
        return new TypeError(
          `${componentNameInError}: unknown props found: ${unknownProps.join(
            ', ',
          )}. Please remove the unknown properties.`,
        );
      }
      return null;
    },
  };
}
