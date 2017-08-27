import * as React from 'react';
import { StyledComponent } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface SwitchProps extends SwitchBaseProps {
  checked?: boolean | string;
  checkedClassName?: string;
  checkedIcon?: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  disabledClassName?: string;
  disableRipple?: boolean;
  icon?: React.ReactNode;
  inputProps?: object;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
  tabIndex?: string;
  value?: string;
}

export default class Switch extends StyledComponent<SwitchProps> {}
