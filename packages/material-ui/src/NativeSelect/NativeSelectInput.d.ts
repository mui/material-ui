import * as React from 'react';

export interface NativeSelectInputProps<V = unknown> {
  disabled?: boolean;
  IconComponent?: React.ElementType;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: NativeSelectInputProps<V>['value'] },
  ) => void;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => void;
  value?: V;
  variant?: 'standard' | 'outlined' | 'filled';
}

export default function NativeSelectInput<V>(props: NativeSelectInputProps<V>): JSX.Element;
