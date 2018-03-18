import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface RadioProps extends StandardProps<SwitchBaseProps, RadioClassKey, 'color'> {
  color?: 'primary' | 'secondary' | 'default';
}

export type RadioClassKey = SwitchBaseClassKey;

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
