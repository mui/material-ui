// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

const THICKNESS = 3.6;
const PI = 3.1416; // Simple version of Math.PI for the CSS generated.

export const styleSheet = createStyleSheet('MuiCircularProgress', (theme) => ({
  root: {
    display: 'inline-block',
    color: theme.palette.primary[500],
  },
  svg: {
    // The main animation is loop 4 times (4 / 3 * 1300).
    animation: 'rotate-progress-circle 1733ms linear infinite',
  },
  circle: {
    strokeDasharray: '1, calc((100% - 3px) * 3.141)',
    strokeDashoffset: '0%',
    stroke: 'currentColor',
    strokeLinecap: 'square',
    transition: theme.transitions.create('all', { duration: 1300 }),
    animation: `scale-progress-circle 1300ms ${theme.transitions.easing.easeInOut} infinite`,
  },
  '@keyframes rotate-progress-circle': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  '@keyframes scale-progress-circle': {
    '8%': {
      strokeDasharray: `1, calc((100% - ${THICKNESS}px) * ${PI})`,
      strokeDashoffset: 0,
    },
    '50%, 58%': {
      strokeDasharray: `calc((65% - ${THICKNESS}px) * ${PI}), calc((100% - ${
        THICKNESS}px) * ${PI})`,
      strokeDashoffset: `calc((25% - ${THICKNESS}px) * -${PI})`,
    },
    '100%': {
      strokeDasharray: `calc((65% - ${THICKNESS}px) * ${PI}), calc((100% - ${
        THICKNESS}px) * ${PI})`,
      strokeDashoffset: `calc((99% - ${THICKNESS}px) * -${PI})`,
    },
  },
}));

function CircularProgress(props) {
  const {
    classes,
    className,
    size,
    ...other
  } = props;
  const radius = size / 2;

  return (
    <div
      className={classNames(classes.root, className)}
      style={{ width: size, height: size }}
      {...other}
    >
      <svg className={classes.svg} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={classes.circle}
          cx={radius}
          cy={radius}
          r={radius - (THICKNESS / 2)}
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
   * The size of the circle.
   */
  size: PropTypes.number,
  /**
   * The value of progress in determinate mode.
   * @ignore - not yet implemented.
   * TODO: Implement determinate mode.
   */
  value: PropTypes.number,
};

CircularProgress.defaultProps = {
  size: 40,
};

export default withStyles(styleSheet)(CircularProgress);
