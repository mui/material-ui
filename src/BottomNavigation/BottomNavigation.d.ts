import * as React from 'react';
import { StyledComponent } from '..';

export type BottomNavigationProps = {
  children: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  showLabels?: boolean;
  value?: any;
} & React.HTMLAttributes<HTMLDivElement>;

export default class BottomNavigation extends StyledComponent<
  BottomNavigationProps
> {}
