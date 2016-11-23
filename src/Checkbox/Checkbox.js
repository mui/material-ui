// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import SwitchBase from '../internal/SwitchBase';
import SelectionLabel from '../internal/SelectionLabel';

export const styleSheet = createStyleSheet('Checkbox', (theme) => {
  return {
    default: {
      color: theme.palette.text.secondary,
    },
    checked: {
      color: theme.palette.accent[500],
    },
  };
});

export default function Checkbox(props, context) {
  const { className, checkedClassName, label, labelClassName, ...other } = props;
  const classes = context.styleManager.render(styleSheet);
  return (
    <SelectionLabel label={label} className={labelClassName}>
      <SwitchBase
        className={classNames(classes.default, className)}
        checkedClassName={classNames(classes.checked, checkedClassName)}
        aria-label={label}
        {...other}
      />
    </SelectionLabel>
  );
}

Checkbox.propTypes = {
  checkedClassName: PropTypes.string,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  label: PropTypes.node,
  labelClassName: PropTypes.string,
};

Checkbox.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
