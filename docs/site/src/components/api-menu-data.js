export const apiMenuData = {
  'avatars': [
    'avatar'
  ],
  'bottom-navigation': [
    'bottom-navigation',
    'bottom-navigation-button',
  ],
  'buttons': [
    'button',
    'icon-button',
  ],
  'cards': [
    'card',
    'card-actions',
    'card-content',
    'card-header',
    'card-media',
  ],
  'chips': [
    'chip',
  ],
  'dialogs': [
    'dialog',
    'dialog-actions',
    'dialog-content',
    'dialog-content-text',
    'dialog-title',
  ],
  'dividers': [
    'divider'
  ],
  'icons': [
    'svg-icon',
  ],
  'responsive-ui': [
    'layout',
  ],
  'lists': [
    'list',
    'list-item',
    'list-item-icon',
    'list-item-secondary-action',
    'list-item-text',
    'list-subheader',
  ],
  'menus': [
    'menu',
    'menu-item',
    'menu-list',
  ],
  'paper': [
    'paper',
  ],
  'progress': [
    'circular-progress',
    'linear-progress',
  ],
  'selection-controls': [
    'form-control',
    'form-group',
    'form-label',
    'radio-group',
  ],
  'tables': [
    'table',
    'table-body',
    'table-cell',
    'table-head',
    'table-row',
    'table-sort-label',
  ],
  'tabs': [
    'tabs',
    'tab',
    'tab-indicator',
  ],
  'typography': [
    'text',
  ],
  'usage': [
    'mui-theme-provider',
  ],
};

// Components whose name does not map `name` -> `names` or `name-subname` -> `names`
// The resulting name is used to select the menu content, and in the path to the demo
export const componentMap = {
  'bottom-navigation': 'bottom-navigation',
  'bottom-navigation-button': 'bottom-navigation',
  'circular-progress': 'progress',
  'icon-button': 'buttons',
  'layout': 'layout',
  'linear-progress': 'progress',
  'mui-theme-provider': 'mui-theme-provider',
  'paper': 'paper',
  'radio-group': 'selection-controls',
  'svg-icon': 'svg-icon',
  'tabs': 'tabs',
  'text': 'text',
  'text-fields': 'text-fields',
  'form-control': 'selection-controls',
  'form-group': 'selection-controls',
  'form-label': 'selection-controls',
};

// components whose demo is not at `demos/components`
export const demoPaths = {
  'layout': 'layout/responsive-ui',
  'mui-theme-provider': 'getting-started/usage',
  'svg-icon': 'style/icons',
  'text': 'style/typography',
};
