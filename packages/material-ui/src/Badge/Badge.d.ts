import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface BadgeProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, BadgeClassKey> {
  badgeContent: React.ReactNode;
  children: React.ReactNode;
  color?: PropTypes.Color | 'error';
  component?: React.ReactType<BadgeProps>;
  invisible?: boolean;
}

export type BadgeClassKey = 'root' | 'badge' | 'colorPrimary' | 'colorSecondary' | 'invisible';

declare const Badge: React.ComponentType<BadgeProps>;

export default Badge;
