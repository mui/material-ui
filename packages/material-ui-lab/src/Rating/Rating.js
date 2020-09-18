import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { useTheme, withStyles } from '@material-ui/core/styles';
import {
  capitalize,
  useForkRef,
  useIsFocusVisible,
  useControlled,
  unstable_useId as useId,
} from '@material-ui/core/utils';
import { visuallyHidden } from '@material-ui/system';
import Star from '../internal/svg-icons/Star';
import StarBorder from '../internal/svg-icons/StarBorder';

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function getDecimalPrecision(num) {
  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  if (value == null) {
    return value;
  }

  const nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    // Required to position the pristine input absolutely
    position: 'relative',
    fontSize: theme.typography.pxToRem(24),
    color: '#faaf00',
    cursor: 'pointer',
    textAlign: 'left',
    WebkitTapHighlightColor: 'transparent',
    '&$disabled': {
      opacity: theme.palette.action.disabledOpacity,
      pointerEvents: 'none',
    },
    '&$focusVisible $iconActive': {
      outline: '1px solid #999',
    },
  },
  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    fontSize: theme.typography.pxToRem(18),
  },
  /* Styles applied to the root element if `size="large"`. */
  sizeLarge: {
    fontSize: theme.typography.pxToRem(30),
  },
  /* Styles applied to the root element if `readOnly={true}`. */
  readOnly: {
    pointerEvents: 'none',
  },
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Pseudo-class applied to the root element if keyboard focused. */
  focusVisible: {},
  /* Visually hide an element. */
  visuallyHidden,
  /* Styles applied to the label elements. */
  label: {
    cursor: 'inherit',
  },
  /* Styles applied to the label of the "no value" input when it is active. */
  labelEmptyValueActive: {
    top: 0,
    bottom: 0,
    position: 'absolute',
    outline: '1px solid #999',
    width: '100%',
  },
  /* Styles applied to the icon wrapping elements. */
  icon: {
    // Fit wrapper to actual icon size.
    display: 'flex',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    // Fix mouseLeave issue.
    // https://github.com/facebook/react/issues/4492
    pointerEvents: 'none',
  },
  /* Styles applied to the icon wrapping elements when empty. */
  iconEmpty: {
    color: theme.palette.action.disabled,
  },
  /* Styles applied to the icon wrapping elements when filled. */
  iconFilled: {},
  /* Styles applied to the icon wrapping elements when hover. */
  iconHover: {},
  /* Styles applied to the icon wrapping elements when focus. */
  iconFocus: {},
  /* Styles applied to the icon wrapping elements when active. */
  iconActive: {
    transform: 'scale(1.2)',
  },
  /* Styles applied to the icon wrapping elements when decimals are necessary. */
  decimal: {
    position: 'relative',
  },
});

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other} />;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const defaultIcon = <Star fontSize="inherit" />;
const defaultEmptyIcon = <StarBorder fontSize="inherit" />;

function defaultLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}`;
}

const Rating = React.forwardRef(function Rating(props, ref) {
  const {
    classes,
    className,
    defaultValue = null,
    disabled = false,
    emptyIcon = defaultEmptyIcon,
    emptyLabelText = 'Empty',
    getLabelText = defaultLabelText,
    icon = defaultIcon,
    IconContainerComponent = IconContainer,
    max = 5,
    name: nameProp,
    onChange,
    onChangeActive,
    onMouseLeave,
    onMouseMove,
    precision = 1,
    readOnly = false,
    size = 'medium',
    value: valueProp,
    ...other
  } = props;

  const name = useId(nameProp);

  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Rating',
  });

  const valueRounded = roundValueToPrecision(valueDerived, precision);
  const theme = useTheme();
  const [{ hover, focus }, setState] = React.useState({
    hover: -1,
    focus: -1,
  });

  let value = valueRounded;
  if (hover !== -1) {
    value = hover;
  }
  if (focus !== -1) {
    value = focus;
  }

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);

  const rootRef = React.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, rootRef);
  const handleRef = useForkRef(handleFocusRef, ref);

  const handleMouseMove = (event) => {
    if (onMouseMove) {
      onMouseMove(event);
    }

    const rootNode = rootRef.current;
    const { right, left } = rootNode.getBoundingClientRect();
    const { width } = rootNode.firstChild.getBoundingClientRect();
    let percent;

    if (theme.direction === 'rtl') {
      percent = (right - event.clientX) / (width * max);
    } else {
      percent = (event.clientX - left) / (width * max);
    }

    let newHover = roundValueToPrecision(max * percent + precision / 2, precision);
    newHover = clamp(newHover, precision, max);

    setState((prev) =>
      prev.hover === newHover && prev.focus === newHover
        ? prev
        : {
            hover: newHover,
            focus: newHover,
          },
    );

    setFocusVisible(false);

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  const handleMouseLeave = (event) => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    const newHover = -1;
    setState({
      hover: newHover,
      focus: newHover,
    });

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);

    setValueState(newValue);

    if (onChange) {
      onChange(event, newValue);
    }
  };

  const handleClear = (event) => {
    // Ignore keyboard events
    // https://github.com/facebook/react/issues/7407
    if (event.clientX === 0 && event.clientY === 0) {
      return;
    }

    setState({
      hover: -1,
      focus: -1,
    });

    setValueState(null);

    if (onChange && parseFloat(event.target.value) === valueRounded) {
      onChange(event, null);
    }
  };

  const handleFocus = (event) => {
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }

    const newFocus = parseFloat(event.target.value);
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus,
    }));

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  const handleBlur = (event) => {
    if (hover !== -1) {
      return;
    }

    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    const newFocus = -1;
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus,
    }));

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  const [emptyValueFocused, setEmptyValueFocused] = React.useState(false);

  const item = (state, labelProps) => {
    const id = `${name}-${String(state.value).replace('.', '-')}`;
    const container = (
      <IconContainerComponent
        value={state.value}
        className={clsx(classes.icon, {
          [classes.iconEmpty]: !state.filled,
          [classes.iconFilled]: state.filled,
          [classes.iconHover]: state.hover,
          [classes.iconFocus]: state.focus,
          [classes.iconActive]: state.active,
        })}
      >
        {emptyIcon && !state.filled ? emptyIcon : icon}
      </IconContainerComponent>
    );

    if (readOnly) {
      return (
        <span key={state.value} {...labelProps}>
          {container}
        </span>
      );
    }

    return (
      <React.Fragment key={state.value}>
        <label className={classes.label} htmlFor={id} {...labelProps}>
          {container}
          <span className={classes.visuallyHidden}>{getLabelText(state.value)}</span>
        </label>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onClick={handleClear}
          disabled={disabled}
          value={state.value}
          id={id}
          type="radio"
          name={name}
          checked={state.checked}
          className={classes.visuallyHidden}
        />
      </React.Fragment>
    );
  };

  return (
    <span
      ref={handleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        classes.root,
        {
          [classes[`size${capitalize(size)}`]]: size !== 'medium',
          [classes.disabled]: disabled,
          [classes.focusVisible]: focusVisible,
          [classes.readOnly]: readOnly,
        },
        className,
      )}
      role={readOnly ? 'img' : null}
      aria-label={readOnly ? getLabelText(value) : null}
      {...other}
    >
      {Array.from(new Array(max)).map((_, index) => {
        const itemValue = index + 1;

        if (precision < 1) {
          const items = Array.from(new Array(1 / precision));
          return (
            <span
              key={itemValue}
              className={clsx(classes.decimal, {
                [classes.iconActive]:
                  itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1),
              })}
            >
              {items.map(($, indexDecimal) => {
                const itemDecimalValue = roundValueToPrecision(
                  itemValue - 1 + (indexDecimal + 1) * precision,
                  precision,
                );

                return item(
                  {
                    value: itemDecimalValue,
                    filled: itemDecimalValue <= value,
                    hover: itemDecimalValue <= hover,
                    focus: itemDecimalValue <= focus,
                    checked: itemDecimalValue === valueRounded,
                  },
                  {
                    style:
                      items.length - 1 === indexDecimal
                        ? {}
                        : {
                            width:
                              itemDecimalValue === value
                                ? `${(indexDecimal + 1) * precision * 100}%`
                                : '0%',
                            overflow: 'hidden',
                            zIndex: 1,
                            position: 'absolute',
                          },
                  },
                );
              })}
            </span>
          );
        }

        return item({
          value: itemValue,
          active: itemValue === value && (hover !== -1 || focus !== -1),
          filled: itemValue <= value,
          hover: itemValue <= hover,
          focus: itemValue <= focus,
          checked: itemValue === valueRounded,
        });
      })}
      {!readOnly && !disabled && valueRounded == null && (
        <label className={clsx({ [classes.labelEmptyValueActive]: emptyValueFocused })}>
          <input
            value=""
            id={`${name}-empty`}
            type="radio"
            name={name}
            defaultChecked
            className={classes.visuallyHidden}
            onFocus={() => setEmptyValueFocused(true)}
            onBlur={() => setEmptyValueFocused(false)}
          />
          <span className={classes.visuallyHidden}>{emptyLabelText}</span>
        </label>
      )}
    </span>
  );
});

Rating.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The default value. Use when the component is not controlled.
   * @default null
   */
  defaultValue: PropTypes.number,
  /**
   * If `true`, the rating will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The icon to display when empty.
   * @default <StarBorder fontSize="inherit" />
   */
  emptyIcon: PropTypes.node,
  /**
   * The label read when the rating input is empty.
   * @default 'Empty'
   */
  emptyLabelText: PropTypes.node,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {number} value The rating label's value to format.
   * @returns {string}
   *
   * @default function defaultLabelText(value) {
   *   return `${value} Star${value !== 1 ? 's' : ''}`;
   * }
   */
  getLabelText: PropTypes.func,
  /**
   * The icon to display.
   * @default <Star fontSize="inherit" />
   */
  icon: PropTypes.node,
  /**
   * The component containing the icon.
   * @default function IconContainer(props) {
   *   const { value, ...other } = props;
   *   return <span {...other} />;
   * }
   */
  IconContainerComponent: PropTypes.elementType,
  /**
   * Maximum rating.
   * @default 5
   */
  max: PropTypes.number,
  /**
   * The name attribute of the radio `input` elements.
   * This input `name` should be unique within the page.
   * Being unique within a form is insufficient since the `name` is used to generated IDs.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the hover state changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseMove: PropTypes.func,
  /**
   * The minimum increment value change allowed.
   * @default 1
   */
  precision: chainPropTypes(PropTypes.number, (props) => {
    if (props.precision < 0.1) {
      return new Error(
        [
          'Material-UI: The prop `precision` should be above 0.1.',
          'A value below this limit has an imperceptible impact.',
        ].join('\n'),
      );
    }
    return null;
  }),
  /**
   * Removes all hover effects and pointer events.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * The size of the rating.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * The rating value.
   */
  value: PropTypes.number,
};

export default withStyles(styles, { name: 'MuiRating' })(Rating);
