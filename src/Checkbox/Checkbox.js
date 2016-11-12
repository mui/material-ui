// @flow weak
import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import SwitchBase from '../internal/SwitchBase';
export const styleSheet = createStyleSheet('Checkbox', (theme) => {
  const { palette } = theme;
  return {
    default: {
      color: theme.palette.text.secondary,
    },
    checked: {
      color: 'black',
    },
    icon: {
      boxShadow: theme.shadows[1],
      backgroundColor: palette.type === 'light' ? palette.grey[50] : palette.grey[400]
    },
    iconChecked: {
      boxShadow: theme.shadows[1]
    }
  };
});
export default function Checkbox(props, context) {
  const classes = context.styleManager.render(styleSheet);
  const {
    className,
    checkedClassName,
    icon,
    checkedIcon,
    ...other
  } = props;
  const passicon = icon || <i className={classNames(classes.icon, "fa fa-check-square-o fa-2x")}/>;
  const passcheckedIcon = checkedIcon || <i className={classNames(classes.iconChecked, "fa fa-check-square fa-2x")}/>;
  return (
    <SwitchBase
      className={classNames(classes.default, className)}
      checkedClassName={classNames(classes.checked, checkedClassName)}
      icon={passicon}
      checkedIcon={passcheckedIcon}
      {...other}
      isform/>
  );
}
Checkbox.propTypes = {
  checkedClassName: PropTypes.string,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};
Checkbox.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
