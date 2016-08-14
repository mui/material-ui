// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import classNames from 'classnames';
import { easing } from '../styles/transitions';

const THICKNESS = 3.6;
const PI = 3.1415; // Simple version of Math.PI for the css generated.

export const styleSheet = createStyleSheet('CircularProgress', (theme) => {
  return {
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
      transition: theme.transitions.create('all', '1.30s'),
      animation: `scale-progress-circle 1300ms ${easing.easeInOut} infinite`,
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
        strokeDasharray: `calc((65% - ${THICKNESS}px) * ${PI}), calc((100% - ${THICKNESS}px) * ${PI})`,
        strokeDashoffset: `calc((25% - ${THICKNESS}px) * -${PI})`,
      },
      '100%': {
        strokeDasharray: `calc((65% - ${THICKNESS}px) * ${PI}), calc((100% - ${THICKNESS}px) * ${PI})`,
        strokeDashoffset: `calc((99% - ${THICKNESS}px) * -${PI})`,
      },
    },
  };
});

export default class CircularProgress extends Component {
  static propTypes = {
    className: PropTypes.string,
    /**
     * The mode of show your progress, indeterminate
     * for when there is no value for progress.
     */
    mode: PropTypes.oneOf(['determinate', 'indeterminate']),
    /**
     * The size of the circle.
     */
    size: PropTypes.number,
    /**
     * The value of progress, only works in determinate mode.
     */
    value: PropTypes.number,
  };

  static defaultProps = {
    mode: 'indeterminate',
    size: 40,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      className,
      mode, // eslint-disable-line no-unused-vars
      size,
      ...other,
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
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
}
