// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

const transitionDuration = 4; // 400ms

export const styleSheet = createStyleSheet('MuiLinearProgress', theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    height: 5,
    backgroundColor: theme.palette.primary[100],
  },
  rootBuffer: {
    backgroundColor: 'transparent',
  },
  rootQuery: {
    transform: 'rotate(180deg)',
  },
  bar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    transition: 'transform 0.2s linear',
    backgroundColor: theme.palette.primary[500],
  },
  dashed: {
    position: 'absolute',
    marginTop: 0,
    height: '100%',
    width: '100%',
    background: `radial-gradient(${theme.palette.primary[100]} 0%, ${theme.palette
      .primary[100]} 16%, transparent 42%)`,
    backgroundSize: '10px 10px',
    backgroundPosition: '0px -23px',
    animation: 'buffer 3s infinite linear',
  },
  indeterminateBar1: {
    willChange: 'left, right',
    animation: 'mui-indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
  },
  indeterminateBar2: {
    willChange: 'left, right',
    animation: 'mui-indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
    animationDelay: '1.15s',
  },
  determinateBar1: {
    willChange: 'width',
    transition: `width .${transitionDuration}s linear`,
  },
  bufferBar1: {
    zIndex: 1,
    transition: `width .${transitionDuration}s linear`,
  },
  bufferBar2: {
    transition: `width .${transitionDuration}s linear`,
    backgroundColor: theme.palette.primary[100],
  },
  '@keyframes mui-indeterminate1': {
    '0%': {
      left: '-35%',
      right: '100%',
    },
    '60%': {
      left: '100%',
      right: '-90%',
    },
    '100%': {
      left: '100%',
      right: '-90%',
    },
  },
  '@keyframes mui-indeterminate2': {
    '0%': {
      left: '-200%',
      right: '100%',
    },
    '60%': {
      left: '107%',
      right: '-8%',
    },
    '100%': {
      left: '107%',
      right: '-8%',
    },
  },
  '@keyframes buffer': {
    '0%': {
      opacity: 1,
      backgroundPosition: '0px -23px',
    },
    '50%': {
      opacity: 0,
      backgroundPosition: '0px -23px',
    },
    '100%': {
      opacity: 1,
      backgroundPosition: '-200px -23px',
    },
  },
}));

function LinearProgress(props) {
  const { classes, className, mode, value, valueBuffer, ...other } = props;
  const rootClasses = classNames(
    classes.root,
    {
      [classes.rootBuffer]: mode === 'buffer',
      [classes.rootQuery]: mode === 'query',
    },
    className,
  );
  const primaryClasses = classNames(classes.bar, {
    [classes.indeterminateBar1]: mode === 'indeterminate' || mode === 'query',
    [classes.determinateBar1]: mode === 'determinate',
    [classes.bufferBar1]: mode === 'buffer',
  });
  const secondaryClasses = classNames(classes.bar, {
    [classes.indeterminateBar2]: mode === 'indeterminate' || mode === 'query',
    [classes.bufferBar2]: mode === 'buffer',
  });
  const styles = { primary: {}, secondary: {} };
  const rootProps = {};

  if (mode === 'determinate') {
    styles.primary.width = `${value}%`;
    rootProps['aria-valuenow'] = Math.round(value);
  } else if (mode === 'buffer') {
    styles.primary.width = `${value}%`;
    styles.secondary.width = `${valueBuffer}%`;
  }

  return (
    <div className={rootClasses} {...rootProps} {...other}>
      {mode === 'buffer' ? <div className={classes.dashed} /> : null}
      <div className={primaryClasses} style={styles.primary} />
      {mode === 'determinate'
        ? null
        : <div className={secondaryClasses} style={styles.secondary} />}
    </div>
  );
}

LinearProgress.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The mode of show your progress, indeterminate
   * for when there is no value for progress.
   */
  mode: PropTypes.oneOf(['determinate', 'indeterminate', 'buffer', 'query']),
  /**
   * The value of progress, only works in determinate and buffer mode.
   * Value between 0 and 100.
   */
  value: PropTypes.number,
  /**
   * The value of buffer, only works in buffer mode.
   * Value between 0 and 100.
   */
  valueBuffer: PropTypes.number,
};

LinearProgress.defaultProps = {
  mode: 'indeterminate',
  value: 0,
};

export default withStyles(styleSheet)(LinearProgress);
