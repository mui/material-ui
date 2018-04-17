import * as React from 'react';
import { StandardProps } from '..';

export interface TabIndicatorProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TabIndicatorClassKey> {
  color: 'secondary' | 'primary' | string;
  style: { left: number; width: number };
}

export type TabIndicatorClassKey = 'root' | 'colorSecondary' | 'colorPrimary';

declare const TabIndicator: React.ComponentType<TabIndicatorProps>;

export default TabIndicator;
