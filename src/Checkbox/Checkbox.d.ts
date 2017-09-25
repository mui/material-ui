import * as React from 'react';
import { StyledComponent } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface CheckboxProps extends SwitchBaseProps {}

declare const Checkbox: StyledComponent<CheckboxProps>;

export default Checkbox;
