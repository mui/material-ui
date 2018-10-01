import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clamp from '../utils/clamp';

export const styles = theme => {
  const commonTransitionsOptions = {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.easeOut,
  };

  const trackTransitions = theme.transitions.create(['width', 'height'], commonTransitionsOptions);
  const thumbCommonTransitions = theme.transitions.create(
    ['width', 'height', 'left', 'right', 'top', 'box-shadow'],
    commonTransitionsOptions,
  );
  // no transition on the position
  const thumbActivatedTransitions = theme.transitions.create(
    ['width', 'height', 'box-shadow'],
    commonTransitionsOptions,
  );

  const colors = {
    primary: theme.palette.primary.main,
    disabled: theme.palette.grey[400],
    thumbOutline: fade(theme.palette.primary.main, 0.16),
  };

  /**
   * radius of the box-shadow when pressed
   * hover should have a diameter equal to the pressed radius
   */
  const pressedOutlineRadius = 9;

  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      width: '100%',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
      '&$disabled': {
        cursor: 'no-drop',
      },
      '&$vertical': {
        height: '100%',
      },
    },
    /* Styles applied to the container element. */
    container: {
      position: 'relative',
      '&$vertical': {
        height: '100%',
      },
    },
    /* Styles applied to the track elements. */
    track: {
      position: 'absolute',
      transform: 'translate(0, -50%)',
      top: '50%',
      height: 2,
      backgroundColor: colors.primary,
      '&$activated': {
        transition: 'none',
      },
      '&$disabled': {
        backgroundColor: colors.disabled,
        boxShadow: 'none',
      },
      '&$vertical': {
        transform: 'translate(-50%, 0)',
        left: '50%',
        top: 'initial',
        width: 2,
      },
    },
    /* Styles applied to the track element before the thumb. */
    trackBefore: {
      zIndex: 1,
      left: 0,
      transition: trackTransitions,
    },
    /* Styles applied to the track element after the thumb. */
    trackAfter: {
      right: 0,
      opacity: 0.24,
      transition: trackTransitions,
      '&$vertical': {
        bottom: 0,
      },
    },
    /* Styles applied to the thumb element. */
    thumb: {
      position: 'absolute',
      zIndex: 2,
      transform: 'translate(-50%, -50%)',
      width: 12,
      height: 12,
      borderRadius: '50%',
      transition: thumbCommonTransitions,
      backgroundColor: colors.primary,
      '&$focused, &:hover': {
        boxShadow: `0px 0px 0px ${pressedOutlineRadius}px ${colors.thumbOutline}`,
      },
      '&$activated': {
        boxShadow: `0px 0px 0px ${pressedOutlineRadius * 2}px ${colors.thumbOutline}`,
        transition: thumbActivatedTransitions,
      },
      '&$disabled': {
        cursor: 'no-drop',
        width: 9,
        height: 9,
        backgroundColor: colors.disabled,
      },
      '&$jumped': {
        boxShadow: `0px 0px 0px ${pressedOutlineRadius * 2}px ${colors.thumbOutline}`,
      },
    },
    /* Class applied to the thumb element if custom thumb icon provided. */
    thumbIconWrapper: {
      backgroundColor: 'transparent',
    },
    thumbIcon: {
      height: 'inherit',
      width: 'inherit',
    },
    /* Class applied to the track and thumb elements to trigger JSS nested styles if `disabled`. */
    disabled: {},
    /* Class applied to the track and thumb elements to trigger JSS nested styles if `jumped`. */
    jumped: {},
    /* Class applied to the track and thumb elements to trigger JSS nested styles if `focused`. */
    focused: {},
    /* Class applied to the track and thumb elements to trigger JSS nested styles if `activated`. */
    activated: {},
    /* Class applied to the root, track and container to trigger JSS nested styles if `vertical`. */
    vertical: {},
  };
};

function percentToValue(percent, min, max) {
  return ((max - min) * percent) / 100 + min;
}

function roundToStep(number, step) {
  return Math.round(number / step) * step;
}

function getOffset(node) {
  const { pageYOffset, pageXOffset } = global;
  const { left, top } = node.getBoundingClientRect();

  return {
    top: top + pageYOffset,
    left: left + pageXOffset,
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

function calculatePercent(node, event, isVertical, isRtl) {
  const { width, height } = node.getBoundingClientRect();
  const { top, left } = getOffset(node);
  const { x, y } = getMousePosition(event);

  const value = isVertical ? y - top : x - left;
  const onePercent = (isVertical ? height : width) / 100;

  return isRtl && !isVertical ? 100 - clamp(value / onePercent) : clamp(value / onePercent);
}

function preventPageScrolling(event) {
  event.preventDefault();
}

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'production' && !React.createContext) {
  throw new Error('Material-UI: react@16.3.0 or greater is required.');
}

class Slider extends React.Component {
  state = {
    currentState: 'initial',
  };

  jumpAnimationTimeoutId = -1;

  componentDidMount() {
    if (this.containerRef) {
      this.containerRef.addEventListener('touchstart', preventPageScrolling, { passive: false });
    }
  }

  componentWillUnmount() {
    this.containerRef.removeEventListener('touchstart', preventPageScrolling, { passive: false });
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    document.body.removeEventListener('mouseup', this.handleMouseUp);
    clearTimeout(this.jumpAnimationTimeoutId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.disabled) {
      return { currentState: 'disabled' };
    }

    if (!nextProps.disabled && prevState.currentState === 'disabled') {
      return { currentState: 'normal' };
    }

    return null;
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
    const { min, max, vertical } = this.props;
    const percent = calculatePercent(this.containerRef, event, vertical, this.isReverted());
    const value = percentToValue(percent, min, max);

    this.emitChange(event, value, () => {
      this.playJumpAnimation();
    });
  };

  handleTouchStart = event => {
    event.preventDefault();
    this.setState({ currentState: 'activated' });

    document.body.addEventListener('touchend', this.handleMouseUp);

    if (typeof this.props.onDragStart === 'function') {
      this.props.onDragStart(event);
    }
  };

  handleMouseDown = event => {
    event.preventDefault();
    this.setState({ currentState: 'activated' });

    document.body.addEventListener('mousemove', this.handleMouseMove);
    document.body.addEventListener('mouseup', this.handleMouseUp);

    if (typeof this.props.onDragStart === 'function') {
      this.props.onDragStart(event);
    }
  };

  handleMouseUp = event => {
    this.setState({ currentState: 'normal' });

    document.body.removeEventListener('mousemove', this.handleMouseMove);
    document.body.removeEventListener('mouseup', this.handleMouseUp);
    document.body.removeEventListener('touchend', this.handleMouseUp);

    if (typeof this.props.onDragEnd === 'function') {
      this.props.onDragEnd(event);
    }
  };

  handleMouseMove = event => {
    const { min, max, vertical } = this.props;
    const percent = calculatePercent(this.containerRef, event, vertical, this.isReverted());
    const value = percentToValue(percent, min, max);

    this.emitChange(event, value);
  };

  emitChange(event, rawValue, callback) {
    const { step, value: previousValue, onChange, disabled } = this.props;
    let value = rawValue;

    if (disabled) {
      return;
    }

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

  playJumpAnimation() {
    this.setState({ currentState: 'jumped' }, () => {
      clearTimeout(this.jumpAnimationTimeoutId);
      this.jumpAnimationTimeoutId = setTimeout(() => {
        this.setState({ currentState: 'normal' });
      }, this.props.theme.transitions.duration.complex);
    });
  }

  isReverted() {
    return this.props.theme.direction === 'rtl';
  }

  render() {
    const { currentState } = this.state;
    const {
      className: classNameProp,
      classes,
      component: Component,
      thumb: thumbIcon,
      disabled,
      max,
      min,
      onChange,
      onDragEnd,
      onDragStart,
      step,
      theme,
      value,
      vertical,
      ...other
    } = this.props;

    const percent = clamp(((value - min) * 100) / (max - min));

    const commonClasses = {
      [classes.disabled]: disabled,
      [classes.jumped]: !disabled && currentState === 'jumped',
      [classes.focused]: !disabled && currentState === 'focused',
      [classes.activated]: !disabled && currentState === 'activated',
    };

    const className = classNames(
      classes.root,
      {
        [classes.vertical]: vertical,
        [classes.disabled]: disabled,
      },
      classNameProp,
    );

    const containerClasses = classNames(classes.container, {
      [classes.vertical]: vertical,
    });

    const trackBeforeClasses = classNames(classes.track, classes.trackBefore, commonClasses, {
      [classes.vertical]: vertical,
    });

    const trackAfterClasses = classNames(classes.track, classes.trackAfter, commonClasses, {
      [classes.vertical]: vertical,
    });

    const trackProperty = vertical ? 'height' : 'width';
    const horizontalMinimumPosition = theme.direction === 'ltr' ? 'left' : 'right';
    const thumbProperty = vertical ? 'top' : horizontalMinimumPosition;
    const inlineTrackBeforeStyles = { [trackProperty]: this.calculateTrackBeforeStyles(percent) };
    const inlineTrackAfterStyles = { [trackProperty]: this.calculateTrackAfterStyles(percent) };
    const inlineThumbStyles = { [thumbProperty]: `${percent}%` };

    /** Start Thumb Icon Logic Here */
    const ThumbIcon = thumbIcon
      ? React.cloneElement(thumbIcon, {
          ...thumbIcon.props,
          className: classNames(thumbIcon.props.className, classes.thumbIcon),
        })
      : null;
    /** End Thumb Icon Logic Here */

    const thumbClasses = classNames(
      classes.thumb,
      {
        [classes.thumbIconWrapper]: thumbIcon,
      },
      commonClasses,
    );

    return (
      <Component
        role="slider"
        className={className}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onTouchStartCapture={this.handleTouchStart}
        onTouchMove={this.handleMouseMove}
        ref={ref => {
          this.containerRef = ReactDOM.findDOMNode(ref);
        }}
        {...other}
      >
        <div className={containerClasses}>
          <div className={trackBeforeClasses} style={inlineTrackBeforeStyles} />
          <ButtonBase
            className={thumbClasses}
            disableRipple
            style={inlineThumbStyles}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            onTouchStartCapture={this.handleTouchStart}
            onTouchMove={this.handleMouseMove}
            onFocusVisible={this.handleFocus}
          >
            {ThumbIcon}
          </ButtonBase>
          <div className={trackAfterClasses} style={inlineTrackAfterStyles} />
        </div>
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
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
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
   * The granularity the slider can step through values.
   */
  step: PropTypes.number,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The component used for the slider icon.
   * This is optional, if provided should be a react element.
   */
  thumb: PropTypes.element,
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

export default withStyles(styles, { name: 'MuiSlider', withTheme: true })(Slider);
