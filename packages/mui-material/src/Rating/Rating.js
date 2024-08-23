'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import clamp from '@mui/utils/clamp';
import visuallyHidden from '@mui/utils/visuallyHidden';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { useRtl } from '@mui/system/RtlProvider';
import isFocusVisible from '@mui/utils/isFocusVisible';
import { capitalize, useForkRef, useControlled, unstable_useId as useId } from '../utils';
import Star from '../internal/svg-icons/Star';
import StarBorder from '../internal/svg-icons/StarBorder';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import slotShouldForwardProp from '../styles/slotShouldForwardProp';
import ratingClasses, { getRatingUtilityClass } from './ratingClasses';

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

const useUtilityClasses = (ownerState) => {
  const { classes, size, readOnly, disabled, emptyValueFocused, focusVisible } = ownerState;

  const slots = {
    root: [
      'root',
      `size${capitalize(size)}`,
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      readOnly && 'readOnly',
    ],
    label: ['label', 'pristine'],
    labelEmptyValue: [emptyValueFocused && 'labelEmptyValueActive'],
    icon: ['icon'],
    iconEmpty: ['iconEmpty'],
    iconFilled: ['iconFilled'],
    iconHover: ['iconHover'],
    iconFocus: ['iconFocus'],
    iconActive: ['iconActive'],
    decimal: ['decimal'],
    visuallyHidden: ['visuallyHidden'],
  };

  return composeClasses(slots, getRatingUtilityClass, classes);
};

const RatingRoot = styled('span', {
  name: 'MuiRating',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${ratingClasses.visuallyHidden}`]: styles.visuallyHidden },
      styles.root,
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.readOnly && styles.readOnly,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    // Required to position the pristine input absolutely
    position: 'relative',
    fontSize: theme.typography.pxToRem(24),
    color: '#faaf00',
    cursor: 'pointer',
    textAlign: 'left',
    width: 'min-content',
    WebkitTapHighlightColor: 'transparent',
    [`&.${ratingClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      pointerEvents: 'none',
    },
    [`&.${ratingClasses.focusVisible} .${ratingClasses.iconActive}`]: {
      outline: '1px solid #999',
    },
    [`& .${ratingClasses.visuallyHidden}`]: visuallyHidden,
    variants: [
      {
        props: {
          size: 'small',
        },
        style: {
          fontSize: theme.typography.pxToRem(18),
        },
      },
      {
        props: {
          size: 'large',
        },
        style: {
          fontSize: theme.typography.pxToRem(30),
        },
      },
      {
        // TODO v6: use the .Mui-readOnly global state class
        props: ({ ownerState }) => ownerState.readOnly,
        style: {
          pointerEvents: 'none',
        },
      },
    ],
  })),
);

const RatingLabel = styled('label', {
  name: 'MuiRating',
  slot: 'Label',
  overridesResolver: ({ ownerState }, styles) => [
    styles.label,
    ownerState.emptyValueFocused && styles.labelEmptyValueActive,
  ],
})({
  cursor: 'inherit',
  variants: [
    {
      props: ({ ownerState }) => ownerState.emptyValueFocused,
      style: {
        top: 0,
        bottom: 0,
        position: 'absolute',
        outline: '1px solid #999',
        width: '100%',
      },
    },
  ],
});

const RatingIcon = styled('span', {
  name: 'MuiRating',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.icon,
      ownerState.iconEmpty && styles.iconEmpty,
      ownerState.iconFilled && styles.iconFilled,
      ownerState.iconHover && styles.iconHover,
      ownerState.iconFocus && styles.iconFocus,
      ownerState.iconActive && styles.iconActive,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    // Fit wrapper to actual icon size.
    display: 'flex',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    // Fix mouseLeave issue.
    // https://github.com/facebook/react/issues/4492
    pointerEvents: 'none',
    variants: [
      {
        props: ({ ownerState }) => ownerState.iconActive,
        style: {
          transform: 'scale(1.2)',
        },
      },
      {
        props: ({ ownerState }) => ownerState.iconEmpty,
        style: {
          color: (theme.vars || theme).palette.action.disabled,
        },
      },
    ],
  })),
);

const RatingDecimal = styled('span', {
  name: 'MuiRating',
  slot: 'Decimal',
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== 'iconActive',
  overridesResolver: (props, styles) => {
    const { iconActive } = props;

    return [styles.decimal, iconActive && styles.iconActive];
  },
})({
  position: 'relative',
  variants: [
    {
      props: ({ iconActive }) => iconActive,
      style: {
        transform: 'scale(1.2)',
      },
    },
  ],
});

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other} />;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function RatingItem(props) {
  const {
    classes,
    disabled,
    emptyIcon,
    focus,
    getLabelText,
    highlightSelectedOnly,
    hover,
    icon,
    IconContainerComponent,
    isActive,
    itemValue,
    labelProps,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    readOnly,
    ownerState,
    ratingValue,
    ratingValueRounded,
  } = props;

  const isFilled = highlightSelectedOnly ? itemValue === ratingValue : itemValue <= ratingValue;
  const isHovered = itemValue <= hover;
  const isFocused = itemValue <= focus;
  const isChecked = itemValue === ratingValueRounded;

  const id = useId();
  const container = (
    <RatingIcon
      as={IconContainerComponent}
      value={itemValue}
      className={clsx(classes.icon, {
        [classes.iconEmpty]: !isFilled,
        [classes.iconFilled]: isFilled,
        [classes.iconHover]: isHovered,
        [classes.iconFocus]: isFocused,
        [classes.iconActive]: isActive,
      })}
      ownerState={{
        ...ownerState,
        iconEmpty: !isFilled,
        iconFilled: isFilled,
        iconHover: isHovered,
        iconFocus: isFocused,
        iconActive: isActive,
      }}
    >
      {emptyIcon && !isFilled ? emptyIcon : icon}
    </RatingIcon>
  );

  if (readOnly) {
    return <span {...labelProps}>{container}</span>;
  }

  return (
    <React.Fragment>
      <RatingLabel
        ownerState={{ ...ownerState, emptyValueFocused: undefined }}
        htmlFor={id}
        {...labelProps}
      >
        {container}
        <span className={classes.visuallyHidden}>{getLabelText(itemValue)}</span>
      </RatingLabel>
      <input
        className={classes.visuallyHidden}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        value={itemValue}
        id={id}
        type="radio"
        name={name}
        checked={isChecked}
      />
    </React.Fragment>
  );
}

RatingItem.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  emptyIcon: PropTypes.node,
  focus: PropTypes.number.isRequired,
  getLabelText: PropTypes.func.isRequired,
  highlightSelectedOnly: PropTypes.bool.isRequired,
  hover: PropTypes.number.isRequired,
  icon: PropTypes.node,
  IconContainerComponent: PropTypes.elementType.isRequired,
  isActive: PropTypes.bool.isRequired,
  itemValue: PropTypes.number.isRequired,
  labelProps: PropTypes.object,
  name: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  ownerState: PropTypes.object.isRequired,
  ratingValue: PropTypes.number,
  ratingValueRounded: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
};

const defaultIcon = <Star fontSize="inherit" />;
const defaultEmptyIcon = <StarBorder fontSize="inherit" />;

function defaultLabelText(value) {
  return `${value || '0'} Star${value !== 1 ? 's' : ''}`;
}

const Rating = React.forwardRef(function Rating(inProps, ref) {
  const props = useDefaultProps({ name: 'MuiRating', props: inProps });
  const {
    className,
    defaultValue = null,
    disabled = false,
    emptyIcon = defaultEmptyIcon,
    emptyLabelText = 'Empty',
    getLabelText = defaultLabelText,
    highlightSelectedOnly = false,
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
  const isRtl = useRtl();
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

  const [focusVisible, setFocusVisible] = React.useState(false);

  const rootRef = React.useRef();
  const handleRef = useForkRef(rootRef, ref);

  const handleMouseMove = (event) => {
    if (onMouseMove) {
      onMouseMove(event);
    }

    const rootNode = rootRef.current;
    const { right, left, width: containerWidth } = rootNode.getBoundingClientRect();

    let percent;

    if (isRtl) {
      percent = (right - event.clientX) / containerWidth;
    } else {
      percent = (event.clientX - left) / containerWidth;
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
    let newValue = event.target.value === '' ? null : parseFloat(event.target.value);

    // Give mouse priority over keyboard
    // Fix https://github.com/mui/material-ui/issues/22827
    if (hover !== -1) {
      newValue = hover;
    }

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
    if (isFocusVisible(event.target)) {
      setFocusVisible(true);
    }

    const newFocus = parseFloat(event.target.value);
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus,
    }));
  };

  const handleBlur = (event) => {
    if (hover !== -1) {
      return;
    }

    if (!isFocusVisible(event.target)) {
      setFocusVisible(false);
    }

    const newFocus = -1;
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus,
    }));
  };

  const [emptyValueFocused, setEmptyValueFocused] = React.useState(false);

  const ownerState = {
    ...props,
    defaultValue,
    disabled,
    emptyIcon,
    emptyLabelText,
    emptyValueFocused,
    focusVisible,
    getLabelText,
    icon,
    IconContainerComponent,
    max,
    precision,
    readOnly,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <RatingRoot
      ref={handleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        classes.root,
        {
          // TODO v6: remove this class as it duplicates with the global state class Mui-readOnly
          'MuiRating-readOnly': readOnly,
        },
        className,
      )}
      ownerState={ownerState}
      role={readOnly ? 'img' : null}
      aria-label={readOnly ? getLabelText(value) : null}
      {...other}
    >
      {Array.from(new Array(max)).map((_, index) => {
        const itemValue = index + 1;

        const ratingItemProps = {
          classes,
          disabled,
          emptyIcon,
          focus,
          getLabelText,
          highlightSelectedOnly,
          hover,
          icon,
          IconContainerComponent,
          name,
          onBlur: handleBlur,
          onChange: handleChange,
          onClick: handleClear,
          onFocus: handleFocus,
          ratingValue: value,
          ratingValueRounded: valueRounded,
          readOnly,
          ownerState,
        };

        const isActive = itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1);
        if (precision < 1) {
          const items = Array.from(new Array(1 / precision));
          return (
            <RatingDecimal
              key={itemValue}
              className={clsx(classes.decimal, { [classes.iconActive]: isActive })}
              ownerState={ownerState}
              iconActive={isActive}
            >
              {items.map(($, indexDecimal) => {
                const itemDecimalValue = roundValueToPrecision(
                  itemValue - 1 + (indexDecimal + 1) * precision,
                  precision,
                );

                return (
                  <RatingItem
                    key={itemDecimalValue}
                    {...ratingItemProps}
                    // The icon is already displayed as active
                    isActive={false}
                    itemValue={itemDecimalValue}
                    labelProps={{
                      style:
                        items.length - 1 === indexDecimal
                          ? {}
                          : {
                              width:
                                itemDecimalValue === value
                                  ? `${(indexDecimal + 1) * precision * 100}%`
                                  : '0%',
                              overflow: 'hidden',
                              position: 'absolute',
                            },
                    }}
                  />
                );
              })}
            </RatingDecimal>
          );
        }

        return (
          <RatingItem
            key={itemValue}
            {...ratingItemProps}
            isActive={isActive}
            itemValue={itemValue}
          />
        );
      })}
      {!readOnly && !disabled && (
        <RatingLabel
          className={clsx(classes.label, classes.labelEmptyValue)}
          ownerState={ownerState}
        >
          <input
            className={classes.visuallyHidden}
            value=""
            id={`${name}-empty`}
            type="radio"
            name={name}
            checked={valueRounded == null}
            onFocus={() => setEmptyValueFocused(true)}
            onBlur={() => setEmptyValueFocused(false)}
            onChange={handleChange}
          />
          <span className={classes.visuallyHidden}>{emptyLabelText}</span>
        </RatingLabel>
      )}
    </RatingRoot>
  );
});

Rating.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * If `true`, the component is disabled.
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
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {number} value The rating label's value to format.
   * @returns {string}
   * @default function defaultLabelText(value) {
   *   return `${value || '0'} Star${value !== 1 ? 's' : ''}`;
   * }
   */
  getLabelText: PropTypes.func,
  /**
   * If `true`, only the selected icon will be highlighted.
   * @default false
   */
  highlightSelectedOnly: PropTypes.bool,
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
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {number|null} value The new value.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the hover state changes.
   * @param {React.SyntheticEvent} event The event source of the callback.
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
          'MUI: The prop `precision` should be above 0.1.',
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
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The rating value.
   */
  value: PropTypes.number,
};

export default Rating;
