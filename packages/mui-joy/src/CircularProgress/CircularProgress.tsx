'use client';
import PropTypes from 'prop-types';
import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { css, keyframes } from '@mui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
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

function getThickness(slot: 'track' | 'progress', defaultValue: string) {
  return `var(--CircularProgress-${slot}Thickness, var(--CircularProgress-thickness, ${defaultValue}))`;
}

const CircularProgressRoot = styled('span', {
  name: 'JoyCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CircularProgressOwnerState }>(({ ownerState, theme }) => {
  const { color, backgroundColor, ...other } =
    theme.variants[ownerState.variant!]?.[ownerState.color!] || {};
  return {
    // integration with icon
    '--Icon-fontSize': 'calc(0.4 * var(--_root-size))',
    // public variables
    '--CircularProgress-trackColor': backgroundColor,
    '--CircularProgress-progressColor': color,
    '--CircularProgress-percent': ownerState.value, // 0 - 100
    '--CircularProgress-linecap': 'round',
    ...(ownerState.size === 'sm' && {
      '--_root-size': 'var(--CircularProgress-size, 24px)', // use --_root-size to let other components overrides via --CircularProgress-size
      '--_track-thickness': getThickness('track', '3px'),
      '--_progress-thickness': getThickness('progress', '3px'),
    }),
    ...(ownerState.instanceSize === 'sm' && {
      '--CircularProgress-size': '24px',
    }),
    ...(ownerState.size === 'md' && {
      '--_track-thickness': getThickness('track', '6px'),
      '--_progress-thickness': getThickness('progress', '6px'),
      '--_root-size': 'var(--CircularProgress-size, 40px)',
    }),
    ...(ownerState.instanceSize === 'md' && {
      '--CircularProgress-size': '40px',
    }),
    ...(ownerState.size === 'lg' && {
      '--_track-thickness': getThickness('track', '8px'),
      '--_progress-thickness': getThickness('progress', '8px'),
      '--_root-size': 'var(--CircularProgress-size, 64px)',
    }),
    ...(ownerState.instanceSize === 'lg' && {
      '--CircularProgress-size': '64px',
    }),
    ...(ownerState.thickness && {
      '--_track-thickness': `${ownerState.thickness}px`,
      '--_progress-thickness': `${ownerState.thickness}px`,
    }),
    // internal variables
    '--_thickness-diff': 'calc(var(--_track-thickness) - var(--_progress-thickness))',
    '--_inner-size': 'calc(var(--_root-size) - 2 * var(--variant-borderWidth, 0px))',
    '--_outlined-inset': 'max(var(--_track-thickness), var(--_progress-thickness))',
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
    ...other,
    ...(ownerState.variant === 'outlined' && {
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        borderRadius: 'inherit',
        top: 'var(--_outlined-inset)',
        left: 'var(--_outlined-inset)',
        right: 'var(--_outlined-inset)',
        bottom: 'var(--_outlined-inset)',
        ...other,
      },
    }),
    ...(ownerState.variant === 'soft' && {
      '--CircularProgress-trackColor': theme.variants.soft.neutral.backgroundColor,
      '--CircularProgress-progressColor': theme.variants.solid?.[ownerState.color!].backgroundColor,
    }),
    ...(ownerState.variant === 'solid' && {
      '--CircularProgress-trackColor':
        theme.variants.softHover?.[ownerState.color!].backgroundColor,
      '--CircularProgress-progressColor': theme.variants.solid?.[ownerState.color!].backgroundColor,
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
  r: 'calc(var(--_inner-size) / 2 - var(--_track-thickness) / 2 + min(0px, var(--_thickness-diff) / 2))',
  fill: 'transparent',
  strokeWidth: 'var(--_track-thickness)',
  stroke: 'var(--CircularProgress-trackColor)',
});

const CircularProgressProgress = styled('circle', {
  name: 'JoyCircularProgress',
  slot: 'progress',
  overridesResolver: (props, styles) => styles.progress,
})<{ ownerState: CircularProgressOwnerState }>(
  {
    '--_progress-radius':
      'calc(var(--_inner-size) / 2 - var(--_progress-thickness) / 2 - max(0px, var(--_thickness-diff) / 2))',
    '--_progress-length': 'calc(2 * 3.1415926535 * var(--_progress-radius))', // the circumference around the progress
    cx: '50%',
    cy: '50%',
    r: 'var(--_progress-radius)',
    fill: 'transparent',
    strokeWidth: 'var(--_progress-thickness)',
    stroke: 'var(--CircularProgress-progressColor)',
    strokeLinecap: 'var(--CircularProgress-linecap, round)' as 'round', // can't use CSS variable directly, need to cast type.
    strokeDasharray: 'var(--_progress-length)',
    strokeDashoffset:
      'calc(var(--_progress-length) - var(--CircularProgress-percent) * var(--_progress-length) / 100)',
    transformOrigin: 'center',
    transform: 'rotate(-90deg)', // to initially appear at the top-center of the circle.
  },
  ({ ownerState }) =>
    !ownerState.determinate &&
    css`
      animation: var(--CircularProgress-circulation, 0.8s linear 0s infinite normal none running)
        ${circulate};
    `,
);

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 *
 * Demos:
 *
 * - [Circular Progress](https://mui.com/joy-ui/react-circular-progress/)
 *
 * API:
 *
 * - [CircularProgress API](https://mui.com/joy-ui/api/circular-progress/)
 */
const CircularProgress = React.forwardRef(function CircularProgress(inProps, ref) {
  const props = useThemeProps<typeof inProps & CircularProgressProps>({
    props: inProps,
    name: 'JoyCircularProgress',
  });

  const {
    children,
    className,
    color = 'primary',
    size = 'md',
    variant = 'soft',
    thickness,
    determinate = false,
    value = determinate ? 0 : 25, // `25` is the 1/4 of the circle.
    component,
    slots = {},
    slotProps = {},
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
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: CircularProgressRoot,
    externalForwardedProps,
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
    externalForwardedProps,
    ownerState,
  });

  const [SlotTrack, trackProps] = useSlot('track', {
    className: classes.track,
    elementType: CircularProgressTrack,
    externalForwardedProps,
    ownerState,
  });

  const [SlotProgress, progressProps] = useSlot('progress', {
    className: classes.progress,
    elementType: CircularProgressProgress,
    externalForwardedProps,
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
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    progress: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    svg: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    progress: PropTypes.elementType,
    root: PropTypes.elementType,
    svg: PropTypes.elementType,
    track: PropTypes.elementType,
  }),
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
   * @default determinate ? 0 : 25
   */
  value: PropTypes.number,
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default CircularProgress;
