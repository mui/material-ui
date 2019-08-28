import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

const RADIUS_STANDARD = 10;
const RADIUS_DOT = 3;

const OFFSET_OVERLAP_RECTANGLE = 0;
const OFFSET_OVERLAP_CIRCLE = 4;
const OFFSET_OVERLAP_NONE = -4;

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
    boxSizing: 'border-box',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(12),
    minWidth: RADIUS_STANDARD * 2,
    padding: '0 4px',
    height: RADIUS_STANDARD * 2,
    borderRadius: RADIUS_STANDARD,
    backgroundColor: theme.palette.color,
    color: theme.palette.textColor,
    zIndex: 1, // Render the badge on top of potential ripples.
    transform: 'scale(1)',
    transformOrigin: 'center',
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
    transform: 'scale(0)',
  },
  /* Styles applied to the root element if `variant="dot"`. */
  dot: {
    height: RADIUS_DOT * 2,
    minWidth: RADIUS_DOT * 2,
    padding: 0,
  },
  dotOverlapRectangle: {
    margin: RADIUS_STANDARD - RADIUS_DOT + OFFSET_OVERLAP_RECTANGLE / 2,
  },
  dotOverlapCircle: {
    margin: RADIUS_STANDARD - RADIUS_DOT + OFFSET_OVERLAP_CIRCLE / 2,
  },
  dotOverlapNone: {
    margin: RADIUS_STANDARD - RADIUS_DOT + OFFSET_OVERLAP_NONE / 2,
  },
  badgeHorizontalAlignmentLeftOverlapRectangle: {
    left: -RADIUS_STANDARD + OFFSET_OVERLAP_RECTANGLE,
  },
  badgeHorizontalAlignmentRightOverlapRectangle: {
    right: -RADIUS_STANDARD + OFFSET_OVERLAP_RECTANGLE,
  },
  badgeVerticalAlignmentTopOverlapRectangle: {
    top: -RADIUS_STANDARD + OFFSET_OVERLAP_RECTANGLE,
  },
  badgeVerticalAlignmentBottomOverlapRectangle: {
    bottom: -RADIUS_STANDARD + OFFSET_OVERLAP_RECTANGLE,
  },
  badgeHorizontalAlignmentLeftOverlapCircle: {
    left: -RADIUS_STANDARD + OFFSET_OVERLAP_CIRCLE,
  },
  badgeHorizontalAlignmentRightOverlapCircle: {
    right: -RADIUS_STANDARD + OFFSET_OVERLAP_CIRCLE,
  },
  badgeVerticalAlignmentTopOverlapCircle: {
    top: -RADIUS_STANDARD + OFFSET_OVERLAP_CIRCLE,
  },
  badgeVerticalAlignmentBottomOverlapCircle: {
    bottom: -RADIUS_STANDARD + OFFSET_OVERLAP_CIRCLE,
  },
  badgeHorizontalAlignmentLeftOverlapNone: {
    left: -RADIUS_STANDARD + OFFSET_OVERLAP_NONE,
  },
  badgeHorizontalAlignmentRightOverlapNone: {
    right: -RADIUS_STANDARD + OFFSET_OVERLAP_NONE,
  },
  badgeVerticalAlignmentTopOverlapNone: {
    top: -RADIUS_STANDARD + OFFSET_OVERLAP_NONE,
  },
  badgeVerticalAlignmentBottomOverlapNone: {
    bottom: -RADIUS_STANDARD + OFFSET_OVERLAP_NONE,
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
    horizontalAlignment = 'right',
    invisible: invisibleProp,
    max = 99,
    overlap = 'rectangle',
    showZero = false,
    variant = 'standard',
    verticalAlignment = 'top',
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
          [classes[`dotOverlap${capitalize(overlap)}`]]: variant === 'dot',
          [classes[
            `badgeHorizontalAlignment${capitalize(horizontalAlignment)}Overlap${capitalize(
              overlap,
            )}`
          ]]: true,
          [classes[
            `badgeVerticalAlignment${capitalize(verticalAlignment)}Overlap${capitalize(overlap)}`
          ]]: true,
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
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The badge's horizontal alignment.
   */
  horizontalAlignment: PropTypes.oneOf(['left', 'right']),
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
  overlap: PropTypes.oneOf(['circle', 'rectangle', 'none']),
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   */
  showZero: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['dot', 'standard']),
  /**
   * The badge's vertical alignment.
   */
  verticalAlignment: PropTypes.oneOf(['bottom', 'top']),
};

export default withStyles(styles, { name: 'MuiBadge' })(Badge);
