import * as React from 'react';
import { StandardProps } from '..';

export interface InputBaseProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    InputBaseClassKey,
    /*
     * `onChange`, `onKeyUp`, `onKeyDown`, `onBlur`, `onFocus` are applied to the inner `InputComponent`,
     * which by default is an input or textarea. Since these handlers differ from the
     * ones inherited by `React.HTMLAttributes<HTMLDivElement>` we need to omit them.
     */
    'children' | 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur' | 'onFocus' | 'defaultValue'
  > {
  'aria-describedby'?: string;
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete?: string;
  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus?: boolean;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary';
  /**
   * The default `input` element value. Use when the component is not controlled.
   */
  defaultValue?: unknown;
  /**
   * If `true`, the `input` element will be disabled.
   */
  disabled?: boolean;
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: React.ReactNode;
  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error?: boolean;
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   */
  inputComponent?: React.ElementType<InputBaseComponentProps>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: InputBaseComponentProps;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense' | 'none';
  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline?: boolean;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * Callback fired when the input is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder?: string;
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly?: boolean;
  /**
   * If `true`, the `input` element will be required.
   */
  required?: boolean;
  renderSuffix?: (state: {
    disabled?: boolean;
    error?: boolean;
    filled?: boolean;
    focused?: boolean;
    margin?: 'dense' | 'none' | 'normal';
    required?: boolean;
    startAdornment?: React.ReactNode;
  }) => React.ReactNode;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number;
  /**
   * Maximum number of rows to display.
   * @deprecated Use `maxRows` instead.
   */
  rowsMax?: string | number;
  /**
   * Minimum number of rows to display.
   * @deprecated Use `minRows` instead.
   */
  rowsMin?: string | number;
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows?: string | number;
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows?: string | number;
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment?: React.ReactNode;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type?: string;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
}

export interface InputBaseComponentProps
  extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  // Accommodate arbitrary additional props coming from the `inputProps` prop
  [arbitrary: string]: any;
}

export type InputBaseClassKey =
  | 'root'
  | 'formControl'
  | 'focused'
  | 'disabled'
  | 'adornedEnd'
  | 'adornedStart'
  | 'error'
  | 'marginDense'
  | 'multiline'
  | 'fullWidth'
  | 'colorSecondary'
  | 'input'
  | 'inputMarginDense'
  | 'inputMultiline'
  | 'inputTypeSearch'
  | 'inputAdornedStart'
  | 'inputAdornedEnd'
  | 'inputHiddenLabel';

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [InputBase API](https://material-ui.com/api/input-base/)
 */
export default function InputBase(props: InputBaseProps): JSX.Element;
