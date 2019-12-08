import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface AvatarGroupProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AvatarGroupClassKey> {
  /**
   * The avatars to stack.
   */
  children: React.ReactNode;
}

export type AvatarGroupClassKey = 'root' | 'avatar';

export default function AvatarGroup(props: AvatarGroupProps): JSX.Element | null;
