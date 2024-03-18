'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { keyframes } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getCircularProgressUtilityClass } from './circularProgressClasses';
import {
  CircularProgressOwnerState,
  CircularProgressProps,
  CircularProgressTypeMap,
} from './CircularProgress.types';

const SIZE = 48;
const ARC_DURATION = 1333; // milliseconds
const CYCLE_DURATION = 4 * ARC_DURATION; // milliseconds
const LINEAR_ROTATE_DURATION = (ARC_DURATION * 360) / 306; // milliseconds

const circularRotateKeyframe = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 10px, 200px;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 139px, 10px;
    stroke-dashoffset: -10px;
  }

  100% {
    stroke-dasharray: 139px, 129px;
    stroke-dashoffset: -139px;
  }
`;

const fourColorKeyframe = keyframes`
  0% {
    stroke: var(--md-comp-linear-progress-indicator-four-color-active-indicator-one-color);
  }
  15% {
    stroke: var(--md-comp-linear-progress-indicator-four-color-active-indicator-one-color);
  }
  25% {
    stroke: var(--md-comp-linear-progress-indicator-four-color-active-indicator-two-color);
  }
  40% {
    stroke: var(--md-comp-linear-progress-indicator-four-color-active-indicator-two-color);
  }
  50% {
    stroke: var(--md-comp-linear-progress-indicator-four-color-active-indicator-three-color);
  }
  65% {
    stroke: var(--md-comp-linear-progress-indicator-four-color-active-indicator-three-color);
  }
  75% {
    stroke: var(--md-comp-linear-progress-indicator-four-color-active-indicator-four-color);
  }
  90% {
    stroke: var(--md-comp-linear-progress-indicator-four-color-active-indicator-four-color);
  }
  100% {
    stroke: var(--md-comp-linear-progress-indicator-four-color-active-indicator-one-color);
  }
`;

const useUtilityClasses = (ownerState: CircularProgressOwnerState) => {
  const { classes, variant, color, disableShrink, fourColor } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      `color${capitalize(color)}`,
      fourColor && 'fourColor',
      disableShrink && 'disableShrink',
    ],
    svg: ['svg'],
    circle: ['circle'],
  };

  return composeClasses(slots, getCircularProgressUtilityClass, classes);
};

const CircularProgressRoot = styled('span', {
  name: 'MuiCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      styles[`color${capitalize(ownerState.color)}`],
      ownerState.fourColor && styles.fourColor,
      ownerState.disableShrink && styles.disableShrink,
    ];
  },
})<{ ownerState: CircularProgressOwnerState }>(({ ownerState, theme: { vars: tokens } }) => ({
  '--md-comp-linear-progress-indicator-active-indicator-color':
    ownerState.color !== 'inherit' ? tokens.sys.color[ownerState.color] : 'currentColor',
  '--md-comp-linear-progress-indicator-active-indicator-width': ownerState.thickness,
  '--md-comp-linear-progress-indicator-size': ownerState.size,
  '--md-comp-linear-progress-indicator-four-color-active-indicator-one-color':
    tokens.sys.color.primary,
  '--md-comp-linear-progress-indicator-four-color-active-indicator-two-color':
    tokens.sys.color.onPrimaryContainer,
  '--md-comp-linear-progress-indicator-four-color-active-indicator-three-color':
    tokens.sys.color.tertiary,
  '--md-comp-linear-progress-indicator-four-color-active-indicator-four-color':
    tokens.sys.color.onTertiaryContainer,
  display: 'inline-block',
  height: 'var(--md-comp-linear-progress-indicator-size)',
  width: 'var(--md-comp-linear-progress-indicator-size)',
  ...(ownerState.variant === 'determinate' && {
    transition: `transform ${tokens.sys.motion.duration.medium2} ${tokens.sys.motion.easing.legacy}`,
  }),
  ...(ownerState.variant === 'indeterminate' && {
    animation: `linear infinite ${circularRotateKeyframe}`,
    animationDuration: `${LINEAR_ROTATE_DURATION}ms`,
  }),
}));

const CircularProgressSVG = styled('svg', {
  name: 'MuiCircularProgress',
  slot: 'Svg',
  overridesResolver: (props, styles) => styles.svg,
})<{ ownerState: CircularProgressOwnerState }>({
  display: 'block', // Keeps the progress centered
});

const CircularProgressCircle = styled('circle', {
  name: 'MuiCircularProgress',
  slot: 'Circle',
  overridesResolver: (props, styles) => styles.circle,
})<{ ownerState: CircularProgressOwnerState }>(({ ownerState, theme: { vars: tokens } }) => ({
  stroke: 'var(--md-comp-linear-progress-indicator-active-indicator-color)',
  strokeWidth: 'var(--md-comp-linear-progress-indicator-active-indicator-width)',
  // Use butt to follow the specification, by chance, it's already the default CSS value.
  // strokeLinecap: 'butt',
  ...(ownerState.variant === 'determinate' && {
    transition: `stroke-dashoffset ${tokens.sys.motion.duration.medium2} ${tokens.sys.motion.easing.legacy}`,
  }),
  ...(ownerState.variant === 'indeterminate' && {
    // Some default value that looks fine waiting for the animation to kicks in.
    strokeDasharray: '10px, 200px',
    strokeDashoffset: 0, // Add the unit to fix a Edge 16 and below bug.
  }),
  ...(ownerState.variant === 'indeterminate' &&
    !ownerState.disableShrink && {
      animation: circularDashKeyframe,
      animationDuration: `${ARC_DURATION}ms, ${CYCLE_DURATION}ms`,
      animationIterationCount: 'infinite',
      animationFillMode: 'both',
      animationTimingFunction: tokens.sys.motion.easing.legacy,
      ...(ownerState.fourColor && {
        animationName: `${circularDashKeyframe}, ${fourColorKeyframe}`,
      }),
    }),
}));

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 *
 * Demos:
 *
 * - [Progress](https://mui.com/material-ui/react-progress/)
 *
 * API:
 *
 * - [CircularProgress API](https://mui.com/material-ui/api/circular-progress/)
 */
const CircularProgress = React.forwardRef(function CircularProgress<
  BaseComponentType extends React.ElementType = CircularProgressTypeMap['defaultComponent'],
>(inProps: CircularProgressProps<BaseComponentType>, ref: React.ForwardedRef<HTMLSpanElement>) {
  const props = useThemeProps({ props: inProps, name: 'MuiCircularProgress' });
  const {
    className,
    color = 'primary',
    disableShrink = false,
    fourColor = false,
    style,
    size = 48,
    thickness = 4,
    value = 0,
    variant = 'indeterminate',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    disableShrink,
    fourColor,
    size: typeof size === 'number' ? `${size}px` : size,
    thickness,
    value,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const circleStyle: React.CSSProperties = {};
  const rootStyle: React.CSSProperties = {};
  const rootProps: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > = {};

  if (variant === 'determinate') {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);
    circleStyle.strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(3)}px`;
    rootStyle.transform = 'rotate(-90deg)';
  }

  return (
    <CircularProgressRoot
      className={clsx(classes.root, className)}
      style={{ ...rootStyle, ...style }}
      ownerState={ownerState}
      ref={ref}
      role="progressbar"
      {...rootProps}
      {...other}
    >
      <CircularProgressSVG
        className={classes.svg}
        ownerState={ownerState}
        viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
      >
        <CircularProgressCircle
          className={classes.circle}
          style={circleStyle}
          ownerState={ownerState}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
        />
      </CircularProgressSVG>
    </CircularProgressRoot>
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
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOf([
    'error',
    'info',
    'inherit',
    'primary',
    'secondary',
    'success',
    'tertiary',
    'warning',
  ]),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: chainPropTypes(PropTypes.bool, (props) => {
    if (props.disableShrink && props.variant && props.variant !== 'indeterminate') {
      return new Error(
        'MUI: You have provided the `disableShrink` prop ' +
          'with a variant other than `indeterminate`. This will have no effect.',
      );
    }
    return null;
  }),
  /**
   * If `true`, the component render indeterminate mode using four colors instead of one.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  fourColor: chainPropTypes(PropTypes.bool, (props) => {
    if (props.fourColor && props.variant && props.variant !== 'indeterminate') {
      return new Error(
        'MUI: You have provided the `fourColor` prop ' +
          'with a variant other than `indeterminate`. This will have no effect.',
      );
    }
    return null;
  }),
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, for example '3rem'.
   * @default 48
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
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
   * @default 4
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
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate']),
} as any;

export default CircularProgress;
