import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { InputProps } from '../Input';
import { NativeSelectInputProps } from './NativeSelectInput';
import { NativeSelectClasses } from './nativeSelectClasses';

export interface NativeSelectProps
  extends StandardProps<InputProps, 'inputProps' | 'value' | 'onChange'> {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes?: Partial<NativeSelectClasses>;
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent?: React.ElementType;
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   * @default <Input />
   */
  input?: React.ReactElement<unknown, any>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attributes) applied to the `select` element.
   */
  inputProps?: Partial<NativeSelectInputProps>;
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: NativeSelectInputProps['onChange'];
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The `input` value. The DOM API casts this to a string.
   */
  value?: unknown;
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined' | 'filled';
}

/**
 * An alternative to `<Select native />` with a much smaller bundle size footprint.
 *
 * Demos:
 *
 * - [Select](https://v6.mui.com/material-ui/react-select/)
 *
 * API:
 *
 * - [NativeSelect API](https://v6.mui.com/material-ui/api/native-select/)
 * - inherits [Input API](https://v6.mui.com/material-ui/api/input/)
 */
declare const NativeSelect: ((props: NativeSelectProps) => React.JSX.Element) & { muiName: string };

export default NativeSelect;
