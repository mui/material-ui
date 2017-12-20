import * as React from 'react';
import { Color, StandardProps } from '../MuiProps';

export interface BadgeProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, BadgeClassKey> {
  badgeContent: React.ReactNode;
  children: React.ReactNode;
  color?: Color;
}

export type BadgeClassKey = 'root' | 'badge' | 'colorPrimary' | 'colorAccent';

declare const Badge: React.ComponentType<BadgeProps>;

export default Badge;
