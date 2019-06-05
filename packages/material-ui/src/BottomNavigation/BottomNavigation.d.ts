import * as React from 'react';
import { StandardProps } from '..';

export interface BottomNavigationProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    BottomNavigationClassKey,
    'onChange'
  > {
  children: React.ReactNode;
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  showLabels?: boolean;
  value?: any;
}

export type BottomNavigationClassKey = 'root';

declare const BottomNavigation: React.ComponentType<BottomNavigationProps>;

export default BottomNavigation;
