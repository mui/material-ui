import * as React from 'react';
import {
  OverridableComponent,
  OverridableStringUnion,
  OverrideProps,
  PartiallyRequired,
} from '@mui/types';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';
import { AvatarGroupClasses } from './avatarGroupClasses';
import Avatar from '../Avatar';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface AvatarGroupPropsVariantOverrides {}

export interface AvatarGroupComponentsPropsOverrides {}

export interface AvatarGroupSlots {
  surplus?: React.ElementType;
}

export type AvatarGroupSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AvatarGroupSlots,
  {
    /**
     * @deprecated use `slotProps.surplus` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
     *  */
    additionalAvatar: React.ComponentPropsWithRef<typeof Avatar> &
      AvatarGroupComponentsPropsOverrides;
    surplus: SlotProps<
      React.ElementType<React.ComponentPropsWithRef<typeof Avatar>>,
      AvatarGroupComponentsPropsOverrides,
      AvatarGroupOwnerState
    >;
  }
>;
export interface AvatarGroupOwnProps extends AvatarGroupSlotsAndSlotProps {
  /**
   * The avatars to stack.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AvatarGroupClasses>;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  componentsProps?: {
    additionalAvatar?: React.ComponentPropsWithRef<typeof Avatar> &
      AvatarGroupComponentsPropsOverrides;
  };
  /**
   * Max avatars to show before +x.
   * @default 5
   */
  max?: number;
  /**
   * custom renderer of extraAvatars
   * @param {number} surplus number of extra avatars
   * @returns {React.ReactNode} custom element to display
   */
  renderSurplus?: (surplus: number) => React.ReactNode;
  /**
   * Spacing between avatars.
   * @default 'medium'
   */
  spacing?: 'small' | 'medium' | number;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The total number of avatars. Used for calculating the number of extra avatars.
   * @default children.length
   */
  total?: number;
  /**
   * The variant to use.
   * @default 'circular'
   */
  variant?: OverridableStringUnion<
    'circular' | 'rounded' | 'square',
    AvatarGroupPropsVariantOverrides
  >;
}

export interface AvatarGroupTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & AvatarGroupOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Avatar](https://next.mui.com/material-ui/react-avatar/)
 *
 * API:
 *
 * - [AvatarGroup API](https://next.mui.com/material-ui/api/avatar-group/)
 */
declare const AvatarGroup: OverridableComponent<AvatarGroupTypeMap>;

export type AvatarGroupProps<
  RootComponent extends React.ElementType = AvatarGroupTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<AvatarGroupTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface AvatarGroupOwnerState
  extends PartiallyRequired<AvatarGroupProps, 'max' | 'spacing' | 'component' | 'variant'> {}

export default AvatarGroup;
