import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase/ButtonBase';
import { TabIndicatorProps } from './TabIndicator';

export interface TabsProps<C = {}>
  extends StandardProps<ButtonBaseProps<C>, TabsClassKey, 'onChange' | 'action'> {
  action?: (actions: TabsActions) => void;
  centered?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  indicatorColor?: 'secondary' | 'primary' | string;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  scrollable?: boolean;
  ScrollButtonComponent?: React.ReactType;
  scrollButtons?: 'auto' | 'on' | 'off';
  TabIndicatorProps?: Partial<TabIndicatorProps>;
  textColor?: 'secondary' | 'primary' | 'inherit' | string;
  value: any;
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

declare class Tabs<C> extends React.Component<C & TabsProps<C>> {}

export default Tabs;
