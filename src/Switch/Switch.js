// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import SwitchBase from '../internal/SwitchBase';
import SelectionLabel from '../internal/SelectionLabel';

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
      opacity: 1, // Reset the IconButton opacity
      color: palette.type === 'light' ? palette.grey[400] : palette.grey[800],
      '& + $bar': {
        opacity: 0.10,
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
      backgroundColor: palette.type === 'light' ? '#000' : '#fff',
      opacity: 0.38,
      transition: theme.transitions.multi(['opacity', 'background-color'], '150ms'),
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

export default function Switch(props, context) {
  const {
    className,
    checkedClassName,
    disabled,
    disabledClassName,
    label,
    labelClassName,
    labelReverse,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  const icon = <div className={classes.icon} />;
  const switchProps = {
    className: classes.default,
    checkedClassName: classNames(classes.checked, checkedClassName),
    disabledClassName: classNames(classes.disabled, disabledClassName),
    icon,
    checkedIcon: icon,
    type: 'checkbox',
    disabled,
    ...other,
  };

  if (label) {
    return (
      <SelectionLabel
        label={label}
        labelReverse={labelReverse}
        className={labelClassName}
        disabled={disabled}
      >
        <div className={classNames(classes.root, className)}>
          <SwitchBase aria-label={label} {...switchProps} />
          <div className={classes.bar} />
        </div>
      </SelectionLabel>
    );
  }

  return (
    <div className={classNames(classes.root, className)}>
      <SwitchBase {...switchProps} />
      <div className={classes.bar} />
    </div>
  );
}

Switch.propTypes = {
  /**
   * The CSS class name of the switch element when checked.
   */
  checkedClassName: PropTypes.string,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the control will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The CSS class name of the switch element when disabled.
   */
  disabledClassName: PropTypes.string,
  /**
   * The text to be used in an enclosing label element.
   */
  label: PropTypes.node,
  /**
   * The className to be used in an enclosing label element.
   */
  labelClassName: PropTypes.string,
  /**
   * Will reverse the order of the element and the label.
   */
  labelReverse: PropTypes.bool,
};

Switch.defaultProps = {
  disabled: false,
  labelReverse: false,
};

Switch.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
