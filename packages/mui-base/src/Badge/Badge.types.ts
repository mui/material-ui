import * as React from 'react';
import { OverrideProps, Simplify } from '@mui/types';
import { SlotComponentProps } from '../utils';

export interface BadgeRootSlotPropsOverrides {}
export interface BadgeBadgeSlotPropsOverrides {}

export type BadgeOwnerState = Simplify<
  BadgeOwnProps & {
    badgeContent: React.ReactNode;
    invisible: boolean;
    max: number;
    showZero: boolean;
  }
>;

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

export interface BadgeTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'span',
> {
  props: BadgeOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type BadgeProps<
  RootComponentType extends React.ElementType = BadgeTypeMap['defaultComponent'],
> = OverrideProps<BadgeTypeMap<{}, RootComponentType>, RootComponentType>;

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
