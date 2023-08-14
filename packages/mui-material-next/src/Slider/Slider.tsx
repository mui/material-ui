'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, unstable_capitalize as capitalize } from '@mui/utils';
import {
  isHostComponent,
  useSlotProps,
  unstable_composeClasses as composeClasses,
} from '@mui/base';
import { useSlider, valueToPercent } from '@mui/base/useSlider';
import { shouldForwardProp } from '@mui/system';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import useTheme from '../styles/useTheme';
import shouldSpreadAdditionalProps from '../utils/shouldSpreadAdditionalProps';
import sliderClasses, { getSliderUtilityClass } from './sliderClasses';
import { SliderOwnerState, SliderTypeMap, SliderProps } from './Slider.types';
import { MD3ColorSchemeTokens, MD3State } from '../styles';
import useSliderElementsOverlap from './useSliderElementsOverlap';

function Identity<Type>(x: Type): Type {
  return x;
}

const SliderRoot = styled('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`color${capitalize(ownerState.color || 'primary')}`],
      ownerState.size !== 'medium' && styles[`size${capitalize(ownerState.size)}`],
      ownerState.marked && styles.marked,
      ownerState.orientation === 'vertical' && styles.vertical,
      ownerState.track === 'inverted' && styles.trackInverted,
      ownerState.track === false && styles.trackFalse,
    ];
  },
})<{ ownerState: SliderOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;

  return {
    '--md-comp-slider-thumb-size': ownerState.size === 'small' ? '12px' : '20px',
    borderRadius: tokens.sys.shape.corner.full,
    boxSizing: 'content-box',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    touchAction: 'none',
    color: tokens.sys.color[ownerState.color || 'primary'],
    WebkitTapHighlightColor: 'transparent',
    ...(ownerState.orientation === 'horizontal' && {
      height: 4,
      width: '100%',
      // 40px touch target
      padding: '18px 0',
      ...(ownerState.size === 'small' && {
        height: 2,
      }),
      ...(ownerState.marked && {
        marginBottom: 20,
      }),
    }),
    ...(ownerState.orientation === 'vertical' && {
      height: '100%',
      width: 4,
      padding: '0 18px',
      ...(ownerState.size === 'small' && {
        width: 2,
      }),
      ...(ownerState.marked && {
        marginRight: 44,
      }),
    }),
    '@media print': {
      colorAdjust: 'exact',
    },
    [`&.${sliderClasses.disabled}`]: {
      pointerEvents: 'none',
      cursor: 'default',
      color: tokens.sys.color.outline,
    },
    [`&.${sliderClasses.dragging}`]: {
      [`& .${sliderClasses.track}`]: {
        transition: 'none',
      },
      [`& .${sliderClasses.thumb}, .${sliderClasses.valueLabel}`]: {
        transition: theme.transitions.create(['border'], {
          duration: theme.transitions.duration.shortest,
        }),
      },
    },
  };
});

SliderRoot.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export { SliderRoot };

const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (props, styles) => styles.rail,
})<{ ownerState: SliderOwnerState }>(({ theme: { vars: tokens }, ownerState }) => ({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: tokens.sys.color.surfaceContainerHighest,
  boxShadow: tokens.sys.elevation[0],
  ...(ownerState.orientation === 'horizontal' && {
    width: '100%',
    height: 'inherit',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  ...(ownerState.orientation === 'vertical' && {
    height: '100%',
    width: 'inherit',
    left: '50%',
    transform: 'translateX(-50%)',
  }),
  ...(ownerState.track === 'inverted' && {
    backgroundColor: ownerState.disabled ? tokens.sys.color.outline : 'currentColor',
  }),
}));

SliderRail.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export { SliderRail };

const SliderTrack = styled('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: SliderOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;

  return {
    display: 'block',
    position: 'absolute',
    borderRadius: 'inherit',
    backgroundColor: 'currentColor',
    boxShadow: tokens.sys.elevation[0],
    transition: theme.transitions.create(['left', 'width', 'bottom', 'height'], {
      duration: theme.transitions.duration.shortest,
    }),
    ...(ownerState.orientation === 'horizontal' && {
      height: 'inherit',
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    ...(ownerState.orientation === 'vertical' && {
      width: 'inherit',
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(ownerState.track === false && {
      display: 'none',
    }),
    ...(ownerState.track === 'inverted' && {
      backgroundColor: tokens.sys.color.surfaceContainerHighest,
    }),
  };
});

SliderTrack.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export { SliderTrack };

const SliderThumb = styled('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOverlapping',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.thumb,
      props.isOverlapping && styles.thumbOverlap,
      styles[`thumbColor${capitalize(ownerState.color || 'primary')}`],
      ownerState.size !== 'medium' && styles[`thumbSize${capitalize(ownerState.size)}`],
    ];
  },
})<{ ownerState: SliderOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;

  function getBoxShadow(state: keyof MD3State) {
    return `0px 0px 0px 10px rgba(${tokens.sys.color.primaryChannel} / ${tokens.sys.state[state].stateLayerOpacity})`;
  }

  return {
    zIndex: 1,
    position: 'absolute',
    height: 'var(--md-comp-slider-thumb-size)',
    width: 'var(--md-comp-slider-thumb-size)',
    boxSizing: 'border-box',
    borderRadius: tokens.sys.shape.corner.full,
    outline: 0,
    backgroundColor: 'currentColor',
    border: '1px solid currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create(['box-shadow', 'left', 'right', 'bottom', 'border'], {
      duration: theme.transitions.duration.shortest,
    }),
    ...(ownerState.orientation === 'horizontal' && {
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }),
    ...(ownerState.orientation === 'vertical' && {
      left: '50%',
      transform: 'translate(-50%, 50%)',
    }),
    '&::before': {
      position: 'absolute',
      content: '""',
      borderRadius: 'inherit',
      width: 'var(--md-comp-slider-thumb-size)',
      height: 'var(--md-comp-slider-thumb-size)',
      boxShadow: tokens.sys.elevation[1],
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      borderRadius: '50%',
      // 40px is the hit target
      width: 40,
      height: 40,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '&:hover': {
      boxShadow: getBoxShadow('hover'),
      '@media (hover: none)': {
        boxShadow: 'none',
      },
    },
    [`&.${sliderClasses.focusVisible}`]: {
      boxShadow: getBoxShadow('focus'),
    },
    [`&.${sliderClasses.active}`]: {
      zIndex: 2,
      boxShadow: getBoxShadow('pressed'),
    },
    [`&.${sliderClasses.thumbOverlap}`]: {
      border: `1px solid ${tokens.ref.palette.common.white}`,
    },
    [`&.${sliderClasses.disabled}`]: {
      boxShadow: 'none',
      '&:before': {
        boxShadow: tokens.sys.elevation[0],
      },
    },
  };
});

SliderThumb.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export { SliderThumb };

const SliderValueLabel = styled('span', {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) &&
    prop !== 'isOverlapping' &&
    prop !== 'valueLabelDisplay' &&
    prop !== 'valueLabelFormat',
  overridesResolver: (props, styles) => [
    styles.valueLabel,
    props.isOverlapping && styles.valueLabelOverlap,
  ],
})<{ ownerState: SliderOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;

  const letterSpacing = `${
    theme.sys.typescale.label.medium.tracking / theme.sys.typescale.label.medium.size
  }rem`;

  const labelStyle = {
    color: ownerState.disabled
      ? tokens.sys.color.surface
      : tokens.sys.color[
          `on${capitalize(ownerState.color || 'primary')}` as keyof MD3ColorSchemeTokens
        ],
    // paddingLeft compensates letter spacing being added only on the right side
    paddingLeft: letterSpacing,
  };

  return {
    zIndex: 1,
    whiteSpace: 'nowrap',
    fontFamily: tokens.sys.typescale.label.medium.family,
    lineHeight: `calc(${tokens.sys.typescale.label.large.lineHeight} / ${tokens.sys.typescale.label.medium.size})`,
    fontWeight: tokens.sys.typescale.label.medium.weight,
    fontSize: theme.typography.pxToRem(theme.sys.typescale.label.medium.size),
    letterSpacing,
    transition: theme.transitions.create(['transform', 'border'], {
      duration: theme.transitions.duration.shortest,
    }),
    position: 'absolute',
    backgroundColor: 'currentColor',
    boxShadow: tokens.sys.elevation[0],
    borderRadius: '50% 50% 50% 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    border: '1px solid currentColor',
    width: 28,
    height: 28,
    [`&.${sliderClasses.valueLabelOverlap}`]: {
      border: `1px solid ${tokens.ref.palette.common.white}`,
    },
    ...(ownerState.orientation === 'horizontal' && {
      top: ownerState.size === 'small' ? -32 : -36,
      transform: 'translateY(50%) rotate(-45deg) scale(0)',
      [`& .${sliderClasses.valueLabelLabel}`]: {
        transform: 'rotate(45deg)',
        ...labelStyle,
      },
      [`&.${sliderClasses.valueLabelOpen}`]: {
        transform: 'translateY(0) rotate(-45deg) scale(1)',
      },
    }),
    ...(ownerState.orientation === 'vertical' && {
      left: ownerState.size === 'small' ? -32 : -36,
      transform: 'translateX(50%) rotate(225deg) scale(0)',
      [`& .${sliderClasses.valueLabelLabel}`]: {
        transform: 'rotate(-225deg)',
        ...labelStyle,
      },
      [`&.${sliderClasses.valueLabelOpen}`]: {
        transform: 'translateX(0) rotate(225deg) scale(1)',
      },
    }),
    ...(ownerState.size === 'small' && {
      fontSize: theme.typography.pxToRem(theme.sys.typescale.label.small.size),
      width: 24,
      height: 24,
    }),
  };
});

SliderValueLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.element,
} as any;

export { SliderValueLabel };

const SliderMark = styled('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'markActive',
  overridesResolver: (props, styles) => {
    const { markActive } = props;

    return [styles.mark, markActive && styles.markActive];
  },
})<{ ownerState: SliderOwnerState; markActive: boolean }>(
  ({ theme: { vars: tokens }, ownerState, markActive }) => ({
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: tokens.sys.shape.corner.full,
    backgroundColor: tokens.sys.color.onSurfaceVariant,
    opacity: 0.38,
    ...(ownerState.orientation === 'horizontal' && {
      top: '50%',
      transform: 'translate(-1px, -50%)',
    }),
    ...(ownerState.orientation === 'vertical' && {
      left: '50%',
      transform: 'translate(-50%, 1px)',
    }),
    ...(markActive && {
      backgroundColor:
        tokens.sys.color[
          `on${capitalize(ownerState.color || 'primary')}` as keyof MD3ColorSchemeTokens
        ],
    }),
  }),
);

SliderMark.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export { SliderMark };

const SliderMarkLabel = styled('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'markLabelActive',
  overridesResolver: (props, styles) => styles.markLabel,
})<{ ownerState: SliderOwnerState; markLabelActive: boolean }>(
  ({ theme, ownerState, markLabelActive }) => {
    const { vars: tokens } = theme;

    return {
      fontFamily: tokens.sys.typescale.label.medium.family,
      lineHeight: `calc(${tokens.sys.typescale.label.medium.lineHeight} / ${tokens.sys.typescale.label.medium.size})`,
      fontWeight: tokens.sys.typescale.label.medium.weight,
      fontSize: theme.typography.pxToRem(theme.sys.typescale.label.medium.size),
      letterSpacing: tokens.sys.typescale.label.medium.tracking,
      color: tokens.sys.color.onSurfaceVariant,
      position: 'absolute',
      whiteSpace: 'nowrap',
      ...(ownerState.orientation === 'horizontal' && {
        top: 36,
        transform: 'translateX(-50%)',
        '@media (pointer: coarse)': {
          top: 44,
        },
      }),
      ...(ownerState.orientation === 'vertical' && {
        left: 36,
        transform: 'translateY(50%)',
        '@media (pointer: coarse)': {
          left: 44,
        },
      }),
      ...(markLabelActive && {
        color: tokens.sys.color.onSurface,
      }),
    };
  },
);

SliderMarkLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export { SliderMarkLabel };

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
    valueLabelOpen: ['valueLabelOpen'],
    valueLabelLabel: ['valueLabelLabel'],
    valueLabelOverlap: ['valueLabelOverlap'],
    thumb: [
      'thumb',
      disabled && 'disabled',
      size && `thumbSize${capitalize(size)}`,
      color && `thumbColor${capitalize(color)}`,
    ],
    thumbOverlap: ['thumbOverlap'],
    active: ['active'],
    disabled: ['disabled'],
    focusVisible: ['focusVisible'],
  };

  return composeClasses(slots, getSliderUtilityClass, classes);
};

const Slider = React.forwardRef(function Slider<
  BaseComponentType extends React.ElementType = SliderTypeMap['defaultComponent'],
>(inProps: SliderProps<BaseComponentType>, ref: React.ForwardedRef<any>) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiSlider',
  });

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const {
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValuetext,
    'aria-labelledby': ariaLabelledby,
    component = 'span',
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
    name,
    onChange,
    onChangeCommitted,
    orientation = 'horizontal',
    size = 'medium',
    step = 1,
    scale = Identity,
    slotProps = {},
    slots = {},
    tabIndex,
    track = 'normal',
    value: valueProp,
    valueLabelDisplay = 'off',
    valueLabelFormat = Identity,
    ...other
  } = props;

  const propsWithDefaultValues = {
    ...props,
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
  } as Partial<SliderOwnerState>;

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
  } = useSlider({ ...propsWithDefaultValues, rootRef: ref });

  const ownerState: SliderOwnerState = {
    ...propsWithDefaultValues,
    marked: marks.length > 0 && marks.some((mark) => mark.label),
    dragging,
    focusedThumbIndex,
  };

  const classes = useUtilityClasses(ownerState);

  const overlapApi = useSliderElementsOverlap(axis);
  const lastActiveThumbIndexRef = React.useRef<number>(-1);
  if (focusedThumbIndex !== -1) {
    lastActiveThumbIndexRef.current = focusedThumbIndex;
  } else if (active !== -1) {
    lastActiveThumbIndexRef.current = active;
  }

  const RootSlot = slots.root ?? SliderRoot;
  const RailSlot = slots.rail ?? SliderRail;
  const TrackSlot = slots.track ?? SliderTrack;
  const ThumbSlot = slots.thumb ?? SliderThumb;
  const ValueLabelSlot = slots.valueLabel ?? SliderValueLabel;
  const MarkSlot = slots.mark ?? SliderMark;
  const MarkLabelSlot = slots.markLabel ?? SliderMarkLabel;
  const InputSlot = slots.input ?? 'input';

  const rootProps = useSlotProps({
    elementType: RootSlot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ...(shouldSpreadAdditionalProps(RootSlot) && {
        as: component,
      }),
    },
    ownerState,
    className: [classes.root, className],
  });

  const railProps = useSlotProps({
    elementType: RailSlot,
    externalSlotProps: slotProps.rail,
    ownerState,
    className: classes.rail,
  });

  const trackProps = useSlotProps({
    elementType: TrackSlot,
    externalSlotProps: slotProps.track,
    additionalProps: {
      style: {
        ...axisProps[axis].offset(trackOffset),
        ...axisProps[axis].leap(trackLeap),
      },
    },
    ownerState,
    className: classes.track,
  });

  const thumbProps = useSlotProps({
    elementType: ThumbSlot,
    getSlotProps: () =>
      getThumbProps({
        onTransitionEnd: overlapApi.onThumbMoved,
        onPointerMove: overlapApi.onThumbMoved,
      }),
    externalSlotProps: slotProps.thumb,
    ownerState,
    className: classes.thumb,
  });

  const valueLabelProps = useSlotProps({
    elementType: ValueLabelSlot,
    externalSlotProps: slotProps.valueLabel,
    ownerState,
    className: classes.valueLabel,
  });

  const markProps = useSlotProps({
    elementType: MarkSlot,
    externalSlotProps: slotProps.mark,
    ownerState,
    className: classes.mark,
  });

  const markLabelProps = useSlotProps({
    elementType: MarkLabelSlot,
    externalSlotProps: slotProps.markLabel,
    ownerState,
    className: classes.markLabel,
  });

  const inputSliderProps = useSlotProps({
    elementType: InputSlot,
    getSlotProps: getHiddenInputProps,
    externalSlotProps: slotProps.input,
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

        const isThumbOverlapping = overlapApi.getIsThumbOverlapping(
          index,
          lastActiveThumbIndexRef.current,
        );

        const isValueLabelOverlapping =
          valueLabelDisplay === 'on' &&
          overlapApi.getIsValueLabelOverlapping(index, lastActiveThumbIndexRef.current);

        return (
          <ThumbSlot
            key={index}
            data-index={index}
            {...thumbProps}
            className={clsx(classes.thumb, thumbProps.className, {
              [classes.active]: active === index,
              [classes.focusVisible]: focusedThumbIndex === index,
              [classes.thumbOverlap]: isThumbOverlapping,
            })}
            style={{
              ...style,
              pointerEvents: disableSwap && active !== index ? 'none' : undefined,
              zIndex: isValueLabelOverlapping || isThumbOverlapping ? 2 : undefined,
              ...thumbProps.style,
            }}
            ref={(thumbRef: HTMLElement) => {
              thumbProps.ref?.(thumbRef);
              overlapApi.setThumbRef(index, thumbRef);
            }}
            {...(!isHostComponent(ThumbSlot) && { isOverlapping: isThumbOverlapping })}
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
            {valueLabelDisplay !== 'off' ? (
              <ValueLabelSlot
                {...(!isHostComponent(ValueLabelSlot) && {
                  valueLabelFormat,
                  valueLabelDisplay,
                  value:
                    typeof valueLabelFormat === 'function'
                      ? valueLabelFormat(scale(value), index)
                      : valueLabelFormat,
                  disabled,
                  index,
                  open: open === index || active === index || valueLabelDisplay === 'on',
                  isOverlapping: isValueLabelOverlapping,
                })}
                {...valueLabelProps}
                className={clsx(valueLabelProps.className, {
                  [classes.valueLabelOpen]:
                    open === index || active === index || valueLabelDisplay === 'on',
                  [classes.valueLabelOverlap]: isValueLabelOverlapping,
                })}
                ref={(valueLabelRef: HTMLElement) => {
                  valueLabelProps.ref?.(valueLabelRef);
                  overlapApi.setValueLabelRef(index, valueLabelRef);
                }}
              >
                <span className={classes.valueLabelLabel}>
                  {typeof valueLabelFormat === 'function'
                    ? valueLabelFormat(scale(value), index)
                    : valueLabelFormat}
                </span>
              </ValueLabelSlot>
            ) : null}
          </ThumbSlot>
        );
      })}
    </RootSlot>
  );
});

Slider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
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
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary']),
    PropTypes.string,
  ]),
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
   * **Warning**: This is a generic event, not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event, not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: PropTypes.func,
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
   * The size of the slider.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside the Slider.
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
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
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
} as any;

export default Slider;
