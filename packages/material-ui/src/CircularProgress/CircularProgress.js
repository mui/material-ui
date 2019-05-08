import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

const SIZE = 44;

function getRelativeValue(value, min, max) {
  const clampedValue = Math.min(Math.max(min, value), max);
  return (clampedValue - min) / (max - min);
}

function easeOut(t) {
  t = getRelativeValue(t, 0, 1);
  // https://gist.github.com/gre/1650294
  t = (t -= 1) * t * t + 1;
  return t;
}

function easeIn(t) {
  return t * t;
}

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-block',
    lineHeight: 1, // Keep the progress centered
  },
  /* Styles applied to the root element if `variant="static"`. */
  static: {
    transition: theme.transitions.create('transform'),
  },
  /* Styles applied to the root element if `variant="indeterminate"`. */
  indeterminate: {
    animation: 'mui-progress-circular-rotate 1.4s linear infinite',
    // Backward compatible logic between JSS v9 and v10.
    // To remove with the release of Material-UI v4
    animationName: '$mui-progress-circular-rotate',
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  /* Styles applied to the `svg` element. */
  svg: {},
  /* Styles applied to the `circle` svg path. */
  circle: {
    stroke: 'currentColor',
    // Use butt to follow the specification, by chance, it's already the default CSS value.
    // strokeLinecap: 'butt',
  },
  /* Styles applied to the `circle` svg path if `variant="static"`. */
  circleStatic: {
    transition: theme.transitions.create('stroke-dashoffset'),
  },
  /* Styles applied to the `circle` svg path if `variant="indeterminate"`. */
  circleIndeterminate: {
    animation: 'mui-progress-circular-dash 1.4s ease-in-out infinite',
    // Backward compatible logic between JSS v9 and v10.
    // To remove with the release of Material-UI v4
    animationName: '$mui-progress-circular-dash',
    // Some default value that looks fine waiting for the animation to kicks in.
    strokeDasharray: '80px, 200px',
    strokeDashoffset: '0px', // Add the unit to fix a Edge 16 and below bug.
  },
  '@keyframes mui-progress-circular-rotate': {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  '@keyframes mui-progress-circular-dash': {
    '0%': {
      strokeDasharray: '1px, 200px',
      strokeDashoffset: '0px',
    },
    '50%': {
      strokeDasharray: '100px, 200px',
      strokeDashoffset: '-15px',
    },
    '100%': {
      strokeDasharray: '100px, 200px',
      strokeDashoffset: '-125px',
    },
  },
  /* Styles applied to the `circle` svg path if `disableShrink={true}`. */
  circleDisableShrink: {
    animation: 'none',
  },
});

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const CircularProgress = React.forwardRef(function CircularProgress(props, ref) {
  const {
    classes,
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

  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};

  if (variant === 'determinate' || variant === 'static') {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);

    if (variant === 'static') {
      circleStyle.strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(3)}px`;
      rootStyle.transform = 'rotate(-90deg)';
    } else {
      circleStyle.strokeDashoffset = `${(easeIn((100 - value) / 100) * circumference).toFixed(
        3,
      )}px`;
      rootStyle.transform = `rotate(${(easeOut(value / 70) * 270).toFixed(3)}deg)`;
    }
  }

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'inherit',
          [classes.indeterminate]: variant === 'indeterminate',
          [classes.static]: variant === 'static',
        },
        className,
      )}
      style={{ width: size, height: size, ...rootStyle, ...style }}
      ref={ref}
      role="progressbar"
      {...rootProps}
      {...other}
    >
      <svg className={classes.svg} viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}>
        <circle
          className={clsx(classes.circle, {
            [classes.circleIndeterminate]: variant === 'indeterminate',
            [classes.circleStatic]: variant === 'static',
            [classes.circleDisableShrink]: disableShrink,
          })}
          style={circleStyle}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          strokeWidth={thickness}
        />
      </svg>
    </div>
  );
});

CircularProgress.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'inherit']),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   */
  disableShrink: chainPropTypes(PropTypes.bool, props => {
    if (props.disableShrink && props.variant !== 'indeterminate') {
      return new Error(
        'Material-UI: you have provided the `disableShrink` property ' +
          'with a variant other than `indeterminate`. This will have no effect.',
      );
    }

    return null;
  }),
  /**
   * The size of the circle.
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The thickness of the circle.
   */
  thickness: PropTypes.number,
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate', 'static']),
};

export default withStyles(styles, { name: 'MuiCircularProgress', flip: false })(CircularProgress);
