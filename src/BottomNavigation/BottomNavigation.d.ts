import * as React from 'react';
import { StyledComponent, Omit } from '..';

export type BottomNavigationProps = {
  children: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  showLabels?: boolean;
  value?: any;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

export type BottomNavigationClassKey =
  | 'root'
  ;

declare const BottomNavigation: StyledComponent<BottomNavigationProps, BottomNavigationClassKey>;

export default BottomNavigation;
