import { unstable_composeClasses as composeClasses } from '@mui/base';
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
  const { determinate, color } = ownerState;

  const slots = {
    root: [
      'root',
      determinate ? 'determinate' : 'indeterminate',
      color && `color${capitalize(color)}`,
    ],
    progress: ['progress'],
  };

  return composeClasses(slots, getCircularProgressUtilityClass, {});
};

const CircularProgressRoot = styled('div', {
  name: 'JoyCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CircularProgressProps }>(({ theme, ownerState }) => {
  return [
    {
      '--CircularProgress-speed': '1s',
      ...(ownerState.size === 'sm' && {
        '--CircularProgress-size': '2rem',
        '--CircularProgress-thickness': `${ownerState.thickness || 4}px`,
      }),
      ...(ownerState.size === 'md' && {
        '--CircularProgress-size': '2.5rem',
        '--CircularProgress-thickness': `${ownerState.thickness || 5}px`,
      }),
      ...(ownerState.size === 'lg' && {
        '--CircularProgress-size': '3rem',
        '--CircularProgress-thickness': `${ownerState.thickness || 6}px`,
      }),
      borderRadius: '50%',
      border: `var(--CircularProgress-thickness) ${
        ownerState.variant === 'outlined' ? 'dashed' : 'solid'
      }`,
      borderColor: theme.vars.palette[ownerState.color!][`${ownerState.variant!}Bg`],
      width: 'var(--CircularProgress-size)',
      height: 'var(--CircularProgress-size)',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  ];
});

const CircularProgressProgress = styled('div', {
  name: 'JoyCircularProgress',
  slot: 'Progress',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CircularProgressProps }>(({ theme, ownerState }) => {
  return [
    {
      position: 'absolute',
      top: 'calc(-1 * var(--CircularProgress-thickness))',
      left: 'calc(-1 * var(--CircularProgress-thickness))',
      width: 'inherit',
      height: 'inherit',
      borderRadius: 'inherit',
      border: 'inherit',
      boxSizing: 'inherit',
      borderColor: `${
        theme.vars.palette[ownerState.color!][`${ownerState.variant!}Color`]
      } transparent transparent`,
      animation: `${circulate} var(--CircularProgress-speed) ease infinite`,
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
    children,
    className,
    color = 'primary',
    size = 'md',
    variant = 'solid',
    thickness,
    style,
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
  const rootStyle: { transform?: string } = {};
  const rootProps: { 'aria-valuenow'?: number } = {};

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
      <CircularProgressProgress className={classes.progress} ownerState={ownerState} />
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
