import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface CheckboxProps
  extends StandardProps<SwitchBaseProps, CheckboxClassKey, 'checkedIcon' | 'color' | 'icon'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
}

export type CheckboxClassKey = SwitchBaseClassKey | 'colorPrimary' | 'colorSecondary';

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
