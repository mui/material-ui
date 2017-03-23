// @flow weak

// Components whose name does not map as `name` -> `names` or `name-subname` -> `names`
// The resulting name is used in the demo path.
// 'component-name': 'demo-directory'
export const componentMap = {
  'bottom-navigation': 'bottom-navigation',
  'bottom-navigation-button': 'bottom-navigation',
  'circular-progress': 'progress',
  'icon-button': 'buttons',
  layout: 'layout',
  'linear-progress': 'progress',
  'mui-theme-provider': 'mui-theme-provider',
  paper: 'paper',
  'radio-group': 'selection-controls',
  'svg-icon': 'svg-icon',
  tabs: 'tabs',
  text: 'text',
  'text-field': 'text-fields',
  'form-control': 'selection-controls',
  'form-group': 'selection-controls',
  'form-label': 'selection-controls',
};

// components whose demo is not at `demos/component`
export const demoPaths = {
  layout: 'layout/responsive-ui',
  'mui-theme-provider': 'customization/themes',
  'svg-icon': 'style/icons',
  text: 'style/typography',
};
