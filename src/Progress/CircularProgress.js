import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

const SIZE = 50;

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
  root: {
    display: 'inline-block',
  },
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  svgIndeterminate: {
    animation: 'mui-progress-circular-rotate 1.4s linear infinite',
  },
  svgDeterminate: {},
  circle: {
    stroke: 'currentColor',
    strokeLinecap: 'round',
  },
  circleIndeterminate: {
    animation: 'mui-progress-circular-dash 1.4s ease-in-out infinite',
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
      strokeDashoffset: '-120px',
    },
  },
});

/**
 * ## ARIA
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
function CircularProgress(props) {
  const {
    classes,
    className,
    color,
    max,
    min,
    mode,
    size,
    style,
    thickness,
    value,
    ...other
  } = props;

  const circleStyle = {};
  const rootStyle = { width: size, height: size };
  const rootProps = {};

  if (mode === 'determinate') {
    const relVal = getRelativeValue(value, min, max) * 100;
    const circumference = 2 * Math.PI * (SIZE / 2 - 5);

    circleStyle.strokeDashoffset = `${(easeIn((100 - relVal) / 100) * circumference).toFixed(3)}px`;
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootStyle.transform = `rotate(${(easeOut(relVal / 70) * 270).toFixed(3)}deg)`;
    rootProps['aria-valuenow'] = Math.round(relVal);
  }

  return (
    <div
      className={classNames(
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'inherit',
        },
        className,
      )}
      style={{ ...rootStyle, ...style }}
      role="progressbar"
      {...rootProps}
      {...other}
    >
      <svg
        className={classNames({
          [classes.svgIndeterminate]: mode === 'indeterminate',
          [classes.svgDeterminate]: mode === 'determinate',
        })}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <circle
          className={classNames(classes.circle, {
            [classes.circleIndeterminate]: mode === 'indeterminate',
          })}
          style={circleStyle}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={SIZE / 2 - 5}
          fill="none"
          strokeWidth={thickness}
        />
      </svg>
    </div>
  );
}

CircularProgress.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'inherit']),
  /**
   * The max value of progress in determinate mode.
   */
  max: PropTypes.number,
  /**
   * The min value of progress in determinate mode.
   */
  min: PropTypes.number,
  /**
   * The mode of show your progress. Indeterminate
   * for when there is no value for progress.
   * Determinate for controlled progress value.
   */
  mode: PropTypes.oneOf(['determinate', 'indeterminate']),
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
   * The value of progress in determinate mode.
   */
  value: PropTypes.number,
};

CircularProgress.defaultProps = {
  color: 'primary',
  max: 100,
  min: 0,
  mode: 'indeterminate',
  size: 40,
  thickness: 3.6,
  value: 0,
};

export default withStyles(styles, { name: 'MuiCircularProgress', flip: false })(CircularProgress);
