'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { keyframes, css } from '@mui/system';
import { unstable_capitalize as capitalize, chainPropTypes } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import useTheme from '../styles/useTheme';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getLinearProgressUtilityClass } from './linearProgressClasses';
import {
  LinearProgressOwnerState,
  LinearProgressProps,
  LinearProgressTypeMap,
} from './LinearProgress.types';

const TRANSITION_DURATION = 4; // seconds
const indeterminate1Keyframe = keyframes`
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

const indeterminate2Keyframe = keyframes`
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

const bufferKeyframe = keyframes`
  0% {
    transform: translateX(calc(var(--md-comp-linear-progress-indicator-active-indicator-height) / 2 * 5));
  }
`;

const fourColorKeyframe = keyframes`
  0% {
    background: var(--md-comp-linear-progress-indicator-four-color-active-indicator-one-color);
  }

  15% {
    background: var(--md-comp-linear-progress-indicator-four-color-active-indicator-one-color);
  }
  25% {
    background: var(--md-comp-linear-progress-indicator-four-color-active-indicator-two-color);
  }
  40% {
    background: var(--md-comp-linear-progress-indicator-four-color-active-indicator-two-color);
  }

  50% {
    background: var(--md-comp-linear-progress-indicator-four-color-active-indicator-three-color);
  }
  65% {
    background: var(--md-comp-linear-progress-indicator-four-color-active-indicator-three-color);
  }
  75% {
    background: var(--md-comp-linear-progress-indicator-four-color-active-indicator-four-color);
  }
  90% {
    background: var(--md-comp-linear-progress-indicator-four-color-active-indicator-four-color);
  }
  100% {
    background: var(--md-comp-linear-progress-indicator-four-color-active-indicator-one-color);
  }
`;

const useUtilityClasses = (ownerState: LinearProgressOwnerState) => {
  const { classes, variant, color, fourColor } = ownerState;

  const slots = {
    root: ['root', `color${capitalize(color)}`, variant, fourColor && 'fourColor'],
    dashed: ['dashed'],
    bar1: ['bar', `bar1`],
    bar2: ['bar', `bar2`],
  };

  return composeClasses(slots, getLinearProgressUtilityClass, classes);
};

const LinearProgressRoot = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`color${capitalize(ownerState.color)}`],
      styles[ownerState.variant],
    ];
  },
})<{ ownerState: LinearProgressOwnerState }>(({ ownerState, theme: { vars: tokens } }) => ({
  '--md-comp-linear-progress-indicator-track-color': tokens.sys.color.surfaceContainerHighest,
  '--md-comp-linear-progress-indicator-active-indicator-height': '4px',
  '--md-comp-linear-progress-indicator-active-indicator-color':
    ownerState.color !== 'inherit' ? tokens.sys.color[ownerState.color] : 'currentColor',
  '--md-comp-linear-progress-indicator-four-color-active-indicator-one-color':
    tokens.sys.color.primary,
  '--md-comp-linear-progress-indicator-four-color-active-indicator-two-color':
    tokens.sys.color.onPrimaryContainer,
  '--md-comp-linear-progress-indicator-four-color-active-indicator-three-color':
    tokens.sys.color.tertiary,
  '--md-comp-linear-progress-indicator-four-color-active-indicator-four-color':
    tokens.sys.color.onTertiaryContainer,
  position: 'relative',
  overflow: 'hidden',
  display: 'block',
  height: 'var(--md-comp-linear-progress-indicator-active-indicator-height)',
  zIndex: 0, // Fix Safari's bug during composition of different paint.
  '@media print': {
    colorAdjust: 'exact',
  },
  backgroundColor: 'var(--md-comp-linear-progress-indicator-track-color)',
  ...(ownerState.color === 'inherit' &&
    ownerState.variant !== 'buffer' && {
      backgroundColor: 'none',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'currentColor',
        opacity: 0.3,
      },
    }),
  ...(ownerState.variant === 'buffer' && { backgroundColor: 'transparent' }),
  ...(ownerState.variant === 'query' && { transform: 'rotate(180deg)' }),
}));

const LinearProgressDashed = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Dashed',
  overridesResolver: (props, styles) => styles.dashed,
})<{ ownerState: LinearProgressOwnerState }>(
  ({ ownerState }) => ({
    position: 'absolute',
    marginTop: 0,
    height: '100%',
    width: '100%',
    inset: '0px',
    backgroundColor: 'var(--md-comp-linear-progress-indicator-track-color)',
    ...(ownerState.color === 'inherit' && {
      opacity: 0.3,
    }),
    maskImage: `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat-x',
  }),
  css`
    animation: 250ms ${bufferKeyframe} infinite linear;
  `,
);

const LinearProgressBar1 = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar1',
  overridesResolver: (props, styles) => {
    return [styles.bar, styles.bar1];
  },
})<{ ownerState: LinearProgressOwnerState }>(({ ownerState }) => ({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  transition: 'transform 0.2s linear',
  transformOrigin: 'left',
  backgroundColor: 'var(--md-comp-linear-progress-indicator-active-indicator-color)',
  ...(ownerState.variant === 'determinate' && {
    transition: `transform .${TRANSITION_DURATION}s linear`,
  }),
  ...(ownerState.variant === 'buffer' && {
    zIndex: 1,
    transition: `transform .${TRANSITION_DURATION}s linear`,
  }),
  ...((ownerState.variant === 'indeterminate' || ownerState.variant === 'query') && {
    width: 'auto',
    animation: `${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
    ...(ownerState.fourColor && {
      animationName: `${indeterminate1Keyframe}, ${fourColorKeyframe}`,
      animationDuration: '2.1s, 4.2s',
      animationTimingFunction: 'cubic-bezier(0.65, 0.815, 0.735, 0.395), linear',
    }),
  }),
}));

const LinearProgressBar2 = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar2',
  overridesResolver: (props, styles) => {
    return [styles.bar, styles.bar2];
  },
})<{ ownerState: LinearProgressOwnerState }>(({ ownerState }) => ({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  transition: 'transform 0.2s linear',
  transformOrigin: 'left',
  backgroundColor: 'var(--md-comp-linear-progress-indicator-active-indicator-color)',
  ...(ownerState.color === 'inherit' && {
    opacity: 0.3,
  }),
  ...(ownerState.variant === 'buffer' && {
    backgroundColor: 'var(--md-comp-linear-progress-indicator-track-color)',
    transition: `transform .${TRANSITION_DURATION}s linear`,
  }),
  ...((ownerState.variant === 'indeterminate' || ownerState.variant === 'query') && {
    width: 'auto',
    animation: `${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`,
    ...(ownerState.fourColor && {
      animationName: `${indeterminate2Keyframe}, ${fourColorKeyframe}`,
      animationDuration: '2.1s, 4.2s',
      animationDelay: '1.15s, 0s',
      animationTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1), linear',
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
 * - [LinearProgress API](https://mui.com/material-ui/api/linear-progress/)
 */
const LinearProgress = React.forwardRef(function LinearProgress<
  BaseComponentType extends React.ElementType = LinearProgressTypeMap['defaultComponent'],
>(inProps: LinearProgressProps<BaseComponentType>, ref: React.ForwardedRef<HTMLSpanElement>) {
  const props = useThemeProps({ props: inProps, name: 'MuiLinearProgress' });
  const {
    className,
    color = 'primary',
    fourColor = false,
    value,
    valueBuffer,
    variant = 'indeterminate',
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    fourColor,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const theme = useTheme();

  const rootProps: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > = {};
  const inlineStyles: { bar1: React.CSSProperties; bar2: React.CSSProperties } = {
    bar1: {},
    bar2: {},
  };

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      rootProps['aria-valuenow'] = Math.round(value);
      rootProps['aria-valuemin'] = 0;
      rootProps['aria-valuemax'] = 100;
      let transform = value - 100;
      if (theme.direction === 'rtl') {
        transform = -transform;
      }
      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(
        'MUI: You need to provide a value prop ' +
          'when using the determinate or buffer variant of LinearProgress .',
      );
    }
  }
  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      let transform = (valueBuffer || 0) - 100;
      if (theme.direction === 'rtl') {
        transform = -transform;
      }
      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(
        'MUI: You need to provide a valueBuffer prop ' +
          'when using the buffer variant of LinearProgress.',
      );
    }
  }

  return (
    <LinearProgressRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      role="progressbar"
      {...rootProps}
      ref={ref}
      {...other}
    >
      {variant === 'buffer' ? (
        <LinearProgressDashed className={classes.dashed} ownerState={ownerState} />
      ) : null}
      <LinearProgressBar1
        className={classes.bar1}
        ownerState={ownerState}
        style={inlineStyles.bar1}
      />
      {variant === 'determinate' ? null : (
        <LinearProgressBar2
          className={classes.bar2}
          ownerState={ownerState}
          style={inlineStyles.bar2}
        />
      )}
    </LinearProgressRoot>
  );
}) as OverridableComponent<LinearProgressTypeMap>;

LinearProgress.propTypes /* remove-proptypes */ = {
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
   * If `true`, the component render indeterminate or query mode using four colors instead of one.
   * This only works if variant is `indeterminate` or `query`.
   * @default false
   */
  fourColor: chainPropTypes(PropTypes.bool, (props) => {
    if (
      props.fourColor &&
      props.variant &&
      props.variant !== 'indeterminate' &&
      props.variant !== 'query'
    ) {
      return new Error(
        'MUI: You have provided the `fourColor` prop ' +
          'with a variant other than `indeterminate` or `query`. This will have no effect.',
      );
    }
    return null;
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
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number,
  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer: PropTypes.number,
  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['buffer', 'determinate', 'indeterminate', 'query']),
} as any;

export default LinearProgress;
