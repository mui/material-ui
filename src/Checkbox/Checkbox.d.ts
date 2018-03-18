import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface CheckboxProps extends StandardProps<SwitchBaseProps, CheckboxClassKey, 'color'> {
  color?: 'primary' | 'secondary' | 'default';
}

export type CheckboxClassKey = SwitchBaseClassKey;

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
