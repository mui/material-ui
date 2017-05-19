// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiIcon', (theme) => ({
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
}));

function Icon(props) {
  const {
    accent,
    action,
    children,
    classes,
    className: classNameProp,
    contrast,
    disabled,
    error,
    primary,
    ...other
  } = props;

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
    <span className={className} aria-hidden="true" {...other}>
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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
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

Icon.defaultProps = {
  accent: false,
  action: false,
  contrast: false,
  disabled: false,
  error: false,
  primary: false,
};

Icon.muiName = 'Icon';

export default withStyles(styleSheet)(Icon);
