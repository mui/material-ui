import * as React from 'react';
import { StyledComponent } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface TabProps extends ButtonBaseProps {
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  value?: any;
  label?: React.ReactNode;
  onChange?: (
    event: React.ChangeEvent<{ checked: boolean }>,
    value: any
  ) => void;
  onClick?: React.EventHandler<any>;
  selected?: boolean;
  style?: object;
  textColor?: string | 'accent' | 'primary' | 'inherit';
}

export default class Tab extends StyledComponent<TabProps> {}
