import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

const RADIUS_STANDARD = 10;
const RADIUS_DOT = 3;

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
    margin: RADIUS_STANDARD - RADIUS_DOT,
    padding: 0,
  },
  horizontalAlignmentLeftOverlapRectangle: {
    left: -RADIUS_STANDARD,
  },
  horizontalAlignmentRightOverlapRectangle: {
    right: -RADIUS_STANDARD,
  },
  verticalAlignmentTopOverlapRectangle: {
    top: -RADIUS_STANDARD,
  },
  verticalAlignmentBottomOverlapRectangle: {
    bottom: -RADIUS_STANDARD,
  },
  horizontalAlignmentLeftOverlapCircle: {
    left: -RADIUS_STANDARD + 4,
  },
  horizontalAlignmentRightOverlapCircle: {
    right: -RADIUS_STANDARD + 4,
  },
  verticalAlignmentTopOverlapCircle: {
    top: -RADIUS_STANDARD + 4,
  },
  verticalAlignmentBottomOverlapCircle: {
    bottom: -RADIUS_STANDARD + 4,
  },
  horizontalAlignmentLeftOverlapNone: {
    left: -RADIUS_STANDARD - 6,
  },
  horizontalAlignmentRightOverlapNone: {
    right: -RADIUS_STANDARD - 6,
  },
  verticalAlignmentTopOverlapNone: {
    top: -RADIUS_STANDARD - 6,
  },
  verticalAlignmentBottomOverlapNone: {
    bottom: -RADIUS_STANDARD - 6,
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
          [classes[
            `horizontalAlignment${capitalize(horizontalAlignment)}Overlap${capitalize(overlap)}`
          ]]: true,
          [classes[
            `verticalAlignment${capitalize(verticalAlignment)}Overlap${capitalize(overlap)}`
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
