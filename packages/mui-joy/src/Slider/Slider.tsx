import {
  SliderUnstyled,
  SliderValueLabelUnstyled,
  unstable_composeClasses as composeClasses,
} from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import shouldSpreadAdditionalProps from '../utils/shouldSpreadAdditionalProps';
import sliderClasses, { getSliderUtilityClass } from './sliderClasses';
import { SliderProps, SliderTypeMap } from './SliderProps';

const useUtilityClasses = (ownerState: SliderProps) => {
  const { disabled, orientation, track, size, color, variant } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      orientation === 'vertical' && 'vertical',
      track === 'inverted' && 'trackInverted',
      track === false && 'trackFalse',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
      size && `size${capitalize(size)}`,
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

  return composeClasses(slots, getSliderUtilityClass, {});
};

const SliderRoot = styled('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SliderProps }>(({ ownerState }) => {
  return [
    {
      borderRadius: 12,
      boxSizing: 'content-box',
      display: 'inline-block',
      position: 'relative',
      cursor: 'pointer',
      touchAction: 'none',
      WebkitTapHighlightColor: 'transparent',
      ...(ownerState.orientation === 'horizontal' && {
        ...(ownerState.size === 'sm' && {
          height: 4,
        }),
        ...(ownerState.size === 'md' && {
          height: 6,
        }),
        ...(ownerState.size === 'lg' && {
          height: 8,
        }),
        minWidth: '5rem',
        padding: '13px 0',
        // The primary input mechanism of the device includes a pointing device of limited accuracy.
        '@media (pointer: coarse)': {
          // Reach 42px touch target, about ~8mm on screen.
          padding: '20px 0',
        },
      }),
      ...(ownerState.orientation === 'vertical' && {
        ...(ownerState.size === 'sm' && {
          width: 4,
        }),
        ...(ownerState.size === 'md' && {
          width: 6,
        }),
        ...(ownerState.size === 'lg' && {
          width: 8,
        }),
        minHeight: '5rem',
        padding: '0 13px',
        // The primary input mechanism of the device includes a pointing device of limited accuracy.
        '@media (pointer: coarse)': {
          // Reach 42px touch target, about ~8mm on screen.
          padding: '0 20px',
        },
        ...(ownerState.size === 'sm' && {
          width: 2,
        }),
      }),
      '@media print': {
        colorAdjust: 'exact',
      },
      [`&.${sliderClasses.disabled}`]: {
        pointerEvents: 'none',
        cursor: 'default',
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
    borderRadius: 'inherit',
    backgroundColor: 'currentColor',
    opacity: 0.38,
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
      opacity: 1,
    }),
  },
]);

const SliderTrack = styled('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: SliderProps }>(({ theme, ownerState }) => {
  const invertedColor =
    theme.palette[ownerState.color!][theme.palette.mode === 'light' ? '200' : '700'];
  return [
    {
      display: 'block',
      position: 'absolute',
      borderRadius: 'inherit',
      border: '1px solid currentColor',
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
        backgroundColor: invertedColor,
        borderColor: invertedColor,
      }),
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
    theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
  ];
});

const SliderThumb = styled('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb,
})<{ ownerState: SliderProps }>(({ theme, ownerState }) => {
  return [
    {
      ...(ownerState.size === 'sm' && {
        '--Slider-thumb-size': '0.5rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Slider-thumb-size': '0.75rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Slider-thumb-size': '1rem',
      }),
      position: 'absolute',
      width: 'var(--Slider-thumb-size)',
      height: 'var(--Slider-thumb-size)',
      boxSizing: 'border-box',
      borderRadius: '50%',
      outline: 0,
      backgroundColor: 'currentColor',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
        ...(ownerState.size === 'sm' && {
          boxShadow: 'none',
        }),
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
      [`&.${sliderClasses.disabled}`]: {
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
    theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
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
  backgroundColor: 'currentColor',
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
    variant = 'solid',
    ...other
  } = props;

  const ownerState = {
    ...props,
    size,
    color,
    variant,
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
            ownerState: { variant, size, color },
          }),
        },
        thumb: {
          ...componentsProps.thumb,
          ...(shouldSpreadAdditionalProps(components.Thumb) && {
            ownerState: { variant, size, color },
          }),
        },
        track: {
          ...componentsProps.track,
          ...(shouldSpreadAdditionalProps(components.Track) && {
            ownerState: { variant, size, color },
          }),
        },
        valueLabel: {
          ...componentsProps.valueLabel,
          ...(shouldSpreadAdditionalProps(components.ValueLabel) && {
            ownerState: { variant, size, color },
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
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default Slider;
