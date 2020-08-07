import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import capitalize from '../utils/capitalize';
import withStyles from '../styles/withStyles';
import { darken, lighten } from '../styles/colorManipulator';
import useTheme from '../styles/useTheme';

const TRANSITION_DURATION = 4; // seconds

export const styles = (theme) => {
  const getColor = (color) =>
    theme.palette.type === 'light' ? lighten(color, 0.62) : darken(color, 0.5);

  const backgroundPrimary = getColor(theme.palette.primary.main);
  const backgroundSecondary = getColor(theme.palette.secondary.main);

  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      overflow: 'hidden',
      height: 4,
      '@media print': {
        colorAdjust: 'exact',
      },
    },
    /* Styles applied to the root and bar2 element if `color="primary"`; bar2 if `variant="buffer"`. */
    colorPrimary: {
      backgroundColor: backgroundPrimary,
    },
    /* Styles applied to the root and bar2 elements if `color="secondary"`; bar2 if `variant="buffer"`. */
    colorSecondary: {
      backgroundColor: backgroundSecondary,
    },
    /* Styles applied to the root element if `variant="determinate"`. */
    determinate: {},
    /* Styles applied to the root element if `variant="indeterminate"`. */
    indeterminate: {},
    /* Styles applied to the root element if `variant="buffer"`. */
    buffer: {
      backgroundColor: 'transparent',
    },
    /* Styles applied to the root element if `variant="query"`. */
    query: {
      transform: 'rotate(180deg)',
    },
    /* Styles applied to the additional bar element if `variant="buffer"`. */
    dashed: {
      position: 'absolute',
      marginTop: 0,
      height: '100%',
      width: '100%',
      animation: '$buffer 3s infinite linear',
    },
    /* Styles applied to the additional bar element if `variant="buffer"` and `color="primary"`. */
    dashedColorPrimary: {
      backgroundImage: `radial-gradient(${backgroundPrimary} 0%, ${backgroundPrimary} 16%, transparent 42%)`,
      backgroundSize: '10px 10px',
      backgroundPosition: '0 -23px',
    },
    /* Styles applied to the additional bar element if `variant="buffer"` and `color="secondary"`. */
    dashedColorSecondary: {
      backgroundImage: `radial-gradient(${backgroundSecondary} 0%, ${backgroundSecondary} 16%, transparent 42%)`,
      backgroundSize: '10px 10px',
      backgroundPosition: '0 -23px',
    },
    /* Styles applied to the layered bar1 and bar2 elements. */
    bar: {
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: 0,
      top: 0,
      transition: 'transform 0.2s linear',
      transformOrigin: 'left',
    },
    /* Styles applied to the bar elements if `color="primary"`; bar2 if `variant` not "buffer". */
    barColorPrimary: {
      backgroundColor: theme.palette.primary.main,
    },
    /* Styles applied to the bar elements if `color="secondary"`; bar2 if `variant` not "buffer". */
    barColorSecondary: {
      backgroundColor: theme.palette.secondary.main,
    },
    /* Styles applied to the bar1 element if `variant="indeterminate or query"`. */
    bar1Indeterminate: {
      width: 'auto',
      animation: '$indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
    },
    /* Styles applied to the bar1 element if `variant="determinate"`. */
    bar1Determinate: {
      transition: `transform .${TRANSITION_DURATION}s linear`,
    },
    /* Styles applied to the bar1 element if `variant="buffer"`. */
    bar1Buffer: {
      zIndex: 1,
      transition: `transform .${TRANSITION_DURATION}s linear`,
    },
    /* Styles applied to the bar2 element if `variant="indeterminate or query"`. */
    bar2Indeterminate: {
      width: 'auto',
      animation: '$indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite',
    },
    /* Styles applied to the bar2 element if `variant="buffer"`. */
    bar2Buffer: {
      transition: `transform .${TRANSITION_DURATION}s linear`,
    },
    // Legends:
    // || represents the viewport
    // -  represents a light background
    // x  represents a dark background
    '@keyframes indeterminate1': {
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
    '@keyframes indeterminate2': {
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
        backgroundPosition: '0 -23px',
      },
      '50%': {
        opacity: 0,
        backgroundPosition: '0 -23px',
      },
      '100%': {
        opacity: 1,
        backgroundPosition: '-200px -23px',
      },
    },
  };
};

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const LinearProgress = React.forwardRef(function LinearProgress(props, ref) {
  const {
    classes,
    className,
    color = 'primary',
    value,
    valueBuffer,
    variant = 'indeterminate',
    ...other
  } = props;
  const theme = useTheme();

  const rootProps = {};
  const inlineStyles = { bar1: {}, bar2: {} };

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      rootProps['aria-valuenow'] = Math.round(value);
      rootProps['aria-valuemin'] = 0;
      rootProps['aria-valuemax'] = 100;
      let transform = value - 100;
      if (theme.direction === 'rtl') {
        transform = -transform;
      }
      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(
        'Material-UI: You need to provide a value prop ' +
          'when using the determinate or buffer variant of LinearProgress .',
      );
    }
  }
  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      let transform = (valueBuffer || 0) - 100;
      if (theme.direction === 'rtl') {
        transform = -transform;
      }
      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(
        'Material-UI: You need to provide a valueBuffer prop ' +
          'when using the buffer variant of LinearProgress.',
      );
    }
  }

  return (
    <div
      className={clsx(
        classes.root,
        classes[`color${capitalize(color)}`],
        {
          [classes.determinate]: variant === 'determinate',
          [classes.indeterminate]: variant === 'indeterminate',
          [classes.buffer]: variant === 'buffer',
          [classes.query]: variant === 'query',
        },
        className,
      )}
      role="progressbar"
      {...rootProps}
      ref={ref}
      {...other}
    >
      {variant === 'buffer' ? (
        <div className={clsx(classes.dashed, classes[`dashedColor${capitalize(color)}`])} />
      ) : null}
      <div
        className={clsx(classes.bar, classes[`barColor${capitalize(color)}`], {
          [classes.bar1Indeterminate]: variant === 'indeterminate' || variant === 'query',
          [classes.bar1Determinate]: variant === 'determinate',
          [classes.bar1Buffer]: variant === 'buffer',
        })}
        style={inlineStyles.bar1}
      />
      {variant === 'determinate' ? null : (
        <div
          className={clsx(classes.bar, {
            [classes[`barColor${capitalize(color)}`]]: variant !== 'buffer',
            [classes[`color${capitalize(color)}`]]: variant === 'buffer',
            [classes.bar2Indeterminate]: variant === 'indeterminate' || variant === 'query',
            [classes.bar2Buffer]: variant === 'buffer',
          })}
          style={inlineStyles.bar2}
        />
      )}
    </div>
  );
});

LinearProgress.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
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
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   */
  variant: PropTypes.oneOf(['buffer', 'determinate', 'indeterminate', 'query']),
};

export default withStyles(styles, { name: 'MuiLinearProgress' })(LinearProgress);
