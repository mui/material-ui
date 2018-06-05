import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface RadioProps<C = {}>
  extends StandardProps<SwitchBaseProps<C>, RadioClassKey, 'checkedIcon' | 'color' | 'icon'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
}

export type RadioClassKey = SwitchBaseClassKey | 'colorPrimary' | 'colorSecondary';

declare class Radio<C> extends React.Component<C & RadioProps<C>> {}

export default Radio;
