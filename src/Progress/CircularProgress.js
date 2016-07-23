// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import ClassNames from 'classnames';
import { easing } from '../styles/transitions';

export const styleSheet = createStyleSheet('CircularProgress', (theme) => {
  const baseSize = 50;

  return {
    root: {
      color: theme.palette.accent.A200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: baseSize,
      height: baseSize,
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
      strokeLinecap: 'round',
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
        strokeDasharray: '1, calc((100% - 3px) * 3.141)',
        strokeDashoffset: 0,
      },
      '55%': {
        strokeDasharray: 'calc((65% - 3px) * 3.141), calc((100% - 3px) * 3.141)',
        strokeDashoffset: 'calc((25% - 3px) * -3.141)',
      },
      '100%': {
        strokeDasharray: 'calc((65% - 3px) * 3.141), calc((100% - 3px) * 3.141)',
        strokeDashoffset: 'calc((99% - 3px) * -3.141)',
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
    size: 50,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const { className, size, ...other } = this.props;
    const classes = this.context.styleManager.render(styleSheet);

    const radius = size / 2;
    const rootClass = ClassNames(classes.root, className);
    const rootStyle = { width: size, height: size };

    return (
      <div className={rootClass} style={rootStyle} {...other}>
        <div className={classes.wrapper}>
          <svg className={classes.svg} viewBox={`0 0 ${size} ${size}`}>
            <circle
              className={classes.circle}
              cx={radius}
              cy={radius}
              r={radius - 1.5}
              fill="none"
              strokeWidth="3"
              strokeMiterlimit="20"
            />
          </svg>
        </div>
      </div>
    );
  }
}
