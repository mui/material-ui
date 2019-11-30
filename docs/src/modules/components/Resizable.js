import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
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

const axisProps = {
  horizontal: {
    offset: value => ({ left: `${value}px` }),
    leap: value => ({ width: `${value}px` }),
  },
  vertical: {
    offset: value => ({ top: `${value}px` }),
    leap: value => ({ height: `${value}px` }),
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
    display: 'flex',
    '&$vertical': {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
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
  resizer: {
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
    cursor: 'ew-resize',
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
      cursor: 'ns-resize',
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
    children,
    classes,
    className,
    component: Component = 'div',
    name,
    orientation = 'horizontal',
    ...other
  } = props;

  const touchId = React.useRef();
  const [active, setActive] = React.useState(-1);
  const [valueState, setValueState] = React.useState();
  const instanceRef = React.useRef();
  const boundsRef = React.useRef();
  const maxRef = React.useRef();
  const value = valueState;

  const max = maxRef.current;
  const min = 0;
  const step = 1;

  instanceRef.current = {
    source: valueState, // Keep track of the input value to leverage immutable state comparison.
  };

  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(-1);

  const resizerRef = React.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, resizerRef);
  const handleRef = useForkRef(ref, handleFocusRef);

  React.useEffect(() => {
    if (!boundsRef.current) {
      boundsRef.current = resizerRef.current.getBoundingClientRect();
      const newValue =
        orientation === 'vertical' ? boundsRef.current.height : boundsRef.current.width;
      setValueState(newValue);
      maxRef.current = newValue;
    }
  }, [orientation]);

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
    const tenPercent = (max - min) / 10;
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
          newValue = value + tenPercent;
        }
        break;
      case 'PageDown':
        if (step) {
          newValue = value - tenPercent;
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

  const getFingerNewValue = finger => {
    const { top, left } = resizerRef.current.getBoundingClientRect();

    let newValue;

    if (orientation === 'vertical') {
      newValue = clamp(finger.y - top, 0, boundsRef.current.height);
    } else {
      newValue = clamp(finger.x - left, 0, boundsRef.current.width);
    }

    return newValue;
  };

  const handleTouchMove = useEventCallback(event => {
    const finger = trackFinger(event, touchId);

    if (!finger) {
      return;
    }

    const newValue = getFingerNewValue(finger);

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
    // If the resizer was being interacted with but the mouse went off the window
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
    const newValue = getFingerNewValue(finger);

    setValueState(newValue);

    document.body.addEventListener('touchmove', handleTouchMove);
    document.body.addEventListener('touchend', handleTouchEnd);
  });

  React.useEffect(() => {
    const { current: resizer } = resizerRef;
    resizer.addEventListener('touchstart', handleTouchStart);

    return () => {
      resizer.removeEventListener('touchstart', handleTouchStart);
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
    const newValue = getFingerNewValue(finger);

    setValueState(newValue);

    document.body.addEventListener('mousemove', handleTouchMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseup', handleTouchEnd);
  });

  const resizerStyle = axisProps[orientation].leap(valueState);
  const style = axisProps[orientation].offset(valueState);

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
      <div className={classes.resizer} style={resizerStyle}>
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
  'aria-label': PropTypes.string,
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': PropTypes.string,
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
