import * as React from 'react';
import { StyledComponent, PropTypes } from '..';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  badgeContent: React.ReactNode;
  children: React.ReactNode;
  color?: PropTypes.Color;
}

export default class Badge extends StyledComponent<BadgeProps> {}
