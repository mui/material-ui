import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import composeClasses from '../composeClasses';
import { useBadge } from '@mui/base/useBadge';
import { getBadgeUnstyledUtilityClass } from './badgeUnstyledClasses';
import {
  BadgeUnstyledProps,
  BadgeUnstyledOwnerState,
  BadgeUnstyledTypeMap,
  BadgeUnstyledRootSlotProps,
  BadgeUnstyledBadgeSlotProps,
} from './BadgeUnstyled.types';
import { WithOptionalOwnerState, useSlotProps } from '../utils';

const useUtilityClasses = (ownerState: BadgeUnstyledOwnerState) => {
  const { invisible } = ownerState;

  const slots = {
    root: ['root'],
    badge: ['badge', invisible && 'invisible'],
  };

  return composeClasses(slots, getBadgeUnstyledUtilityClass, undefined);
};
/**
 *
 * Demos:
 *
 * - [Unstyled badge](https://mui.com/base/react-badge/)
 *
 * API:
 *
 * - [BadgeUnstyled API](https://mui.com/base/api/badge-unstyled/)
 */
const BadgeUnstyled = React.forwardRef(function BadgeUnstyled(props: BadgeUnstyledProps, ref) {
  const {
    badgeContent: badgeContentProp,
    component,
    children,
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

  const ownerState: BadgeUnstyledOwnerState = {
    ...props,
    badgeContent,
    invisible,
    max,
    showZero,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = component || components.Root || 'span';
  const rootProps: WithOptionalOwnerState<BadgeUnstyledRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
    },
    ownerState,
    className: classes.root,
  });

  const Badge = components.Badge || 'span';
  const badgeProps: WithOptionalOwnerState<BadgeUnstyledBadgeSlotProps> = useSlotProps({
    elementType: Badge,
    externalSlotProps: componentsProps.badge,
    ownerState,
    className: classes.badge,
  });

  return (
    <Root {...rootProps}>
      {children}
      <Badge {...badgeProps}>{displayValue}</Badge>
    </Root>
  );
}) as OverridableComponent<BadgeUnstyledTypeMap>;

BadgeUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
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
    badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
} as any;

export default BadgeUnstyled;
