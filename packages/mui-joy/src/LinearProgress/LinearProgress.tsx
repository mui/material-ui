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
import { getLinearProgressUtilityClass } from './linearProgressClasses';
import {
  LinearProgressOwnerState,
  LinearProgressProps,
  LinearProgressTypeMap,
} from './LinearProgressProps';

const progressKeyframe = keyframes`
  0% {
    left: 0%;
    width: var(--LinearProgress-width-shrink);
  }

  20% {
    width: var(--LinearProgress-width-value);
  }

  50% {
    left: var(--LinearProgress-left-end);
    width: var(--LinearProgress-width-shrink);
  }

  80% {
    width: var(--LinearProgress-width-value);
  }
  
  100% {
    left: 0%;
    width: var(--LinearProgress-width-shrink);
  }
`;

const useUtilityClasses = (ownerState: LinearProgressOwnerState) => {
  const { determinate, color, variant, size } = ownerState;

  const slots = {
    root: [
      'root',
      determinate && 'determinate',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
      size && `size${capitalize(size)}`,
    ],
    progress: ['progress'],
  };

  return composeClasses(slots, getLinearProgressUtilityClass, {});
};

const LinearProgressRoot = styled('div', {
  name: 'JoyLinearProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: LinearProgressOwnerState }>(({ ownerState, theme }) => {
  const { color, backgroundColor, ...rest } =
    theme.variants[ownerState.variant!]?.[ownerState.color!] || {};
  return {
    // integration with icon
    '--Icon-fontSize': 'calc(0.4 * var(--_root-height))',
    // public variables
    '--LinearProgress-progress-color': color,
    '--LinearProgress-percent': ownerState.value, // 0 - 100
    '--LinearProgress-linecap': 'round',
    '--LinearProgress-width-value': '25%',
    '--LinearProgress-width-shrink': '10%',
    '--LinearProgress-left-end': 'calc(100% - var(--LinearProgress-width-shrink))',
    ...(ownerState.size === 'sm' && {
      '--LinearProgress-progress-thickness': '4px',
      '--_root-height': 'var(--LinearProgress-height, 4px)', // use --_root-height to let other components overrides via --LinearProgress-height
      '--LinearProgress-padding': '2px',
      '--LinearProgress-borderRadius': '6px',
    }),
    ...(ownerState.instanceSize === 'sm' && {
      '--LinearProgress-height': '4px',
    }),
    ...(ownerState.size === 'md' && {
      '--LinearProgress-progress-thickness': '6px',
      '--_root-height': 'var(--LinearProgress-height, 6px)',
      '--LinearProgress-padding': '4px',
      '--LinearProgress-borderRadius': '8px',
    }),
    ...(ownerState.instanceSize === 'md' && {
      '--LinearProgress-height': '6px',
    }),
    ...(ownerState.size === 'lg' && {
      '--LinearProgress-progress-thickness': '8px',
      '--_root-height': 'var(--LinearProgress-height, 8px)',
      '--LinearProgress-padding': '6px',
      '--LinearProgress-borderRadius': '10px',
    }),
    ...(ownerState.instanceSize === 'lg' && {
      '--LinearProgress-height': '8px',
    }),
    ...(ownerState.thickness && {
      '--LinearProgress-height': `${ownerState.thickness}px`,
      '--LinearProgress-progress-thickness': `${ownerState.thickness}px`,
      '--LinearProgress-borderRadius': `${ownerState.thickness * 3}px`,
    }),
    ...(!ownerState.determinate && {
      padding: 'var(--LinearProgress-padding)',
    }),
    width: '100%',
    height: 'var(--_root-height)',
    backgroundColor,
    boxSizing: 'content-box',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'var(--LinearProgress-borderRadius)',
    position: 'relative',
    overflow: 'hidden',
    color,
    ...rest,
  };
});

const LinearProgressProgress = styled('span', {
  name: 'JoyLinearProgress',
  slot: 'progress',
  overridesResolver: (props, styles) => styles.progress,
})<{ ownerState: LinearProgressOwnerState }>(({ ownerState }) => ({
  position: 'relative',
  right: '0%',
  display: 'block',
  height: `var(--LinearProgress-progress-thickness)` || '100%',
  backgroundColor: 'var(--LinearProgress-progress-color)',
  borderRadius: 'inherit',
  ...(ownerState.determinate
    ? {
        transition: 'transform 0.4s linear',
        width: '100%',
      }
    : {
        width: '10%',
        transition: 'transform 0.2s linear',
        animation: `${progressKeyframe} 2.5s ease-in-out infinite`,
      }),
}));

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const LinearProgress = React.forwardRef(function LinearProgress(inProps, ref) {
  const props = useThemeProps<typeof inProps & LinearProgressProps>({
    props: inProps,
    name: 'JoyLinearProgress',
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
    value = determinate ? 0 : 25, // `25` is the 1/4 of the bar.
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
    elementType: LinearProgressRoot,
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
        'aria-valuenow':
          typeof value === 'number' ? Math.round(value) : Math.round(Number(value || 0)),
      }),
  });

  const progressProps = useSlotProps({
    elementType: LinearProgressProgress,
    externalSlotProps: componentsProps.progress,
    ownerState,
    className: classes.progress,
    ...(determinate && {
      additionalProps: {
        style: {
          transform: `translateX(${value - 100}%)`,
        },
      },
    }),
  });

  return (
    <LinearProgressRoot {...rootProps}>
      <LinearProgressProgress {...progressProps} />
    </LinearProgressRoot>
  );
}) as OverridableComponent<LinearProgressTypeMap>;

LinearProgress.propTypes /* remove-proptypes */ = {
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
   * The thickness of the bar.
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

export default LinearProgress;
