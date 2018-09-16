import * as React from 'react';

export interface NativeSelectInputProps {
  disabled?: boolean;
  IconComponent?: React.ReactType;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: NativeSelectInputProps['value'] },
  ) => void;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => void;
  value?: string | number | boolean;
  variant?: 'standard' | 'outlined' | 'filled';
}

declare const NativeSelectInput: React.ComponentType<NativeSelectInputProps>;

export default NativeSelectInput;
