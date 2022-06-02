import {
  SliderUnstyled,
  SliderValueLabelUnstyled,
  unstable_composeClasses as composeClasses,
} from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Theme, useThemeProps } from '../styles';
import styled from '../styles/styled';
import shouldSpreadAdditionalProps from '../utils/shouldSpreadAdditionalProps';
import sliderClasses, { getSliderUtilityClass } from './sliderClasses';
import { SliderProps, SliderTypeMap } from './SliderProps';

const useUtilityClasses = (ownerState: SliderProps) => {
  const { disabled, orientation, track, size, color } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      orientation === 'vertical' && 'vertical',
      track === 'inverted' && 'trackInverted',
      track === false && 'trackFalse',
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    rail: ['rail'],
    track: ['track'],
    mark: ['mark'],
    markLabel: ['markLabel'],
    valueLabel: ['valueLabel'],
    thumb: ['thumb', disabled && 'disabled'],
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
      '--Slider-thumb-background': theme.vars.palette[color!]?.[`solid${data.state || ''}Color`],
      '--Slider-thumb-color': theme.vars.palette[color!]?.plainColor,
    };
  };

const SliderRoot = styled('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SliderProps }>(({ theme, ownerState }) => {
  const getColorVariables = sliderColorVariables({ theme, ownerState });
  const isOrientedVertical = ownerState.orientation === 'vertical';
  return [
    {
      // Variables used for `track` are used for `rail` the same way
      '--Slider-track-radius': theme.vars.radius.lg,
      '--Slider-thumb-shadow': '0 0 0 1px var(--Slider-track-background)',
      ...(ownerState.size === 'sm' && {
        '--Slider-track-width': isOrientedVertical ? '6px' : '40px',
        '--Slider-track-height': isOrientedVertical ? '40px' : '6px',
        '--Slider-thumb-size': '16px',
        fontSize: theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'md' && {
        '--Slider-track-width': isOrientedVertical ? '12px' : '48px',
        '--Slider-track-height': isOrientedVertical ? '48px' : '12px',
        '--Slider-thumb-size': '24px',
        fontSize: theme.vars.fontSize.md,
      }),
      ...(ownerState.size === 'lg' && {
        '--Slider-track-width': isOrientedVertical ? '18px' : '64px',
        '--Slider-track-height': isOrientedVertical ? '64px' : '18px',
        '--Slider-thumb-size': '32px',
        fontSize: theme.vars.fontSize.lg,
      }),
      '--Slider-thumb-radius': 'calc(var(--Slider-thumb-size) / 2)',
      '--Slider-thumb-width': 'var(--Slider-thumb-size)',
      '--Slider-thumb-offset':
        'max((var(--Slider-track-height) - var(--Slider-thumb-size)) / 2, 0px)',
      ...getColorVariables(),
      '&:hover': {
        ...getColorVariables({ state: 'Hover' }),
      },
      [`&.${sliderClasses.disabled}`]: {
        pointerEvents: 'none',
        color: theme.vars.palette.text.tertiary,
        ...getColorVariables({ state: 'Disabled' }),
      },
      padding:
        'calc((var(--Slider-thumb-size) / 2) - (var(--Slider-track-height) / 2)) calc(-1 * var(--Slider-thumb-offset))',
      boxSizing: 'content-box',
      display: 'inline-block',
      position: 'relative',
      cursor: 'pointer',
      touchAction: 'none',
      width: '100%',
      WebkitTapHighlightColor: 'transparent',
      ...(ownerState.orientation === 'horizontal' && {
        minWidth: '5rem',
        padding: '13px 0',
        // The primary input mechanism of the device includes a pointing device of limited accuracy.
        '@media (pointer: coarse)': {
          // Reach 42px touch target, about ~8mm on screen.
          padding: '20px 0',
        },
      }),
      ...(ownerState.orientation === 'vertical' && {
        minHeight: '5rem',
        padding: '0 13px',
        // The primary input mechanism of the device includes a pointing device of limited accuracy.
        '@media (pointer: coarse)': {
          // Reach 42px touch target, about ~8mm on screen.
          padding: '0 20px',
        },
      }),
      '@media print': {
        colorAdjust: 'exact',
      },
    },
  ];
});

const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (props, styles) => styles.rail,
})<{ ownerState: SliderProps }>(({ ownerState }) => [
  {
    display: 'block',
    position: 'absolute',
    backgroundColor: 'var(--Slider-track-background)',
    borderRadius: 'var(--Slider-track-radius)',
    opacity: 0.38,
    ...(ownerState.orientation === 'horizontal' && {
      width: '100%',
      height: 'var(--Slider-track-height)',
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    ...(ownerState.orientation === 'vertical' && {
      height: '100%',
      width: 'var(--Slider-track-width)',
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(ownerState.track === 'inverted' && {
      opacity: 1,
    }),
  },
]);

const SliderTrack = styled('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: SliderProps }>(({ ownerState }) => {
  return [
    {
      display: 'block',
      position: 'absolute',
      color: 'var(--Slider-track-color)',
      backgroundColor: 'var(--Slider-track-background)',
      borderRadius: 'var(--Slider-track-radius)',
      ...(ownerState.orientation === 'horizontal' && {
        height: 'var(--Slider-track-height)',
        top: '50%',
        transform: 'translateY(-50%)',
      }),
      ...(ownerState.orientation === 'vertical' && {
        width: 'var(--Slider-track-width)',
        left: '50%',
        transform: 'translateX(-50%)',
      }),
      ...(ownerState.track === false && {
        display: 'none',
      }),
      ...(ownerState.track === 'inverted' && {
        backgroundColor: 'var(--Slider-thumb-background)',
        opacity: 0.62,
      }),
    },
  ];
});

const SliderThumb = styled('span', {
  name: 'MuiSlider',
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
      color: 'var(--Slider-thumb-color)',
      backgroundColor: 'var(--Slider-thumb-background)',
      ...(ownerState.orientation === 'horizontal' && {
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }),
      ...(ownerState.orientation === 'vertical' && {
        left: '50%',
        transform: 'translate(-50%, 50%)',
      }),
      '&:before': {
        position: 'absolute',
        content: '""',
        borderRadius: 'inherit',
        width: '100%',
        height: '100%',
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
    },
  ];
});

const SliderValueLabel = styled(SliderValueLabelUnstyled, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (props, styles) => styles.valueLabel,
})<{ ownerState: SliderProps }>(({ theme, ownerState }) => ({
  [`&.${sliderClasses.valueLabelOpen}`]: {
    transform: 'translateY(-100%) scale(1)',
  },
  zIndex: 1,
  whiteSpace: 'nowrap',
  ...theme.typography.body2,
  fontWeight: 500,
  top: -10,
  transformOrigin: 'bottom center',
  transform: 'translateY(-100%) scale(0)',
  position: 'absolute',
  backgroundColor: theme.palette.background.body,
  borderRadius: 2,
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem 0.75rem',
  ...(ownerState.size === 'sm' && {
    fontSize: theme.fontSize.xs,
    padding: '0.25rem 0.5rem',
  }),
  ...(ownerState.size === 'md' && {
    fontSize: theme.fontSize.sm,
    padding: '0.33rem 0.66rem',
  }),
  ...(ownerState.size === 'lg' && {
    fontSize: theme.fontSize.md,
    padding: '0.5rem 1rem',
  }),
  '&:before': {
    position: 'absolute',
    content: '""',
    width: 8,
    height: 8,
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 50%) rotate(45deg)',
    backgroundColor: 'inherit',
  },
}));

const SliderMark = styled('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  overridesResolver: (props, styles) => styles.mark,
})<{ ownerState: SliderProps }>(({ ownerState }) => ({
  position: 'absolute',
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: 'var(--Slider-thumb-color)',
  ...(ownerState.orientation === 'horizontal' && {
    top: '50%',
    transform: 'translate(-1px, -50%)',
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: '50%',
    transform: 'translate(-50%, 1px)',
  }),
}));

const SliderMarkLabel = styled('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  overridesResolver: (props, styles) => styles.markLabel,
})<{ ownerState: SliderProps }>(({ theme, ownerState }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  position: 'absolute',
  whiteSpace: 'nowrap',
  ...(ownerState.orientation === 'horizontal' && {
    top: 30,
    transform: 'translateX(-50%)',
    '@media (pointer: coarse)': {
      top: 40,
    },
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: 36,
    transform: 'translateY(50%)',
    '@media (pointer: coarse)': {
      left: 44,
    },
  }),
}));

const Slider = React.forwardRef(function Slider(inProps, ref) {
  const props = useThemeProps<typeof inProps & SliderProps>({ props: inProps, name: 'MuiSlider' });
  const {
    children,
    component = 'span',
    className,
    components = {},
    componentsProps = {},
    color = 'primary',
    size = 'md',
    ...other
  } = props;

  const ownerState = {
    ...props,
    size,
    color,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SliderUnstyled
      {...other}
      ref={ref}
      classes={classes}
      components={{
        Root: SliderRoot,
        Rail: SliderRail,
        Track: SliderTrack,
        Thumb: SliderThumb,
        ValueLabel: SliderValueLabel,
        Mark: SliderMark,
        MarkLabel: SliderMarkLabel,
        ...components,
      }}
      componentsProps={{
        ...componentsProps,
        root: {
          ...componentsProps.root,
          ...(shouldSpreadAdditionalProps(components.Root) && {
            as: component,
            ownerState: { size, color },
            className: clsx(classes.root, className),
          }),
        },
        thumb: {
          ...componentsProps.thumb,
          ...(shouldSpreadAdditionalProps(components.Thumb) && {
            ownerState: { size, color },
          }),
        },
        track: {
          ...componentsProps.track,
          ...(shouldSpreadAdditionalProps(components.Track) && {
            ownerState: { size, color },
          }),
        },
        valueLabel: {
          ...componentsProps.valueLabel,
          ...(shouldSpreadAdditionalProps(components.ValueLabel) && {
            ownerState: { size, color },
          }),
        },
      }}
    />
  );
}) as OverridableComponent<SliderTypeMap>;

Slider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
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
      className: PropTypes.string,
      components: PropTypes.shape({
        Root: PropTypes.elementType,
      }),
      style: PropTypes.object,
      value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
      valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
    }),
  }),
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Slider;
