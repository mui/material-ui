import React, {Component, PropTypes} from 'react';
import propTypes from './buttonPropTypes';
import EnhancedButton from '../internal/EnhancedButton';
import getStyles from './buttonStyles';
import styleButtonChildren from './styleButtonChildren';

import {
  handleMouseDown,
  handleMouseUp,
  handleMouseLeave,
  handleMouseEnter,
  handleTouchStart,
  handleTouchEnd,
  handleKeyboardFocus,
} from './buttonEventHandlers';

class Button extends Component {
  static muiName = 'Button';
  static propTypes = propTypes;

  static defaultProps = {
    disabled: false,
    fullWidth: false,
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},
    primary: false,
    secondary: false,
    type: 'raised',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
    keyboardFocused: false,
    touched: false,
    initialZDepth: 0,
    zDepth: 0,
  };

  componentWillMount() {
    const zDepth = (this.props.type === 'fab') ? 2 : 1;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth,
    });
  }

  render() {
    const {
      children,
      fullWidth, // eslint-disable-line no-unused-vars
      mini, // eslint-disable-line no-unused-vars
      primary, // eslint-disable-line no-unused-vars
      rippleStyle,
      secondary, // eslint-disable-line no-unused-vars
      style,
      type, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const buttonEventHandlers = this.props.disabled ? {} : {
      onMouseDown: handleMouseDown.bind(this),
      onMouseUp: handleMouseUp.bind(this),
      onMouseLeave: handleMouseLeave.bind(this),
      onMouseEnter: handleMouseEnter.bind(this),
      onTouchStart: handleTouchStart.bind(this),
      onTouchEnd: handleTouchEnd.bind(this),
      onKeyboardFocus: handleKeyboardFocus.bind(this),
    };

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const mergedRootStyles = Object.assign({}, styles.root, style);
    const mergedRippleStyles = prepareStyles(Object.assign({}, styles.ripple, rippleStyle));
    const enhancedButtonChildren = styleButtonChildren(this.context, children, styles);

    return (
      <EnhancedButton
        {...other}
        {...buttonEventHandlers}
        style={mergedRootStyles}
        focusRippleColor={mergedRippleStyles.color}
        touchRippleColor={mergedRippleStyles.color}
        focusRippleOpacity={mergedRippleStyles.opacity}
        touchRippleOpacity={mergedRippleStyles.opacity}
      >
        {enhancedButtonChildren}
      </EnhancedButton>
    );
  }
}

export default Button;
