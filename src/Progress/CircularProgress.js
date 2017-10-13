// @flow

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

const SIZE = 50;

function getRelativeValue(value, min, max) {
  const clampedValue = Math.min(Math.max(min, value), max);
  return (clampedValue - min) / (max - min);
}

export const styles = (theme: Object) => ({
  root: {
    display: 'inline-block',
  },
  primaryColor: {
    color: theme.palette.primary[500],
  },
  accentColor: {
    color: theme.palette.secondary.A200,
  },
  svgIndeterminate: {
    animation: 'mui-progress-circular-rotate 1.4s linear infinite',
  },
  svgDeterminate: {
    transform: 'rotate(-90deg)',
  },
  circle: {
    stroke: 'currentColor',
    strokeLinecap: 'round',
  },
  circleIndeterminate: {
    animation: 'mui-progress-circular-dash 1.4s ease-in-out infinite',
    // Some default value that looks fine waiting for the animation to kicks in.
    strokeDasharray: '80,200',
    strokeDashoffset: 0,
  },
  '@keyframes mui-progress-circular-rotate': {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  '@keyframes mui-progress-circular-dash': {
    '0%': {
      strokeDasharray: '1,200',
      strokeDashoffset: 0,
    },
    '50%': {
      strokeDasharray: '100,200',
      strokeDashoffset: -15,
    },
    '100%': {
      strokeDasharray: '100,200',
      strokeDashoffset: -120,
    },
  },
});

export type Color = 'primary' | 'accent';
export type Mode = 'determinate' | 'indeterminate';

type ProvidedProps = {
  classes: Object,
  color: Color,
  size: number,
  mode: Mode,
  value: number,
  min: number,
  max: number,
};

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color?: Color,
  /**
   * The max value of progress in determinate mode.
   */
  max?: number,
  /**
   * The min value of progress in determinate mode.
   */
  min?: number,
  /**
   * The mode of show your progress. Indeterminate
   * for when there is no value for progress.
   * Determinate for controlled progress value.
   */
  mode?: Mode,
  /**
   * The size of the circle.
   */
  size?: number,
  /**
   * @ignore
   */
  style?: Object,
  /**
   * The thickness of the circle.
   */
  thickness?: number,
  /**
   * The value of progress in determinate mode.
   */
  value?: number,
};

function CircularProgress(props: ProvidedProps & Props) {
  const {
    classes,
    className,
    color,
    size,
    style,
    thickness,
    mode,
    value,
    min,
    max,
    ...other
  } = props;

  const rootProps = {};

  const circleStyle = {};
  if (mode === 'determinate') {
    const relVal = getRelativeValue(value, min, max) * 100;
    const circumference = 2 * Math.PI * (SIZE / 2 - 5);

    circleStyle.strokeDashoffset = `${Math.round((100 - relVal) / 100 * circumference * 1000) /
      1000}px`;
    circleStyle.strokeDasharray = Math.round(circumference * 1000) / 1000;

    rootProps['aria-valuenow'] = value;
    rootProps['aria-valuemin'] = min;
    rootProps['aria-valuemax'] = max;
  }

  return (
    <div
      className={classNames(classes.root, classes[`${color}Color`], className)}
      style={{ width: size, height: size, ...style }}
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

CircularProgress.defaultProps = {
  color: 'primary',
  size: 40,
  thickness: 3.6,
  mode: 'indeterminate',
  value: 0,
  min: 0,
  max: 100,
};

export default withStyles(styles, { name: 'MuiCircularProgress' })(CircularProgress);
