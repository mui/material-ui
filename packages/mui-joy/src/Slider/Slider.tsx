import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  unstable_composeClasses as composeClasses,
  unstable_capitalize as capitalize,
} from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import useSlider from '@mui/base/useSlider';
import { useSlotProps } from '@mui/base/utils';
import { useThemeProps, styled, Theme } from '../styles';
import sliderClasses, { getSliderUtilityClass } from './sliderClasses';
import { SliderProps, SliderTypeMap, SliderOwnerState } from './SliderProps';

const valueToPercent = (value: number, min: number, max: number) =>
  ((value - min) * 100) / (max - min);

const Identity = (x: any) => x;

const useUtilityClasses = (ownerState: SliderOwnerState) => {
  const { disabled, dragging, marked, orientation, track, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      dragging && 'dragging',
      marked && 'marked',
      orientation === 'vertical' && 'vertical',
      track === 'inverted' && 'trackInverted',
      track === false && 'trackFalse',
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    rail: ['rail'],
    track: ['track'],
    mark: ['mark'],
    markActive: ['markActive'],
    markLabel: ['markLabel'],
    markLabelActive: ['markLabelActive'],
    valueLabel: ['valueLabel'],
    valueLabelOpen: ['valueLabelOpen'],
    thumb: ['thumb', disabled && 'disabled'],
    active: ['active'],
    focusVisible: ['focusVisible'],
  };

  return composeClasses(slots, getSliderUtilityClass, {});
};

const sliderColorVariables =
  ({ theme, ownerState }: { theme: Theme; ownerState: SliderProps }) =>
  (data: { state?: 'Hover' | 'Disabled' } = {}) => {
    const color = ownerState.color;
    return {
      '--Slider-track-background': theme.vars.palette[color!]?.[`solid${data.state || ''}Bg`],
      '--Slider-track-color': '#fff',
      '--Slider-rail-background': theme.vars.palette.background.level2,
      '--Slider-thumb-background': theme.vars.palette[color!]?.[`solid${data.state || ''}Color`],
      '--Slider-thumb-color': theme.vars.palette[color!]?.[`plain${data.state || ''}Color`],
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
      '--Slider-size': 'max(42px, max(var(--Slider-thumb-size), var(--Slider-track-size)))', // Reach 42px touch target, about ~8mm on screen.
      '--Slider-track-radius': 'var(--Slider-size)',
      '--Slider-mark-background': theme.vars.palette.text.tertiary,
      [`& .${sliderClasses.markActive}`]: {
        '--Slider-mark-background': 'var(--Slider-track-color)',
      },
      ...(ownerState.size === 'sm' && {
        '--Slider-mark-size': '2px',
        '--Slider-track-size': '4px',
        '--Slider-thumb-size': '10px',
        '--Slider-valueLabel-arrowSize': '6px',
      }),
      ...(ownerState.size === 'md' && {
        '--Slider-mark-size': '2px',
        '--Slider-track-size': '6px',
        '--Slider-thumb-size': '14px',
        '--Slider-valueLabel-arrowSize': '8px',
      }),
      ...(ownerState.size === 'lg' && {
        '--Slider-mark-size': '3px',
        '--Slider-track-size': '10px',
        '--Slider-thumb-size': '20px',
        '--Slider-valueLabel-arrowSize': '10px',
      }),
      '--Slider-thumb-radius': 'calc(var(--Slider-thumb-size) / 2)',
      '--Slider-thumb-width': 'var(--Slider-thumb-size)',
      ...getColorVariables(),
      '&:hover': {
        ...getColorVariables({ state: 'Hover' }),
      },
      [`&.${sliderClasses.disabled}`]: {
        pointerEvents: 'none',
        color: theme.vars.palette.text.tertiary,
        ...getColorVariables({ state: 'Disabled' }),
      },
      [`&.${sliderClasses.dragging}`]: {
        [`& .${sliderClasses.track}, & .${sliderClasses.thumb}`]: {
          transition: 'none',
        },
      },
      boxSizing: 'content-box',
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
    },
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
        ? 'var(--Slider-track-background)'
        : 'var(--Slider-rail-background)',
    borderRadius: 'var(--Slider-track-radius)',
    ...(ownerState.orientation === 'horizontal' && {
      height: 'var(--Slider-track-size)',
      top: '50%',
      left: 0,
      right: 0,
      transform: 'translateY(-50%)',
    }),
    ...(ownerState.orientation === 'vertical' && {
      width: 'var(--Slider-track-size)',
      top: 0,
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(ownerState.track === 'inverted' && {
      opacity: 1,
    }),
  },
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
      color: 'var(--Slider-track-color)',
      backgroundColor:
        ownerState.track === 'inverted'
          ? 'var(--Slider-rail-background)'
          : 'var(--Slider-track-background)',
      // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Slider.
      transition:
        'left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      ...(ownerState.orientation === 'horizontal' && {
        height: 'var(--Slider-track-size)',
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: 'var(--Slider-track-radius) 0 0 var(--Slider-track-radius)',
      }),
      ...(ownerState.orientation === 'vertical' && {
        width: 'var(--Slider-track-size)',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '0 0 var(--Slider-track-radius) var(--Slider-track-radius)',
      }),
      ...(ownerState.track === false && {
        display: 'none',
      }),
    },
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
  width: 'var(--Slider-thumb-width)',
  height: 'var(--Slider-thumb-size)',
  borderRadius: 'var(--Slider-thumb-radius)',
  boxShadow: 'var(--Slider-thumb-shadow)',
  border: '2px solid',
  borderColor: 'var(--Slider-thumb-color)',
  color: 'var(--Slider-thumb-color)',
  backgroundColor: 'var(--Slider-thumb-background)',
  // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Slider.
  transition:
    'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  [theme.focus.selector]: theme.focus.default,
  ...(ownerState.orientation === 'horizontal' && {
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: '50%',
    transform: 'translate(-50%, 50%)',
  }),
}));

const SliderMark = styled('span', {
  name: 'JoySlider',
  slot: 'Mark',
  overridesResolver: (props, styles) => styles.mark,
})<{ ownerState: SliderOwnerState & { percent: number } }>(({ ownerState }) => {
  return {
    position: 'absolute',
    width: 'var(--Slider-mark-size)',
    height: 'var(--Slider-mark-size)',
    borderRadius: 'var(--Slider-mark-size)',
    backgroundColor: 'var(--Slider-mark-background)',
    ...(ownerState.orientation === 'horizontal' && {
      top: '50%',
      transform: `translate(calc(var(--Slider-mark-size) / -2), -50%)`,
      ...(ownerState.percent === 0 && {
        transform: `translate(min(var(--Slider-mark-size), 3px), -50%)`,
      }),
      ...(ownerState.percent === 100 && {
        transform: `translate(calc(var(--Slider-mark-size) * -1 - min(var(--Slider-mark-size), 3px)), -50%)`,
      }),
    }),
    ...(ownerState.orientation === 'vertical' && {
      left: '50%',
      transform: 'translate(-50%, calc(var(--Slider-mark-size) / 2))',
      ...(ownerState.percent === 0 && {
        transform: `translate(-50%, calc(min(var(--Slider-mark-size), 3px) * -1))`,
      }),
      ...(ownerState.percent === 100 && {
        transform: `translate(-50%, calc(var(--Slider-mark-size) * 1 + min(var(--Slider-mark-size), 3px)))`,
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
    'translateY(calc((var(--Slider-thumb-size) + var(--Slider-valueLabel-arrowSize)) * -1)) scale(0)',
  position: 'absolute',
  backgroundColor: theme.vars.palette.background.tooltip,
  boxShadow: theme.vars.shadow.sm,
  borderRadius: theme.vars.radius.xs,
  color: '#fff',
  '&::before': {
    display: 'var(--Slider-valueLabel-arrowDisplay)',
    position: 'absolute',
    content: '""',
    color: theme.vars.palette.background.tooltip,
    bottom: 0,
    border: 'calc(var(--Slider-valueLabel-arrowSize) / 2) solid',
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
      'translateY(calc((var(--Slider-thumb-size) + var(--Slider-valueLabel-arrowSize)) * -1)) scale(1)',
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
    top: 'calc(50% + 4px + (max(var(--Slider-track-size), var(--Slider-thumb-size)) / 2))',
    transform: 'translateX(-50%)',
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: 'calc(50% + 8px + (max(var(--Slider-track-size), var(--Slider-thumb-size)) / 2))',
    transform: 'translateY(50%)',
  }),
}));

const SliderInput = styled('input', {
  name: 'JoySlider',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState?: SliderOwnerState }>({});

const Slider = React.forwardRef(function Slider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoySlider',
  });

  const {
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValuetext,
    component,
    componentsProps = {},
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
    ...other
  } = props;

  const ownerState = {
    ...props,
    marks: marksProp,
    classes: classesProp,
    disabled,
    defaultValue,
    isRtl,
    max,
    min,
    orientation,
    scale,
    step,
    track,
    valueLabelDisplay,
    valueLabelFormat,
    color,
    size,
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
  } = useSlider({ ...ownerState, ref });

  ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
  ownerState.dragging = dragging;

  const trackStyle = {
    ...axisProps[axis].offset(trackOffset),
    ...axisProps[axis].leap(trackLeap),
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: SliderRoot,
    getSlotProps: getRootProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      as: component,
    },
    ownerState,
    className: classes.root,
  });

  const railProps = useSlotProps({
    elementType: SliderRail,
    externalSlotProps: componentsProps.rail,
    ownerState,
    className: classes.rail,
  });

  const trackProps = useSlotProps({
    elementType: SliderTrack,
    externalSlotProps: componentsProps.track,
    additionalProps: {
      style: trackStyle,
    },
    ownerState,
    className: classes.track,
  });

  const markProps = useSlotProps({
    elementType: SliderMark,
    externalSlotProps: componentsProps.mark,
    ownerState,
    className: classes.mark,
  });

  const markLabelProps = useSlotProps({
    elementType: SliderMarkLabel,
    externalSlotProps: componentsProps.markLabel,
    ownerState,
    className: classes.markLabel,
  });

  const thumbProps = useSlotProps({
    elementType: SliderThumb,
    getSlotProps: getThumbProps,
    externalSlotProps: componentsProps.thumb,
    ownerState,
    className: classes.thumb,
  });

  const inputProps = useSlotProps({
    elementType: SliderInput,
    getSlotProps: getHiddenInputProps,
    externalSlotProps: componentsProps.input,
    ownerState,
  });

  const valueLabelProps = useSlotProps({
    elementType: SliderValueLabel,
    externalSlotProps: componentsProps.valueLabel,
    ownerState,
    className: classes.valueLabel,
  });

  return (
    <SliderRoot {...rootProps}>
      <SliderRail {...railProps} />
      <SliderTrack {...trackProps} />
      {marks
        .filter((mark) => mark.value >= min && mark.value <= max)
        .map((mark, index) => {
          const percent = valueToPercent(mark.value, min, max);
          const style = axisProps[axis].offset(percent);

          let markActive;
          if (track === false) {
            markActive = values.indexOf(mark.value) !== -1;
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
              <SliderMark
                data-index={index}
                {...markProps}
                style={{ ...style, ...markProps.style }}
                ownerState={{ ...ownerState, percent }}
                className={clsx(markProps.className, {
                  [classes.markActive]: markActive,
                })}
              />
              {mark.label != null ? (
                <SliderMarkLabel
                  aria-hidden
                  data-index={index}
                  {...markLabelProps}
                  ownerState={ownerState}
                  style={{ ...style, ...markLabelProps.style }}
                  className={clsx(classes.markLabel, markLabelProps.className, {
                    [classes.markLabelActive]: markActive,
                  })}
                >
                  {mark.label}
                </SliderMarkLabel>
              ) : null}
            </React.Fragment>
          );
        })}
      {values.map((value, index) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis].offset(percent);
        return (
          <SliderThumb
            key={index}
            data-index={index}
            {...thumbProps}
            className={clsx(thumbProps.className, {
              [classes.active]: active === index,
              [classes.focusVisible]: focusedThumbIndex === index,
            })}
            style={{
              ...style,
              pointerEvents: disableSwap && active !== index ? 'none' : undefined,
              ...thumbProps.style,
            }}
          >
            <SliderInput
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
              <SliderValueLabel
                {...valueLabelProps}
                className={clsx(valueLabelProps.className, {
                  [classes.valueLabelOpen]:
                    open === index || active === index || valueLabelDisplay === 'on',
                })}
              >
                {value}
              </SliderValueLabel>
            ) : null}
          </SliderThumb>
        );
      })}
    </SliderRoot>
  );
}) as OverridableComponent<SliderTypeMap>;

Slider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps: PropTypes.shape({
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
   * Indicates whether the theme context has rtl direction. It is set automatically.
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
   * @default (x) => x
   */
  scale: PropTypes.func,
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
   * @default (x) => x
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
} as any;

export default Slider;
