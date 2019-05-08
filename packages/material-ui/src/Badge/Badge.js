import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

const RADIUS = 10;

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: 'relative',
    display: 'inline-flex',
    // For correct alignment with the text.
    verticalAlign: 'middle',
  },
  /* Styles applied to the badge `span` element. */
  badge: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    boxSizing: 'border-box',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(12),
    minWidth: RADIUS * 2,
    padding: '0 4px',
    height: RADIUS * 2,
    borderRadius: RADIUS,
    backgroundColor: theme.palette.color,
    color: theme.palette.textColor,
    zIndex: 1, // Render the badge on top of potential ripples.
    transform: 'scale(1) translate(50%, -50%)',
    transformOrigin: '100% 0%',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  /* Styles applied to the badge `span` element if `invisible={true}`. */
  invisible: {
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: 'scale(0) translate(50%, -50%)',
    transformOrigin: '100% 0%',
  },
  /* Styles applied to the root element if `variant="dot"`. */
  dot: {
    height: 6,
    minWidth: 6,
    padding: 0,
  },
});

const Badge = React.forwardRef(function Badge(props, ref) {
  const {
    badgeContent,
    children,
    classes,
    className,
    color = 'default',
    component: ComponentProp = 'span',
    invisible: invisibleProp,
    max = 99,
    showZero = false,
    variant = 'standard',
    ...other
  } = props;

  let invisible = invisibleProp;

  if (
    invisibleProp == null &&
    ((badgeContent === 0 && !showZero) || (badgeContent == null && variant !== 'dot'))
  ) {
    invisible = true;
  }

  let displayValue = '';

  if (variant !== 'dot') {
    displayValue = badgeContent > max ? `${max}+` : badgeContent;
  }

  return (
    <ComponentProp className={clsx(classes.root, className)} ref={ref} {...other}>
      {children}
      <span
        className={clsx(classes.badge, {
          [classes[`color${capitalize(color)}`]]: color !== 'default',
          [classes.invisible]: invisible,
          [classes.dot]: variant === 'dot',
        })}
      >
        {displayValue}
      </span>
    </ComponentProp>
  );
});

Badge.propTypes = {
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node,
  /**
   * The badge will be added relative to this node.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'error']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the badge will be invisible.
   */
  invisible: PropTypes.bool,
  /**
   * Max count to show.
   */
  max: PropTypes.number,
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   */
  showZero: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'dot']),
};

export default withStyles(styles, { name: 'MuiBadge' })(Badge);
