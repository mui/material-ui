import * as React from 'react';
import { StyledComponent, PropTypes } from '..';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
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

declare const Badge: StyledComponent<BadgeProps, BadgeClassKey>;

export default Badge;
