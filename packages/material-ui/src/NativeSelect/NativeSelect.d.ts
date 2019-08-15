import * as React from 'react';
import { StandardProps } from '..';
import { InputProps } from '../Input';
import { NativeSelectInputProps } from './NativeSelectInput';

export interface NativeSelectProps<V = unknown>
  extends StandardProps<InputProps<V>, NativeSelectClassKey, 'value' | 'onChange'>,
    Pick<NativeSelectInputProps<V>, 'onChange'> {
  IconComponent?: React.ElementType;
  input?: React.ReactNode;
  value?: V;
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

export default function NativeSelect<V>(props: NativeSelectProps<V>): JSX.Element;
