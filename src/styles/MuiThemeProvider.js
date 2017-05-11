// @flow weak
import { Component } from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import { createStyleManager } from 'jss-theme-reactor/styleManager';
import jssPreset from 'jss-preset-default';
import createMuiTheme from './theme';

export const MUI_SHEET_ORDER = [
  'MuiGrid',
  'MuiCollapse',
  'MuiFade',
  'MuiSlide',

  'MuiBackdrop',
  'MuiModal',

  'MuiRipple',
  'MuiTouchRipple',

  'MuiButtonBase',

  'MuiFormLabel',
  'MuiFormGroup',

  'MuiTypography',
  'MuiPaper',
  'MuiDivider',

  'MuiPopover',

  'MuiButton',
  'MuiIconButton',

  'MuiSvgIcon',
  'MuiIcon',

  'MuiSwitchBase',
  'MuiSwitch',
  'MuiCheckbox',
  'MuiRadio',
  'MuiRadioGroup',
  'MuiSwitchLabel',

  'MuiDialog',
  'MuiDialogActions',
  'MuiDialogContent',
  'MuiDialogContentText',
  'MuiDialogTitle',

  'MuiTabIndicator',
  'MuiTab',
  'MuiTabs',

  'MuiBottomNavigationButton',
  'MuiBottomNavigation',

  'MuiCircularProgress',
  'MuiLinearProgress',

  'MuiAppBar',
  'MuiDrawer',

  'MuiAvatar',

  'MuiChip',

  'MuiListItem',
  'MuiListItemText',
  'MuiListItemSecondaryAction',
  'MuiListItemAvatar',
  'MuiListItemIcon',
  'MuiListSubheader',
  'MuiList',

  'MuiMenu',
  'MuiMenuItem',

  'MuiCardContent',
  'MuiCardMedia',
  'MuiCardActions',
  'MuiCardHeader',
  'MuiCard',

  'MuiTextFieldLabel',
  'MuiTextFieldInput',
  'MuiTextField',

  'MuiTable',
  'MuiTableHead',
  'MuiTableRow',
  'MuiTableCell',
  'MuiTableBody',
  'MuiTableSortLabel',
  'MuiToolbar',

  'MuiBadge',
];

export default class MuiThemeProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    styleManager: PropTypes.object,
    theme: PropTypes.object,
  };

  static childContextTypes = {
    styleManager: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  static createDefaultContext(props = {}) {
    const theme = props.theme || createMuiTheme();
    const styleManager = props.styleManager || createStyleManager({
      theme,
      jss: create(jssPreset()),
    });

    if (!styleManager.sheetOrder) {
      styleManager.setSheetOrder(MUI_SHEET_ORDER);
    }

    return { theme, styleManager };
  }

  getChildContext() {
    const { theme, styleManager } = this;
    return {
      theme,
      styleManager,
    };
  }

  componentWillMount() {
    const { theme, styleManager } = MuiThemeProvider.createDefaultContext(this.props);
    this.theme = theme;
    this.styleManager = styleManager;
  }

  componentWillUpdate(nextProps) {
    if (this.styleManager !== nextProps.styleManager) {
      const { theme, styleManager } = MuiThemeProvider.createDefaultContext(nextProps);
      this.theme = theme;
      this.styleManager = styleManager;
    } else if (this.theme && nextProps.theme && nextProps.theme !== this.theme) {
      this.theme = nextProps.theme;
      this.styleManager.updateTheme(this.theme);
    }
  }

  theme = undefined;
  styleManager = undefined;

  render() {
    return this.props.children;
  }
}
