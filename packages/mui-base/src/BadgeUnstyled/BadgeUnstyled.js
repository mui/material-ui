import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '../composeClasses';
import appendOwnerState from '../utils/appendOwnerState';
import useBadge from './useBadge';
import { getBadgeUnstyledUtilityClass } from './badgeUnstyledClasses';

const useUtilityClasses = (ownerState) => {
  const { invisible } = ownerState;

  const slots = {
    root: ['root'],
    badge: ['badge', invisible && 'invisible'],
  };

  return composeClasses(slots, getBadgeUnstyledUtilityClass, undefined);
};

const BadgeUnstyled = React.forwardRef(function BadgeUnstyled(props, ref) {
  const {
    badgeContent: badgeContentProp,
    component,
    children,
    className,
    components = {},
    componentsProps = {},
    invisible: invisibleProp,
    max: maxProp = 99,
    showZero = false,
    ...other
  } = props;

  const { badgeContent, max, displayValue, invisible } = useBadge({
    ...props,
    max: maxProp,
  });

  const ownerState = {
    ...props,
    badgeContent,
    invisible,
    max,
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
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node,
  /**
   * The badge will be added relative to this node.
   */
  children: PropTypes.node,
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
};

export default BadgeUnstyled;
