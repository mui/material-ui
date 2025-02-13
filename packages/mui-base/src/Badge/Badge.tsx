'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils/PolymorphicComponent';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useBadge } from '../useBadge';
import { getBadgeUtilityClass } from './badgeClasses';
import {
  BadgeProps,
  BadgeOwnerState,
  BadgeTypeMap,
  BadgeRootSlotProps,
  BadgeBadgeSlotProps,
} from './Badge.types';
import { WithOptionalOwnerState, useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const useUtilityClasses = (ownerState: BadgeOwnerState) => {
  const { invisible } = ownerState;

  const slots = {
    root: ['root'],
    badge: ['badge', invisible && 'invisible'],
  };

  return composeClasses(slots, useClassNamesOverride(getBadgeUtilityClass));
};
/**
 *
 * Demos:
 *
 * - [Badge](https://mui.com/base-ui/react-badge/)
 *
 * API:
 *
 * - [Badge API](https://mui.com/base-ui/react-badge/components-api/#badge)
 */
const Badge = React.forwardRef(function Badge<RootComponentType extends React.ElementType>(
  props: BadgeProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    badgeContent: badgeContentProp,
    children,
    invisible: invisibleProp,
    max: maxProp = 99,
    slotProps = {},
    slots = {},
    showZero = false,
    ...other
  } = props;

  const { badgeContent, max, displayValue, invisible } = useBadge({
    ...props,
    max: maxProp,
  });

  const ownerState: BadgeOwnerState = {
    ...props,
    badgeContent,
    invisible,
    max,
    showZero,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = slots.root ?? 'span';
  const rootProps: WithOptionalOwnerState<BadgeRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: classes.root,
  });

  const BadgeComponent = slots.badge ?? 'span';
  const badgeProps: WithOptionalOwnerState<BadgeBadgeSlotProps> = useSlotProps({
    elementType: BadgeComponent,
    externalSlotProps: slotProps.badge,
    ownerState,
    className: classes.badge,
  });

  return (
    <Root {...rootProps}>
      {children}
      <BadgeComponent {...badgeProps}>{displayValue}</BadgeComponent>
    </Root>
  );
}) as PolymorphicComponent<BadgeTypeMap>;

Badge.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node,
  /**
   * The badge will be added relative to this node.
   */
  children: PropTypes.node,
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
   * The props used for each slot inside the Badge.
   * @default {}
   */
  slotProps: PropTypes.shape({
    badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    badge: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
} as any;

export { Badge };
