// @flow weak

import React, { PropTypes, Children, cloneElement } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import ButtonBase from '../internal/ButtonBase';
import Icon from '../Icon';

export const styleSheet = createStyleSheet('MuiIconButton', (theme) => {
  const { palette, transitions } = theme;

  return {
    iconButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flex: '0 0 auto',
      fontSize: 24,
      width: 48,
      height: 48,
      padding: 0,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      color: palette.action.active,
      zIndex: 1,
      transition: transitions.create('background-color', {
        duration: transitions.duration.shortest,
      }),
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
    label: {
      width: '100%',
      display: 'flex',
      alignItems: 'inherit',
      justifyContent: 'inherit',
    },
    icon: {
      width: '1em',
      height: '1em',
    },
    keyboardFocused: {
      backgroundColor: palette.text.divider,
    },
  };
});

/**
 * ```jsx
 * <IconButton>account_circle</IconButton>
 * ```
 *
 * You can refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icons.
 */
export default function IconButton(props, context) {
  const {
    accent,
    buttonRef,
    children,
    className,
    contrast,
    disabled,
    iconClassName: iconClassNameProp,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const iconClassName = classNames(classes.icon, iconClassNameProp);
  return (
    <ButtonBase
      className={classNames(classes.iconButton, {
        [classes.accent]: accent,
        [classes.contrast]: contrast,
        [classes.disabled]: disabled,
      }, className)}
      centerRipple
      keyboardFocusedClassName={classes.keyboardFocused}
      disabled={disabled}
      ref={buttonRef}
      {...other}
    >
      <span className={classes.label}>
        {typeof children === 'string' ?
          <Icon className={iconClassName}>{children}</Icon> :
          Children.map(children, (child) => {
            if (child.type && child.type.muiName === 'Icon') {
              return cloneElement(child, {
                className: classNames(iconClassName, child.props.className),
              });
            }

            return child;
          })
        }
      </span>
    </ButtonBase>
  );
}

IconButton.propTypes = {
  /**
   * If true, will use the theme's accent color.
   */
  accent: PropTypes.bool,
  /**
   * @ignore
   */
  buttonRef: PropTypes.func,
  /**
   * The icon element.
   * If a string is passed, it will be used as a material icon font ligature.
   * As a prerequisite, you must include the material icon font.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If true, will use the theme's contrast color.
   */
  contrast: PropTypes.bool,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The CSS class name of the icon element if child is a string.
   */
  iconClassName: PropTypes.string,
  /**
   * If false, the ripple effect will be disabled.
   */
  ripple: PropTypes.bool,
};

IconButton.defaultProps = {
  accent: false,
  contrast: false,
  disabled: false,
  ripple: true,
};

IconButton.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
