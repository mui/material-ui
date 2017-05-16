// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiIcon', (theme) => {
  return {
    root: {
      userSelect: 'none',
    },
    accent: {
      color: theme.palette.accent.A200,
    },
    action: {
      color: theme.palette.action.active,
    },
    contrast: {
      color: theme.palette.getContrastText(theme.palette.primary[500]),
    },
    disabled: {
      color: theme.palette.action.disabled,
    },
    error: {
      color: theme.palette.error[500],
    },
    primary: {
      color: theme.palette.primary[500],
    },
  };
});

/**
 * ```jsx
 * <Icon>account_circle</Icon>
 * ```
 */
function Icon(props, context) {
  const {
    accent,
    action,
    children,
    className: classNameProp,
    contrast,
    disabled,
    error,
    primary,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(
    'material-icons',
    classes.root,
    {
      [classes.accent]: accent,
      [classes.action]: action,
      [classes.contrast]: contrast,
      [classes.disabled]: disabled,
      [classes.error]: error,
      [classes.primary]: primary,
    },
    classNameProp);

  return (
    <span className={className} {...other}>
      {children}
    </span>
  );
}

Icon.propTypes = {
  /**
   * If `true`, the button will use the theme's accent color.
   */
  accent: PropTypes.bool,
  /**
   * If `true`, the button will use the theme's action.active color.
   */
  action: PropTypes.bool,
  /**
   * The name of the icon font ligature.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the button will contrast the theme's primary color.
   */
  contrast: PropTypes.bool,
  /**
   * If `true`, the button will use the theme's action.disabled color.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the text will use the theme's error color.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the button will use the theme's primary color.
   */
  primary: PropTypes.bool,
};

Icon.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

Icon.defaultProps = {
  accent: false,
  action: false,
  contrast: false,
  disabled: false,
  error: false,
  primary: false,
};

Icon.muiName = 'Icon';

export default Icon;
