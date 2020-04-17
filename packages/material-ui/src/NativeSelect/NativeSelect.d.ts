import * as React from 'react';
import { StandardProps } from '..';
import { InputProps } from '../Input';
import { NativeSelectInputProps } from './NativeSelectInput';

export interface NativeSelectProps
  extends StandardProps<InputProps, NativeSelectClassKey, 'inputProps' | 'value' | 'onChange'> {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children?: React.ReactNode;
  /**
   * The icon that displays the arrow.
   */
  IconComponent?: React.ElementType;
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input?: React.ReactElement<any, any>;
  /**
   * Attributes applied to the `select` element.
   */
  inputProps?: NativeSelectInputProps;
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * @document
   */
  onChange?: NativeSelectInputProps['onChange'];
  /**
   * The input value. The DOM API casts this to a string.
   * @document
   */
  value?: unknown;
  /**
   * The variant to use.
   */
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
 * Demos:
 *
 * - [Selects](https://material-ui.com/components/selects/)
 *
 * API:
 *
 * - [NativeSelect API](https://material-ui.com/api/native-select/)
 * - inherits [Input API](https://material-ui.com/api/input/)
 */
export default function NativeSelect(props: NativeSelectProps): JSX.Element;
