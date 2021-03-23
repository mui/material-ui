import * as React from 'react';
import PropTypes from 'prop-types';
import { TextFieldProps as MuiTextFieldPropsType } from '@material-ui/core/TextField';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { InputAdornmentProps } from '@material-ui/core/InputAdornment';
import { onSpaceOrEnter } from './utils';
import { ParsableDate } from './constants/prop-types';
import { useUtils, MuiPickersAdapter } from './hooks/useUtils';
import { getDisplayDate, getTextFieldAriaText } from './text-field-helper';

// make `variant` optional.
export type MuiTextFieldProps = MuiTextFieldPropsType | Omit<MuiTextFieldPropsType, 'variant'>;

export interface DateInputProps<TInputValue = ParsableDate, TDateValue = unknown> {
  open: boolean;
  rawValue: TInputValue;
  inputFormat: string;
  onChange: (date: TDateValue, keyboardInputValue?: string) => void;
  openPicker: () => void;
  readOnly?: boolean;
  disabled?: boolean;
  validationError?: boolean;
  label?: MuiTextFieldProps['label'];
  InputProps?: MuiTextFieldProps['InputProps'];
  TextFieldProps?: Partial<MuiTextFieldProps>;
  // lib/src/wrappers/DesktopPopperWrapper.tsx:87
  onBlur?: () => void;
  // ?? TODO when it will be possible to display "empty" date in datepicker use it instead of ignoring invalid inputs.
  ignoreInvalidInputs?: boolean;
  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: (props: MuiTextFieldPropsType) => React.ReactElement;
  /**
   * Icon displaying for open picker button.
   */
  openPickerIcon?: React.ReactNode;
  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask?: string;
  /**
   * Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex?: RegExp;
  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps?: Partial<InputAdornmentProps>;
  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps?: Partial<IconButtonProps>;
  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter?: (str: string) => string;
  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker?: boolean;
  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput?: boolean;
  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText?: (value: ParsableDate, utils: MuiPickersAdapter) => string;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<HTMLInputElement>;
}

export type ExportedDateInputProps<TInputValue, TDateValue> = Omit<
  DateInputProps<TInputValue, TDateValue>,
  | 'openPicker'
  | 'inputValue'
  | 'onChange'
  | 'inputFormat'
  | 'validationError'
  | 'rawValue'
  | 'open'
  | 'TextFieldProps'
  | 'onBlur'
>;

// TODO: why is this called "Pure*" when it's not memoized? Does "Pure" mean "readonly"?
export const PureDateInput = React.forwardRef(function PureDateInput(
  props: DateInputProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    disabled,
    getOpenDialogAriaText = getTextFieldAriaText,
    inputFormat,
    InputProps,
    inputRef,
    label,
    openPicker: onOpen,
    rawValue,
    renderInput,
    TextFieldProps = {},
    validationError,
  } = props;

  const utils = useUtils();
  const PureDateInputProps = React.useMemo(
    () => ({
      ...InputProps,
      readOnly: true,
    }),
    [InputProps],
  );

  const inputValue = getDisplayDate(utils, rawValue, inputFormat);

  return renderInput({
    label,
    disabled,
    ref,
    inputRef,
    error: validationError,
    InputProps: PureDateInputProps,
    inputProps: {
      disabled,
      readOnly: true,
      'aria-readonly': true,
      'aria-label': getOpenDialogAriaText(rawValue, utils),
      value: inputValue,
      onClick: onOpen,
      onKeyDown: onSpaceOrEnter(onOpen),
    },
    ...TextFieldProps,
  });
});

PureDateInput.propTypes = {
  getOpenDialogAriaText: PropTypes.func,
  renderInput: PropTypes.func.isRequired,
};
