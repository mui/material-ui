import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clamp from '../utils/clamp';
import { calculatePercent, preventPageScrolling } from './dom';
import { percentToValue, getVisualStateClasses, roundToStep } from './shared';
import SliderThumb from '../SliderThumb';
import SliderTrack from '../SliderTrack';

export const styles = {
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
  /* Class applied to the track and thumb elements to trigger JSS nested styles if `activated`. */
  activated: {},
  /* Class applied to the track and thumb elements to trigger JSS nested styles if `disabled`. */
  disabled: {},
  /* Class applied to the track and thumb elements to trigger JSS nested styles if `focused`. */
  focused: {},
  /* Class applied to the track and thumb elements to trigger JSS nested styles if `jumped`. */
  jumped: {},
  /* Class applied to the root, track and container to trigger JSS nested styles if `vertical`. */
  vertical: {},
};

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

  containerRef = React.createRef();

  jumpAnimationTimeoutId = -1;

  state = {
    currentState: 'normal',
  };

  componentDidMount() {
    if (this.containerRef.current) {
      this.containerRef.current.addEventListener('touchstart', preventPageScrolling, {
        passive: false,
      });
    }
  }

  componentWillUnmount() {
    // Guarding for **broken** shallow rendering method that call componentDidMount
    // but doesn't handle refs correctly.
    // To remove once the shallow rendering has been fixed.
    if (this.containerRef.current) {
      this.containerRef.current.removeEventListener('touchstart', preventPageScrolling, {
        passive: false,
      });
    }
    document.body.removeEventListener('mouseenter', this.handleMouseEnter);
    document.body.removeEventListener('mouseleave', this.handleMouseLeave);
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    document.body.removeEventListener('mouseup', this.handleMouseUp);
    clearTimeout(this.jumpAnimationTimeoutId);
  }

  handleBlur = () => {
    this.setState({ currentState: 'normal' });
  };

  handleClick = event => {
    const { vertical } = this.props;
    const percent = calculatePercent(this.containerRef.current, event, vertical, this.isReverted());
    const value = percentToValue(percent, this.props);

    this.emitChange(event, value, () => {
      this.playJumpAnimation();
    });
  };

  handleFocus = () => {
    this.setState({ currentState: 'focused' });
  };

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

  handleMouseEnter = event => {
    // If the slider was being interacted with but the mouse went off the window
    // and then re-entered while unclicked then end the interaction.
    if (event.buttons === 0) {
      this.handleDragEnd(event);
    }
  };

  handleMouseLeave = event => {
    // The mouse will have moved between the last mouse move event
    // this mouse leave event
    this.handleMouseMove(event);
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

    document.body.addEventListener('mouseenter', this.handleMouseEnter);
    document.body.addEventListener('mouseleave', this.handleMouseLeave);
    document.body.addEventListener('mousemove', this.handleMouseMove);
    document.body.addEventListener('mouseup', this.handleMouseUp);

    if (typeof this.props.onDragStart === 'function') {
      this.props.onDragStart(event);
    }
  };

  handleMouseMove = event => {
    const { vertical } = this.props;
    const percent = calculatePercent(this.containerRef.current, event, vertical, this.isReverted());
    const value = percentToValue(percent, this.props);

    this.emitChange(event, value);
  };

  handleMouseUp = event => {
    this.handleDragEnd(event);
  };

  handleDragEnd(event) {
    this.setState({ currentState: 'normal' });

    document.body.removeEventListener('mouseenter', this.handleMouseEnter);
    document.body.removeEventListener('mouseleave', this.handleMouseLeave);
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    document.body.removeEventListener('mouseup', this.handleMouseUp);
    document.body.removeEventListener('touchend', this.handleMouseUp);

    if (typeof this.props.onDragEnd === 'function') {
      this.props.onDragEnd(event);
    }
  }

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

  isReverted() {
    return this.props.theme.direction === 'rtl';
  }

  playJumpAnimation() {
    this.setState({ currentState: 'jumped' }, () => {
      clearTimeout(this.jumpAnimationTimeoutId);
      this.jumpAnimationTimeoutId = setTimeout(() => {
        this.setState({ currentState: 'normal' });
      }, this.props.theme.transitions.duration.complex);
    });
  }

  render() {
    const {
      component: Component,
      rail: Rail,
      track: Track,
      thumb: Thumb,
      classes,
      className: classNameProp,
      disabled,
      min,
      max,
      theme,
      thumbProps,
      trackProps,
      value,
      vertical,
      ...other
    } = this.props;
    const { currentState } = this.state;

    const className = classNames(
      classes.root,
      getVisualStateClasses({ classes, disabled, state: currentState, vertical }),
      classNameProp,
    );

    const containerClassName = classNames(classes.container, {
      [classes.vertical]: vertical,
    });

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
        ref={this.containerRef}
        {...other}
      >
        <div className={containerClassName}>
          <Track
            disabled={disabled}
            min={min}
            max={max}
            state={currentState}
            value={value}
            vertical={vertical}
            {...trackProps}
          />
          <Thumb
            onBlur={this.handleBlur}
            onFocusVisible={this.handleFocus}
            onKeyDown={this.handleKeyDown}
            disabled={disabled}
            min={min}
            max={max}
            state={currentState}
            value={value}
            vertical={vertical}
            {...thumbProps}
          />
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
   * The component used for the slider thumb
   */
  thumb: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * props spread into the thumb component
   */
  thumbProps: PropTypes.object,
  /**
   * The component used for the slider track
   */
  track: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * props spread into the track component
   */
  trackProps: PropTypes.object,
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
  component: 'div',
  min: 0,
  max: 100,
  thumb: SliderThumb,
  track: SliderTrack,
  vertical: false,
};

export default withStyles(styles, { name: 'MuiSlider', withTheme: true })(Slider);
