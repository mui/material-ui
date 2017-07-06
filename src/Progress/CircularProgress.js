// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

const THICKNESS = 3.6;
const PI = 3.1416; // Simple version of Math.PI for the CSS generated.

function getRelativeValue(value, min, max) {
  const clampedValue = Math.min(Math.max(min, value), max);
  return (clampedValue - min) / (max - min);
}

export const styleSheet = createStyleSheet('MuiCircularProgress', theme => ({
  root: {
    display: 'inline-block',
    color: theme.palette.primary[500],
  },
  svg: {
    transform: 'rotate(-90deg)',
  },
  indeterminateSvg: {
    // The main animation is loop 4 times (4 / 3 * 1300).
    animation: 'mui-rotate-progress-circle 1733ms linear infinite',
  },
  circle: {
    stroke: 'currentColor',
    strokeLinecap: 'square',
    transition: theme.transitions.create('all', { duration: 1300 }),
  },
  indeterminateCircle: {
    strokeDasharray: `1, calc((100% - ${THICKNESS}px) * ${PI})`,
    strokeDashoffset: '0%',
    animation: `mui-scale-progress-circle 1300ms ${theme.transitions.easing.easeInOut} infinite`,
  },
  determinateCircle: {
    willChange: 'strokeDasharray',
    strokeDashoffset: '0%',
  },
  '@keyframes mui-rotate-progress-circle': {
    '0%': {
      transform: 'rotate(-90deg)',
    },
    '100%': {
      transform: 'rotate(270deg)',
    },
  },
  '@keyframes mui-scale-progress-circle': {
    '8%': {
      strokeDasharray: `1, calc((100% - ${THICKNESS}px) * ${PI})`,
      strokeDashoffset: 0,
    },
    '50%, 58%': {
      // eslint-disable-next-line max-len
      strokeDasharray: `calc((65% - ${THICKNESS}px) * ${PI}), calc((100% - ${THICKNESS}px) * ${PI})`,
      strokeDashoffset: `calc((25% - ${THICKNESS}px) * -${PI})`,
    },
    '100%': {
      // eslint-disable-next-line max-len
      strokeDasharray: `calc((65% - ${THICKNESS}px) * ${PI}), calc((100% - ${THICKNESS}px) * ${PI})`,
      strokeDashoffset: `calc((99% - ${THICKNESS}px) * -${PI})`,
    },
  },
}));

function CircularProgress(props) {
  const { classes, className, size, mode, value, min, max, ...other } = props;
  const radius = size / 2;
  const rootProps = {};
  const svgClasses = classNames(classes.svg, {
    [classes.indeterminateSvg]: mode === 'indeterminate',
  });

  const circleClasses = classNames(classes.circle, {
    [classes.indeterminateCircle]: mode === 'indeterminate',
    [classes.determinateCircle]: mode === 'determinate',
  });

  const circleStyle = {};
  if (mode === 'determinate') {
    const relVal = getRelativeValue(value, min, max);
    circleStyle.strokeDasharray =
      `calc(((100% - ${THICKNESS}px) * ${PI}) * ${relVal}),` +
      `calc((100% - ${THICKNESS}px) * ${PI})`;
    rootProps['aria-valuenow'] = value;
    rootProps['aria-valuemin'] = min;
    rootProps['aria-valuemax'] = max;
  }

  return (
    <div
      className={classNames(classes.root, className)}
      style={{ width: size, height: size }}
      role="progressbar"
      {...rootProps}
      {...other}
    >
      <svg className={svgClasses} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={circleClasses}
          style={circleStyle}
          cx={radius}
          cy={radius}
          r={radius - THICKNESS / 2}
          fill="none"
          strokeWidth={THICKNESS}
          strokeMiterlimit="20"
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
  size: PropTypes.number,
  /**
   * The value of progress in determinate mode.
  */
  value: PropTypes.number,
};

CircularProgress.defaultProps = {
  size: 40,
  mode: 'indeterminate',
  value: 0,
  min: 0,
  max: 100,
};

export default withStyles(styleSheet)(CircularProgress);
