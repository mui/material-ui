import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import {TouchRipple, createRippleHandler} from '../Ripple';

export const styleSheet = createStyleSheet('IconButton', (theme) => {
  const {palette} = theme;
  return {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      width: 48,
      height: 48,
      padding: 0,
      outline: 'none',
      border: 10,
      borderRadius: '50%',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: 'inherit',
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

  ripple = undefined;

  handleMouseDown = createRippleHandler(this, 'MouseDown', 'start');
  handleMouseUp = createRippleHandler(this, 'MouseUp', 'stop');
  handleMouseLeave = createRippleHandler(this, 'MouseLeave', 'stop');
  handleTouchStart = createRippleHandler(this, 'TouchStart', 'start');
  handleTouchEnd = createRippleHandler(this, 'TouchEnd', 'stop');
  handleBlur = createRippleHandler(this, 'Blur', 'stop');

  render() {
    const {children, className, ripple, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <button
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleTouchEnd}
        onTouchStart={this.handleTouchStart}
        className={ClassNames(classes.root, className)}
        {...other}
      >
        <span className="material-icons">{children}</span>
        {ripple && <TouchRipple center={true} ref={(c) => this.ripple = c} />}
      </button>
    );
  }
}

export default IconButton;
