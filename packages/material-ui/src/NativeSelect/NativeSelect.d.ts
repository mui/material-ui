import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { InputProps } from '../Input';
import { NativeSelectInputProps } from './NativeSelectInput';

export interface NativeSelectProps
  extends StandardProps<InputProps, 'inputProps' | 'value' | 'onChange'> {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    select?: string;
    filled?: string;
    outlined?: string;
    selectMenu?: string;
    disabled?: string;
    icon?: string;
    iconOpen?: string;
    iconFilled?: string;
    iconOutlined?: string;
    nativeInput?: string;
  };
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent?: React.ElementType;
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   * @default <Input />
   */
  input?: React.ReactElement<any, any>;
  /**
   * Attributes applied to the `select` element.
   */
  inputProps?: NativeSelectInputProps;
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: NativeSelectInputProps['onChange'];
  /**
   * The input value. The DOM API casts this to a string.
   */
  value?: unknown;
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined' | 'filled';
}

export type NativeSelectClassKey = keyof NonNullable<NativeSelectProps['classes']>;

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
