import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface SwitchProps extends StandardProps<SwitchBaseProps, SwitchClassKey> {}

export type SwitchClassKey = SwitchBaseClassKey | 'bar' | 'icon';

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
