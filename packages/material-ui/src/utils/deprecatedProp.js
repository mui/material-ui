import deprecated from 'prop-types-extra/lib/deprecated';

/**
 * Logs deprecation warnings if this prop is used unless MUI_SUPPRESS_DEPRECATION_WARNINGS
 * is set to a truthy value.
 *
 * @param {PropTypes.Validator} validator
 * @param {string} reason
 */
export default function muiDeprecated(validator, reason) {
  if (process.env.MUI_SUPPRESS_DEPRECATION_WARNINGS) {
    return validator;
  }
  return deprecated(validator, reason);
}
