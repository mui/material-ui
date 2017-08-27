import * as React from 'react';
import { StyledComponent } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface RadioProps extends SwitchBaseProps {
  checked?: boolean | string;
  checkedClassName?: string;
  checkedIcon?: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  disabledClassName?: string;
  disableRipple?: boolean;
  icon?: React.ReactNode;
  inputProps?: Object;
  inputRef?: React.Ref<any>;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
  tabIndex?: string;
  value?: string;
}

export default class Radio extends StyledComponent<RadioProps> {}
