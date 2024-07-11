import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import {
  type SliderOwnerState,
  type SliderProps,
  sliderClasses,
  getSliderUtilityClass,
} from '@mui/material/Slider';
import { isHostComponent, useSlotProps } from '@mui/base/utils';
import { styled } from '@mui/material-pigment-css';
import { capitalize } from '@mui/material/utils';
import { SliderValueLabel } from '@mui/material/Slider';
import { useSlider, valueToPercent } from '@mui/base/useSlider';
import { alpha, lighten, darken } from '@mui/system/colorManipulator';
import type { Theme } from '@mui/material/styles';

const shouldSpreadAdditionalProps = (Slot?: React.ElementType) => {
  return !Slot || !isHostComponent(Slot);
};

function Identity<T>(x: T): T {
  return x;
}

type SliderNestedOwnerState = SliderOwnerState & {
  ownerState: SliderOwnerState;
};

const SliderRoot = styled('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver(props, styles) {
    const { ownerState } = props;
    return [
      styles.root,
      styles[`color${capitalize(ownerState.color ?? '')}`],
      ownerState.size !== 'medium' && styles[`size${capitalize(ownerState.size ?? '')}`],
      ownerState.marked && styles.marked,
      ownerState.orientation === 'vertical' && styles.vertical,
      ownerState.track === 'inverted' && styles.trackInverted,
      ownerState.track === false && styles.trackFalse,
    ];
  },
})<SliderNestedOwnerState>(({ theme }) => ({
  borderRadius: '12px',
  boxSizing: 'content-box',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  touchAction: 'none',
  WebkitTapHighlightColor: 'transparent',
  '@media print': {
    printColorAdjust: 'exact',
  },
  [`&.${sliderClasses.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: (theme.vars || theme).palette.grey[400],
  },
  [`&.${sliderClasses.dragging}`]: {
    [`& .${sliderClasses.thumb}, & .${sliderClasses.track}`]: {
      transition: 'none',
    },
  },
  variants: [
    {
      props({ color }) {
        return color === 'primary';
      },
      style: {
        color: (theme.vars || theme).palette.primary.main,
      },
    },
    {
      props: {
        color: 'secondary',
      },
      style: {
        color: (theme.vars || theme).palette.secondary.main,
      },
    },
    {
      props: {
        orientation: 'horizontal',
      },
      style: {
        height: 4,
        width: '100%',
        padding: '13px 0',
        // The primary input mechanism of the device includes a pointing device of limited accuracy.
        '@media (pointer: coarse)': {
          // Reach 42px touch target, about ~8mm on screen.
          padding: '20px 0',
        },
      },
    },
    {
      props: {
        orientation: 'horizontal',
        size: 'small',
      },
      style: {
        height: 2,
      },
    },
    {
      props: {
        orientation: 'horizontal',
        marked: true,
      },
      style: {
        marginBottom: 20,
      },
    },
    {
      props: {
        orientation: 'vertical',
      },
      style: {
        height: '100%',
        width: 4,
        padding: '0 13px',
        // The primary input mechanism of the device includes a pointing device of limited accuracy.
        '@media (pointer: coarse)': {
          // Reach 42px touch target, about ~8mm on screen.
          padding: '0 20px',
        },
      },
    },
    {
      props: {
        orientation: 'vertical',
        size: 'small',
      },
      style: {
        width: 2,
      },
    },
    {
      props: {
        orientation: 'vertical',
        marked: true,
      },
      style: {
        marginRight: 44,
      },
    },
  ],
}));

export { SliderRoot };

const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (props, styles) => styles.rail,
})<SliderNestedOwnerState>({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38,
  variants: [
    {
      props: {
        orientation: 'horizontal',
      },
      style: {
        width: '100%',
        height: 'inherit',
        top: '50%',
        transform: 'translateY(-50%)',
      },
    },
    {
      props: {
        orientation: 'vertical',
      },
      style: {
        height: '100%',
        width: 'inherit',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
    {
      props: {
        track: 'inverted',
      },
      style: {
        opacity: 1,
      },
    },
  ],
});

export { SliderRail };

const SliderTrack = styled('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})<SliderNestedOwnerState>(({ theme }) => {
  const lightPrimaryColor = theme.vars
    ? theme.vars.palette.Slider.primaryTrack
    : lighten(theme.palette.primary.main, 0.62);
  const lightSecondaryColor = theme.vars
    ? theme.vars.palette.Slider.secondaryTrack
    : lighten(theme.palette.secondary.main, 0.62);
  const darkPrimaryColor = theme.vars
    ? theme.vars.palette.Slider.primaryTrack
    : darken(theme.palette.primary.main, 0.5);
  const darkSecondaryColor = theme.vars
    ? theme.vars.palette.Slider.secondaryTrack
    : darken(theme.palette.secondary.main, 0.5);

  return {
    display: 'block',
    position: 'absolute',
    borderRadius: 'inherit',
    border: '1px solid currentColor',
    backgroundColor: 'currentColor',
    transition: theme.transitions.create(['left', 'width', 'bottom', 'height'], {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: {
          color: 'primary',
        },
        style: {
          '--slider-track-color': lightPrimaryColor,
          ...theme.applyStyles('dark', {
            '--slider-track-color': darkPrimaryColor,
          }),
        },
      },
      {
        props: {
          color: 'secondary',
        },
        style: {
          '--slider-track-color': lightSecondaryColor,
          ...theme.applyStyles('dark', {
            '--slider-track-color': darkSecondaryColor,
          }),
        },
      },
      {
        props: {
          size: 'small',
        },
        style: {
          border: 'none',
        },
      },
      {
        props: {
          orientation: 'horizontal',
        },
        style: {
          height: 'inherit',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      {
        props: {
          orientation: 'vertical',
        },
        style: {
          width: 'inherit',
          left: '50%',
          transform: 'translateX(-50%)',
        },
      },
      {
        props: {
          track: false,
        },
        style: {
          display: 'none',
        },
      },
      {
        props: {
          track: 'inverted',
          color: 'primary',
        },
        style: {
          backgroundColor: (theme.vars ?? theme).palette.Slider?.primaryTrack,
          borderColor: (theme.vars ?? theme).palette.Slider?.primaryTrack,
        },
      },
      {
        props: {
          track: 'inverted',
          color: 'secondary',
        },
        style: {
          backgroundColor: (theme.vars ?? theme).palette.Slider?.secondaryTrack,
          borderColor: (theme.vars ?? theme).palette.Slider?.secondaryTrack,
        },
      },
    ],
  };
});

export { SliderTrack };

const SliderThumb = styled('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.thumb,
      styles[`thumbColor${capitalize(ownerState.color ?? '')}`],
      ownerState.size !== 'medium' && styles[`thumbSize${capitalize(ownerState.size ?? '')}`],
    ];
  },
})<SliderNestedOwnerState>(({ theme }) => ({
  position: 'absolute',
  width: 20,
  height: 20,
  boxSizing: 'border-box',
  borderRadius: '50%',
  outline: 0,
  backgroundColor: 'currentColor',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['box-shadow', 'left', 'bottom'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:before': {
    position: 'absolute',
    content: '""',
    borderRadius: 'inherit',
    width: '100%',
    height: '100%',
    boxShadow: (theme.vars || theme).shadows[2],
  },
  '&::after': {
    position: 'absolute',
    content: '""',
    borderRadius: '50%',
    // 42px is the hit target
    width: 42,
    height: 42,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  [`&:hover, &.${sliderClasses.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px var(--slider-thumb-shadow-color)`,
    '@media (hover: none)': {
      boxShadow: 'none',
    },
  },
  [`&.${sliderClasses.active}`]: {
    boxShadow: `0px 0px 0px 14px var(--slider-thumb-shadow-color)`,
  },
  [`&.${sliderClasses.disabled}`]: {
    '&:hover': {
      boxShadow: 'none',
    },
  },
  variants: [
    {
      props: {
        color: 'primary',
      },
      style: {
        '--slider-thumb-shadow-color': theme.vars
          ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.16)`
          : alpha((theme as Theme).palette.primary.main, 0.16),
      },
    },
    {
      props: {
        color: 'secondary',
      },
      style: {
        '--slider-thumb-shadow-color': theme.vars
          ? `rgba(${theme.vars.palette.secondary.mainChannel} / 0.16)`
          : alpha((theme as Theme).palette.secondary.main, 0.16),
      },
    },
    {
      props: {
        size: 'small',
      },
      style: {
        width: 12,
        height: 12,
        '&:before': {
          boxShadow: 'none',
        },
      },
    },
    {
      props: {
        orientation: 'horizontal',
      },
      style: {
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
    {
      props: {
        orientation: 'vertical',
      },
      style: {
        left: '50%',
        transform: 'translate(-50%, 50%)',
      },
    },
  ],
}));

export { SliderThumb };

const StyledSliderValueLabel = styled(SliderValueLabel, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (props, styles) => styles.valueLabel,
})<SliderOwnerState>(({ theme }) => ({
  zIndex: 1,
  whiteSpace: 'nowrap',
  ...theme.typography.body2,
  fontWeight: 500,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.shortest,
  }),
  position: 'absolute',
  backgroundColor: (theme.vars || theme).palette.grey[600],
  borderRadius: '2px',
  color: (theme.vars || theme).palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem 0.75rem',
  variants: [
    {
      props: {
        size: 'small',
      },
      style: {
        fontSize: theme.typography.pxToRem(12),
        padding: '0.25rem 0.5rem',
      },
    },
    {
      props: {
        orientation: 'horizontal',
      },
      style: {
        top: '-10px',
        transformOrigin: 'bottom center',
        transform: 'translateY(-100%) scale(0)',
        '&:before': {
          position: 'absolute',
          content: '""',
          width: 8,
          height: 8,
          transform: 'translate(-50%, 50%) rotate(45deg)',
          backgroundColor: 'inherit',
          bottom: 0,
          left: '50%',
        },
        [`&.${sliderClasses.valueLabelOpen}`]: {
          transform: 'translateY(-100%) scale(1)',
        },
      },
    },
    {
      props: {
        orientation: 'vertical',
      },
      style: {
        top: '50%',
        right: '30px',
        transform: 'translateY(-50%) scale(0)',
        transformOrigin: 'right center',
        '&:before': {
          position: 'absolute',
          content: '""',
          width: 8,
          height: 8,
          transform: 'translate(-50%, -50%) rotate(45deg)',
          backgroundColor: 'inherit',
          right: -8,
          top: '50%',
        },
        [`&.${sliderClasses.valueLabelOpen}`]: {
          transform: 'translateY(-50%) scale(1)',
        },
      },
    },
    {
      props: {
        orientation: 'vertical',
        size: 'small',
      },
      style: {
        right: '20px',
      },
    },
  ],
}));

export { StyledSliderValueLabel as SliderValueLabel };

const SliderMark = styled('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  // @TODO - Support this in `styled` implementation
  // shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== 'markActive',
  overridesResolver: (props, styles) => {
    const { markActive } = props;

    return [styles.mark, markActive && styles.markActive];
  },
})<SliderOwnerState & { markActive?: boolean }>(({ theme }) => ({
  position: 'absolute',
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor',
  variants: [
    {
      props: {
        orientation: 'horizontal',
      },
      style: {
        top: '50%',
        transform: 'translate(-1px, -50%)',
      },
    },
    {
      props: {
        orientation: 'vertical',
      },
      style: {
        left: '50%',
        transform: 'translate(-50%, 1px)',
      },
    },
    {
      props: {
        markActive: true,
      },
      style: {
        backgroundColor: (theme.vars || theme).palette.background.paper,
        opacity: 0.8,
      },
    },
  ],
}));

export { SliderMark };

const SliderMarkLabel = styled('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  // @TODO
  // shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== 'markLabelActive',
  overridesResolver: (props, styles) => styles.markLabel,
})<SliderOwnerState>(({ theme }) => ({
  ...theme.typography.body2,
  color: (theme.vars || theme).palette.text.secondary,
  position: 'absolute',
  whiteSpace: 'nowrap',
  variants: [
    {
      props: {
        orientation: 'horizontal',
      },
      style: {
        top: 30,
        transform: 'translateX(-50%)',
        '@media (pointer: coarse)': {
          top: 40,
        },
      },
    },
    {
      props: {
        orientation: 'vertical',
      },
      style: {
        left: 36,
        transform: 'translateY(50%)',
        '@media (pointer: coarse)': {
          left: 44,
        },
      },
    },
    {
      props: {
        markLabelActive: true,
      },
      style: {
        color: (theme.vars || theme).palette.text.primary,
      },
    },
  ],
}));

const useUtilityClasses = (ownerState: SliderOwnerState) => {
  const { disabled, dragging, marked, orientation, track, classes, color, size } = ownerState;

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
    thumb: [
      'thumb',
      disabled && 'disabled',
      size && `thumbSize${capitalize(size)}`,
      color && `thumbColor${capitalize(color)}`,
    ],
    active: ['active'],
    disabled: ['disabled'],
    focusVisible: ['focusVisible'],
  };

  return composeClasses(slots, getSliderUtilityClass, classes);
};

export { SliderMarkLabel };

const Forward = ({ children }: React.PropsWithChildren) => children;

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(function Slider(props, ref) {
  // @TODO - Figure out how to persist this information
  const isRtl = false; // theme.direction === 'rtl';

  const {
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValuetext,
    'aria-labelledby': ariaLabelledby,
    component = 'span',
    components = {},
    componentsProps = {},
    color = 'primary',
    classes: classesProp,
    className,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    orientation = 'horizontal',
    size = 'medium',
    step = 1,
    scale = Identity,
    slotProps,
    slots,
    track = 'normal',
    valueLabelDisplay = 'off',
    valueLabelFormat = Identity,
    ...other
  } = props;

  const ownerState: SliderOwnerState = {
    ...props,
    // @ts-expect-error  @TODO - Figure out how to support rtl/ltr with themes
    isRtl,
    max,
    min,
    classes: classesProp,
    disabled,
    disableSwap,
    orientation,
    marks: marksProp,
    color,
    size,
    step,
    scale,
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
    focusedThumbIndex,
    range,
    dragging,
    marks,
    values,
    trackOffset,
    trackLeap,
    getThumbStyle,
  } = useSlider({
    ...ownerState,
    rootRef: ref,
  });

  ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
  ownerState.dragging = dragging;
  ownerState.focusedThumbIndex = focusedThumbIndex;

  const classes = useUtilityClasses(ownerState);

  const RootSlot = slots?.root ?? components.Root ?? SliderRoot;
  const RailSlot = slots?.rail ?? components.Rail ?? SliderRail;
  const TrackSlot = slots?.track ?? components.Track ?? SliderTrack;
  const ThumbSlot = slots?.thumb ?? components.Thumb ?? SliderThumb;
  const ValueLabelSlot = slots?.valueLabel ?? components.ValueLabel ?? StyledSliderValueLabel;
  const MarkSlot = slots?.mark ?? components.Mark ?? SliderMark;
  const MarkLabelSlot = slots?.markLabel ?? components.MarkLabel ?? SliderMarkLabel;
  const InputSlot = slots?.input ?? components.Input ?? 'input';

  const rootSlotProps = slotProps?.root ?? componentsProps.root;
  const railSlotProps = slotProps?.rail ?? componentsProps.rail;
  const trackSlotProps = slotProps?.track ?? componentsProps.track;
  const thumbSlotProps = slotProps?.thumb ?? componentsProps.thumb;
  const valueLabelSlotProps = slotProps?.valueLabel ?? componentsProps.valueLabel;
  const markSlotProps = slotProps?.mark ?? componentsProps.mark;
  const markLabelSlotProps = slotProps?.markLabel ?? componentsProps.markLabel;
  const inputSlotProps = slotProps?.input ?? componentsProps.input;

  const rootProps = useSlotProps({
    elementType: RootSlot,
    getSlotProps: getRootProps,
    externalSlotProps: rootSlotProps,
    externalForwardedProps: other,
    additionalProps: {
      ...(shouldSpreadAdditionalProps(RootSlot) && {
        as: component,
      }),
    },
    ownerState: {
      ...ownerState,

      // @ts-expect-error
      ...rootSlotProps?.ownerState,
    },
    className: [classes.root, className],
  });

  const railProps = useSlotProps({
    elementType: RailSlot,
    externalSlotProps: railSlotProps,
    ownerState,
    className: classes.rail,
  });

  const trackProps = useSlotProps({
    elementType: TrackSlot,
    externalSlotProps: trackSlotProps,
    additionalProps: {
      style: {
        ...axisProps[axis].offset(trackOffset),
        ...axisProps[axis].leap(trackLeap),
      },
    },
    ownerState: {
      ...ownerState,
      // @ts-expect-error
      ...trackSlotProps?.ownerState,
    },
    className: classes.track,
  });

  const thumbProps = useSlotProps({
    elementType: ThumbSlot,
    getSlotProps: getThumbProps,
    externalSlotProps: thumbSlotProps,
    ownerState: {
      ...ownerState,
      // @ts-expect-error
      ...thumbSlotProps?.ownerState,
    },
    className: classes.thumb,
  });

  const valueLabelProps = useSlotProps({
    elementType: ValueLabelSlot,
    externalSlotProps: valueLabelSlotProps,
    ownerState: {
      ...ownerState,
      // @ts-expect-error
      ...valueLabelSlotProps?.ownerState,
    },
    className: classes.valueLabel,
  });

  const markProps = useSlotProps({
    elementType: MarkSlot,
    externalSlotProps: markSlotProps,
    ownerState,
    className: classes.mark,
  });

  const markLabelProps = useSlotProps({
    elementType: MarkLabelSlot,
    externalSlotProps: markLabelSlotProps,
    ownerState,
    className: classes.markLabel,
  });

  const inputSliderProps = useSlotProps({
    elementType: InputSlot,
    getSlotProps: getHiddenInputProps,
    externalSlotProps: inputSlotProps,
    ownerState,
  });

  return (
    <RootSlot {...rootProps}>
      <RailSlot {...railProps} />
      <TrackSlot {...trackProps} />
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
            <React.Fragment key={index}>
              <MarkSlot
                data-index={index}
                {...markProps}
                {...(!isHostComponent(MarkSlot) && {
                  markActive,
                })}
                style={{ ...style, ...markProps.style }}
                className={clsx(markProps.className, {
                  [classes.markActive]: markActive,
                })}
              />
              {mark.label != null ? (
                <MarkLabelSlot
                  aria-hidden
                  data-index={index}
                  {...markLabelProps}
                  {...(!isHostComponent(MarkLabelSlot) && {
                    markLabelActive: markActive,
                  })}
                  style={{ ...style, ...markLabelProps.style }}
                  className={clsx(classes.markLabel, markLabelProps.className, {
                    [classes.markLabelActive]: markActive,
                  })}
                >
                  {mark.label}
                </MarkLabelSlot>
              ) : null}
            </React.Fragment>
          );
        })}
      {values.map((value, index) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis].offset(percent);

        const ValueLabelComponent = valueLabelDisplay === 'off' ? Forward : ValueLabelSlot;

        return (
          /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
          <ValueLabelComponent
            key={index}
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
          >
            <ThumbSlot
              data-index={index}
              {...thumbProps}
              className={clsx(classes.thumb, thumbProps.className, {
                [classes.active]: active === index,
                [classes.focusVisible]: focusedThumbIndex === index,
              })}
              style={{
                ...style,
                ...getThumbStyle(index),
                ...thumbProps.style,
              }}
            >
              <InputSlot
                data-index={index}
                aria-label={getAriaLabel ? getAriaLabel(index) : ariaLabel}
                aria-valuenow={scale(value)}
                aria-labelledby={ariaLabelledby}
                aria-valuetext={
                  getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext
                }
                value={values[index]}
                {...inputSliderProps}
              />
            </ThumbSlot>
          </ValueLabelComponent>
        );
      })}
    </RootSlot>
  );
});

export default Slider;
