// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { fade, withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { capitalize } from '@material-ui/core/utils/helpers';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.button,
    boxSizing: 'border-box',
    height: 48,
    minWidth: 49,
    padding: '0px 11px 0px 12px',
    border: `1px solid ${fade(theme.palette.action.active, 0.12)}`,
    color: fade(theme.palette.action.active, 0.38),
    '&:not(:first-child)': {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
    },
    '&$selected': {
      color: theme.palette.action.active,
      backgroundColor: fade(theme.palette.action.active, 0.12),
      '&:hover': {
        backgroundColor: fade(theme.palette.action.active, 0.15),
      },
      '& + &': {
        borderLeft: 0,
        marginLeft: 0,
      },
    },
    '&$disabled': {
      color: fade(theme.palette.action.disabled, 0.12),
    },
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: fade(theme.palette.text.primary, 0.05),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
    '&:first-child': {
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
    },
    '&:last-child': {
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2,
      paddingLeft: 12,
    },
  },
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `selected={true}`. */
  selected: {},
  /* Styles applied to the `label` wrapper element. */
  label: {
    width: '100%', // Ensure the correct width for iOS Safari
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    height: 40,
    minWidth: 41,
    fontSize: theme.typography.pxToRem(13),
  },
  /* Styles applied to the root element if `size="large"`. */
  sizeLarge: {
    height: 56,
    minWidth: 57,
    fontSize: theme.typography.pxToRem(15),
  },
});

const ToggleButton = React.forwardRef(function ToggleButton(props, ref) {
  const {
    children,
    classes,
    className,
    disabled,
    disableFocusRipple,
    onChange,
    onClick,
    selected,
    size,
    value,
    ...other
  } = props;

  const handleChange = event => {
    if (onClick) {
      onClick(event, value);
      if (event.isDefaultPrevented()) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return (
    <ButtonBase
      className={clsx(
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.selected]: selected,
          [classes[`size${capitalize(size)}`]]: size !== 'medium',
        },
        className,
      )}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      ref={ref}
      onClick={handleChange}
      onChange={onChange}
      value={value}
      {...other}
    >
      <span className={classes.label}>{children}</span>
    </ButtonBase>
  );
});

ToggleButton.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the button will be rendered in an active state.
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: PropTypes.any.isRequired,
};

ToggleButton.defaultProps = {
  disabled: false,
  disableFocusRipple: false,
  disableRipple: false,
  size: 'medium',
};

export default withStyles(styles, { name: 'MuiToggleButton' })(ToggleButton);
