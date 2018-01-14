import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import withStyles from '../styles/withStyles';
import { lighten } from '../styles/colorManipulator';

const TRANSITION_DURATION = 4; // 400ms

export const styles = theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    height: 5,
  },
  primaryColor: {
    backgroundColor: lighten(theme.palette.primary.light, 0.6),
  },
  primaryColorBar: {
    backgroundColor: theme.palette.primary.main,
  },
  primaryDashed: {
    background: `radial-gradient(${lighten(theme.palette.primary.light, 0.6)} 0%, ${lighten(
      theme.palette.primary.light,
      0.6,
    )} 16%, transparent 42%)`,
    backgroundSize: '10px 10px',
    backgroundPosition: '0px -23px',
  },
  secondaryColor: {
    backgroundColor: lighten(theme.palette.secondary.light, 0.4),
  },
  secondaryColorBar: {
    backgroundColor: theme.palette.secondary.main,
  },
  secondaryDashed: {
    background: `radial-gradient(${lighten(theme.palette.secondary.light, 0.4)} 0%, ${lighten(
      theme.palette.secondary.light,
      0.6,
    )} 16%, transparent 42%)`,
    backgroundSize: '10px 10px',
    backgroundPosition: '0px -23px',
  },
  bar: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    transition: 'transform 0.2s linear',
    transformOrigin: 'left',
  },
  dashed: {
    position: 'absolute',
    marginTop: 0,
    height: '100%',
    width: '100%',
    animation: 'buffer 3s infinite linear',
  },
  bufferBar2: {
    transition: `transform .${TRANSITION_DURATION}s linear`,
  },
  rootBuffer: {
    backgroundColor: 'transparent',
  },
  rootQuery: {
    transform: 'rotate(180deg)',
  },
  indeterminateBar1: {
    width: 'auto',
    willChange: 'left, right',
    animation: 'mui-indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
  },
  indeterminateBar2: {
    width: 'auto',
    willChange: 'left, right',
    animation: 'mui-indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
    animationDelay: '1.15s',
  },
  determinateBar1: {
    willChange: 'transform',
    transition: `transform .${TRANSITION_DURATION}s linear`,
  },
  bufferBar1: {
    zIndex: 1,
    transition: `transform .${TRANSITION_DURATION}s linear`,
  },
  // Legends:
  // || represents the viewport
  // -  represents a light background
  // x  represents a dark background
  '@keyframes mui-indeterminate1': {
    //  |-----|---x-||-----||-----|
    '0%': {
      left: '-35%',
      right: '100%',
    },
    //  |-----|-----||-----||xxxx-|
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
    //  |xxxxx|xxxxx||-----||-----|
    '0%': {
      left: '-200%',
      right: '100%',
    },
    //  |-----|-----||-----||-x----|
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
});

function LinearProgress(props) {
  const { classes, className, color, mode, value, valueBuffer, ...other } = props;

  const dashedClass = classNames(classes.dashed, {
    [classes.primaryDashed]: color === 'primary',
    [classes.secondaryDashed]: color === 'secondary',
  });

  const rootClassName = classNames(
    classes.root,
    {
      [classes.primaryColor]: color === 'primary',
      [classes.secondaryColor]: color === 'secondary',
      [classes.rootBuffer]: mode === 'buffer',
      [classes.rootQuery]: mode === 'query',
    },
    className,
  );
  const primaryClassName = classNames(classes.bar, {
    [classes.primaryColorBar]: color === 'primary',
    [classes.secondaryColorBar]: color === 'secondary',
    [classes.indeterminateBar1]: mode === 'indeterminate' || mode === 'query',
    [classes.determinateBar1]: mode === 'determinate',
    [classes.bufferBar1]: mode === 'buffer',
  });
  const secondaryClassName = classNames(classes.bar, {
    [classes.bufferBar2]: mode === 'buffer',
    [classes.primaryColorBar]: color === 'primary' && mode !== 'buffer',
    [classes.primaryColor]: color === 'primary' && mode === 'buffer',
    [classes.secondaryColorBar]: color === 'secondary' && mode !== 'buffer',
    [classes.secondaryColor]: color === 'secondary' && mode === 'buffer',
    [classes.indeterminateBar2]: mode === 'indeterminate' || mode === 'query',
  });
  const inlineStyles = { primary: {}, secondary: {} };
  const rootProps = {};

  if (mode === 'determinate') {
    if (value !== undefined) {
      inlineStyles.primary.transform = `scaleX(${value / 100})`;
      rootProps['aria-valuenow'] = Math.round(value);
    } else {
      warning(
        false,
        'Material-UI: you need to provide a value property ' +
          'when LinearProgress is in determinate mode.',
      );
    }
  } else if (mode === 'buffer') {
    if (value !== undefined) {
      inlineStyles.primary.transform = `scaleX(${value / 100})`;
      inlineStyles.secondary.transform = `scaleX(${(valueBuffer || 0) / 100})`;
    } else {
      warning(
        false,
        'Material-UI: you need to provide a value property when LinearProgress is ' +
          'in buffer mode.',
      );
    }
  }

  return (
    <div className={rootClassName} {...rootProps} {...other}>
      {mode === 'buffer' ? <div className={dashedClass} /> : null}
      <div className={primaryClassName} style={inlineStyles.primary} />
      {mode === 'determinate' ? null : (
        <div className={secondaryClassName} style={inlineStyles.secondary} />
      )}
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
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
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
  color: 'primary',
  mode: 'indeterminate',
};

export default withStyles(styles, { name: 'MuiLinearProgress' })(LinearProgress);
