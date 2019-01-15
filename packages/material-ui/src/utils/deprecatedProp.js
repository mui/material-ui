import chainPropTypes from './chainPropTypes';
/**
 * Logs deprecation warnings if this prop is used
 *
 * @param {PropTypes.Validator} validator
 * @param {string} reason
 * @param {boolean?} suppressDeprecation
 */
export default function deprecatedProp(
  origPropType,
  reason,
  // this is only for testing purposes
  suppressDeprecation,
) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  if (suppressDeprecation) {
    return origPropType;
  }
  return chainPropTypes(origPropType, (props, propName, componentName) => {
    if (props[propName] == null) {
      return null;
    }
    return new Error(
      [
        `Material-UI: The prop \`${propName}\` in \`${componentName}\` is deprecated. ${reason}`,
        // prevent message caching for testing purposes
        process.env.NODE_ENV === 'test' ? Date.now().toString() : '',
      ].join(''),
    );
  });
}
