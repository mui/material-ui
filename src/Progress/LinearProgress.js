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

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
function LinearProgress(props) {
  const { classes, className, color, value, valueBuffer, variant, ...other } = props;

  const dashedClass = classNames(classes.dashed, {
    [classes.primaryDashed]: color === 'primary',
    [classes.secondaryDashed]: color === 'secondary',
  });

  const rootClassName = classNames(
    classes.root,
    {
      [classes.primaryColor]: color === 'primary',
      [classes.secondaryColor]: color === 'secondary',
      [classes.rootBuffer]: variant === 'buffer',
      [classes.rootQuery]: variant === 'query',
    },
    className,
  );
  const primaryClassName = classNames(classes.bar, {
    [classes.primaryColorBar]: color === 'primary',
    [classes.secondaryColorBar]: color === 'secondary',
    [classes.indeterminateBar1]: variant === 'indeterminate' || variant === 'query',
    [classes.determinateBar1]: variant === 'determinate',
    [classes.bufferBar1]: variant === 'buffer',
  });
  const secondaryClassName = classNames(classes.bar, {
    [classes.bufferBar2]: variant === 'buffer',
    [classes.primaryColorBar]: color === 'primary' && variant !== 'buffer',
    [classes.primaryColor]: color === 'primary' && variant === 'buffer',
    [classes.secondaryColorBar]: color === 'secondary' && variant !== 'buffer',
    [classes.secondaryColor]: color === 'secondary' && variant === 'buffer',
    [classes.indeterminateBar2]: variant === 'indeterminate' || variant === 'query',
  });
  const inlineStyles = { primary: {}, secondary: {} };
  const rootProps = {};

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      inlineStyles.primary.transform = `scaleX(${value / 100})`;
      rootProps['aria-valuenow'] = Math.round(value);
    } else {
      warning(
        false,
        'Material-UI: you need to provide a value property ' +
          'when using the determinate or buffer variant of LinearProgress .',
      );
    }
  }
  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      inlineStyles.secondary.transform = `scaleX(${(valueBuffer || 0) / 100})`;
    } else {
      warning(
        false,
        'Material-UI: you need to provide a valueBuffer property ' +
          'when using the buffer variant of LinearProgress.',
      );
    }
  }

  return (
    <div className={rootClassName} role="progressbar" {...rootProps} {...other}>
      {variant === 'buffer' ? <div className={dashedClass} /> : null}
      <div className={primaryClassName} style={inlineStyles.primary} />
      {variant === 'determinate' ? null : (
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number,
  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer: PropTypes.number,
  /**
   * The variant of progress indicator. Use indeterminate or query
   * when there is no progress value.
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate', 'buffer', 'query']),
};

LinearProgress.defaultProps = {
  color: 'primary',
  variant: 'indeterminate',
};

export default withStyles(styles, { name: 'MuiLinearProgress' })(LinearProgress);
