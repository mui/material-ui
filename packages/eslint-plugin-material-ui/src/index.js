/* eslint-disable global-require */

module.exports.rules = {
  'docgen-ignore-before-comment': require('./rules/docgen-ignore-before-comment'),
  'no-hardcoded-labels': require('./rules/no-hardcoded-labels'),
  'restricted-path-imports': require('./rules/restricted-path-imports'),
};
