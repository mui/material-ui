import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase/ButtonBase';

export interface TabsProps extends StandardProps<
  ButtonBaseProps,
  TabsClassKey,
  'onChange'
> {
  buttonClassName?: string;
  centered?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  indicatorClassName?: string;
  indicatorColor?: 'accent' | 'primary' | string;
  onChange: (event: React.ChangeEvent<{}>, value: any) => void;
  scrollable?: boolean;
  scrollButtons?: 'auto' | 'on' | 'off';
  TabScrollButton?: React.ReactType,
  textColor?: 'accent' | 'primary' | 'inherit' | string;
  value: any;
  width?: string;
}

export type TabsClassKey =
  | ButtonBaseClassKey
  | 'flexContainer'
  | 'scrollingContainer'
  | 'fixed'
  | 'scrollable'
  | 'centered'
  ;

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
