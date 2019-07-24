import * as React from 'react';
import ButtonBase from '../ButtonBase/ButtonBase';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const Tabs: OverridableComponent<{
  props: {
    action?: (actions: TabsActions) => void;
    centered?: boolean;
    children?: React.ReactNode;
    indicatorColor?: 'secondary' | 'primary' | string;
    onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
    orientation?: 'horizontal' | 'vertical';
    ScrollButtonComponent?: React.ElementType;
    scrollButtons?: 'auto' | 'desktop' | 'on' | 'off';
    TabIndicatorProps?: Partial<React.HTMLAttributes<HTMLDivElement>>;
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
  | 'scrollButtonsDesktop'
  | 'indicator';

export interface TabsActions {
  updateIndicator(): void;
}

export type TabsProps = SimplifiedPropsOf<typeof Tabs>;

export default Tabs;
