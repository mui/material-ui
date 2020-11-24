import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';

const RADIUS_STANDARD = 10;
const RADIUS_DOT = 4;

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    position: 'relative',
    display: 'inline-flex',
    // For correct alignment with the text.
    verticalAlign: 'middle',
    flexShrink: 0,
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
    boxSizing: 'border-box',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(12),
    minWidth: RADIUS_STANDARD * 2,
    lineHeight: 1,
    padding: '0 6px',
    height: RADIUS_STANDARD * 2,
    borderRadius: RADIUS_STANDARD,
    zIndex: 1, // Render the badge on top of potential ripples.
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
  /* Styles applied to the root element if `variant="dot"`. */
  dot: {
    borderRadius: RADIUS_DOT,
    height: RADIUS_DOT * 2,
    minWidth: RADIUS_DOT * 2,
    padding: 0,
  },
  /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangle"`. */
  anchorOriginTopRightRectangle: {
    top: 0,
    right: 0,
    transform: 'scale(1) translate(50%, -50%)',
    transformOrigin: '100% 0%',
    '&$invisible': {
      transform: 'scale(0) translate(50%, -50%)',
    },
  },
  /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangle"`. */
  anchorOriginBottomRightRectangle: {
    bottom: 0,
    right: 0,
    transform: 'scale(1) translate(50%, 50%)',
    transformOrigin: '100% 100%',
    '&$invisible': {
      transform: 'scale(0) translate(50%, 50%)',
    },
  },
  /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangle"`. */
  anchorOriginTopLeftRectangle: {
    top: 0,
    left: 0,
    transform: 'scale(1) translate(-50%, -50%)',
    transformOrigin: '0% 0%',
    '&$invisible': {
      transform: 'scale(0) translate(-50%, -50%)',
    },
  },
  /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangle"`. */
  anchorOriginBottomLeftRectangle: {
    bottom: 0,
    left: 0,
    transform: 'scale(1) translate(-50%, 50%)',
    transformOrigin: '0% 100%',
    '&$invisible': {
      transform: 'scale(0) translate(-50%, 50%)',
    },
  },
  /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="circle"`. */
  anchorOriginTopRightCircle: {
    top: '14%',
    right: '14%',
    transform: 'scale(1) translate(50%, -50%)',
    transformOrigin: '100% 0%',
    '&$invisible': {
      transform: 'scale(0) translate(50%, -50%)',
    },
  },
  /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circle"`. */
  anchorOriginBottomRightCircle: {
    bottom: '14%',
    right: '14%',
    transform: 'scale(1) translate(50%, 50%)',
    transformOrigin: '100% 100%',
    '&$invisible': {
      transform: 'scale(0) translate(50%, 50%)',
    },
  },
  /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="circle"`. */
  anchorOriginTopLeftCircle: {
    top: '14%',
    left: '14%',
    transform: 'scale(1) translate(-50%, -50%)',
    transformOrigin: '0% 0%',
    '&$invisible': {
      transform: 'scale(0) translate(-50%, -50%)',
    },
  },
  /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circle"`. */
  anchorOriginBottomLeftCircle: {
    bottom: '14%',
    left: '14%',
    transform: 'scale(1) translate(-50%, 50%)',
    transformOrigin: '0% 100%',
    '&$invisible': {
      transform: 'scale(0) translate(-50%, 50%)',
    },
  },
  /* Pseudo-class to the badge `span` element if `invisible={true}`. */
  invisible: {
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

const Badge = React.forwardRef(function Badge(props, ref) {
  const {
    anchorOrigin = {
      vertical: 'top',
      horizontal: 'right',
    },
    badgeContent,
    children,
    classes,
    className,
    color = 'default',
    component: ComponentProp = 'span',
    invisible: invisibleProp,
    max = 99,
    overlap = 'rectangle',
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
        className={clsx(
          classes.badge,
          classes[`${anchorOrigin.horizontal}${capitalize(anchorOrigin.vertical)}}`],
          classes[
            `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(
              anchorOrigin.horizontal,
            )}${capitalize(overlap)}`
          ],
          {
            [classes[`color${capitalize(color)}`]]: color !== 'default',
            [classes.invisible]: invisible,
            [classes.dot]: variant === 'dot',
          },
        )}
      >
        {displayValue}
      </span>
    </ComponentProp>
  );
});

Badge.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The anchor of the badge.
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired,
  }),
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node,
  /**
   * The badge will be added relative to this node.
   */
  children: PropTypes.node,
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
  color: PropTypes.oneOf(['default', 'error', 'primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * If `true`, the badge will be invisible.
   */
  invisible: PropTypes.bool,
  /**
   * Max count to show.
   */
  max: PropTypes.number,
  /**
   * Wrapped shape the badge should overlap.
   */
  overlap: PropTypes.oneOf(['circle', 'rectangle']),
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   */
  showZero: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['dot', 'standard']),
};

export default withStyles(styles, { name: 'MuiBadge' })(Badge);
