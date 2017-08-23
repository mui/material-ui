import * as React from 'react';
import { StyledComponent } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface CheckboxProps extends SwitchBaseProps {}

export default class Checkbox extends StyledComponent<CheckboxProps> {}
