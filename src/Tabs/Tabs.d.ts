import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase/ButtonBase';

export interface TabsProps extends StandardProps<ButtonBaseProps, TabsClassKey, 'onChange'> {
  action?: (actions: TabsActions) => void;
  centered?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  indicatorColor?: 'secondary' | 'primary' | string;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  scrollable?: boolean;
  scrollButtons?: 'auto' | 'on' | 'off';
  TabScrollButton?: React.ReactType;
  textColor?: 'secondary' | 'primary' | 'inherit' | string;
  value: any;
  width?: string;
}

export type TabsClassKey =
  | ButtonBaseClassKey
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
