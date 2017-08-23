import * as React from 'react';
import { StyledComponent } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface TabsProps extends ButtonBaseProps {
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
}

export default class Tabs extends StyledComponent<TabsProps> {}
