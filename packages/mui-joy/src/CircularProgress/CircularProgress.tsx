import PropTypes from 'prop-types';
import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { css, keyframes } from '@mui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { useColorInversion } from '../styles/ColorInversion';
import useSlot from '../utils/useSlot';
import { getCircularProgressUtilityClass } from './circularProgressClasses';
import {
  CircularProgressOwnerState,
  CircularProgressProps,
  CircularProgressTypeMap,
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
      determinate && 'determinate',
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
    '--CircularProgress-linecap': 'round',
    ...(ownerState.size === 'sm' && {
      '--CircularProgress-track-thickness': '3px',
      '--CircularProgress-progress-thickness': '3px',
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
    ...(ownerState.thickness && {
      '--CircularProgress-track-thickness': `${ownerState.thickness}px`,
      '--CircularProgress-progress-thickness': `${ownerState.thickness}px`,
    }),
    // internal variables
    '--_thickness-diff':
      'calc(var(--CircularProgress-track-thickness) - var(--CircularProgress-progress-thickness))',
    '--_inner-size': 'calc(var(--_root-size) - 2 * var(--variant-borderWidth, 0px))',
    '--_outlined-inset':
      'max(var(--CircularProgress-track-thickness), var(--CircularProgress-progress-thickness))',
    width: 'var(--_root-size)',
    height: 'var(--_root-size)',
    borderRadius: 'var(--_root-size)',
    margin: 'var(--CircularProgress-margin)',
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0, // prevent from shrinking when CircularProgress is in a flex container.
    position: 'relative',
    color,
    ...(ownerState.children && {
      // only add font related properties when there is a child.
      // so that when there is no child, the size can be controlled by the parent font-size e.g. Link
      fontFamily: theme.vars.fontFamily.body,
      fontWeight: theme.vars.fontWeight.md,
      fontSize: 'calc(0.2 * var(--_root-size))',
    }),
    ...rest,
    ...(ownerState.variant === 'outlined' && {
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        borderRadius: 'inherit',
        top: 'var(--_outlined-inset)',
        left: 'var(--_outlined-inset)',
        right: 'var(--_outlined-inset)',
        bottom: 'var(--_outlined-inset)',
        ...rest,
      },
    }),
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
  top: 'calc(-1 * var(--variant-borderWidth, 0px))', // centered align
  left: 'calc(-1 * var(--variant-borderWidth, 0px))', // centered align
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
    '--_progress-length': 'calc(2 * 3.1415926535 * var(--_progress-radius))', // the circumference around the progress
    cx: '50%',
    cy: '50%',
    r: 'var(--_progress-radius)',
    fill: 'transparent',
    strokeWidth: 'var(--CircularProgress-progress-thickness)',
    stroke: 'var(--CircularProgress-progress-color)',
    strokeLinecap: 'var(--CircularProgress-linecap, round)' as 'round', // can't use CSS variable directly, need to cast type.
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
          animation: var(
              --CircularProgress-circulation,
              0.8s linear 0s infinite normal none running
            )
            ${circulate};
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
    children,
    className,
    color: colorProp = 'primary',
    size = 'md',
    variant = 'soft',
    thickness,
    determinate = false,
    value = determinate ? 0 : 25, // `25` is the 1/4 of the circle.
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

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

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: CircularProgressRoot,
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      role: 'progressbar',
      style: {
        // Setting this CSS variable via inline-style
        // prevents the generation of new CSS every time
        // `value` prop updates
        '--CircularProgress-percent': value,
      },
      ...(value &&
        determinate && {
          'aria-valuenow':
            typeof value === 'number' ? Math.round(value) : Math.round(Number(value || 0)),
        }),
    },
  });

  const [SlotSvg, svgProps] = useSlot('svg', {
    className: classes.svg,
    elementType: CircularProgressSvg,
    externalForwardedProps: other,
    ownerState,
  });

  const [SlotTrack, trackProps] = useSlot('track', {
    className: classes.track,
    elementType: CircularProgressTrack,
    externalForwardedProps: other,
    ownerState,
  });

  const [SlotProgress, progressProps] = useSlot('progress', {
    className: classes.progress,
    elementType: CircularProgressProgress,
    externalForwardedProps: other,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <SlotSvg {...svgProps}>
        <SlotTrack {...trackProps} />
        <SlotProgress {...progressProps} />
      </SlotSvg>
      {children}
    </SlotRoot>
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
