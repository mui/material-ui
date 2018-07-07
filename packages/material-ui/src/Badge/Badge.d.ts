import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface BadgeProps<C = {}>
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, BadgeClassKey> {
  badgeContent: React.ReactNode;
  children: React.ReactNode;
  color?: PropTypes.Color | 'error';
  component?: React.ReactType<C>;
}

export type BadgeClassKey = 'root' | 'badge' | 'colorPrimary' | 'colorSecondary';

declare class Badge<C> extends React.Component<C & BadgeProps<C>> {}

export default Badge;
