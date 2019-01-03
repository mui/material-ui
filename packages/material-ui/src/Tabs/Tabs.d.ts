import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase/ButtonBase';
import { TabIndicatorProps } from './TabIndicator';

export interface TabsProps
  extends StandardProps<ButtonBaseProps, TabsClassKey, 'onChange' | 'action' | 'component'> {
  action?: (actions: TabsActions) => void;
  centered?: boolean;
  children?: React.ReactNode;
  component?: React.ReactType<TabsProps>;
  fullWidth?: boolean;
  indicatorColor?: 'secondary' | 'primary' | string;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  scrollable?: boolean;
  ScrollButtonComponent?: React.ReactType;
  scrollButtons?: 'auto' | 'on' | 'off';
  TabIndicatorProps?: Partial<TabIndicatorProps>;
  textColor?: 'secondary' | 'primary' | 'inherit' | string;
  value: any;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  width?: string;
}

export type TabsClassKey =
  | 'root'
  | 'flexContainer'
  | 'scroller'
  | 'fixed'
  | 'scrollable'
  | 'centered'
  | 'scrollButtons'
  | 'scrollButtonsAuto'
  | 'indicator';

export interface TabsActions {
  updateIndicator(): void;
}

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
