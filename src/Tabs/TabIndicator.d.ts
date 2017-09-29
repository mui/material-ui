import * as React from 'react';
import { StyledComponent } from '..';

export interface TabIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color: 'accent' | 'primary' | string;
  style: { left: number; width: number };
}

export type TabIndicatorClassKey =
  | 'root'
  | 'colorAccent'
  | 'colorPrimary'
  ;

declare const TabIndicator: StyledComponent<TabIndicatorProps, TabIndicatorClassKey>;

export default TabIndicator;
