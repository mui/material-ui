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
import {
  CircularProgressProps,
  CircularProgressTypeMap,
  CircularProgressOwnerState,
} from './CircularProgressProps';

const circulate = keyframes({
  '0%': {
    // let the progress start at the top of the ring
    transform: 'rotate(-90deg)',
  },
  '100%': {
    transform: 'rotate(270deg)',
  },
});

const useUtilityClasses = (ownerState: CircularProgressOwnerState) => {
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
})<{ ownerState: CircularProgressOwnerState }>(({ ownerState, theme }) => {
  const { color, backgroundColor, ...rest } =
    theme.variants[ownerState.variant!]?.[ownerState.color!] || {};
  return {
    // integration with icon
    '--Icon-fontSize': 'calc(0.4 * var(--_root-size))',
    // public variables
    '--CircularProgress-track-color': backgroundColor,
    '--CircularProgress-progress-color': color,
    '--CircularProgress-percent': ownerState.value, // 0 - 100
    '--CircularProgress-animation': '0.5s linear 0s infinite normal none running',
    ...(ownerState.size === 'sm' && {
      '--CircularProgress-track-thickness': '4px',
      '--CircularProgress-progress-thickness': '4px',
      '--_root-size': 'var(--CircularProgress-size, 24px)', // use --_root-size to let other components overrides via --CircularProgress-size
    }),
    ...(ownerState.instanceSize === 'sm' && {
      '--CircularProgress-size': '24px',
    }),
    ...(ownerState.size === 'md' && {
      '--CircularProgress-track-thickness': '6px',
      '--CircularProgress-progress-thickness': '6px',
      '--_root-size': 'var(--CircularProgress-size, 40px)',
    }),
    ...(ownerState.instanceSize === 'md' && {
      '--CircularProgress-size': '40px',
    }),
    ...(ownerState.size === 'lg' && {
      '--CircularProgress-track-thickness': '8px',
      '--CircularProgress-progress-thickness': '8px',
      '--_root-size': 'var(--CircularProgress-size, 64px)',
    }),
    ...(ownerState.instanceSize === 'lg' && {
      '--CircularProgress-size': '64px',
    }),
    // internal variables
    '--_thickness-diff':
      'calc(var(--CircularProgress-track-thickness) - var(--CircularProgress-progress-thickness))',
    '--_inner-size': 'calc(var(--_root-size) - 2 * var(--variant-borderWidth))',
    width: 'var(--_root-size)',
    height: 'var(--_root-size)',
    borderRadius: 'var(--_root-size)',
    margin: 'var(--CircularProgress-margin)',
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    color,
    fontFamily: theme.vars.fontFamily.body,
    fontWeight: theme.vars.fontWeight.md,
    fontSize: 'calc(0.2 * var(--_root-size))',
    ...rest,
  };
});

const CircularProgressSvg = styled('svg', {
  name: 'JoyCircularProgress',
  slot: 'Svg',
  overridesResolver: (props, styles) => styles.svg,
})<{ ownerState: CircularProgressOwnerState }>({
  width: 'inherit',
  height: 'inherit',
  display: 'inherit',
  boxSizing: 'inherit',
  position: 'absolute',
  top: 'calc(-1 * var(--variant-borderWidth))', // centered align
  left: 'calc(-1 * var(--variant-borderWidth))', // centered align
});

const CircularProgressTrack = styled('circle', {
  name: 'JoyCircularProgress',
  slot: 'track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: CircularProgressOwnerState }>({
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
})<{ ownerState: CircularProgressOwnerState }>(
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
          animation: var(--CircularProgress-animation) ${circulate};
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
    instanceSize: inProps.size,
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
   * The props used for each slot inside the CircularProgress.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    progress: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    svg: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The boolean to select a variant.
   * Use indeterminate when there is no progress value.
   * @default false
   */
  determinate: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
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
   *
   * For indeterminate, @default 25
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default CircularProgress;
