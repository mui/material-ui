// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  root: {
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: theme.typography.pxToRem(24),
    width: 48,
    height: 48,
    padding: 0,
    borderRadius: '50%',
    color: theme.palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.active, 0.04),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
  },
  colorInherit: {
    color: 'inherit',
  },
  colorPrimary: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.04),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.main, 0.04),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
  label: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
});

/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */
function IconButton(props) {
  const { children, classes, className, color, disabled, ...other } = props;

  return (
    <ButtonBase
      className={classNames(
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'default',
          [classes.disabled]: disabled,
        },
        className,
      )}
      centerRipple
      focusRipple
      disabled={disabled}
      {...other}
    >
      <span className={classes.label}>{children}</span>
    </ButtonBase>
  );
}

IconButton.propTypes = {
  /**
   * The icon element.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple will be disabled.
   */
  disableRipple: PropTypes.bool,
};

IconButton.defaultProps = {
  color: 'default',
  disabled: false,
};

export default withStyles(styles, { name: 'MuiIconButton' })(IconButton);
