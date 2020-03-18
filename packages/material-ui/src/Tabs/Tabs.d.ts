import * as React from 'react';
import ButtonBase from '../ButtonBase/ButtonBase';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface TabsTypeMap<P = {}, D extends React.ElementType = typeof ButtonBase> {
  props: P & {
    action?: React.Ref<TabsActions>;
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
  defaultComponent: D;
  classKey: TabsClassKey;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [Tabs API](https://material-ui.com/api/tabs/)
 */
declare const Tabs: OverridableComponent<TabsTypeMap>;

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
  updateScrollButtons(): void;
}

export type TabsProps<
  D extends React.ElementType = TabsTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TabsTypeMap<P, D>, D>;

export default Tabs;
