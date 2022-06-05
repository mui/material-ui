import PropTypes from 'prop-types';
import * as React from 'react';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { shouldForwardProp } from '@mui/system';
import {
  SliderUnstyled,
  SliderValueLabelUnstyled,
  unstable_composeClasses as composeClasses,
} from '@mui/base';
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
})<{ ownerState: SliderProps; 'data-index': number; style: React.CSSProperties }>(
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
          transform: `translate(-50%, min(var(--Slider-mark-size), 3px))`,
        }),
        ...(props.style?.left === '100%' && {
          // workaround for detecting last mark
          transform: `translate(-50%, calc(var(--Slider-mark-size) * -1 - min(var(--Slider-mark-size), 3px)))`,
        }),
      }),
    };
  },
);

const SliderValueLabel = styled(SliderValueLabelUnstyled, {
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
  bottom: '2px',
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
    bottom: 0,
    width: 'var(--Slider-valueLabel-arrowSize)',
    height: 'var(--Slider-valueLabel-arrowSize)',
    left: '50%',
    transform: 'translate(-50%, 50%) rotate(45deg)',
    backgroundColor: 'inherit',
  },
  [`&.${sliderClasses.valueLabelOpen}`]: {
    transform:
      'translateY(calc((var(--Slider-thumb-size) + var(--Slider-valueLabel-arrowSize)) * -1)) scale(1)',
  },
  [`& .${sliderClasses.valueLabelCircle}`]: {
    display: 'inline-flex',
    zIndex: 1,
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
    top: 'calc(50% + (max(var(--Slider-track-size), var(--Slider-thumb-size)) / 2))',
    transform: 'translateX(-50%)',
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: 36,
    transform: 'translateY(50%)',
  }),
}));

const Slider = React.forwardRef(function Slider(inProps, ref) {
  const props = useThemeProps<typeof inProps & SliderProps>({ props: inProps, name: 'JoySlider' });
  const {
    component = 'span',
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
            ownerState,
          }),
        },
        thumb: {
          ...componentsProps.thumb,
          ...(shouldSpreadAdditionalProps(components.Thumb) && {
            ownerState,
          }),
        },
        track: {
          ...componentsProps.track,
          ...(shouldSpreadAdditionalProps(components.Track) && {
            ownerState,
          }),
        },
        valueLabel: {
          ...componentsProps.valueLabel,
          ...(shouldSpreadAdditionalProps(components.ValueLabel) && {
            ownerState,
          }),
        },
        markLabel: {
          ...componentsProps.markLabel,
          ...(shouldSpreadAdditionalProps(components.ValueLabel) && {
            ownerState,
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
