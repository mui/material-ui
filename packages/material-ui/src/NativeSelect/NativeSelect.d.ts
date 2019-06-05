import * as React from 'react';
import { StandardProps } from '..';
import { InputProps } from '../Input';
import { NativeSelectInputProps } from './NativeSelectInput';

export interface NativeSelectProps
  extends StandardProps<InputProps, NativeSelectClassKey, 'value' | 'onChange'>,
    Pick<NativeSelectInputProps, 'onChange'> {
  IconComponent?: React.ElementType;
  input?: React.ReactNode;
  value?: unknown;
  variant?: 'standard' | 'outlined' | 'filled';
}

export type NativeSelectClassKey =
  | 'root'
  | 'select'
  | 'selectMenu'
  | 'disabled'
  | 'icon'
  | 'filled'
  | 'outlined';

declare const NativeSelect: React.ComponentType<NativeSelectProps>;

export default NativeSelect;
