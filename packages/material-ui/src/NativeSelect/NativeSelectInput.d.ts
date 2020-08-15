import * as React from 'react';
import { NativeSelectProps } from './NativeSelect';

export interface NativeSelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  disabled?: boolean;
  IconComponent?: React.ElementType;
  inputRef?: React.Ref<HTMLSelectElement>;
  variant?: NativeSelectProps['variant'];
}

declare const NativeSelectInput: React.ComponentType<NativeSelectInputProps>;

export default NativeSelectInput;
