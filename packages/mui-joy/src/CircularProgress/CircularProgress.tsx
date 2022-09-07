import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSlotProps } from '@mui/base/utils';
import { keyframes } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getCircularProgressUtilityClass } from './circularProgressClasses';
import { CircularProgressProps, CircularProgressTypeMap } from './CircularProgressProps';

const circulate = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const useUtilityClasses = (ownerState: CircularProgressProps) => {
  const { determinate, color, variant, size } = ownerState;

  const slots = {
    root: [
      'root',
      determinate ? 'determinate' : 'indeterminate',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
      size && `size${capitalize(size)}`,
    ],
    svg: ['svg'],
    circle1: ['circle1'],
    circle2: ['circle2'],
  };

  return composeClasses(slots, getCircularProgressUtilityClass, {});
};

const CircularProgressRoot = styled('span', {
  name: 'JoyCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CircularProgressProps }>(({ ownerState }) => {
  return [
    {
      '--CircularProgress-percent': '0.1', // 0 - 100
      '--CircularProgress-indeterminateDuration': '1s',
      ...(ownerState.size === 'sm' && {
        '--CircularProgress-size': '60px',
        '--CircularProgress-track-thickness': `${ownerState.thickness || 7}px`,
        '--CircularProgress-progress-thickness': `${ownerState.thickness || 7}px`,
      }),
      ...(ownerState.size === 'md' && {
        '--CircularProgress-size': '85px',
        '--CircularProgress-track-thickness': `${ownerState.thickness || 10}px`,
        '--CircularProgress-progress-thickness': `${ownerState.thickness || 10}px`,
      }),
      ...(ownerState.size === 'lg' && {
        '--CircularProgress-size': '110px',
        '--CircularProgress-track-thickness': `${ownerState.thickness || 13}px`,
        '--CircularProgress-progress-thickness': `${ownerState.thickness || 13}px`,
      }),
      width: 'var(--CircularProgress-size)',
      height: 'var(--CircularProgress-size)',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
  ];
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
});

const CircularProgressCircle1 = styled('circle', {
  name: 'JoyCircularProgress',
  slot: 'Circle1',
  overridesResolver: (props, styles) => styles.circle1,
})<{ ownerState: CircularProgressProps }>(({ theme, ownerState }) => {
  return [
    {
      cx: 'calc(var(--CircularProgress-size) / 2)',
      cy: 'calc(var(--CircularProgress-size) / 2)',
      r: 'calc(var(--CircularProgress-size) / 2 - var(--CircularProgress-track-thickness) / 2)',
      fill: 'transparent',
      strokeWidth: 'var(--CircularProgress-track-thickness)',
      stroke: theme.vars.palette[ownerState.color!][`${ownerState.variant!}Bg`],
      ...(['outlined', 'plain'].includes(ownerState.variant!) && {
        stroke: theme.vars.palette[ownerState.color!][`${ownerState.variant!}Color`],
      }),
      ...(ownerState.variant! === 'outlined' && {
        strokeDasharray: '3,3',
      }),
    },
  ];
});

const CircularProgressCircle2 = styled('circle', {
  name: 'JoyCircularProgress',
  slot: 'Circle2',
  overridesResolver: (props, styles) => styles.circle2,
})<{ ownerState: CircularProgressProps }>(({ theme, ownerState }) => {
  return [
    {
      '--_thickness-diff':
        'calc(var(--CircularProgress-track-thickness) - var(--CircularProgress-progress-thickness))',
      '--_progress-radius':
        'calc(var(--CircularProgress-size) / 2 - var(--CircularProgress-progress-thickness) / 2 - var(--_thickness-diff) / 2)',
      '--_progress-length': 'calc(2 * 3.1415926535 * var(--_progress-radius))',
      cx: 'calc(var(--CircularProgress-size) / 2)',
      cy: 'calc(var(--CircularProgress-size) / 2)',
      r: 'var(--_progress-radius)',
      fill: 'transparent',
      strokeWidth: 'var(--CircularProgress-progress-thickness)',
      stroke: theme.vars.palette[ownerState.color!][`${ownerState.variant!}Color`],
      ...(['outlined', 'plain'].includes(ownerState.variant!) && {
        stroke: '#fff',
      }),
      strokeLinecap: 'round',
      strokeDasharray: 'var(--_progress-length)',
      strokeDashoffset:
        'calc(var(--_progress-length) - var(--CircularProgress-percent) * var(--_progress-length) / 100)',
      transformOrigin: 'center',
      transform: 'rotate(-90deg)',
      animation: `1.4s ease-in-out 0s infinite normal none running ${circulate}`,
    },
  ];
});

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
    variant = 'solid',
    thickness,
    value = 0,
    determinate = false,
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
  });

  const svgProps = useSlotProps({
    elementType: CircularProgressSvg,
    externalSlotProps: componentsProps.svg,
    ownerState,
    className: classes.svg,
  });

  const circle1Props = useSlotProps({
    elementType: CircularProgressCircle1,
    externalSlotProps: componentsProps.circle1,
    ownerState,
    className: classes.circle1,
  });

  const circle2Props = useSlotProps({
    elementType: CircularProgressCircle2,
    externalSlotProps: componentsProps.circle2,
    ownerState,
    className: classes.circle2,
  });

  let leftMarginOfChildren: number = 0;
  if (size === 'sm') {
    leftMarginOfChildren = -42;
  } else if (size === 'md') {
    leftMarginOfChildren = -58;
  } else if (size === 'lg') {
    leftMarginOfChildren = -71;
  }

  return (
    <CircularProgressRoot {...rootProps}>
      <CircularProgressSvg {...svgProps}>
        <CircularProgressCircle1 {...circle1Props} />
        <CircularProgressCircle2 {...circle2Props} />
      </CircularProgressSvg>
      {children &&
        React.cloneElement(children as React.ReactElement, {
          sx: { ml: `${leftMarginOfChildren}px` },
        })}
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
    circle1: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    circle2: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
