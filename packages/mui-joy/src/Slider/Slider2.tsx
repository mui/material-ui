import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { useSlider, valueToPercent } from '@mui/base/SliderUnstyled';
import { useThemeProps } from '../styles';
import { getSliderUtilityClass } from './sliderClasses';
import { SliderProps, SliderTypeMap } from './SliderProps';

type OwnerState = SliderProps & {
  dragging: boolean;
  marked: boolean;
};

const Identity = (x: any) => x;

const useUtilityClasses = (ownerState: OwnerState) => {
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

const Slider = React.forwardRef(function Slider(inProps, ref) {
  const props = useThemeProps<typeof inProps>({ props: inProps, name: 'JoySlider' });
  const {
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValuetext,
    className,
    component,
    componentsProps = {},
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
    ...other
  } = props;

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
  } as OwnerState;

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

  ownerState.marked =
    marks === true ||
    (Array.isArray(marks) && marks.length > 0 && marks.some((mark) => mark.label));
  ownerState.dragging = dragging;

  const trackStyle = {
    ...axisProps[axis].offset(trackOffset),
    ...axisProps[axis].leap(trackLeap),
  };

  const hiddenInputProps = getHiddenInputProps();

  const classes = useUtilityClasses(ownerState);

  return (
    <SliderRoot
      {...rootProps}
      {...getRootProps({ onMouseDown })}
      className={clsx(classes.root, rootProps.className, className)}
    >
      <SliderRail {...railProps} className={clsx(classes.rail, railProps.className)} />
      <SliderTrack
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
              <SliderMark
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
                <SliderMarkLabel
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
                </SliderMarkLabel>
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
              <SliderThumb
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
                <SliderInput
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
              </SliderThumb>
            </ValueLabelComponent>
          </React.Fragment>
        );
      })}
    </SliderRoot>
  );
}) as OverridableComponent<SliderTypeMap>;

export default Slider;
