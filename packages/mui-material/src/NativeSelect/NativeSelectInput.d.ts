import type * as React from 'react';
import type { SxProps } from '@mui/system';
import type { Theme } from '..';

export interface NativeSelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  disabled?: boolean;
  IconComponent: React.ElementType;
  inputRef?: React.Ref<HTMLSelectElement>;
  variant?: 'standard' | 'outlined' | 'filled';
  error?: boolean;
  sx?: SxProps<Theme>;
}

declare const NativeSelectInput: React.JSXElementConstructor<NativeSelectInputProps>;

export default NativeSelectInput;
