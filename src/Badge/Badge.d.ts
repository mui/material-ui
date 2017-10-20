import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface BadgeProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  BadgeClassKey
> {
  badgeContent: React.ReactNode;
  children: React.ReactNode;
  color?: PropTypes.Color;
}

export type BadgeClassKey =
  | 'root'
  | 'badge'
  | 'colorPrimary'
  | 'colorAccent'
  ;

declare const Badge: React.ComponentType<BadgeProps>;

export default Badge;
