import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface RadioProps extends StandardProps<SwitchBaseProps, RadioClassKey> {}

export type RadioClassKey = SwitchBaseClassKey;

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
