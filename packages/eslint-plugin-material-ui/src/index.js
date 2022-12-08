/* eslint-disable global-require */
module.exports.rules = {
  'disallow-active-element-as-key-event-target': require('./rules/disallow-active-element-as-key-event-target'),
  'docgen-ignore-before-comment': require('./rules/docgen-ignore-before-comment'),
  'mui-name-matches-component-name': require('./rules/mui-name-matches-component-name'),
  'no-hardcoded-labels': require('./rules/no-hardcoded-labels'),
  'rules-of-use-theme-variants': require('./rules/rules-of-use-theme-variants'),
};
