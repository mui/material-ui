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
  | 'filled'
  | 'outlined'
  | 'selectMenu'
  | 'disabled'
  | 'icon'
  | 'iconFilled'
  | 'iconOutlined';

/**
 * An alternative to `<Select native />` with a much smaller bundle size footprint.
 *
 * Demos:
 * - {@link https://material-ui.com/components/selects/ Selects}
 *
 * API:
 * - {@link https://material-ui.com/api/NativeSelect NativeSelect API}
 * - inherits {@link https://material-ui.com/api/input/ Input API}
 */
declare const NativeSelect: React.ComponentType<NativeSelectProps>;

export default NativeSelect;
