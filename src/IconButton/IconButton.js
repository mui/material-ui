import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import ButtonBase from '../Button/ButtonBase';

export const styleSheet = createStyleSheet('IconButton', (theme) => {
  const {palette} = theme;
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 24,
      width: 48,
      height: 48,
      padding: 0,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      color: 'inherit',
      transition: theme.transitions.create('background-color'),
    },
    label: {
      width: '100%',
      display: 'inherit',
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
});

export default class IconButton extends Component {
  static propTypes = {
    /**
     * Can be used to pass a `FontIcon` element as the icon for the button.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If true, the element will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If false, the element's ripple effect will be disabled.
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
    const {children, className, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});
    return (
      <ButtonBase
        className={ClassNames(classes.root, className)}
        centerRipple={true}
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
