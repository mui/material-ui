// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('IconButton', (theme) => {
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
      color: palette.type === 'light' ? palette.text.secondary : palette.text.primary,
      zIndex: 1,
      transition: transitions.create('background-color', '150ms'),
    },
    disabled: {
      opacity: theme.opacity.disabled,
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
      '& .material-icons': {
        width: '1em',
        height: '1em',
      },
    },
    keyboardFocused: {
      backgroundColor: palette.text.divider,
    },
  };
});

/**
 * @see https://material.google.com/components/buttons.html
 *
 * ```js
 * import IconButton from 'material-ui/IconButton';
 *
 * const Component = () => <IconButton>delete</IconButton>;
 * ```
 */
export default function IconButton(props, context) {
  const {
    accent,
    children,
    className,
    contrast,
    disabled,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

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
      {...other}
    >
      <span className={classNames(classes.label)}>
        {typeof children === 'string' ?
          <span className="material-icons">{children}</span> : children
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
   * The icon element. If a string is passed,
   * it will be used as a material icon font ligature.
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
  styleManager: PropTypes.object.isRequired,
};
