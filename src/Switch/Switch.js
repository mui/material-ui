// @flow weak

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import createSwitch from '../internal/SwitchBase';

export const styles = (theme: Object) => ({
  root: {
    display: 'inline-flex',
    width: 62,
    position: 'relative',
    flexShrink: 0,
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
  // For SwitchBase
  default: {
    zIndex: 1,
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
});

const SwitchBase = createSwitch();

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean | string,
  /**
   * The CSS class name of the root element when checked.
   */
  checkedClassName?: string,
  /**
   * The icon to display when the component is checked.
   * If a string is provided, it will be used as a font ligature.
   */
  checkedIcon?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   */
  defaultChecked?: boolean,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled?: boolean,
  /**
   * The CSS class name of the root element when disabled.
   */
  disabledClassName?: string,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple?: boolean,
  /**
   * The icon to display when the component is unchecked.
   * If a string is provided, it will be used as a font ligature.
   */
  icon?: Node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps?: Object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef?: Function,
  /*
   * @ignore
   */
  name?: string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange?: Function,
  /**
   * @ignore
   */
  tabIndex?: number | string,
  /**
   * The value of the component.
   */
  value?: string,
};

function Switch(props: ProvidedProps & Props) {
  const { classes, className, ...other } = props;
  const icon = <div className={classes.icon} />;

  return (
    <div className={classNames(classes.root, className)}>
      <SwitchBase
        icon={icon}
        classes={{
          default: classes.default,
          checked: classes.checked,
          disabled: classes.disabled,
        }}
        checkedIcon={icon}
        {...other}
      />
      <div className={classes.bar} />
    </div>
  );
}

export default withStyles(styles, { name: 'MuiSwitch' })(Switch);
