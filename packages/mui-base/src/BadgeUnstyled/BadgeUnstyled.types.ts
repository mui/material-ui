import * as React from 'react';
import { OverrideProps, OverridableTypeMap, OverridableComponent } from '@mui/types';
import { SlotComponentProps } from '../utils';

export interface BadgeUnstyledRootSlotOverrides {}
export interface BadgeUnstyledBadgeSlotOverrides {}

export type BadgeUnstyledOwnerState = BadgeUnstyledProps & {
  badgeContent: React.ReactNode;
  invisible: boolean;
  max: number;
  showZero: boolean;
};

export interface BadgeUnstyledOwnProps {
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
    root?: SlotComponentProps<'span', BadgeUnstyledRootSlotOverrides, BadgeUnstyledOwnerState>;
    badge?: SlotComponentProps<'span', BadgeUnstyledBadgeSlotOverrides, BadgeUnstyledOwnerState>;
  };
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
    badge?: React.ElementType;
  };
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero?: boolean;
}

export interface BadgeUnstyledTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & BadgeUnstyledOwnProps;
  defaultComponent: D;
}

/**
 * Utility to create component types that inherit props from BadgeUnstyled.
 */
export interface ExtendBadgeUnstyledTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & BadgeUnstyledTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type ExtendBadgeUnstyled<M extends OverridableTypeMap> = OverridableComponent<
  ExtendBadgeUnstyledTypeMap<M>
>;

export type BadgeUnstyledProps<
  D extends React.ElementType = BadgeUnstyledTypeMap['defaultComponent'],
> = OverrideProps<BadgeUnstyledTypeMap<{}, D>, D> & {
  component?: D;
};

export type BadgeUnstyledRootSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: BadgeUnstyledOwnerState;
  ref: React.Ref<HTMLSpanElement>;
};

export type BadgeUnstyledBadgeSlotProps = {
  className?: string;
  children?: React.ReactNode;
  ownerState: BadgeUnstyledOwnerState;
};
