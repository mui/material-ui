import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface BadgeProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, BadgeClassKey> {
  badgeContent: React.ReactNode;
  children: React.ReactNode;
  color?: PropTypes.Color;
  component?: React.ReactType<BadgeProps>;
}

export type BadgeClassKey = 'root' | 'badge' | 'colorPrimary' | 'colorSecondary';

declare const Badge: React.ComponentType<BadgeProps>;

export default Badge;
