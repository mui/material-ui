import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
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
    // /* Styles for native input implementation */
    native: {
      zIndex: 10,
      WebkitAppearance: 'none',
      position: 'relative',
      width: '100%',
      margin: '10px 0',
      padding: '6px 0',
      background: 'transparent',
      '&$disabled': {
        cursor: 'no-drop',
      },
      '&$vertical': {
        WebkitAppearance: 'slider-vertical', // WebKit
        writingMode: 'gt-lr', // IE
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
      '&::-webkit-slider-thumb': {
        WebkitAppearance: 'none',
        width: 12,
        height: 12,
      },
      '&:focus': {
        outline: 'none',
      },
    },
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
      top: '50%',
      left: '50%',
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

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'production' && !React.createContext) {
  throw new Error('Material-UI: react@16.3.0 or greater is required.');
}

/**
 * native implementation research:
 * https://caniuse.com/#search=range matches https://material-ui.com/getting-started/supported-platforms/
 * reverse: should be possible via css
 * vertical: spec != browsersupport https://www.w3.org/TR/html5/sec-forms.html#range-state-typerange
 * https://stackoverflow.com/questions/15935837/how-to-display-a-range-input-slider-vertically
 * ticks via datalist https://caniuse.com/#search=datalist
 */
class Slider extends React.Component {
  state = { currentState: 'initial' };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.disabled) {
      return { currentState: 'disabled' };
    }

    if (!nextProps.disabled && prevState.currentState === 'disabled') {
      return { currentState: 'normal' };
    }

    return null;
  }

  handleFocus = () => {
    this.setState({ currentState: 'focused' });
  };

  handleBlur = () => {
    this.setState({ currentState: 'normal' });
  };

  handleChange = event => {
    const { onChange } = this.props;
    onChange(event, event.target.value);
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
      step,
      ...other
    } = this.props;

    const percent = clamp(((value - min) * 100) / (max - min));

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

    const nativeClasses = classNames(classes.native, {
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
      <Component className={rootClasses}>
        <div className={trackBeforeClasses} style={inlineTrackBeforeStyles} />
        <input
          type="range"
          className={nativeClasses}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          orient={vertical ? 'vertical' : undefined /* Firefox */}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className={thumbClasses} style={inlineThumbStyles} />
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
