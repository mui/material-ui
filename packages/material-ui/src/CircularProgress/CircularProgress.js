import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';

const SIZE = 44;

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-block',
  },
  /* Styles applied to the root element if `variant="determinate"`. */
  determinate: {
    transition: theme.transitions.create('transform'),
  },
  /* Styles applied to the root element if `variant="indeterminate"`. */
  indeterminate: {
    animation: '$circular-rotate 1.4s linear infinite',
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  /* Styles applied to the `svg` element. */
  svg: {
    display: 'block', // Keeps the progress centered
  },
  /* Styles applied to the `circle` svg path. */
  circle: {
    stroke: 'currentColor',
    // Use butt to follow the specification, by chance, it's already the default CSS value.
    // strokeLinecap: 'butt',
  },
  /* Styles applied to the `circle` svg path if `variant="determinate"`. */
  circleDeterminate: {
    transition: theme.transitions.create('stroke-dashoffset'),
  },
  /* Styles applied to the `circle` svg path if `variant="indeterminate"`. */
  circleIndeterminate: {
    animation: '$circular-dash 1.4s ease-in-out infinite',
    // Some default value that looks fine waiting for the animation to kicks in.
    strokeDasharray: '80px, 200px',
    strokeDashoffset: '0px', // Add the unit to fix a Edge 16 and below bug.
  },
  '@keyframes circular-rotate': {
    '0%': {
      // Fix IE 11 wobbly
      transformOrigin: '50% 50%',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  '@keyframes circular-dash': {
    '0%': {
      strokeDasharray: '1px, 200px',
      strokeDashoffset: '0px',
    },
    '50%': {
      strokeDasharray: '100px, 200px',
      strokeDashoffset: '-15px',
    },
    '100%': {
      strokeDasharray: '100px, 200px',
      strokeDashoffset: '-125px',
    },
  },
  /* Styles applied to the `circle` svg path if `disableShrink={true}`. */
  circleDisableShrink: {
    animation: 'none',
  },
});

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const CircularProgress = React.forwardRef(function CircularProgress(props, ref) {
  const {
    classes,
    className,
    color = 'primary',
    disableShrink = false,
    size = 40,
    style,
    thickness = 3.6,
    value = 0,
    variant = 'indeterminate',
    ...other
  } = props;

  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};

  if (variant === 'determinate') {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);
    circleStyle.strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(3)}px`;
    rootStyle.transform = 'rotate(-90deg)';
  }

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'inherit',
          [classes.determinate]: variant === 'determinate',
          [classes.indeterminate]: variant === 'indeterminate',
        },
        className,
      )}
      style={{ width: size, height: size, ...rootStyle, ...style }}
      ref={ref}
      role="progressbar"
      {...rootProps}
      {...other}
    >
      <svg className={classes.svg} viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}>
        <circle
          className={clsx(classes.circle, {
            [classes.circleDeterminate]: variant === 'determinate',
            [classes.circleIndeterminate]: variant === 'indeterminate',
            [classes.circleDisableShrink]: disableShrink,
          })}
          style={circleStyle}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          strokeWidth={thickness}
        />
      </svg>
    </div>
  );
});

CircularProgress.propTypes = {
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
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary']),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   */
  disableShrink: chainPropTypes(PropTypes.bool, (props) => {
    if (props.disableShrink && props.variant && props.variant !== 'indeterminate') {
      return new Error(
        'Material-UI: You have provided the `disableShrink` prop ' +
          'with a variant other than `indeterminate`. This will have no effect.',
      );
    }

    return null;
  }),
  /**
   * The size of the circle.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, e.g '3rem'.
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The thickness of the circle.
   */
  thickness: PropTypes.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate']),
};

export default withStyles(styles, { name: 'MuiCircularProgress', flip: false })(CircularProgress);
