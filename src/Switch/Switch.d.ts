import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface SwitchProps extends StandardProps<SwitchBaseProps, SwitchClassKey, 'color'> {
  color?: 'primary' | 'secondary' | 'default';
}

export type SwitchClassKey =
  | SwitchBaseClassKey
  | 'bar'
  | 'icon'
  | 'iconChecked'
  | 'checkedPrimary'
  | 'checkedSecondary';

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
