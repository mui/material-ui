import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { shouldForwardProp } from '@mui/system';
import { useSlider } from '@mui/base/SliderUnstyled';
import { useThemeProps, styled, Theme } from '../styles';
import sliderClasses, { getSliderUtilityClass } from './sliderClasses';
import { SliderProps, SliderTypeMap } from './SliderProps';

type OwnerState = SliderProps & {
  dragging: boolean;
  marked: boolean;
};

const valueToPercent = (value: number, min: number, max: number) =>
  ((value - min) * 100) / (max - min);

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
    valueLabelOpen: ['valueLabelOpen'],
    thumb: ['thumb', disabled && 'disabled'],
    thumbStart: ['thumbStart'],
    thumbEnd: ['thumbEnd'],
    active: ['active'],
    focusVisible: ['focusVisible'],
  };

  return composeClasses(slots, getSliderUtilityClass, classes);
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
})<{ ownerState: SliderProps }>(({ theme, ownerState }) => {
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
})<{ ownerState: SliderProps }>(({ ownerState }) => [
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
})<{ ownerState: SliderProps }>(({ ownerState }) => {
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
})<{ ownerState: SliderProps }>(({ ownerState }) => {
  return [
    {
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
      ...(ownerState.orientation === 'horizontal' && {
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }),
      ...(ownerState.orientation === 'vertical' && {
        left: '50%',
        transform: 'translate(-50%, 50%)',
      }),
    },
  ];
});

const SliderMark = styled('span', {
  name: 'JoySlider',
  slot: 'Mark',
  // `markActive` is injected by SliderUnstyled, should not spread to DOM
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'markActive',
  overridesResolver: (props, styles) => styles.mark,
})<{ ownerState: SliderProps & { markActive: boolean }; 'data-index': number }>(
  ({ ownerState, ...props }) => {
    return {
      position: 'absolute',
      width: 'var(--Slider-mark-size)',
      height: 'var(--Slider-mark-size)',
      borderRadius: 'var(--Slider-mark-size)',
      backgroundColor: 'var(--Slider-mark-background)',
      ...(ownerState.orientation === 'horizontal' && {
        top: '50%',
        transform: `translate(calc(var(--Slider-mark-size) / -2), -50%)`,
        ...(props['data-index'] === 0 && {
          // data-index is from SliderUnstyled
          transform: `translate(min(var(--Slider-mark-size), 3px), -50%)`,
        }),
        ...(props.style?.left === '100%' && {
          // workaround for detecting last mark
          transform: `translate(calc(var(--Slider-mark-size) * -1 - min(var(--Slider-mark-size), 3px)), -50%)`,
        }),
      }),
      ...(ownerState.orientation === 'vertical' && {
        left: '50%',
        transform: 'translate(-50%, calc(var(--Slider-mark-size) / 2))',
        ...(props['data-index'] === 0 && {
          // data-index is from SliderUnstyled
          transform: `translate(-50%, calc(min(var(--Slider-mark-size), 3px) * -1))`,
        }),
        ...(props.style?.bottom === '100%' && {
          // workaround for detecting last mark
          transform: `translate(-50%, calc(var(--Slider-mark-size) * 1 + min(var(--Slider-mark-size), 3px)))`,
        }),
      }),
    };
  },
);

const SliderValueLabel = styled('span', {
  name: 'JoySlider',
  slot: 'ValueLabel',
  overridesResolver: (props, styles) => styles.valueLabel,
})<{ ownerState: SliderProps }>(({ theme, ownerState }) => ({
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
  // `markLabelActive` is injected by SliderUnstyled, should not spread to DOM
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'markLabelActive',
  overridesResolver: (props, styles) => styles.markLabel,
})<{ ownerState: SliderProps }>(({ theme, ownerState }) => ({
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
})<{ ownerState: SliderProps }>({});

const Slider = React.forwardRef(function Slider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoySlider',
  });
  const {
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValuetext,
    className,
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

  ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
  ownerState.dragging = dragging;

  const trackStyle = {
    ...axisProps[axis].offset(trackOffset),
    ...axisProps[axis].leap(trackLeap),
  };

  const hiddenInputProps = getHiddenInputProps();

  const classes = useUtilityClasses(ownerState);

  return (
    <SliderRoot
      {...other}
      {...getRootProps(onMouseDown ? { onMouseDown } : {})}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
    >
      <SliderRail
        {...componentsProps.rail}
        ownerState={ownerState}
        className={clsx(classes.rail, componentsProps.rail?.className)}
      />
      <SliderTrack
        {...componentsProps.track}
        ownerState={ownerState}
        className={clsx(classes.track, componentsProps.track?.className)}
        style={{ ...trackStyle, ...componentsProps.track?.style }}
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
                {...componentsProps.mark}
                ownerState={{ ...ownerState, markActive }}
                style={{ ...style, ...componentsProps.mark?.style }}
                className={clsx(classes.mark, componentsProps.mark?.className, {
                  [classes.markActive]: markActive,
                })}
              />
              {mark.label != null ? (
                <SliderMarkLabel
                  aria-hidden
                  data-index={index}
                  {...componentsProps.markLabel}
                  ownerState={ownerState}
                  style={{ ...style, ...componentsProps.markLabel?.style }}
                  className={clsx(classes.markLabel, componentsProps.markLabel?.className, {
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
            {...componentsProps.thumb}
            {...getThumbProps()}
            ownerState={ownerState}
            className={clsx(classes.thumb, componentsProps.thumb?.className, {
              [classes.active]: active === index,
              [classes.focusVisible]: focusVisible === index,
              [classes.thumbStart]: percent === 0,
              [classes.thumbEnd]: percent === 100,
            })}
            style={{
              ...style,
              pointerEvents: disableSwap && active !== index ? 'none' : undefined,
              ...componentsProps.thumb?.style,
            }}
          >
            {/* @ts-expect-error TODO: revisit the null type in useSlider */}
            <SliderInput
              {...hiddenInputProps}
              {...componentsProps.input}
              data-index={index}
              aria-label={getAriaLabel ? getAriaLabel(index) : ariaLabel}
              aria-valuenow={scale(value)}
              aria-valuetext={
                getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext
              }
              value={values[index]}
              ownerState={ownerState}
              style={{
                ...hiddenInputProps.style,
                ...componentsProps.input?.style,
              }}
            />
            {valueLabelDisplay !== 'off' ? (
              <SliderValueLabel
                {...componentsProps.valueLabel}
                ownerState={ownerState}
                className={clsx(classes.valueLabel, componentsProps.valueLabel?.className, {
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

export default Slider;
