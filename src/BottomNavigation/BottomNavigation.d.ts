import * as React from 'react';
import { StyledComponent } from '..';

export interface BottomNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onChange?: React.ReactEventHandler<any>;
  showLabels?: boolean;
  value?: any;
}

export default class BottomNavigation extends StyledComponent<
  BottomNavigationProps
> {}
