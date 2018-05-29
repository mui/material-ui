import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clamp from '../utils/clamp';

export const style = theme => {
  const commonTransitionsOptions = {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeOut,
  };

  const commonTransitionsProperty = ['width', 'height', 'box-shadow', 'left', 'top'];

  const commonTransitions = theme.transitions.create(
    commonTransitionsProperty,
    commonTransitionsOptions,
  );

  const colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.grey[400],
    focused: theme.palette.grey[500],
    disabled: theme.palette.grey[400],
  };

  return {
    // /* Styles for root node */
    root: {
      position: 'relative',
      width: '100%',
      margin: '10px 0',
      padding: '6px 0',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
      '&$disabled': {
        cursor: 'no-drop',
      },
      '&$vertical': {
        height: '100%',
        margin: '0 10px',
        padding: '0 6px',
      },
      '&$reverse': {
        transform: 'scaleX(-1)',
      },
      '&$vertical$reverse': {
        transform: 'scaleY(-1)',
      },
    },
    /* Tracks styles */
    track: {
      position: 'absolute',
      transform: 'translate(0, -50%)',
      top: '50%',
      height: 2,
      '&$focused, &$activated': {
        transition: 'none',
        backgroundColor: colors.focused,
      },
      '&$disabled': {
        backgroundColor: colors.secondary,
      },
      '&$vertical': {
        transform: 'translate(-50%, 0)',
        left: '50%',
        top: 'initial',
        width: 2,
      },
      '&$jumped': {
        backgroundColor: colors.focused,
      },
    },
    trackBefore: {
      zIndex: 1,
      left: 0,
      backgroundColor: colors.primary,
      transition: commonTransitions,
      '&$focused, &$activated, &$jumped': {
        backgroundColor: colors.primary,
      },
    },
    trackAfter: {
      right: 0,
      backgroundColor: colors.secondary,
      transition: commonTransitions,
      '&$vertical': {
        bottom: 0,
      },
    },
    /* Thumb styles  */
    thumb: {
      position: 'absolute',
      zIndex: 2,
      transform: 'translate(-50%, -50%)',
      width: 12,
      height: 12,
      borderRadius: '50%',
      transition: commonTransitions,
      backgroundColor: colors.primary,
      '&$focused': {
        boxShadow: `0px 0px 0px 9px ${fade(colors.primary, 0.16)}`,
      },
      '&$activated': {
        width: 17,
        height: 17,
        transition: 'none',
      },
      '&$disabled': {
        cursor: 'no-drop',
        width: 9,
        height: 9,
        backgroundColor: colors.disabled,
      },
      '&$zero': {
        border: `2px solid ${colors.disabled}`,
        backgroundColor: 'transparent',
      },
      '&$focused$zero': {
        border: `2px solid ${colors.focused}`,
        backgroundColor: fade(colors.focused, 0.34),
        boxShadow: `0px 0px 0px 9px ${fade(colors.focused, 0.34)}`,
      },
      '&$activated$zero': {
        border: `2px solid ${colors.focused}`,
      },
      '&$jumped': {
        width: 17,
        height: 17,
      },
    },
    focused: {},
    activated: {},
    disabled: {},
    zero: {},
    vertical: {},
    reverse: {},
    jumped: {},
  };
};

function addEventListener(node, event, handler, capture) {
  node.addEventListener(event, handler, capture);
  return {
    remove: function remove() {
      node.removeEventListener(event, handler, capture);
    },
  };
}

function percentToValue(percent, min, max) {
  return (max - min) * percent / 100 + min;
}

function roundToStep(number, step) {
  return Math.round(number / step) * step;
}

function getOffset(node) {
  const { scrollY, scrollX } = global;
  const { left, top } = node.getBoundingClientRect();

  return {
    top: top + scrollY,
    left: left + scrollX,
  };
}

function getMousePosition(event) {
  if (event.changedTouches && event.changedTouches[0]) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY,
    };
  }

  return {
    x: event.pageX,
    y: event.pageY,
  };
}

function calculatePercent(node, event, isVertical, isReverted) {
  const { width, height } = node.getBoundingClientRect();
  const { top, left } = getOffset(node);
  const { x, y } = getMousePosition(event);

  const value = isVertical ? y - top : x - left;
  const onePercent = (isVertical ? height : width) / 100;

  return isReverted ? 100 - clamp(value / onePercent) : clamp(value / onePercent);
}

function preventPageScrolling(event) {
  event.preventDefault();
}

class Slider extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.disabled) {
      return { currentState: 'disabled' };
    }

    if (!nextProps.disabled && prevState.currentState === 'disabled') {
      return { currentState: 'normal' };
    }

    return null;
  }

  state = { currentState: 'initial' };

  componentDidMount() {
    if (this.container) {
      this.container.addEventListener('touchstart', preventPageScrolling, { passive: false });
    }
  }

  componentWillUnmount() {
    this.container.removeEventListener('touchstart', preventPageScrolling, { passive: false });
  }

  emitChange(event, rawValue, callback) {
    const { step, value: previousValue, onChange } = this.props;
    let value = rawValue;

    if (step) {
      value = roundToStep(rawValue, step);
    } else {
      value = Number(rawValue.toFixed(3));
    }

    if (typeof onChange === 'function' && value !== previousValue) {
      onChange(event, value);

      if (typeof callback === 'function') {
        callback();
      }
    }
  }

  calculateTrackAfterStyles(percent) {
    const { currentState } = this.state;

    switch (currentState) {
      case 'activated':
        return `calc(100% - ${percent === 0 ? 7 : 5}px)`;
      case 'disabled':
        return `calc(${100 - percent}% - 6px)`;
      default:
        return 'calc(100% - 5px)';
    }
  }

  calculateTrackBeforeStyles(percent) {
    const { currentState } = this.state;

    switch (currentState) {
      case 'disabled':
        return `calc(${percent}% - 6px)`;
      default:
        return `${percent}%`;
    }
  }

  handleKeyDown = event => {
    const { min, max, value: currentValue } = this.props;

    const onePercent = Math.abs((max - min) / 100);
    const step = this.props.step || onePercent;
    let value;

    switch (keycode(event)) {
      case 'home':
        value = min;
        break;
      case 'end':
        value = max;
        break;
      case 'page up':
        value = currentValue + onePercent * 10;
        break;
      case 'page down':
        value = currentValue - onePercent * 10;
        break;
      case 'right':
      case 'up':
        value = currentValue + step;
        break;
      case 'left':
      case 'down':
        value = currentValue - step;
        break;
      default:
        return;
    }

    event.preventDefault();

    value = clamp(value, min, max);

    this.emitChange(event, value);
  };

  handleFocus = () => {
    this.setState({ currentState: 'focused' });
  };

  handleBlur = () => {
    this.setState({ currentState: 'normal' });
  };

  handleClick = event => {
    const { min, max, vertical, reverse } = this.props;
    const percent = calculatePercent(this.container, event, vertical, reverse);
    const value = percentToValue(percent, min, max);

    this.emitChange(event, value, () => {
      this.playJumpAnimation();
    });
  };

  handleTouchStart = event => {
    this.setState({ currentState: 'activated' });

    this.globalMouseUpListener = addEventListener(document, 'touchend', this.handleMouseUp);

    if (typeof this.props.onDragStart === 'function') {
      this.props.onDragStart(event);
    }
  };

  handleMouseDown = event => {
    this.setState({ currentState: 'activated' });

    this.globalMouseUpListener = addEventListener(document, 'mouseup', this.handleMouseUp);
    this.globalMouseMoveListener = addEventListener(document, 'mousemove', this.handleMouseMove);

    if (typeof this.props.onDragEnd === 'function') {
      this.props.onDragEnd(event);
    }
  };

  handleMouseUp = event => {
    this.setState({ currentState: 'normal' });

    if (this.globalMouseUpListener) {
      this.globalMouseUpListener.remove();
    }

    if (this.globalMouseMoveListener) {
      this.globalMouseMoveListener.remove();
    }

    if (typeof this.props.onDragEnd === 'function') {
      this.props.onDragEnd(event);
    }
  };

  handleMouseMove = event => {
    const { min, max, vertical, reverse } = this.props;
    const percent = calculatePercent(this.container, event, vertical, reverse);
    const value = percentToValue(percent, min, max);

    this.emitChange(event, value);
  };

  playJumpAnimation() {
    this.setState({ currentState: 'jumped' }, () => {
      setTimeout(() => {
        this.setState({ currentState: 'normal' });
      }, this.props.theme.transitions.duration.complex);
    });
  }

  render() {
    const { currentState } = this.state;
    const {
      component: Component,
      classes,
      className: classNameProp,
      value,
      min,
      max,
      vertical,
      reverse,
      disabled,
      ...other
    } = this.props;

    const percent = clamp((value - min) * 100 / (max - min));

    const commonClasses = {
      [classes.disabled]: disabled,
      [classes.jumped]: !disabled && currentState === 'jumped',
      [classes.focused]: !disabled && currentState === 'focused',
      [classes.activated]: !disabled && currentState === 'activated',
    };

    const rootClasses = classNames(classes.root, {
      [classes.vertical]: vertical,
      [classes.reverse]: reverse,
      [classes.disabled]: disabled,
      classNameProp,
    });

    const trackBeforeClasses = classNames(classes.track, classes.trackBefore, commonClasses, {
      [classes.vertical]: vertical,
    });

    const trackAfterClasses = classNames(classes.track, classes.trackAfter, commonClasses, {
      [classes.vertical]: vertical,
    });

    const thumbClasses = classNames(classes.thumb, commonClasses, {
      [classes.zero]: percent === 0,
    });

    const trackProperty = vertical ? 'height' : 'width';
    const thumbProperty = vertical ? 'top' : 'left';
    const inlineTrackBeforeStyles = { [trackProperty]: this.calculateTrackBeforeStyles(percent) };
    const inlineTrackAfterStyles = { [trackProperty]: this.calculateTrackAfterStyles(percent) };
    const inlineThumbStyles = { [thumbProperty]: `${percent}%` };

    return (
      <Component
        role="slider"
        className={rootClasses}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        onClick={this.handleClick}
        ref={node => {
          this.container = findDOMNode(node);
        }}
        {...other}
      >
        <div className={trackBeforeClasses} style={inlineTrackBeforeStyles} />
        <ButtonBase
          className={thumbClasses}
          disableRipple
          style={inlineThumbStyles}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onTouchStartCapture={this.handleTouchStart}
          onTouchMove={this.handleMouseMove}
          onFocusVisible={this.handleFocus}
        />
        <div className={trackAfterClasses} style={inlineTrackAfterStyles} />
      </Component>
    );
  }
}

Slider.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If `true`, the slider will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   */
  max: PropTypes.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   */
  min: PropTypes.number,
  /**
   * Callback function that is fired when the slider's value changed.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the slide has stopped moving.
   */
  onDragEnd: PropTypes.func,
  /**
   * Callback function that is fired when the slider has begun to move.
   */
  onDragStart: PropTypes.func,
  /**
   * If `true`, the slider will be reversed.
   */
  reverse: PropTypes.bool,
  /**
   * The granularity the slider can step through values.
   */
  step: PropTypes.number,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The value of the slider.
   */
  value: PropTypes.number.isRequired,
  /**
   * If `true`, the slider will be vertical.
   */
  vertical: PropTypes.bool,
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  component: 'div',
};

export default withStyles(style, { name: 'MuiSlider', withTheme: true })(Slider);
