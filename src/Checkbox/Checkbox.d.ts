import * as React from 'react';
import { StyledComponent } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface CheckboxProps extends SwitchBaseProps {}

export type CheckboxClassKey =
  | 'default'
  | 'checked'
  | 'disabled'
  ;

declare const Checkbox: StyledComponent<CheckboxProps, CheckboxClassKey>;

export default Checkbox;
