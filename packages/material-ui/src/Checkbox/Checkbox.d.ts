import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface CheckboxProps
  extends StandardProps<SwitchBaseProps, CheckboxClassKey, 'checkedIcon' | 'color' | 'icon'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'default';
  icon?: React.ReactNode;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactNode;
}

export type CheckboxClassKey =
  | SwitchBaseClassKey
  | 'indeterminate'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorError';

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
