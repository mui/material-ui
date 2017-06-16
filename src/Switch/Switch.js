// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import createSwitch from '../internal/SwitchBase';

export const styleSheet = createStyleSheet('MuiSwitch', theme => ({
  root: {
    display: 'inline-flex',
    width: 62,
    position: 'relative',
  },
  default: {
    color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  checked: {
    color: theme.palette.primary[500],
    transform: 'translateX(14px)',
    '& + $bar': {
      backgroundColor: theme.palette.primary[500],
      opacity: 0.5,
    },
  },
  disabled: {
    color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
    '& + $bar': {
      backgroundColor: theme.palette.type === 'light' ? '#000' : '#fff',
      opacity: theme.palette.type === 'light' ? 0.12 : 0.1,
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
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    backgroundColor: theme.palette.type === 'light' ? '#000' : '#fff',
    opacity: theme.palette.type === 'light' ? 0.38 : 0.3,
  },
  icon: {
    boxShadow: theme.shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%',
  },
}));

const SwitchBase = createSwitch({ styleSheet });

function Switch(props) {
  const { classes, className, ...other } = props;

  const icon = <div className={classes.icon} />;

  return (
    <div className={classNames(classes.root, className)}>
      <SwitchBase icon={icon} checkedIcon={icon} {...other} />
      <div className={classes.bar} />
    </div>
  );
}

Switch.propTypes = {
  /**
   * If `true`, the component appears selected.
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
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   * If a string is provided, it will be used as a font ligature.
   */
  icon: PropTypes.node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /*
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the  is changed.
   *
   * @param {object} event `change` event
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  tabIndex: PropTypes.string,
  /**
   * The value of the component.
   */
  value: PropTypes.string,
};

export default withStyles(styleSheet)(Switch);
