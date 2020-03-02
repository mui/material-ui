import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface AvatarGroupProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AvatarGroupClassKey> {
  /**
   * The avatars to stack.
   */
  children: React.ReactNode;
  /**
   * Spacing between avatars.
   */
  spacing?: 'small' | 'medium' | number;
}

export type AvatarGroupClassKey = 'root' | 'avatar';

export default function AvatarGroup(props: AvatarGroupProps): JSX.Element;
