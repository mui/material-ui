// @flow weak

import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import ButtonBase from '../internal/ButtonBase';
import Icon from '../Icon';

export const styleSheet = createStyleSheet('MuiIconButton', (theme) => ({
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
    color: theme.palette.action.active,
    zIndex: 1,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
  accent: {
    color: theme.palette.accent.A200,
  },
  contrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
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
    backgroundColor: theme.palette.text.divider,
  },
}));

/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */
function IconButton(props) {
  const {
    accent,
    buttonRef,
    children,
    classes,
    className,
    contrast,
    disabled,
    disableRipple,
    iconClassName: iconClassNameProp,
    ...other
  } = props;
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
      ripple={!disableRipple}
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
   * If `true`, will use the theme's accent color.
   */
  accent: PropTypes.bool,
  /**
   * @ignore
   */
  buttonRef: PropTypes.func,
  /**
   * The icon element.
   * If a string is provided, it will be used as an icon font ligature.
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
   * If `true`, the icon button will use the theme's contrast color.
   */
  contrast: PropTypes.bool,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * The CSS class name of the icon element if child is a string.
   */
  iconClassName: PropTypes.string,
};

IconButton.defaultProps = {
  accent: false,
  contrast: false,
  disabled: false,
  disableRipple: false,
};

export default withStyles(styleSheet)(IconButton);
