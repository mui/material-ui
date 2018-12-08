import * as React from 'react';
import { MuiComponent, PropsOf, StandardProps } from '..';
import ButtonBase from '../ButtonBase/ButtonBase';
import { TabIndicatorProps } from './TabIndicator';

declare const Tabs: MuiComponent<{
  outerProps: {
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
  },
  defaultComponent: typeof ButtonBase;
  classKey: TabsClassKey;
}>;

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

export type TabsProps = PropsOf<typeof Tabs>;

export default Tabs;
