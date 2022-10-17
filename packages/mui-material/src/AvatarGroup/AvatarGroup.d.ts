import * as React from 'react';
import { InternalStandardProps as StandardProps, Theme } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { AvatarGroupClasses } from './avatarGroupClasses';
import Avatar from '../Avatar';

export interface AvatarGroupPropsVariantOverrides {}

export interface AvatarGroupComponentsPropsOverrides {}
export interface AvatarGroupProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
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
   * The props used for each slot inside the AvatarGroup.
   * @default {}
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

/**
 *
 * Demos:
 *
 * - [Avatar](https://mui.com/material-ui/react-avatar/)
 *
 * API:
 *
 * - [AvatarGroup API](https://mui.com/material-ui/api/avatar-group/)
 */
export default function AvatarGroup(props: AvatarGroupProps): JSX.Element;
