import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSlotProps } from '@mui/base/utils';
import { keyframes, css } from '@mui/system';
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

// TODO: replace `left` with `inset-inline-start` in the future to work with writing-mode. https://caniuse.com/?search=inset-inline-start
const progressKeyframe = keyframes`
  0% {
    left: var(--_LinearProgress-progress-inset);
    inline-size: var(--LinearProgress-progress-minWidth);
  }

  25% {
    inline-size: var(--LinearProgress-progress-maxWidth);
  }

  50% {
    left: var(--_LinearProgress-progress-left);
    inline-size: var(--LinearProgress-progress-minWidth);
  }

  75% {
    inline-size: var(--LinearProgress-progress-maxWidth);
  }
  
  100% {
    left: var(--_LinearProgress-progress-inset);
    inline-size: var(--LinearProgress-progress-minWidth);
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
})<{ ownerState: LinearProgressOwnerState }>(({ ownerState, theme }) => ({
  // public variables
  '--LinearProgress-percent': ownerState.value,
  '--LinearProgress-radius': 'var(--LinearProgress-thickness)',
  '--LinearProgress-progress-thickness': 'var(--LinearProgress-thickness)',
  '--LinearProgress-progress-radius':
    'max(var(--LinearProgress-radius) - var(--_LinearProgress-padding), min(var(--_LinearProgress-padding) / 2, var(--LinearProgress-radius) / 2))',
  ...(ownerState.size === 'sm' && {
    '--LinearProgress-thickness': '4px',
  }),
  ...(ownerState.size === 'md' && {
    '--LinearProgress-thickness': '6px',
  }),
  ...(ownerState.size === 'lg' && {
    '--LinearProgress-thickness': '8px',
  }),
  ...(ownerState.thickness && {
    '--LinearProgress-thickness': `${ownerState.thickness}px`,
  }),
  blockSize: 'var(--LinearProgress-thickness)',
  boxSizing: 'border-box',
  borderRadius: 'var(--LinearProgress-radius)',
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  padding: 'var(--_LinearProgress-padding)',
  position: 'relative',
  ...theme.variants[ownerState.variant!]?.[ownerState.color!],
  '--_LinearProgress-padding':
    'max((var(--LinearProgress-thickness) - 2 * var(--variant-borderWidth) - var(--LinearProgress-progress-thickness)) / 2, 0px)',
}));

const LinearProgressProgress = styled('span', {
  name: 'JoyLinearProgress',
  slot: 'progress',
  overridesResolver: (props, styles) => styles.progress,
})<{ ownerState: LinearProgressOwnerState }>(
  {
    display: 'block',
    blockSize:
      'calc(var(--LinearProgress-progress-thickness) - 2 * var(--variant-borderWidth, 0px))',
    borderRadius: 'var(--LinearProgress-progress-radius)',
    backgroundColor: 'currentColor',
    color: 'inherit',
    position: 'relative', // required to make `left` animation works.
  },
  ({ ownerState }) =>
    ownerState.determinate
      ? {
          left: 'calc(var(--_LinearProgress-padding) / 2)',
          transition: 'inline-size 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          inlineSize: 'calc(var(--LinearProgress-percent) * 1% - var(--_LinearProgress-padding))',
        }
      : css`
          --LinearProgress-progress-minWidth: calc(var(--LinearProgress-percent) * 1% / 2);
          --LinearProgress-progress-maxWidth: calc(var(--LinearProgress-percent) * 1%);
          --_LinearProgress-progress-left: calc(
            100% - var(--LinearProgress-progress-minWidth) - var(--_LinearProgress-progress-inset)
          );
          --_LinearProgress-progress-inset: calc(
            var(--LinearProgress-thickness) / 2 - var(--LinearProgress-progress-thickness) / 2
          );
          animation: var(
              --LinearProgress-circulation,
              2.5s ease-in-out 0s infinite normal none running
            )
            ${progressKeyframe};
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
    component = 'div',
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
