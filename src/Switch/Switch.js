// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { createSwitch } from '../internal/SwitchBase';
import withSwitchLabel from '../internal/withSwitchLabel';

export const styleSheet = createStyleSheet('Switch', (theme) => {
  const { palette } = theme;
  return {
    root: {
      display: 'inline-flex',
      width: 62,
      position: 'relative',
    },
    default: {
      color: palette.type === 'light' ? palette.grey[50] : palette.grey[400],
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
    disabled: {
      color: palette.type === 'light' ? palette.grey[400] : palette.grey[800],
      '& + $bar': {
        backgroundColor: palette.type === 'light' ? '#000' : '#fff',
        opacity: palette.type === 'light' ? 0.12 : 0.1,
      },
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
      transition: theme.transitions.multi(['opacity', 'background-color'], '150ms'),
      backgroundColor: palette.type === 'light' ? '#000' : '#fff',
      opacity: palette.type === 'light' ? 0.38 : 0.3,
    },
    icon: {
      boxShadow: theme.shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%',
    },
  };
});

const SwitchBase = createSwitch({ styleSheet });

function Switch(props, context) {
  const {
    className,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const icon = <div className={classes.icon} />;

  return (
    <div className={classNames(classes.root, className)}>
      <SwitchBase icon={icon} checkedIcon={icon} {...other} />
      <div className={classes.bar} />
    </div>
  );
}

Switch.propTypes = {
  className: PropTypes.string,
};

Switch.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};


export default Switch;

const LabelSwitch = withSwitchLabel(Switch);

export { LabelSwitch };
