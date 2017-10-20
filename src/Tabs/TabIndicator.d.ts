import * as React from 'react';
import { StandardProps } from '..';

export interface TabIndicatorProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  TabIndicatorClassKey
> {
  color: 'accent' | 'primary' | string;
  style: { left: number; width: number };
}

export type TabIndicatorClassKey =
  | 'root'
  | 'colorAccent'
  | 'colorPrimary'
  ;

declare const TabIndicator: React.ComponentType<TabIndicatorProps>;

export default TabIndicator;
