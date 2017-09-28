import * as React from 'react';
import { StyledComponent, Omit } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export type TabsProps = {
  buttonClassName?: string;
  centered?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  value: any;
  indicatorClassName?: string;
  indicatorColor?: 'accent' | 'primary' | string;
  onChange: (event: React.ChangeEvent<{}>, value: any) => void;
  scrollable?: boolean;
  scrollButtons?: 'auto' | 'on' | 'off';
  textColor?: 'accent' | 'primary' | 'inherit' | string;
  width?: string;
} & Partial<Omit<ButtonBaseProps, 'onChange'>>;

export type TabsClassKey =
  | 'root'
  | 'flexContainer'
  | 'scrollingContainer'
  | 'fixed'
  | 'scrollable'
  | 'centered'
  ;

declare const Tabs: StyledComponent<TabsProps, TabsClassKey>;

export default Tabs;
