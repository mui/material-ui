import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { keyframes } from '@material-ui/styled-engine';
import capitalize from '../utils/capitalize';

import useThemeProps from '../styles/useThemeProps';
import experimentalStyled, { shouldForwardProp } from '../styles/experimentalStyled';
import circularProgressClasses, {
  getCircularProgressUtilityClass,
} from './circularProgressClasses';

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
  strokeDasharray: 1px, 200px;
  strokeDashoffset: 0px;
}
50% {
  strokeDasharray: 100px, 200px;
  strokeDashoffset: -15px;
}
100% {
  strokeDasharray: 100px, 200px;
  strokeDashoffset: -125px;
}
`;

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...styles[styleProps.variant],
    ...styles[`color${capitalize(styleProps.color)}`],
    [`& .${circularProgressClasses.svg}`]: styles.svg,
    [`& .${circularProgressClasses.circle}`]: {
      ...styles.circle,
      ...styles[`circle${capitalize(styleProps.variant)}`],
      ...(styleProps.disableShrink && styles.circleDisableShrink),
    },
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, variant, color, disableShrink } = styleProps;

  const slots = {
    root: ['root', variant, `color${capitalize(color)}`],
    svg: ['svg'],
    circle: ['circle', `circle${capitalize(variant)}`, disableShrink && 'circleDisableShrink'],
  };

  return composeClasses(slots, getCircularProgressUtilityClass, classes);
};

const CircularProgressRoot = experimentalStyled(
  'span',
  {},
  {
    name: 'MuiCircularProgress',
    slot: 'Root',
    overridesResolver,
  },
)`
  display: inline-block;

  &.${circularProgressClasses.determinate} {
    transition: ${({ theme }) => theme.transitions.create('transform')}
  }

  &.${circularProgressClasses.indeterminate} {
    animation-name: ${circularRotateKeyframe};
    animation-duration: 1.4s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &.${circularProgressClasses.primary} {
    color: ${({ theme }) => theme.palette.primary.main}
  }

  &.${circularProgressClasses.secondary} {
    color: ${({ theme }) => theme.palette.secondary.main}
  }
`;

const CircularProgressSVG = experimentalStyled(
  'svg',
  {},
  {
    name: 'MuiCircularProgress',
    slot: 'Svg',
  },
)({
  /* Styles applied to the svg element. */
  display: 'block', // Keeps the progress centered
});

const CircularProgressCircle = experimentalStyled(
  'circle',
  {},
  {
    name: 'MuiCircularProgress',
    slot: 'Circle',
  },
)`
  stroke: currentColor;

  &.${circularProgressClasses.determinate} {
    transition: ${({ theme }) => theme.transitions.create('stroke-dashoffset')};
  }

  &.${circularProgressClasses.indeterminate} {
    animation-name: ${circularDashKeyframe};
    animation-duration: 1.4s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    strokeDasharray: 80px, 200px;
    strokeDashoffset: 0px;
  }

  &.${circularProgressClasses.disableShrink} {
    animation: none;
  }
`;

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const CircularProgress = React.forwardRef(function CircularProgress(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiCircularProgress' });
  const {
    className,
    color = 'primary',
    disableShrink = false,
    size = 40,
    style,
    thickness = 3.6,
    value = 0,
    variant = 'indeterminate',
    ...other
  } = props;

  const styleProps = {
    ...props,
    color,
    disableShrink,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};

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
      style={{ width: size, height: size, ...rootStyle, ...style }}
      styleProps={styleProps}
      ref={ref}
      role="progressbar"
      {...rootProps}
      {...other}
    >
      <CircularProgressSVG
        className={classes.svg}
        styleProps={styleProps}
        viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
      >
        <CircularProgressCircle
          className={classes.circle}
          style={circleStyle}
          styleProps={styleProps}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          strokeWidth={thickness}
        />
      </CircularProgressSVG>
    </CircularProgressRoot>
  );
});

CircularProgress.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary']),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: chainPropTypes(PropTypes.bool, (props) => {
    if (props.disableShrink && props.variant && props.variant !== 'indeterminate') {
      return new Error(
        'Material-UI: You have provided the `disableShrink` prop ' +
          'with a variant other than `indeterminate`. This will have no effect.',
      );
    }

    return null;
  }),
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, e.g '3rem'.
   * @default 40
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
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
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate']),
};

export default CircularProgress;
