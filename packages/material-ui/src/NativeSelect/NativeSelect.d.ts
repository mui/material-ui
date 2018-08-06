import * as React from 'react';
import { StandardProps } from '..';
import { InputProps } from '../Input';
import { MenuProps } from '../Menu';
import { NativeSelectInputProps } from './NativeSelectInput';

export interface NativeSelectProps
  extends StandardProps<InputProps, NativeSelectClassKey, 'value' | 'onChange'>,
    Pick<NativeSelectInputProps, 'onChange'> {
  IconComponent?: React.ReactType;
  input?: React.ReactNode;
  value?: string | number | boolean;
}

export type NativeSelectClassKey = 'root' | 'select' | 'selectMenu' | 'disabled' | 'icon';

declare const NativeSelect: React.ComponentType<NativeSelectProps>;

export default NativeSelect;
