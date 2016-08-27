// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('IconButton', (theme) => {
  const { palette } = theme;
  return {
    root: {
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
      color: 'inherit',
      zIndex: 1,
      transition: theme.transitions.create('background-color', '150ms'),
    },
    label: {
      width: '100%',
      display: 'flex',
      alignItems: 'inherit',
      justifyContent: 'inherit',
    },
    keyboardFocused: {
      backgroundColor: theme.palette.text.divider,
    },
    primary: {
      color: palette.primary[500],
    },
    accent: {
      color: palette.accent.A200,
    },
  };
}, { index: 2 });

/**
 * @see https://material.google.com/components/buttons.html
 *
 * ```js
 * import IconButton from 'material-ui/IconButton';
 *
 * const Component = () => <IconButton>delete</IconButton>;
 * ```
 */
export default class IconButton extends Component {
  static propTypes = {
    /**
     * The icon element. If a string is passed,
     * it will be used as a material icon font ligature
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If true, the button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If false, the ripple effect will be disabled.
     */
    ripple: PropTypes.bool,
  };

  static defaultProps = {
    ripple: true,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const { children, className, ...other } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <ButtonBase
        className={classNames(classes.root, className)}
        centerRipple
        keyboardFocusedClassName={classes.keyboardFocused}
        {...other}
      >
        <span className={classes.label}>
          {typeof children === 'string' ? <span className="material-icons">{children}</span> : children}
        </span>
      </ButtonBase>
    );
  }
}
