// @flow weak
import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('Icon', (theme) => {
  const { palette } = theme;
  return {
    action: {
      color: palette.action.active,
    },
    disabled: {
      color: palette.action.disabled,
    },
    accent: {
      color: palette.accent.A200,
    },
    contrast: {
      color: palette.getContrastText(palette.primary[500]),
    },
    primary: {
      color: palette.primary[500],
    },
    error: {
      color: palette.error[500],
    },
  };
});

/**
 *
 * ```jsx
 * <Icon>account_circle</Icon>
 * ```
 */
const Icon = (props, context) => {
  const {
    children,
    className: classNameProp,
    disabled,
    accent,
    action,
    error,
    primary,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(
    'material-icons',
    {
      [classes.primary]: primary,
      [classes.accent]: accent,
      [classes.action]: action,
      [classes.disabled]: disabled,
      [classes.error]: error,
    },
    classNameProp);

  return (<span className={className} {...other}>{children}</span>);
};

Icon.propTypes = {
  /**
   * If true, the button will use the theme's accent color.
   */
  accent: PropTypes.bool,
  /**
   * If true, the button will use the theme's action.active color.
   */
  action: PropTypes.bool,
  /**
   * The name of the icon
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If true, the button will use the theme's action.disabled color.
   */
  disabled: PropTypes.bool,
  /**
   * If true, the text will use the theme's error color
   */
  error: PropTypes.bool,
  /**
   * If true, the button will use the theme's primary color.
   */
  primary: PropTypes.bool,
};

Icon.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

Icon.defaultProps = {
  accent: false,
  action: false,
  disabled: false,
  error: false,
  primary: false,
};

Icon.muiName = 'Icon';

export default Icon;
