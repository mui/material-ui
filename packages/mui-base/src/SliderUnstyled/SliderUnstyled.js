import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@mui/utils';
import appendOwnerState from '../utils/appendOwnerState';
import isHostComponent from '../utils/isHostComponent';
import composeClasses from '../composeClasses';
import { getSliderUtilityClass } from './sliderUnstyledClasses';
import SliderValueLabelUnstyled from './SliderValueLabelUnstyled';
import useSlider, { valueToPercent } from './useSlider';

const Identity = (x) => x;

const useUtilityClasses = (ownerState) => {
  const { disabled, dragging, marked, orientation, track, classes } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      dragging && 'dragging',
      marked && 'marked',
      orientation === 'vertical' && 'vertical',
      track === 'inverted' && 'trackInverted',
      track === false && 'trackFalse',
    ],
    rail: ['rail'],
    track: ['track'],
    mark: ['mark'],
    markActive: ['markActive'],
    markLabel: ['markLabel'],
    markLabelActive: ['markLabelActive'],
    valueLabel: ['valueLabel'],
    thumb: ['thumb', disabled && 'disabled'],
    active: ['active'],
    disabled: ['disabled'],
    focusVisible: ['focusVisible'],
  };

  return composeClasses(slots, getSliderUtilityClass, classes);
};

const Forward = ({ children }) => children;

const SliderUnstyled = React.forwardRef(function SliderUnstyled(props, ref) {
  const {
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValuetext,
    className,
    component,
    classes: classesProp,
    disableSwap = false,
    disabled = false,
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
    components = {},
    componentsProps = {},
    ...other
  } = props;

  // all props with defaults
  // consider extracting to hook an reusing the lint rule for the varints
  const ownerState = {
    ...props,
    marks: marksProp,
    classes: classesProp,
    disabled,
    isRtl,
    max,
    min,
    orientation,
    scale,
    step,
    track,
    valueLabelDisplay,
    valueLabelFormat,
  };

  const {
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    open,
    active,
    axis,
    range,
    focusVisible,
    dragging,
    marks,
    values,
    trackOffset,
    trackLeap,
  } = useSlider({ ...ownerState, ref });

  ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
  ownerState.dragging = dragging;

  const Root = component ?? components.Root ?? 'span';
  const rootProps = appendOwnerState(Root, { ...other, ...componentsProps.root }, ownerState);

  const Rail = components.Rail ?? 'span';
  const railProps = appendOwnerState(Rail, componentsProps.rail, ownerState);

  const Track = components.Track ?? 'span';
  const trackProps = appendOwnerState(Track, componentsProps.track, ownerState);
  const trackStyle = {
    ...axisProps[axis].offset(trackOffset),
    ...axisProps[axis].leap(trackLeap),
  };

  const Thumb = components.Thumb ?? 'span';
  const thumbProps = appendOwnerState(Thumb, componentsProps.thumb, ownerState);

  const ValueLabel = components.ValueLabel ?? SliderValueLabelUnstyled;
  const valueLabelProps = appendOwnerState(ValueLabel, componentsProps.valueLabel, ownerState);

  const Mark = components.Mark ?? 'span';
  const markProps = appendOwnerState(Mark, componentsProps.mark, ownerState);

  const MarkLabel = components.MarkLabel ?? 'span';
  const markLabelProps = appendOwnerState(MarkLabel, componentsProps.markLabel, ownerState);

  const Input = components.Input || 'input';
  const inputProps = appendOwnerState(Input, componentsProps.input, ownerState);
  const hiddenInputProps = getHiddenInputProps();

  const classes = useUtilityClasses(ownerState);

  return (
    <Root
      {...rootProps}
      {...getRootProps({ onMouseDown })}
      className={clsx(classes.root, rootProps.className, className)}
    >
      <Rail {...railProps} className={clsx(classes.rail, railProps.className)} />
      <Track
        {...trackProps}
        className={clsx(classes.track, trackProps.className)}
        style={{ ...trackStyle, ...trackProps.style }}
      />
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
              <Mark
                data-index={index}
                {...markProps}
                {...(!isHostComponent(Mark) && {
                  markActive,
                })}
                style={{ ...style, ...markProps.style }}
                className={clsx(classes.mark, markProps.className, {
                  [classes.markActive]: markActive,
                })}
              />
              {mark.label != null ? (
                <MarkLabel
                  aria-hidden
                  data-index={index}
                  {...markLabelProps}
                  {...(!isHostComponent(MarkLabel) && {
                    markLabelActive: markActive,
                  })}
                  style={{ ...style, ...markLabelProps.style }}
                  className={clsx(classes.markLabel, markLabelProps.className, {
                    [classes.markLabelActive]: markActive,
                  })}
                >
                  {mark.label}
                </MarkLabel>
              ) : null}
            </React.Fragment>
          );
        })}
      {values.map((value, index) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis].offset(percent);

        const ValueLabelComponent = valueLabelDisplay === 'off' ? Forward : ValueLabel;

        return (
          <React.Fragment key={index}>
            <ValueLabelComponent
              {...(!isHostComponent(ValueLabelComponent) && {
                valueLabelFormat,
                valueLabelDisplay,
                value:
                  typeof valueLabelFormat === 'function'
                    ? valueLabelFormat(scale(value), index)
                    : valueLabelFormat,
                index,
                open: open === index || active === index || valueLabelDisplay === 'on',
                disabled,
              })}
              {...valueLabelProps}
              className={clsx(classes.valueLabel, valueLabelProps.className)}
            >
              <Thumb
                data-index={index}
                {...thumbProps}
                {...getThumbProps()}
                className={clsx(classes.thumb, thumbProps.className, {
                  [classes.active]: active === index,
                  [classes.focusVisible]: focusVisible === index,
                })}
                style={{
                  ...style,
                  pointerEvents: disableSwap && active !== index ? 'none' : undefined,
                  ...thumbProps.style,
                }}
              >
                <Input
                  {...hiddenInputProps}
                  data-index={index}
                  aria-label={getAriaLabel ? getAriaLabel(index) : ariaLabel}
                  aria-valuenow={scale(value)}
                  aria-valuetext={
                    getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext
                  }
                  value={values[index]}
                  {...(!isHostComponent(Input) && {
                    ownerState: { ...ownerState, ...inputProps.ownerState },
                  })}
                  {...inputProps}
                  style={{
                    ...hiddenInputProps.style,
                    ...inputProps.style,
                  }}
                />
              </Thumb>
            </ValueLabelComponent>
          </React.Fragment>
        );
      })}
    </Root>
  );
});

SliderUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The label of the slider.
   */
  'aria-label': chainPropTypes(PropTypes.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-label'] != null) {
      return new Error(
        'MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
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
  'aria-valuetext': chainPropTypes(PropTypes.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext'] != null) {
      return new Error(
        'MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.',
      );
    }

    return null;
  }),
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Mark: PropTypes.elementType,
    MarkLabel: PropTypes.elementType,
    Rail: PropTypes.elementType,
    Root: PropTypes.elementType,
    Thumb: PropTypes.elementType,
    Track: PropTypes.elementType,
    ValueLabel: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.object,
    mark: PropTypes.object,
    markLabel: PropTypes.object,
    rail: PropTypes.object,
    root: PropTypes.object,
    thumb: PropTypes.object,
    track: PropTypes.object,
    valueLabel: PropTypes.shape({
      children: PropTypes.element,
      className: PropTypes.string,
      components: PropTypes.shape({
        Root: PropTypes.elementType,
      }),
      open: PropTypes.bool,
      style: PropTypes.object,
      value: PropTypes.number,
      valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
    }),
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
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: PropTypes.number,
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
};

export default SliderUnstyled;
