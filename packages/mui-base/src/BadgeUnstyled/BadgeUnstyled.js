import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import composeClasses from '../composeClasses';
import appendOwnerState from '../utils/appendOwnerState';
import useBadge from './useBadge';
import { getBadgeUtilityClass } from './badgeUnstyledClasses';

const useUtilityClasses = (ownerState) => {
  const { variant, anchorOrigin, invisible, classes } = ownerState;

  const slots = {
    root: ['root'],
    badge: [
      'badge',
      variant,
      `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`,
      invisible && 'invisible',
    ],
  };

  return composeClasses(slots, getBadgeUtilityClass, classes);
};

const BadgeUnstyled = React.forwardRef(function BadgeUnstyled(props, ref) {
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: 'top',
      horizontal: 'right',
    },
    classes: classesProp,
    badgeContent: badgeContentProp,
    component,
    children,
    className,
    components = {},
    componentsProps = {},
    invisible: invisibleProp,
    max: maxProp = 99,
    showZero = false,
    variant: variantProp = 'standard',
    ...other
  } = props;

  const { anchorOrigin, badgeContent, max, variant, displayValue, invisible } = useBadge({
    ...props,
    anchorOrigin: anchorOriginProp,
    max: maxProp,
    variant: variantProp,
  });

  const ownerState = {
    ...props,
    anchorOrigin,
    badgeContent,
    classes: classesProp,
    invisible,
    max,
    variant,
    showZero,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = component || components.Root || 'span';
  const rootProps = appendOwnerState(Root, { ...other, ...componentsProps.root }, ownerState);

  const Badge = components.Badge || 'span';
  const badgeProps = appendOwnerState(Badge, componentsProps.badge, ownerState);

  return (
    <Root
      {...rootProps}
      ref={ref}
      {...other}
      className={clsx(classes.root, rootProps.className, className)}
    >
      {children}
      <Badge {...badgeProps} className={clsx(classes.badge, badgeProps.className)}>
        {displayValue}
      </Badge>
    </Root>
  );
});

BadgeUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
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
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Badge: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    badge: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible: PropTypes.bool,
  /**
   * Max count to show.
   * @default 99
   */
  max: PropTypes.number,
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: PropTypes.bool,
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes.string,
};

export default BadgeUnstyled;
