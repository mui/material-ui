// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import classNames from 'classnames';
import { easing } from '../styles/transitions';

const THICKNESS = 3.5;
const PI = 3.1415;

export const styleSheet = createStyleSheet('CircularProgress', (theme) => {
  return {
    root: {
      color: theme.palette.primary[500],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    wrapper: {
      display: 'inline-block',
      position: 'relative',
      animation: 'rotate-progress-circle 10000ms linear infinite',
      width: '100%',
      height: '100%',
    },
    svg: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    circle: {
      strokeDasharray: '1, calc((100% - 3px) * 3.141)',
      strokeDashoffset: '0%',
      stroke: 'currentColor',
      strokeLinecap: 'square',
      transition: theme.transitions.create('all', '1.25s'),
      animation: `scale-progress-circle 1250ms ${easing.easeInOut} infinite`,
    },
    '@keyframes rotate-progress-circle': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(1800deg)',
      },
    },
    '@keyframes scale-progress-circle': {
      '10%': {
        strokeDasharray: `1, calc((100% - ${THICKNESS}px) * ${PI})`,
        strokeDashoffset: 0,
      },
      '55%': {
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
        <div className={classes.wrapper}>
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
      </div>
    );
  }
}
