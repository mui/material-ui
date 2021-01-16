import * as React from 'react';
import { InternalStandardProps as StandardProps, Theme } from '@material-ui/core';
import { OverridableStringUnion } from '@material-ui/types';
import { SxProps } from '@material-ui/system';

export interface AvatarGroupPropsVariantOverrides {}
export type AvatarGroupVariantDefaults = Record<'circular' | 'rounded' | 'square', true>;

export interface AvatarGroupProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The avatars to stack.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the avatar elements. */
    avatar?: string;
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
   * The variant to use.
   * @default 'circular'
   */
  variant?: OverridableStringUnion<AvatarGroupVariantDefaults, AvatarGroupPropsVariantOverrides>;
}

export type AvatarGroupClassKey = keyof NonNullable<AvatarGroupProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Avatars](https://material-ui.com/components/avatars/)
 *
 * API:
 *
 * - [AvatarGroup API](https://material-ui.com/api/avatar-group/)
 */
export default function AvatarGroup(props: AvatarGroupProps): JSX.Element;
