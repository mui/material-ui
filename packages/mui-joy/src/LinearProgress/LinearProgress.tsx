import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSlotProps } from '@mui/base/utils';
import { css, keyframes } from '@mui/system';
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

const progress1Keyframe = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`;

const progress2Keyframe = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`;

const useUtilityClasses = (ownerState: LinearProgressOwnerState) => {
  const { determinate, color, variant, size } = ownerState;

  const slots = {
    root: [
      'root',
      determinate ? 'determinate' : 'indeterminate',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
      size && `size${capitalize(size)}`,
    ],
    track: ['track'],
    progress1: ['progress1'],
    progress2: ['progress2'],
  };

  return composeClasses(slots, getLinearProgressUtilityClass, {});
};

const LinearProgressRoot = styled('span', {
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
    '--LinearProgress-track-color': backgroundColor,
    '--LinearProgress-progress-color': color,
    '--LinearProgress-percent': ownerState.value, // 0 - 100
    '--LinearProgress-linecap': 'round',
    ...(ownerState.size === 'sm' && {
      '--LinearProgress-track-thickness': '5px',
      '--LinearProgress-progress-thickness': '5px',
      '--_root-height': 'var(--LinearProgress-height, 5px)', // use --_root-height to let other components overrides via --LinearProgress-height
    }),
    ...(ownerState.instanceSize === 'sm' && {
      '--LinearProgress-height': '5px',
    }),
    ...(ownerState.size === 'md' && {
      '--LinearProgress-track-thickness': '7.5px',
      '--LinearProgress-progress-thickness': '7.5px',
      '--_root-height': 'var(--LinearProgress-height, 7.5px)',
    }),
    ...(ownerState.instanceSize === 'md' && {
      '--LinearProgress-height': '7.5px',
    }),
    ...(ownerState.size === 'lg' && {
      '--LinearProgress-track-thickness': '10px',
      '--LinearProgress-progress-thickness': '10px',
      '--_root-height': 'var(--LinearProgress-height, 10px)',
    }),
    ...(ownerState.instanceSize === 'lg' && {
      '--LinearProgress-height': '10px',
    }),
    ...(ownerState.thickness && {
      '--LinearProgress-height': `${ownerState.thickness}px`,
      '--LinearProgress-track-thickness': `${ownerState.thickness}px`,
      '--LinearProgress-progress-thickness': `${ownerState.thickness}px`,
    }),
    width: '100%',
    height: 'var(--_root-height)',
    margin: 'var(--LinearProgress-margin)',
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    borderRadius: 'var(--_root-height)',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    color,
    ...rest,
  };
});

const LinearProgressTrack = styled('span', {
  name: 'JoyLinearProgress',
  slot: 'track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: LinearProgressOwnerState }>({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  transformOrigin: 'left',
  backgroundColor: 'var(--LinearProgress-track-color)',
  borderRadius: 'inherit',
  height: 'var(--LinearProgress-track-thickness)',
});

const LinearProgressProgress1 = styled('span', {
  name: 'JoyLinearProgress',
  slot: 'progress1',
  overridesResolver: (props, styles) => styles.progress1,
})<{ ownerState: LinearProgressOwnerState }>(
  {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    transition: 'transform 0.2s linear',
    transformOrigin: 'left',
    backgroundColor: 'var(--LinearProgress-progress-color)',
    borderRadius: 'inherit',
    height: 'var(--LinearProgress-progress-thickness)',
  },
  ({ ownerState }) =>
    ownerState.determinate
      ? {
          transition: 'transform .4s linear',
        }
      : css`
          width: auto;
          animation: ${progress1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        `,
);

const LinearProgressProgress2 = styled('span', {
  name: 'JoyLinearProgress',
  slot: 'progress2',
  overridesResolver: (props, styles) => styles.progress2,
})<{ ownerState: LinearProgressOwnerState }>(
  {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    transition: 'transform 0.2s linear',
    transformOrigin: 'left',
    backgroundColor: 'var(--LinearProgress-progress-color)',
    borderRadius: 'inherit',
    height: 'var(--LinearProgress-progress-thickness)',
  },
  css`
    width: auto;
    animation: ${progress2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
  `,
);

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

  const trackProps = useSlotProps({
    elementType: LinearProgressTrack,
    externalSlotProps: componentsProps.track,
    ownerState,
    className: classes.track,
  });

  const progress1Props = useSlotProps({
    elementType: LinearProgressProgress1,
    externalSlotProps: componentsProps.progress1,
    ownerState,
    className: classes.progress1,
    ...(determinate && {
      additionalProps: {
        style: {
          transform: `translateX(${value - 100}%)`,
        },
      },
    }),
  });

  const progress2Props = useSlotProps({
    elementType: LinearProgressProgress2,
    externalSlotProps: componentsProps.progress2,
    ownerState,
    className: classes.progress2,
  });

  return (
    <LinearProgressRoot {...rootProps}>
      <LinearProgressTrack {...trackProps} />
      <LinearProgressProgress1 {...progress1Props} />
      {!determinate && <LinearProgressProgress2 {...progress2Props} />}
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
    progress1: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    progress2: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
