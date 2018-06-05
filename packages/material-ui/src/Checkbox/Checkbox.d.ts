import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface CheckboxProps<C>
  extends StandardProps<SwitchBaseProps<C>, CheckboxClassKey, 'checkedIcon' | 'color' | 'icon'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
}

export type CheckboxClassKey = SwitchBaseClassKey | 'colorPrimary' | 'colorSecondary';

declare class Checkbox<C> extends React.Component<C & CheckboxProps<C>> {}

export default Checkbox;
