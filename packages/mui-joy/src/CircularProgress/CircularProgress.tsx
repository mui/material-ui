import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSlotProps } from '@mui/base/utils';
import { keyframes, css } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getCircularProgressUtilityClass } from './circularProgressClasses';
import { CircularProgressProps, CircularProgressTypeMap } from './CircularProgressProps';

const circulate = keyframes({
  '0%': {
    // let the progress start at the top of the ring
    transform: 'rotate(-90deg)',
  },
  '100%': {
    transform: 'rotate(270deg)',
  },
});

const useUtilityClasses = (ownerState: CircularProgressProps) => {
  const { determinate, color, variant, size } = ownerState;

  const slots = {
    root: [
      'root',
      determinate && 'indeterminate',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
      size && `size${capitalize(size)}`,
    ],
    svg: ['svg'],
    track: ['track'],
    progress: ['progress'],
  };

  return composeClasses(slots, getCircularProgressUtilityClass, {});
};

const CircularProgressRoot = styled('span', {
  name: 'JoyCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CircularProgressProps }>(({ ownerState, theme }) => {
  const { color, backgroundColor, ...rest } =
    theme.variants[ownerState.variant!]?.[ownerState.color!] || {};
  return {
    // integration with icon
    '--Icon-fontSize': 'calc(0.4 * var(--CircularProgress-size))',
    // internal variables
    '--_thickness-diff':
      'calc(var(--CircularProgress-track-thickness) - var(--CircularProgress-progress-thickness))',
    '--_inner-size': 'calc(var(--CircularProgress-size) - 2 * var(--variant-borderWidth))',
    // public variables
    '--CircularProgress-track-color': backgroundColor,
    '--CircularProgress-progress-color': color,
    '--CircularProgress-percent': ownerState.value, // 0 - 100
    ...(ownerState.size === 'sm' && {
      '--CircularProgress-size': '24px',
      '--CircularProgress-track-thickness': '4px',
      '--CircularProgress-progress-thickness': '4px',
    }),
    ...(ownerState.size === 'md' && {
      '--CircularProgress-size': '40px',
      '--CircularProgress-track-thickness': '6px',
      '--CircularProgress-progress-thickness': '6px',
    }),
    ...(ownerState.size === 'lg' && {
      '--CircularProgress-size': '64px',
      '--CircularProgress-track-thickness': '8px',
      '--CircularProgress-progress-thickness': '8px',
    }),
    width: 'var(--CircularProgress-size)',
    height: 'var(--CircularProgress-size)',
    borderRadius: 'var(--CircularProgress-size)',
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    color,
    fontFamily: theme.vars.fontFamily.body,
    fontSize: 'calc(0.2 * var(--CircularProgress-size))',
    ...rest,
  };
});

const CircularProgressSvg = styled('svg', {
  name: 'JoyCircularProgress',
  slot: 'Svg',
  overridesResolver: (props, styles) => styles.svg,
})<{ ownerState: CircularProgressProps }>({
  width: 'inherit',
  height: 'inherit',
  display: 'inherit',
  boxSizing: 'inherit',
  position: 'absolute',
  top: 'calc(-1 * var(--variant-borderWidth))',
  left: 'calc(-1 * var(--variant-borderWidth))',
});

const CircularProgressTrack = styled('circle', {
  name: 'JoyCircularProgress',
  slot: 'track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: CircularProgressProps }>({
  cx: '50%',
  cy: '50%',
  r: 'calc(var(--_inner-size) / 2 - var(--CircularProgress-track-thickness) / 2 + min(0px, var(--_thickness-diff) / 2))',
  fill: 'transparent',
  strokeWidth: 'var(--CircularProgress-track-thickness)',
  stroke: 'var(--CircularProgress-track-color)',
});

const CircularProgressProgress = styled('circle', {
  name: 'JoyCircularProgress',
  slot: 'progress',
  overridesResolver: (props, styles) => styles.progress,
})<{ ownerState: CircularProgressProps }>(
  {
    '--_progress-radius':
      'calc(var(--_inner-size) / 2 - var(--CircularProgress-progress-thickness) / 2 - max(0px, var(--_thickness-diff) / 2))',
    '--_progress-length': 'calc(2 * 3.1415926535 * var(--_progress-radius))',
    cx: '50%',
    cy: '50%',
    r: 'var(--_progress-radius)',
    fill: 'transparent',
    strokeWidth: 'var(--CircularProgress-progress-thickness)',
    stroke: 'var(--CircularProgress-progress-color)',
    strokeLinecap: 'round',
    strokeDasharray: 'var(--_progress-length)',
    strokeDashoffset:
      'calc(var(--_progress-length) - var(--CircularProgress-percent) * var(--_progress-length) / 100)',
    transformOrigin: 'center',
    transform: 'rotate(-90deg)', // to initially appear at the top-center of the circle.
  },
  ({ ownerState }) =>
    ownerState.determinate
      ? {
          transition: 'stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', // copy from Material UI CircularProgress
        }
      : css`
          animation: 0.5s linear 0s infinite normal none running ${circulate};
        `,
);

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const CircularProgress = React.forwardRef(function CircularProgress(inProps, ref) {
  const props = useThemeProps<typeof inProps & CircularProgressProps>({
    props: inProps,
    name: 'JoyCircularProgress',
  });

  const {
    componentsProps = {},
    component = 'span',
    children,
    className,
    color = 'primary',
    size = 'md',
    variant = 'soft',
    thickness,
    determinate = false,
    value = determinate ? 0 : 25, // `25` is the 1/4 of the circle.
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    size,
    variant,
    thickness,
    value,
    determinate,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: CircularProgressRoot,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      ref,
      as: component,
      role: 'progressbar',
    },
    className: clsx(classes.root, className),
    ...(value &&
      determinate && {
        'aria-valuenow': typeof value === 'number' ? Math.round(value) : Math.round(Number(value)),
      }),
  });

  const svgProps = useSlotProps({
    elementType: CircularProgressSvg,
    externalSlotProps: componentsProps.svg,
    ownerState,
    className: classes.svg,
  });

  const trackProps = useSlotProps({
    elementType: CircularProgressTrack,
    externalSlotProps: componentsProps.track,
    ownerState,
    className: classes.track,
  });

  const progressProps = useSlotProps({
    elementType: CircularProgressProgress,
    externalSlotProps: componentsProps.progress,
    ownerState,
    className: classes.progress,
  });

  return (
    <CircularProgressRoot {...rootProps}>
      <CircularProgressSvg {...svgProps}>
        <CircularProgressTrack {...trackProps} />
        <CircularProgressProgress {...progressProps} />
      </CircularProgressSvg>
      {children}
    </CircularProgressRoot>
  );
}) as OverridableComponent<CircularProgressTypeMap>;

CircularProgress.propTypes /* remove-proptypes */ = {
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
   * The props used for each slot inside the CircularProgress.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    progress: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    svg: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The boolean to select a variant.
   * Use indeterminate when there is no progress value.
   * @default false
   */
  determinate: PropTypes.bool,
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
   * The thickness of the circle.
   */
  thickness: PropTypes.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default CircularProgress;
