// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import createSwitch from '../internal/SwitchBase';
import withSwitchLabel from '../internal/withSwitchLabel';

export const styleSheet = createStyleSheet('MuiCheckbox', (theme) => ({
  default: {
    color: theme.palette.text.secondary,
  },
  checked: {
    color: theme.palette.primary[500],
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
}));

const Checkbox = createSwitch({ styleSheet });

Checkbox.displayName = 'Checkbox';

export default Checkbox;

const LabelCheckbox = withSwitchLabel(Checkbox);

export { LabelCheckbox };

export const CheckboxDocs = () => <span />;

CheckboxDocs.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * The CSS class name of the root element when checked.
   */
  checkedClassName: PropTypes.string,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The CSS class name of the root element when disabled.
   */
  disabledClassName: PropTypes.string,
  /**
   * The icon to display when the component is unchecked.
   * If a string is provided, it will be used as a font ligature.
   */
  icon: PropTypes.node,
  /*
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event `change` event
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * If `false`, the ripple effect will be disabled.
   */
  ripple: PropTypes.bool,
  /**
   * @ignore
   */
  tabIndex: PropTypes.string,
  /**
   * The value of the component.
   */
  value: PropTypes.string,
};
