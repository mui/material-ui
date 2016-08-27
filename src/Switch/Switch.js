// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import SwitchBase from '../internal/SwitchBase';

export const styleSheet = createStyleSheet('Switch', (theme) => {
  const { palette } = theme;
  return {
    root: {
      display: 'inline-flex',
      width: 62,
      position: 'relative',
    },
    bar: {
      borderRadius: 7,
      display: 'block',
      position: 'absolute',
      width: 34,
      height: 14,
      top: '50%',
      marginTop: -7,
      left: '50%',
      marginLeft: -17,
      backgroundColor: palette.type === 'light' ? '#000' : '#fff',
      opacity: 0.38,
      transition: theme.transitions.multi(['opacity', 'background-color'], '150ms'),
    },
    default: {
      color: palette.text.secondary,
      transition: theme.transitions.create('transform', '150ms'),
    },
    checked: {
      color: palette.accent[500],
      transform: 'translateX(14px)',
      '& + $bar': {
        backgroundColor: palette.accent[500],
        opacity: 0.5,
      },
    },
    icon: {
      boxShadow: theme.shadows[1],
      backgroundColor: palette.type === 'light' ? palette.grey[50] : palette.grey[400],
      width: 20,
      height: 20,
      borderRadius: '50%',
    },
    iconChecked: {
      boxShadow: theme.shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%',
    },
  };
}, { index: 5 });

export default function Switch(props, context) {
  const { className, checkedClassName, ...other } = props;
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <SwitchBase
        className={classNames(classes.default, className)}
        checkedClassName={classNames(classes.checked, checkedClassName)}
        icon={<div className={classes.icon} />}
        checkedIcon={<div className={classes.iconChecked} />}
        type="checkbox"
        {...other}
      />
      <div className={classes.bar} />
    </div>
  );
}

Switch.propTypes = {
  checkedClassName: PropTypes.string,
  className: PropTypes.string,
};

Switch.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
