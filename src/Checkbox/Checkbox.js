// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import SwitchBase from '../internal/SwitchBase';

export const styleSheet = createStyleSheet('Checkbox', (theme) => {
  return {
    default: {
      color: theme.palette.text.secondary,
    },
    checked: {
      color: theme.palette.accent[500],
    },
    label: {
      marginLeft: -12,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
  };
});

export default function Checkbox(props, context) {
  const { className, checkedClassName, label, labelClassName, ...other } = props;
  const classes = context.styleManager.render(styleSheet);
  return (
    <label className={classNames(classes.label, labelClassName)} role="presentation">
      <SwitchBase
        className={classNames(classes.default, className)}
        checkedClassName={classNames(classes.checked, checkedClassName)}
        aria-label={label}
        {...other}
      />
      <span aria-hidden="true" role="presentation">{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  checkedClassName: PropTypes.string,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
};

Checkbox.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
