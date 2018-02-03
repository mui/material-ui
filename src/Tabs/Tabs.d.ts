import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase/ButtonBase';

export interface TabsProps extends StandardProps<ButtonBaseProps, TabsClassKey, 'onChange'> {
  action?: (actions: TabsActions) => void;
  buttonClassName?: string;
  centered?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  indicatorClassName?: string;
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
  | 'scrollingContainer'
  | 'fixed'
  | 'scrollable'
  | 'centered';

export interface TabsActions {
  updateIndicator(): void;
}

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
