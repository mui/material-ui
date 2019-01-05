// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import { componentPropType } from '@material-ui/utils';
import ButtonBase from '../ButtonBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import { capitalize } from '@material-ui/core/utils/helpers';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    lineHeight: 1.75, // To remove with v4.
    ...theme.typography.button,
    textTransform: null,
    boxSizing: 'border-box',
    minWidth: 64,
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
    },
  },
  /* Styles applied to the span element that wraps the children. */
  label: {
    width: '100%', // assure the correct width for iOS Safari
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  /* Styles applied to the root element if `color="primary"`. */
  primary: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element if `color="secondary"`. */
  secondary: {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: 'inherit',
  },
  /* Styles applied to the ButtonBase root element if the link is keyboard focused. */
  focusVisible: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    padding: '4px 8px',
    minWidth: 64,
    fontSize: theme.typography.pxToRem(13),
  },
  /* Styles applied to the root element if `size="large"`. */
  sizeLarge: {
    padding: '8px 24px',
    fontSize: theme.typography.pxToRem(15),
  },
});

function Link(props) {
  const {
    children,
    classes,
    className: classNameProp,
    color,
    disabled,
    disableFocusRipple,
    focusVisibleClassName,
    size,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    {
      [classes.primary]: color === 'primary',
      [classes.secondary]: color === 'secondary',
      [classes.colorInherit]: color === 'inherit',
      [classes.disabled]: disabled,
      [classes[`size${capitalize(size)}`]]: size !== 'medium',
    },
    classNameProp,
  );

  return (
    <ButtonBase
      className={className}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={classNames(classes.focusVisible, focusVisibleClassName)}
      {...other}
    >
      <span className={classes.label}>{children}</span>
    </ButtonBase>
  );
}

Link.propTypes = {
  /**
   * The content of the link.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: componentPropType,
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
  focusVisibleClassName: PropTypes.string,
  /**
   * The size of the link.
   * `small` is equivalent to the dense button styling.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Link.defaultProps = {
  color: 'default',
  component: 'a',
  disabled: false,
  disableFocusRipple: false,
  size: 'medium',
};

export default withStyles(styles, { name: 'MuiLink' })(Link);
