import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableStringUnion } from '@material-ui/types';
import { InternalStandardProps as StandardProps } from '..';
import { FormControlProps } from '../FormControl';
import { SelectInputProps } from '../Select/SelectInput';
import { FormHelperTextProps } from '../FormHelperText';
import { InputBaseProps } from '../InputBase';
import { InputProps as StandardInputProps } from '../Input';
import { FilledInputProps } from '../FilledInput';
import { OutlinedInputProps } from '../OutlinedInput';
import { InputLabelProps } from '../InputLabel';
import { SelectProps } from '../Select';
import { Theme } from '../styles';

export interface SelectFieldPropsColorOverrides {}
export interface SelectFieldPropsSizeOverrides {}

export interface BaseSelectFieldProps<T>
  extends StandardProps<
      FormControlProps,
      // event handlers are declared on derived interfaces
    'onChange' | 'onBlur' | 'onFocus' | 'defaultValue'
    >,
    Pick<SelectInputProps<T>, 'value' | 'onChange' | 'onBlur'> {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete?: string;
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * @ignore
   */
  children: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: OverridableStringUnion<'primary' | 'secondary', SelectFieldPropsColorOverrides>;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: T;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Props applied to the [`FormHelperText`](/api/form-helper-text/) element.
   */
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The helper text content.
   */
  helperText?: React.ReactNode;
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id?: string;
  /**
   * Props applied to the [`InputLabel`](/api/input-label/) element.
   */
  InputLabelProps?: Partial<InputLabelProps>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: InputBaseProps['inputProps'];
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * The label content.
   */
  label?: React.ReactNode;
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
   native?: boolean;
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple?: boolean;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  onFocus?: StandardInputProps['onFocus'];
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required?: boolean;
  /**
   * Props applied to the [`Select`](/api/select/) element.
   */
  SelectProps?: Partial<Omit<SelectProps, 'native'>>;
  /**
   * The size of the component.
   */
  size?: OverridableStringUnion<'small' | 'medium', SelectFieldPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface StandardSelectFieldProps<T> extends BaseSelectFieldProps<T> {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: 'standard';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps?: Partial<StandardInputProps>;
}

export interface FilledSelectFieldProps<T> extends BaseSelectFieldProps<T> {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: 'filled';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps?: Partial<FilledInputProps>;
}

export interface OutlinedSelectFieldProps<T> extends BaseSelectFieldProps<T> {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: 'outlined';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps?: Partial<OutlinedInputProps>;
}

export type SelectFieldProps<T> =
  | StandardSelectFieldProps<T>
  | FilledSelectFieldProps<T>
  | OutlinedSelectFieldProps<T>;

export type SelectFieldClassKey = keyof NonNullable<SelectFieldProps<unknown>['classes']>;

/**
 *
 * Demos:
 *
 * - [Select Fields](https://material-ui.com/components/select-fields/)
 *
 * API:
 *
 * - [SelectField API](https://material-ui.com/api/select-field/)
 * - inherits [FormControl API](https://material-ui.com/api/form-control/)
 */
export default function SelectField<T>(props: SelectFieldProps<T>): JSX.Element;
