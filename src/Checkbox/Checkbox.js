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
  };
}, { index: -10 });

export default function Checkbox(props, context) {
  const { className, checkedClassName, ...other } = props;
  const classes = context.styleManager.render(styleSheet);
  return (
    <SwitchBase
      className={classNames(classes.default, className)}
      checkedClassName={classNames(classes.checked, checkedClassName)}
      {...other}
    />
  );
}

Checkbox.propTypes = {
  checkedClassName: PropTypes.string,
  className: PropTypes.string,
};

Checkbox.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
