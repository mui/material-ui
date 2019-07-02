import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme, withStyles, fade, lighten } from '@material-ui/core/styles';
import {
  useEventCallback,
  useForkRef,
  ownerWindow,
  useIsFocusVisible,
} from '@material-ui/core/utils';
import { chainPropTypes } from '@material-ui/utils';
import ValueLabel from './ValueLabel';

function asc(a, b) {
  return a - b;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function findClosest(values, currentValue) {
  const { index: closestIndex } = values.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);

    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index,
      };
    }

    return acc;
  }, null);
  return closestIndex;
}

function trackFinger(event, touchId) {
  if (touchId.current !== undefined && event.changedTouches) {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: event.changedTouches[i].pageX,
          y: event.changedTouches[i].pageY,
        };
      }
    }

    return false;
  }

  return {
    x: event.pageX,
    y: event.pageY,
  };
}

function valueToPercent(value, min, max) {
  return ((value - min) * 100) / (max - min);
}

function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}

function getDecimalPrecision(num) {
  // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
  // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split('e-');
    const matissaDecimalPart = parts[0].split('.')[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }

  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value, step) {
  const nearest = Math.round(value / step) * step;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

function setValueIndex({ values, source, newValue, index }) {
  // Performance shortcut
  if (values[index] === newValue) {
    return source;
  }

  const output = [...values];
  output[index] = newValue;
  return output;
}

function focusThumb({ sliderRef, activeIndex, setActive }) {
  if (
    !sliderRef.current.contains(document.activeElement) ||
    Number(document.activeElement.getAttribute('data-index')) !== activeIndex
  ) {
    sliderRef.current.querySelector(`[data-index="${activeIndex}"]`).focus();
  }

  if (setActive) {
    setActive(activeIndex);
  }
}

const axisProps = {
  horizontal: {
    offset: percent => ({ left: `${percent}%` }),
    leap: percent => ({ width: `${percent}%` }),
  },
  'horizontal-reverse': {
    offset: percent => ({ right: `${percent}%` }),
    leap: percent => ({ width: `${percent}%` }),
  },
  vertical: {
    offset: percent => ({ bottom: `${percent}%` }),
    leap: percent => ({ height: `${percent}%` }),
  },
  'vertical-reverse': {
    offset: percent => ({ top: `${percent}%` }),
    leap: percent => ({ height: `${percent}%` }),
  },
};

const defaultMarks = [];
const Identity = x => x;

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    height: 2,
    width: '100%',
    boxSizing: 'content-box',
    padding: '11px 0',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    touchAction: 'none',
    color: theme.palette.primary.main,
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    '&$disabled': {
      cursor: 'default',
      color: theme.palette.grey[400],
    },
    '&$vertical': {
      width: 2,
      height: '100%',
      padding: '0 11px',
    },
  },
  /* Styles applied to the root element if `marks` is provided with at least one label. */
  marked: {
    marginBottom: 20,
    '&$vertical': {
      marginBottom: 'auto',
      marginRight: 20,
    },
  },
  /* Pseudo-class applied to the root element if `orientation="vertical"`. */
  vertical: {},
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the rail element. */
  rail: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    opacity: 0.38,
    '$vertical &': {
      height: '100%',
      width: 2,
    },
  },
  /* Styles applied to the track element. */
  track: {
    display: 'block',
    position: 'absolute',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    '$vertical &': {
      width: 2,
    },
  },
  /* Styles applied to the thumb element. */
  thumb: {
    position: 'absolute',
    width: 12,
    height: 12,
    marginLeft: -6,
    marginTop: -5,
    boxSizing: 'border-box',
    borderRadius: '50%',
    outline: 'none',
    backgroundColor: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create(['box-shadow'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&$focusVisible,&:hover': {
      boxShadow: `0px 0px 0px 8px ${fade(theme.palette.primary.main, 0.16)}`,
      '@media (hover: none)': {
        boxShadow: 'none',
      },
    },
    '&$active': {
      boxShadow: `0px 0px 0px 14px ${fade(theme.palette.primary.main, 0.16)}`,
    },
    '$disabled &': {
      pointerEvents: 'none',
      width: 8,
      height: 8,
      marginLeft: -4,
      marginTop: -3,
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '$vertical &': {
      marginLeft: -5,
      marginBottom: -6,
    },
    '$vertical$disabled &': {
      marginLeft: -3,
      marginBottom: -4,
    },
  },
  /* Pseudo-class applied to the thumb element if it's active. */
  active: {},
  /* Pseudo-class applied to the thumb element if keyboard focused. */
  focusVisible: {},
  /* Styles applied to the thumb label element. */
  valueLabel: {},
  /* Styles applied to the mark element. */
  mark: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
  },
  /* Styles applied to the mark element if active (depending on the value). */
  markActive: {
    backgroundColor: lighten(theme.palette.primary.main, 0.76),
  },
  /* Styles applied to the mark label element. */
  markLabel: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: 22,
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    '$vertical &': {
      top: 'auto',
      left: 22,
      transform: 'translateY(50%)',
    },
  },
  /* Styles applied to the mark label element if active (depending on the value). */
  markLabelActive: {
    color: theme.palette.text.primary,
  },
});

const Slider = React.forwardRef(function Slider(props, ref) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    classes,
    className,
    component: Component = 'span',
    defaultValue,
    disabled = false,
    getAriaValueText,
    marks: marksProp = defaultMarks,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    onMouseDown,
    orientation = 'horizontal',
    step = 1,
    ThumbComponent = 'span',
    value: valueProp,
    ValueLabelComponent = ValueLabel,
    valueLabelDisplay = 'off',
    valueLabelFormat = Identity,
    ...other
  } = props;
  const theme = useTheme();
  const { current: isControlled } = React.useRef(valueProp != null);
  const touchId = React.useRef();
  // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transfered when inversing a range slider.
  const [active, setActive] = React.useState(-1);
  const [open, setOpen] = React.useState(-1);
  const [valueState, setValueState] = React.useState(defaultValue);
  const valueDerived = isControlled ? valueProp : valueState;
  const range = Array.isArray(valueDerived);
  const instanceRef = React.useRef();
  let values = range ? valueDerived.sort(asc) : [valueDerived];
  values = values.map(value => clamp(value, min, max));
  const marks =
    marksProp === true && step !== null
      ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
          value: min + step * index,
        }))
      : marksProp;

  instanceRef.current = {
    source: valueDerived, // Keep track of the input value to leverage immutable state comparison.
  };

  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(-1);

  const sliderRef = React.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);

  const handleFocus = useEventCallback(event => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    if (isFocusVisible(event)) {
      setFocusVisible(index);
    }
    setOpen(index);
  });
  const handleBlur = useEventCallback(() => {
    if (focusVisible !== -1) {
      setFocusVisible(-1);
      onBlurVisible();
    }
    setOpen(-1);
  });
  const handleMouseOver = useEventCallback(event => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    setOpen(index);
  });
  const handleMouseLeave = useEventCallback(() => {
    setOpen(-1);
  });

  const handleKeyDown = useEventCallback(event => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    const value = values[index];
    const tenPercents = (max - min) / 10;
    const marksValues = marks.map(mark => mark.value);
    const marksIndex = marksValues.indexOf(value);
    let newValue;

    switch (event.key) {
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      case 'PageUp':
        if (step) {
          newValue = value + tenPercents;
        }
        break;
      case 'PageDown':
        if (step) {
          newValue = value - tenPercents;
        }
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        if (step) {
          newValue = value + step;
        } else {
          newValue = marksValues[marksIndex + 1] || marksValues[marksValues.length - 1];
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        if (step) {
          newValue = value - step;
        } else {
          newValue = marksValues[marksIndex - 1] || marksValues[0];
        }
        break;
      default:
        return;
    }

    event.preventDefault();

    if (step) {
      newValue = roundValueToStep(newValue, step);
    }

    newValue = clamp(newValue, min, max);

    if (range) {
      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        source: valueDerived,
        newValue,
        index,
      }).sort(asc);
      focusThumb({ sliderRef, activeIndex: newValue.indexOf(previousValue) });
    }

    if (!isControlled) {
      setValueState(newValue);
    }

    setFocusVisible(index);

    if (onChange) {
      onChange(event, newValue);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  });

  const previousIndex = React.useRef();
  let axis = orientation;
  if (theme.direction === 'rtl' && orientation === 'horizontal') {
    axis += '-reverse';
  }

  const getNewValue = React.useCallback(
    ({ finger, move = false, values: values2, source }) => {
      const { current: slider } = sliderRef;
      const { width, height, bottom, left } = slider.getBoundingClientRect();
      let percent;

      if (axis.indexOf('vertical') === 0) {
        percent = (bottom + ownerWindow(slider).pageYOffset - finger.y) / height;
      } else {
        percent = (finger.x - left - ownerWindow(slider).pageXOffset) / width;
      }

      if (axis.indexOf('-reverse') !== -1) {
        percent = 1 - percent;
      }

      let newValue;
      newValue = percentToValue(percent, min, max);
      if (step) {
        newValue = roundValueToStep(newValue, step);
      } else {
        const marksValues = marks.map(mark => mark.value);
        const closestIndex = findClosest(marksValues, newValue);
        newValue = marksValues[closestIndex];
      }

      newValue = clamp(newValue, min, max);
      let activeIndex = 0;

      if (range) {
        if (!move) {
          activeIndex = findClosest(values2, newValue);
        } else {
          activeIndex = previousIndex.current;
        }

        const previousValue = newValue;
        newValue = setValueIndex({
          values: values2,
          source,
          newValue,
          index: activeIndex,
        }).sort(asc);
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }

      return { newValue, activeIndex };
    },
    [max, min, axis, range, step, marks],
  );

  const handleTouchMove = useEventCallback(event => {
    const finger = trackFinger(event, touchId);

    if (!finger) {
      return;
    }

    const { newValue, activeIndex } = getNewValue({
      finger,
      move: true,
      values,
      source: valueDerived,
    });

    focusThumb({ sliderRef, activeIndex, setActive });
    if (!isControlled) {
      setValueState(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  });

  const handleTouchEnd = useEventCallback(event => {
    const finger = trackFinger(event, touchId);

    if (!finger) {
      return;
    }

    const { newValue } = getNewValue({ finger, values, source: valueDerived });

    setActive(-1);
    if (event.type === 'touchend') {
      setOpen(-1);
    }

    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }

    touchId.current = undefined;
    document.body.removeEventListener('mousemove', handleTouchMove);
    document.body.removeEventListener('mouseup', handleTouchEnd);
    // eslint-disable-next-line no-use-before-define
    document.body.removeEventListener('mouseenter', handleMouseEnter);
    document.body.removeEventListener('touchmove', handleTouchMove);
    document.body.removeEventListener('touchend', handleTouchEnd);
  });

  const handleMouseEnter = useEventCallback(event => {
    // If the slider was being interacted with but the mouse went off the window
    // and then re-entered while unclicked then end the interaction.
    if (event.buttons === 0) {
      handleTouchEnd(event);
    }
  });

  const handleTouchStart = useEventCallback(event => {
    // Workaround as Safari has partial support for touchAction: 'none'.
    event.preventDefault();
    const touch = event.changedTouches.item(0);
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(event, touchId);
    const { newValue, activeIndex } = getNewValue({ finger, values, source: valueDerived });
    focusThumb({ sliderRef, activeIndex, setActive });

    if (!isControlled) {
      setValueState(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }

    document.body.addEventListener('touchmove', handleTouchMove);
    document.body.addEventListener('touchend', handleTouchEnd);
  });

  React.useEffect(() => {
    if (disabled) {
      return () => {};
    }

    const { current: slider } = sliderRef;
    slider.addEventListener('touchstart', handleTouchStart);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      document.body.removeEventListener('mousemove', handleTouchMove);
      document.body.removeEventListener('mouseup', handleTouchEnd);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('touchmove', handleTouchMove);
      document.body.removeEventListener('touchend', handleTouchEnd);
    };
  }, [disabled, handleMouseEnter, handleTouchEnd, handleTouchMove, handleTouchStart]);

  const handleMouseDown = useEventCallback(event => {
    if (onMouseDown) {
      onMouseDown(event);
    }

    if (disabled) {
      return;
    }

    event.preventDefault();
    const finger = trackFinger(event, touchId);
    const { newValue, activeIndex } = getNewValue({ finger, values, source: valueDerived });
    focusThumb({ sliderRef, activeIndex, setActive });

    if (!isControlled) {
      setValueState(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }

    document.body.addEventListener('mousemove', handleTouchMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseup', handleTouchEnd);
  });

  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;
  const trackStyle = {
    ...axisProps[axis].offset(trackOffset),
    ...axisProps[axis].leap(trackLeap),
  };

  return (
    <Component
      ref={handleRef}
      className={clsx(
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.marked]: marks.length > 0 && marks.some(mark => mark.label),
          [classes.vertical]: orientation === 'vertical',
        },
        className,
      )}
      onMouseDown={handleMouseDown}
      {...other}
    >
      <span className={classes.rail} />
      <span className={classes.track} style={trackStyle} />
      <input value={values.join(',')} name={name} type="hidden" />
      {marks.map(mark => {
        const percent = valueToPercent(mark.value, min, max);
        const style = axisProps[axis].offset(percent);
        const markActive = range
          ? mark.value >= values[0] && mark.value <= values[values.length - 1]
          : mark.value <= values[0];

        return (
          <React.Fragment key={mark.value}>
            <span
              style={style}
              className={clsx(classes.mark, {
                [classes.markActive]: markActive,
              })}
            />
            <span
              style={style}
              className={clsx(classes.markLabel, {
                [classes.markLabelActive]: markActive,
              })}
            >
              {mark.label}
            </span>
          </React.Fragment>
        );
      })}
      {values.map((value, index) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis].offset(percent);

        return (
          <ValueLabelComponent
            key={index}
            valueLabelFormat={valueLabelFormat}
            valueLabelDisplay={valueLabelDisplay}
            className={classes.valueLabel}
            value={value}
            index={index}
            open={open === index || active === index}
            disabled={disabled}
          >
            <ThumbComponent
              className={clsx(classes.thumb, {
                [classes.active]: active === index,
                [classes.focusVisible]: focusVisible === index,
              })}
              tabIndex={disabled ? null : 0}
              role="slider"
              style={style}
              data-index={index}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledby}
              aria-orientation={orientation}
              aria-valuemax={max}
              aria-valuemin={min}
              aria-valuenow={value}
              aria-valuetext={getAriaValueText ? getAriaValueText(value, index) : ariaValuetext}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            />
          </ValueLabelComponent>
        );
      })}
    </Component>
  );
});

Slider.propTypes = {
  /**
   * The label of the slider.
   */
  'aria-label': PropTypes.string,
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': chainPropTypes(PropTypes.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext']) {
      return new Error(
        'Material-UI: you need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range input.',
      );
    }

    return null;
  }),

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
  component: PropTypes.elementType,
  /**
   * The default element value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * If `true`, the slider will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   *
   * @param {number} value The thumb label's value to format
   * @param {number} index The thumb label's index to format
   */
  getAriaValueText: PropTypes.func,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks will be spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   */
  marks: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
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
   * Name attribute of the hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {object} event The event source of the callback
   * @param {any} value The new value
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {object} event The event source of the callback
   * @param {any} value The new value
   */
  onChangeCommitted: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * The slider orientation.
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   */
  step: PropTypes.number,
  /**
   * The component used to display the value label.
   */
  ThumbComponent: PropTypes.elementType,
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * The value label componnet.
   */
  ValueLabelComponent: PropTypes.elementType,
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   */
  valueLabelDisplay: PropTypes.oneOf(['on', 'auto', 'off']),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default withStyles(styles, { name: 'MuiSlider' })(Slider);
