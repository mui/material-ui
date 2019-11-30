import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { chainPropTypes } from '@material-ui/utils';
import withStyles from '@material-ui/styles/withStyles';
import { fade } from '../../../../packages/material-ui/src/styles/colorManipulator';
import { useIsFocusVisible } from '../../../../packages/material-ui/src/utils/focusVisible';
import useEventCallback from '../../../../packages/material-ui/src/utils/useEventCallback';
import useForkRef from '../../../../packages/material-ui/src/utils/useForkRef';

function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}

function trackFinger(event, touchId) {
  if (touchId.current !== undefined && event.changedTouches) {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    }

    return false;
  }

  return {
    x: event.clientX,
    y: event.clientY,
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

function roundValueToStep(value, step, min) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
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
  vertical: {
    offset: percent => ({ top: `${percent}%` }),
    leap: percent => ({ height: `${percent}%` }),
  },
};

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    height: 'auto',
    width: '100%',
    // boxSizing: 'content-box',
    // padding: '13px 0',
    position: 'relative',
    touchAction: 'none',
    color: theme.palette.grey[400],
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    '&$vertical': {
      width: '100%',
      // height: '100%',
      height: '200px',
    },
    // The primary input mechanism of the device includes a pointing device of limited accuracy.
    '@media (pointer: coarse)': {
      // Reach 42px touch target, about ~8mm on screen.
      padding: '20px 0',
      '&$vertical': {
        padding: '0 20px',
      },
    },
  },
  /* Pseudo-class applied to the root element if `orientation="vertical"`. */
  vertical: {},
  /* Styles applied to the track element. */
  track: {
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    '$vertical &': {
      width: '100%',
    },
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  /* Styles applied to the thumb element. */
  thumb: {
    position: 'absolute',
    top: '50%',
    width: 20,
    height: 20,
    marginLeft: -10,
    marginTop: -10,
    boxSizing: 'border-box',
    borderRadius: '50%',
    outline: 0,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'col-resize',
    transition: theme.transitions.create(['box-shadow'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&::after': {
      position: 'absolute',
      content: '""',
      borderRadius: '50%',
      // reach 42px hit target (2 * 15 + thumb diameter)
      left: -15,
      top: -15,
      right: -15,
      bottom: -15,
    },
    '&$focusVisible,&:hover': {
      boxShadow: `0px 0px 0px 8px ${fade(theme.palette.grey[400], 0.16)}`,
      '@media (hover: none)': {
        boxShadow: 'none',
      },
    },
    '&$active': {
      boxShadow: `0px 0px 0px 14px ${fade(theme.palette.grey[400], 0.16)}`,
    },
    '$vertical &': {
      top: 'auto',
      left: '50%',
      transform: 'rotate(90deg)',
      cursor: 'row-resize',
      marginLeft: -6,
      marginBottom: -6,
    },
  },
  /* Pseudo-class applied to the thumb element if it's active. */
  active: {},
  /* Pseudo-class applied to the thumb element if keyboard focused. */
  focusVisible: {},
});

const Resizable = React.forwardRef(function Resizable(props, ref) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    children,
    classes,
    className,
    component: Component = 'div',
    name,
    orientation = 'horizontal',
    ...other
  } = props;

  const defaultValue = 100;
  const max = 100;
  const min = 0;
  const step = 0.1;

  const touchId = React.useRef();
  // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transfered when inversing a range slider.
  const [active, setActive] = React.useState(-1);
  const [valueState, setValueState] = React.useState(defaultValue);
  const instanceRef = React.useRef();
  const value = clamp(valueState, min, max);

  instanceRef.current = {
    source: valueState, // Keep track of the input value to leverage immutable state comparison.
  };

  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(-1);

  const sliderRef = React.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);

  const handleFocus = useEventCallback(event => {
    if (isFocusVisible(event)) {
      setFocusVisible(0);
    }
  });

  const handleBlur = useEventCallback(() => {
    if (focusVisible !== -1) {
      setFocusVisible(-1);
      onBlurVisible();
    }
  });

  const handleKeyDown = useEventCallback(event => {
    const tenPercents = (max - min) / 10;
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
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        if (step) {
          newValue = value - step;
        }
        break;
      default:
        return;
    }

    // Prevent scroll of the page
    event.preventDefault();

    newValue = roundValueToStep(newValue, step, min);
    newValue = clamp(newValue, min, max);

    setValueState(newValue);
    setFocusVisible(0);
  });

  const getFingerNewValue = React.useCallback(
    ({ finger }) => {
      const { current: slider } = sliderRef;
      const { width, height, top, left } = slider.getBoundingClientRect();
      let percent;

      if (orientation.indexOf('vertical') === 0) {
        percent = (finger.y - top) / height;
      } else {
        percent = (finger.x - left) / width;
      }

      let newValue;
      newValue = percentToValue(percent, min, max);
      newValue = roundValueToStep(newValue, step, min);
      newValue = clamp(newValue, min, max);
      const activeIndex = 0;

      return { newValue, activeIndex };
    },
    [max, min, orientation, step],
  );

  const handleTouchMove = useEventCallback(event => {
    const finger = trackFinger(event, touchId);

    if (!finger) {
      return;
    }

    const { newValue, activeIndex } = getFingerNewValue({
      finger,
      move: true,
      values: value,
      source: valueState,
    });

    focusThumb({ sliderRef, activeIndex, setActive });
    setValueState(newValue);
  });

  const handleTouchEnd = useEventCallback(event => {
    const finger = trackFinger(event, touchId);

    if (!finger) {
      return;
    }

    setActive(-1);

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
    const touch = event.changedTouches[0];
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(event, touchId);
    const { newValue, activeIndex } = getFingerNewValue({
      finger,
      values: value,
      source: valueState,
    });
    focusThumb({ sliderRef, activeIndex, setActive });

    setValueState(newValue);

    document.body.addEventListener('touchmove', handleTouchMove);
    document.body.addEventListener('touchend', handleTouchEnd);
  });

  React.useEffect(() => {
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
  }, [handleMouseEnter, handleTouchEnd, handleTouchMove, handleTouchStart]);

  const handleMouseDown = useEventCallback(event => {
    event.preventDefault();
    const finger = trackFinger(event, touchId);
    const { newValue, activeIndex } = getFingerNewValue({
      finger,
      values: value,
      source: valueState,
    });
    focusThumb({ sliderRef, activeIndex, setActive });

    setValueState(newValue);

    document.body.addEventListener('mousemove', handleTouchMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseup', handleTouchEnd);
  });

  const trackOffset = valueToPercent(min, min, max);
  const trackLeap = valueToPercent(value, min, max) - trackOffset;
  const trackStyle = {
    ...axisProps[orientation].offset(trackOffset),
    ...axisProps[orientation].leap(trackLeap),
  };

  const percent = valueToPercent(value, min, max);
  const style = axisProps[orientation].offset(percent);

  return (
    <Component
      ref={handleRef}
      className={clsx(
        classes.root,
        {
          [classes.vertical]: orientation === 'vertical',
        },
        className,
      )}
      {...other}
    >
      <div className={classes.track} style={trackStyle}>
        {children}
      </div>

      <span
        className={clsx(classes.thumb, {
          [classes.active]: active === 0,
          [classes.focusVisible]: focusVisible === 0,
        })}
        tabIndex={0}
        role="slider"
        style={style}
        data-index={0}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-orientation={orientation}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-valuetext={ariaValuetext}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
      >
        <DragIndicatorIcon />
      </span>
    </Component>
  );
});

Resizable.propTypes = {
  /**
   * The label of the slider.
   */
  'aria-label': chainPropTypes(PropTypes.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-label'] != null) {
      return new Error(
        'Material-UI: you need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
      );
    }

    return null;
  }),
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': chainPropTypes(PropTypes.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext'] != null) {
      return new Error(
        'Material-UI: you need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.',
      );
    }

    return null;
  }),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
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
   * Name attribute of the hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * The slider orientation.
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
};

export default withStyles(styles, { name: 'MuiResizable' })(Resizable);
