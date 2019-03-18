import * as React from 'react';
import ButtonBase from '../ButtonBase/ButtonBase';
import { TabIndicatorProps } from './TabIndicator';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const Tabs: OverridableComponent<{
  props: {
    action?: (actions: TabsActions) => void;
    centered?: boolean;
    children?: React.ReactNode;
    indicatorColor?: 'secondary' | 'primary' | string;
    onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
    ScrollButtonComponent?: React.ElementType;
    scrollButtons?: 'auto' | 'on' | 'off';
    TabIndicatorProps?: Partial<TabIndicatorProps>;
    textColor?: 'secondary' | 'primary' | 'inherit' | string;
    value: any;
    variant?: 'standard' | 'scrollable' | 'fullWidth';
    width?: string;
  };
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

export type TabsProps = SimplifiedPropsOf<typeof Tabs>;

export default Tabs;
