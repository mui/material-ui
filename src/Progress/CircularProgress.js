import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import ClassNames from 'classnames';
import { easing } from '../styles/transitions';

export const styleSheet = createStyleSheet('CircularProgress', (theme) => {
  const baseSize = 50;

  return {
    root: {
      display: 'flex',
      position: 'relative',
      width: baseSize,
      height: baseSize,
    },
    wrapper: {
      display: 'inline-block',
      position: 'relative',
      animation: 'rotate-progress-circle 10000ms linear infinite',
      width: baseSize,
      height: baseSize,
    },
    svg: {
      position: 'relative',
      width: baseSize,
      height: baseSize,
    },
    circle: {
      strokeDasharray: '1, 200',
      strokeDashoffset: 0,
      stroke: theme.palette.accent.A200,
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
        strokeDasharray: '1, 200',
        strokeDashoffset: 0,
      },
      '55%': {
        strokeDasharray: '89, 200',
        strokeDashoffset: -35,
      },
      '100%': {
        strokeDasharray: '89, 200',
        strokeDashoffset: -124,
      },
    },
  };
});

export default class CircularProgress extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
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
    const scale = Math.round(1 / 5 * size) / 10;
    const svgStyle = { transform: `scale(${scale})` };
    return (
      <div className={ClassNames(classes.root, className)} {...other}>
        <div className={classes.wrapper}>
          <svg className={classes.svg} style={svgStyle}>
            <circle
              className={classes.circle}
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="3.5"
              strokeMiterlimit="20"
            />
          </svg>
        </div>
      </div>
    );
  }
}
