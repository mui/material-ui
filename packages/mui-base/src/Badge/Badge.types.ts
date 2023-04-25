import * as React from 'react';
import { OverrideProps, OverridableTypeMap, OverridableComponent } from '@mui/types';
import { SlotComponentProps } from '../utils';

export interface BadgeRootSlotPropsOverrides {}
export interface BadgeBadgeSlotPropsOverrides {}

export type BadgeOwnerState = BadgeProps & {
  badgeContent: React.ReactNode;
  invisible: boolean;
  max: number;
  showZero: boolean;
};

export interface BadgeOwnProps {
  /**
   * The content rendered within the badge.
   */
  badgeContent?: React.ReactNode;
  /**
   * The badge will be added relative to this node.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible?: boolean;
  /**
   * Max count to show.
   * @default 99
   */
  max?: number;
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'span', BadgeRootSlotPropsOverrides, BadgeOwnerState>;
    badge?: SlotComponentProps<'span', BadgeBadgeSlotPropsOverrides, BadgeOwnerState>;
  };
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: BadgeSlots;
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero?: boolean;
}

export interface BadgeSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType;
  /**
   * The component that renders the badge.
   * @default 'span'
   */
  badge?: React.ElementType;
}

export interface BadgeTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & BadgeOwnProps;
  defaultComponent: D;
}

/**
 * Utility to create component types that inherit props from Badge.
 */
export interface ExtendBadgeTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & BadgeTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type ExtendBadge<M extends OverridableTypeMap> = OverridableComponent<ExtendBadgeTypeMap<M>>;

export type BadgeProps<D extends React.ElementType = BadgeTypeMap['defaultComponent']> =
  OverrideProps<BadgeTypeMap<{}, D>, D> & {
    component?: D;
  };

export type BadgeRootSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: BadgeOwnerState;
  ref: React.Ref<HTMLSpanElement>;
};

export type BadgeBadgeSlotProps = {
  className?: string;
  children?: React.ReactNode;
  ownerState: BadgeOwnerState;
};
