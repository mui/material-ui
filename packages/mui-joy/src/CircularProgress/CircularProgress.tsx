import { unstable_composeClasses as composeClasses } from '@mui/base';
import { css, keyframes } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getCircularProgressUtilityClass } from './circularProgressClasses';
import { CircularProgressProps, CircularProgressTypeMap } from './CircularProgressProps';

const SIZE = 44;

const circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

const useUtilityClasses = (ownerState: CircularProgressProps) => {
  const { determinate, color } = ownerState;

  const slots = {
    root: [
      'root',
      determinate ? 'determinate' : 'indeterminate',
      color && `color${capitalize(color)}`,
    ],
    svg: ['svg'],
    circle: ['circle', determinate ? `circleDeterminate` : 'circleIndeterminate'],
  };

  return composeClasses(slots, getCircularProgressUtilityClass, {});
};

const CircularProgressRoot = styled('span', {
  name: 'JoyCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CircularProgressProps }>(
  ({ theme, ownerState }) => {
    return [
      {
        display: 'inline-block',
        ...(ownerState.determinate && {
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }),
        color: theme.vars.palette[ownerState.color!].mainChannel,
        ...(ownerState.size === 'sm' && {
          width: 35,
          height: 35,
        }),
        ...(ownerState.size === 'md' && {
          width: 45,
          height: 45,
        }),
        ...(ownerState.size === 'lg' && {
          width: 55,
          height: 55,
        }),
      },
    ];
  },
  ({ ownerState }) =>
    !ownerState.determinate &&
    css`
      animation: ${circularRotateKeyframe} 1.4s linear infinite;
    `,
);

const CircularProgressSVG = styled('svg', {
  name: 'JoyCircularProgress',
  slot: 'Svg',
  overridesResolver: (props, styles) => styles.svg,
})<{ ownerState: CircularProgressProps }>({
  display: 'block', // Keeps the progress centered
});

const CircularProgressCircle = styled('circle', {
  name: 'JoyCircularProgress',
  slot: 'Circle',
  overridesResolver: (props, styles) => styles.circle,
})<{ ownerState: CircularProgressProps }>(
  ({ theme, ownerState }) => ({
    stroke: theme.vars.palette[ownerState.color!]['500'],
    // Use butt to follow the specification, by chance, it's already the default CSS value.
    // strokeLinecap: 'butt',
    ...(ownerState.determinate && {
      transition: 'stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    }),
    ...(!ownerState.determinate && {
      // Some default value that looks fine waiting for the animation to kicks in.
      strokeDasharray: '80px, 200px',
      strokeDashoffset: 0, // Add the unit to fix a Edge 16 and below bug.
    }),
  }),
  ({ ownerState }) =>
    !ownerState.determinate &&
    css`
      animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
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
  const props = useThemeProps({ props: inProps, name: 'JoyCircularProgress' });
  const {
    className,
    color = 'primary',
    size = 'md',
    thickness = 3.6,
    style,
    value = 0,
    determinate = false,
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    size,
    thickness,
    value,
    determinate,
  };

  const classes = useUtilityClasses(ownerState);

  const circleStyle: { strokeDasharray?: string; strokeDashoffset?: string } = {};
  const rootStyle: { transform?: string } = {};
  const rootProps: { 'aria-valuenow'?: number } = {};

  if (determinate) {
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
          strokeWidth={thickness}
        />
      </CircularProgressSVG>
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
   * @default 3.6
   */
  thickness: PropTypes.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number,
} as any;

export default CircularProgress;
