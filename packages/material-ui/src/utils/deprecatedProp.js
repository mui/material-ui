import deprecated from 'prop-types-extra/lib/deprecated';

/**
 * Logs deprecation warnings if this prop is used unless MUI_SUPPRESS_DEPRECATION_WARNINGS
 * is set to a truthy value.
 *
 * @param {PropTypes.Validator} validator
 * @param {string} reason
 */
export default function muiDeprecated(
  validator,
  reason,
  // this is only for testing purposes. Changing env variables during tests is not possible
  deprecate = process.env.MUI_SUPPRESS_DEPRECATION_WARNINGS,
) {
  if (deprecate) {
    return validator;
  }
  return deprecated(validator, reason);
}
