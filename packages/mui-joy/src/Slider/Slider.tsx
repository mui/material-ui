'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  unstable_composeClasses as composeClasses,
  unstable_capitalize as capitalize,
} from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { useSlider, valueToPercent } from '@mui/base/useSlider';
import { isHostComponent } from '@mui/base/utils';
import { useThemeProps, styled, Theme } from '../styles';
import useSlot from '../utils/useSlot';
import sliderClasses, { getSliderUtilityClass } from './sliderClasses';
import { SliderTypeMap, SliderOwnerState } from './SliderProps';

// @ts-ignore
function Identity(x) {
  return x;
}

const useUtilityClasses = (ownerState: SliderOwnerState) => {
  const { disabled, dragging, marked, orientation, track, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      dragging && 'dragging',
      marked && 'marked',
      orientation === 'vertical' && 'vertical',
      track === 'inverted' && 'trackInverted',
      track === false && 'trackFalse',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    rail: ['rail'],
    track: ['track'],
    thumb: ['thumb', disabled && 'disabled'],
    input: ['input'],
    mark: ['mark'],
    markActive: ['markActive'],
    markLabel: ['markLabel'],
    markLabelActive: ['markLabelActive'],
    valueLabel: ['valueLabel'],
    valueLabelOpen: ['valueLabelOpen'],
    active: ['active'],
    focusVisible: ['focusVisible'],
  };

  return composeClasses(slots, getSliderUtilityClass, {});
};

const sliderColorVariables =
  ({ theme, ownerState }: { theme: Theme; ownerState: SliderOwnerState }) =>
  (data: { state?: 'Hover' | 'Disabled' | 'Active' } = {}) => {
    const styles =
      theme.variants[`${ownerState.variant!}${data.state || ''}`]?.[ownerState.color!] || {};
    return {
      ...(!data.state && { '--variant-borderWidth': styles['--variant-borderWidth'] ?? '0px' }),
      '--Slider-trackColor': styles.color,
      '--Slider-thumbBackground': styles.color,
      '--Slider-thumbColor': styles.backgroundColor || theme.vars.palette.background.surface,
      '--Slider-trackBackground': styles.backgroundColor || theme.vars.palette.background.surface,
      '--Slider-trackBorderColor': styles.borderColor,
      '--Slider-railBackground': theme.vars.palette.background.level2,
    };
  };

const SliderRoot = styled('span', {
  name: 'JoySlider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SliderOwnerState }>(({ theme, ownerState }) => {
  const getColorVariables = sliderColorVariables({ theme, ownerState });
  return [
    {
      '--Slider-size': 'max(42px, max(var(--Slider-thumbSize), var(--Slider-trackSize)))', // Reach 42px touch target, about ~8mm on screen.
      '--Slider-trackRadius': 'var(--Slider-size)',
      '--Slider-markBackground': theme.vars.palette.text.tertiary,
      [`& .${sliderClasses.markActive}`]: {
        '--Slider-markBackground': 'var(--Slider-trackColor)',
      },
      ...(ownerState.size === 'sm' && {
        '--Slider-markSize': '2px',
        '--Slider-trackSize': '4px',
        '--Slider-thumbSize': '14px',
        '--Slider-valueLabelArrowSize': '6px',
      }),
      ...(ownerState.size === 'md' && {
        '--Slider-markSize': '2px',
        '--Slider-trackSize': '6px',
        '--Slider-thumbSize': '18px',
        '--Slider-valueLabelArrowSize': '8px',
      }),
      ...(ownerState.size === 'lg' && {
        '--Slider-markSize': '3px',
        '--Slider-trackSize': '8px',
        '--Slider-thumbSize': '24px',
        '--Slider-valueLabelArrowSize': '10px',
      }),
      '--Slider-thumbRadius': 'calc(var(--Slider-thumbSize) / 2)',
      '--Slider-thumbWidth': 'var(--Slider-thumbSize)',
      ...getColorVariables(),
      '&:hover': {
        '@media (hover: hover)': {
          ...getColorVariables({ state: 'Hover' }),
        },
      },
      '&:active': {
        ...getColorVariables({ state: 'Active' }),
      },
      [`&.${sliderClasses.disabled}`]: {
        pointerEvents: 'none',
        color: theme.vars.palette.text.tertiary,
        ...getColorVariables({ state: 'Disabled' }),
      },
      boxSizing: 'border-box',
      display: 'inline-block',
      position: 'relative',
      cursor: 'pointer',
      touchAction: 'none',
      WebkitTapHighlightColor: 'transparent',
      ...(ownerState.orientation === 'horizontal' && {
        padding: 'calc(var(--Slider-size) / 2) 0',
        width: '100%',
      }),
      ...(ownerState.orientation === 'vertical' && {
        padding: '0 calc(var(--Slider-size) / 2)',
        height: '100%',
      }),
      '@media print': {
        colorAdjust: 'exact',
      },
    } as const,
  ];
});

const SliderRail = styled('span', {
  name: 'JoySlider',
  slot: 'Rail',
  overridesResolver: (props, styles) => styles.rail,
})<{ ownerState: SliderOwnerState }>(({ ownerState }) => [
  {
    display: 'block',
    position: 'absolute',
    backgroundColor:
      ownerState.track === 'inverted'
        ? 'var(--Slider-trackBackground)'
        : 'var(--Slider-railBackground)',
    border:
      ownerState.track === 'inverted'
        ? 'var(--variant-borderWidth, 0px) solid var(--Slider-trackBorderColor)'
        : 'initial',
    borderRadius: 'var(--Slider-trackRadius)',
    ...(ownerState.orientation === 'horizontal' && {
      height: 'var(--Slider-trackSize)',
      top: '50%',
      left: 0,
      right: 0,
      transform: 'translateY(-50%)',
    }),
    ...(ownerState.orientation === 'vertical' && {
      width: 'var(--Slider-trackSize)',
      top: 0,
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(ownerState.track === 'inverted' && {
      opacity: 1,
    }),
  } as const,
]);

const SliderTrack = styled('span', {
  name: 'JoySlider',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: SliderOwnerState }>(({ ownerState }) => {
  return [
    {
      display: 'block',
      position: 'absolute',
      color: 'var(--Slider-trackColor)',
      border:
        ownerState.track === 'inverted'
          ? 'initial'
          : 'var(--variant-borderWidth, 0px) solid var(--Slider-trackBorderColor)',
      backgroundColor:
        ownerState.track === 'inverted'
          ? 'var(--Slider-railBackground)'
          : 'var(--Slider-trackBackground)',
      ...(ownerState.orientation === 'horizontal' && {
        height: 'var(--Slider-trackSize)',
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: 'var(--Slider-trackRadius) 0 0 var(--Slider-trackRadius)',
      }),
      ...(ownerState.orientation === 'vertical' && {
        width: 'var(--Slider-trackSize)',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '0 0 var(--Slider-trackRadius) var(--Slider-trackRadius)',
      }),
      ...(ownerState.track === false && {
        display: 'none',
      }),
    } as const,
  ];
});

const SliderThumb = styled('span', {
  name: 'JoySlider',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb,
})<{ ownerState: SliderOwnerState }>(({ ownerState, theme }) => ({
  position: 'absolute',
  boxSizing: 'border-box',
  outline: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--Slider-thumbWidth)',
  height: 'var(--Slider-thumbSize)',
  border: 'var(--variant-borderWidth, 0px) solid var(--Slider-trackBorderColor)',
  borderRadius: 'var(--Slider-thumbRadius)',
  boxShadow: 'var(--Slider-thumbShadow)',
  color: 'var(--Slider-thumbColor)',
  backgroundColor: 'var(--Slider-thumbBackground)',
  [theme.focus.selector]: {
    ...theme.focus.default,
    outlineOffset: 0,
    outlineWidth: 'max(4px, var(--Slider-thumbSize) / 3.6)',
    outlineColor: `rgba(${theme.vars.palette?.[ownerState.color!]?.mainChannel} / 0.32)`,
  },
  ...(ownerState.orientation === 'horizontal' && {
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: '50%',
    transform: 'translate(-50%, 50%)',
  }),
  '&::before': {
    // use pseudo element to create thumb's ring
    boxSizing: 'border-box',
    content: '""',
    display: 'block',
    position: 'absolute',
    background: 'transparent', // to not block the thumb's child
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: '2px solid',
    borderColor: 'var(--Slider-thumbColor)',
    borderRadius: 'inherit',
  },
}));

const SliderMark = styled('span', {
  name: 'JoySlider',
  slot: 'Mark',
  overridesResolver: (props, styles) => styles.mark,
})<{ ownerState: SliderOwnerState & { percent?: number } }>(({ ownerState }) => {
  return {
    position: 'absolute',
    width: 'var(--Slider-markSize)',
    height: 'var(--Slider-markSize)',
    borderRadius: 'var(--Slider-markSize)',
    backgroundColor: 'var(--Slider-markBackground)',
    ...(ownerState.orientation === 'horizontal' && {
      top: '50%',
      transform: `translate(calc(var(--Slider-markSize) / -2), -50%)`,
      ...(ownerState.percent === 0 && {
        transform: `translate(min(var(--Slider-markSize), 3px), -50%)`,
      }),
      ...(ownerState.percent === 100 && {
        transform: `translate(calc(var(--Slider-markSize) * -1 - min(var(--Slider-markSize), 3px)), -50%)`,
      }),
    }),
    ...(ownerState.orientation === 'vertical' && {
      left: '50%',
      transform: 'translate(-50%, calc(var(--Slider-markSize) / 2))',
      ...(ownerState.percent === 0 && {
        transform: `translate(-50%, calc(min(var(--Slider-markSize), 3px) * -1))`,
      }),
      ...(ownerState.percent === 100 && {
        transform: `translate(-50%, calc(var(--Slider-markSize) * 1 + min(var(--Slider-markSize), 3px)))`,
      }),
    }),
  };
});

const SliderValueLabel = styled('span', {
  name: 'JoySlider',
  slot: 'ValueLabel',
  overridesResolver: (props, styles) => styles.valueLabel,
})<{ ownerState: SliderOwnerState }>(({ theme, ownerState }) => ({
  ...(ownerState.size === 'sm' && {
    fontSize: theme.fontSize.xs,
    lineHeight: theme.lineHeight.md,
    paddingInline: '0.25rem',
    minWidth: '20px',
  }),
  ...(ownerState.size === 'md' && {
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.md,
    paddingInline: '0.375rem',
    minWidth: '24px',
  }),
  ...(ownerState.size === 'lg' && {
    fontSize: theme.fontSize.md,
    lineHeight: theme.lineHeight.md,
    paddingInline: '0.5rem',
    minWidth: '28px',
  }),
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  fontFamily: theme.vars.fontFamily.body,
  fontWeight: theme.vars.fontWeight.md,
  bottom: 0,
  transformOrigin: 'bottom center',
  transform:
    'translateY(calc((var(--Slider-thumbSize) + var(--Slider-valueLabelArrowSize)) * -1)) scale(0)',
  position: 'absolute',
  backgroundColor: theme.vars.palette.background.tooltip,
  boxShadow: theme.shadow.sm,
  borderRadius: theme.vars.radius.xs,
  color: '#fff',
  '&::before': {
    display: 'var(--Slider-valueLabelArrowDisplay)',
    position: 'absolute',
    content: '""',
    color: theme.vars.palette.background.tooltip,
    bottom: 0,
    border: 'calc(var(--Slider-valueLabelArrowSize) / 2) solid',
    borderColor: 'currentColor',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    left: '50%',
    transform: 'translate(-50%, 100%)',
    backgroundColor: 'transparent',
  },
  [`&.${sliderClasses.valueLabelOpen}`]: {
    transform:
      'translateY(calc((var(--Slider-thumbSize) + var(--Slider-valueLabelArrowSize)) * -1)) scale(1)',
  },
}));

const SliderMarkLabel = styled('span', {
  name: 'JoySlider',
  slot: 'MarkLabel',
  overridesResolver: (props, styles) => styles.markLabel,
})<{ ownerState: SliderOwnerState }>(({ theme, ownerState }) => ({
  fontFamily: theme.vars.fontFamily.body,
  ...(ownerState.size === 'sm' && {
    fontSize: theme.vars.fontSize.xs,
  }),
  ...(ownerState.size === 'md' && {
    fontSize: theme.vars.fontSize.sm,
  }),
  ...(ownerState.size === 'lg' && {
    fontSize: theme.vars.fontSize.md,
  }),
  color: theme.palette.text.tertiary,
  position: 'absolute',
  whiteSpace: 'nowrap',
  ...(ownerState.orientation === 'horizontal' && {
    top: 'calc(50% + 4px + (max(var(--Slider-trackSize), var(--Slider-thumbSize)) / 2))',
    transform: 'translateX(-50%)',
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: 'calc(50% + 8px + (max(var(--Slider-trackSize), var(--Slider-thumbSize)) / 2))',
    transform: 'translateY(50%)',
  }),
}));

const SliderInput = styled('input', {
  name: 'JoySlider',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState?: SliderOwnerState }>({});
/**
 *
 * Demos:
 *
 * - [Slider](https://mui.com/joy-ui/react-slider/)
 *
 * API:
 *
 * - [Slider API](https://mui.com/joy-ui/api/slider/)
 */
const Slider = React.forwardRef(function Slider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoySlider',
  });

  const {
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValuetext,
    className,
    classes: classesProp,
    disableSwap = false,
    disabled = false,
    defaultValue,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    onMouseDown,
    orientation = 'horizontal',
    shiftStep = 10,
    scale = Identity,
    step = 1,
    tabIndex,
    track = 'normal',
    value: valueProp,
    valueLabelDisplay = 'off',
    valueLabelFormat = Identity,
    isRtl = false,
    color = 'primary',
    size = 'md',
    variant = 'solid',
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    marks: marksProp,
    classes: classesProp,
    disabled,
    defaultValue,
    disableSwap,
    isRtl,
    max,
    min,
    orientation,
    shiftStep,
    scale,
    step,
    track,
    valueLabelDisplay,
    valueLabelFormat,
    color,
    size,
    variant,
  } as SliderOwnerState;

  const {
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    open,
    active,
    axis,
    focusedThumbIndex,
    range,
    dragging,
    marks,
    values,
    trackOffset,
    trackLeap,
    getThumbStyle,
  } = useSlider({ ...ownerState, rootRef: ref });

  ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
  ownerState.dragging = dragging;

  const trackStyle = {
    ...axisProps[axis].offset(trackOffset),
    ...axisProps[axis].leap(trackLeap),
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: SliderRoot,
    externalForwardedProps,
    getSlotProps: getRootProps,
    ownerState,
  });

  const [SlotRail, railProps] = useSlot('rail', {
    className: classes.rail,
    elementType: SliderRail,
    externalForwardedProps,
    ownerState,
  });

  const [SlotTrack, trackProps] = useSlot('track', {
    additionalProps: {
      style: trackStyle,
    },
    className: classes.track,
    elementType: SliderTrack,
    externalForwardedProps,
    ownerState,
  });

  const [SlotMark, markProps] = useSlot('mark', {
    className: classes.mark,
    elementType: SliderMark,
    externalForwardedProps,
    ownerState,
  });

  const [SlotMarkLabel, markLabelProps] = useSlot('markLabel', {
    className: classes.markLabel,
    elementType: SliderMarkLabel,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      'aria-hidden': true,
    },
  });

  const [SlotThumb, thumbProps] = useSlot('thumb', {
    className: classes.thumb,
    elementType: SliderThumb,
    externalForwardedProps,
    getSlotProps: getThumbProps,
    ownerState,
  });

  const [SlotInput, inputProps] = useSlot('input', {
    className: classes.input,
    elementType: SliderInput,
    externalForwardedProps,
    getSlotProps: getHiddenInputProps,
    ownerState,
  });

  const [SlotValueLabel, valueLabelProps] = useSlot('valueLabel', {
    className: classes.valueLabel,
    elementType: SliderValueLabel,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <SlotRail {...railProps} />
      <SlotTrack {...trackProps} />
      {marks
        .filter((mark) => mark.value >= min && mark.value <= max)
        .map((mark, index) => {
          const percent = valueToPercent(mark.value, min, max);
          const style = axisProps[axis].offset(percent);

          let markActive;
          if (track === false) {
            markActive = values.includes(mark.value);
          } else {
            markActive =
              (track === 'normal' &&
                (range
                  ? mark.value >= values[0] && mark.value <= values[values.length - 1]
                  : mark.value <= values[0])) ||
              (track === 'inverted' &&
                (range
                  ? mark.value <= values[0] || mark.value >= values[values.length - 1]
                  : mark.value >= values[0]));
          }

          return (
            <React.Fragment key={mark.value}>
              <SlotMark
                data-index={index}
                {...markProps}
                {...(!isHostComponent(SlotMark) && {
                  ownerState: { ...markProps.ownerState, percent },
                })}
                style={{ ...style, ...markProps.style }}
                className={clsx(markProps.className, {
                  [classes.markActive]: markActive,
                })}
              />
              {mark.label != null ? (
                <SlotMarkLabel
                  data-index={index}
                  {...markLabelProps}
                  style={{ ...style, ...markLabelProps.style }}
                  className={clsx(classes.markLabel, markLabelProps.className, {
                    [classes.markLabelActive]: markActive,
                  })}
                >
                  {mark.label}
                </SlotMarkLabel>
              ) : null}
            </React.Fragment>
          );
        })}
      {values.map((value, index) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis].offset(percent);
        return (
          <SlotThumb
            key={index}
            data-index={index}
            {...thumbProps}
            className={clsx(thumbProps.className, {
              [classes.active]: active === index,
              [classes.focusVisible]: focusedThumbIndex === index,
            })}
            style={{
              ...style,
              ...getThumbStyle(index),
              ...thumbProps.style,
            }}
          >
            <SlotInput
              data-index={index}
              aria-label={getAriaLabel ? getAriaLabel(index) : ariaLabel}
              aria-valuenow={scale(value)}
              aria-valuetext={
                getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext
              }
              value={values[index]}
              {...inputProps}
            />
            {valueLabelDisplay !== 'off' ? (
              <SlotValueLabel
                {...valueLabelProps}
                className={clsx(valueLabelProps.className, {
                  [classes.valueLabelOpen]:
                    open === index || active === index || valueLabelDisplay === 'on',
                })}
              >
                {typeof valueLabelFormat === 'function'
                  ? valueLabelFormat(scale(value), index)
                  : valueLabelFormat}
              </SlotValueLabel>
            ) : null}
          </SlotThumb>
        );
      })}
    </SlotRoot>
  );
}) as OverridableComponent<SliderTypeMap>;

Slider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The label of the slider.
   */
  'aria-label': PropTypes.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': PropTypes.string,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: PropTypes.func,
  /**
   * If `true` the Slider will be rendered right-to-left (with the lowest value on the right-hand side).
   * @default false
   */
  isRtl: PropTypes.bool,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.number.isRequired,
      }),
    ),
    PropTypes.bool,
  ]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: PropTypes.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: PropTypes.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale: PropTypes.func,
  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep: PropTypes.number,
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    mark: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    markLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    rail: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    valueLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    mark: PropTypes.elementType,
    markLabel: PropTypes.elementType,
    rail: PropTypes.elementType,
    root: PropTypes.elementType,
    thumb: PropTypes.elementType,
    track: PropTypes.elementType,
    valueLabel: PropTypes.elementType,
  }),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: PropTypes.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: PropTypes.number,
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: PropTypes.oneOf(['inverted', 'normal', false]),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Slider;
