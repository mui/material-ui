import * as React from 'react';
import * as PropTypes from 'prop-types';
import { onSpaceOrEnter } from '../_helpers/utils';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { TextFieldProps } from '@material-ui/core/TextField';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { useUtils, MuiPickersAdapter } from './hooks/useUtils';
import { InputAdornmentProps } from '@material-ui/core/InputAdornment';
import { getDisplayDate, getTextFieldAriaText } from '../_helpers/text-field-helper';

export type MuiTextFieldProps = TextFieldProps | Omit<TextFieldProps, 'variant'>;

export interface DateInputProps<TInputValue = ParsableDate, TDateValue = MaterialUiPickersDate> {
  open: boolean;
  rawValue: TInputValue;
  inputFormat: string;
  onChange: (date: TDateValue, keyboardInputValue?: string) => void;
  openPicker: () => void;
  readOnly?: boolean;
  disabled?: boolean;
  validationError?: boolean;
  label?: TextFieldProps['label'];
  InputProps?: TextFieldProps['InputProps'];
  TextFieldProps?: Partial<MuiTextFieldProps>;
  // lib/src/wrappers/DesktopPopperWrapper.tsx:87
  onBlur?: () => void;
  // ?? TODO when it will be possible to display "empty" date in datepicker use it instead of ignoring invalid inputs
  ignoreInvalidInputs?: boolean;
  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: (props: MuiTextFieldProps) => React.ReactElement;
  /**
   * Icon displaying for open picker button.
   * */
  openPickerIcon?: React.ReactNode;
  /**
   * Custom mask. Can be used to override generate from format. (e.g. __/__/____ __:__ or __/__/____ __:__ _M)
   */
  mask?: string;
  /**
   *Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex?: RegExp;
  /**
   * Props to pass to keyboard input adornment.
   * @type {Partial<InputAdornmentProps>}
   */
  InputAdornmentProps?: Partial<InputAdornmentProps>;
  /**
   * Props to pass to keyboard adornment button.
   * @type {Partial<IconButtonProps>}
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
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date.
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText?: (value: ParsableDate, utils: MuiPickersAdapter) => string;
}

export type ExportedDateInputProps<TInputValue, TDateValue> = Omit<
  DateInputProps<TInputValue, TDateValue>,
  | 'openPicker'
  | 'inputValue'
  | 'onChange'
  | 'inputFormat'
  | 'validationError'
  | 'rawValue'
  | 'forwardedRef'
  | 'open'
  | 'TextFieldProps'
  | 'onBlur'
>;

export interface DateInputRefs {
  containerRef?: React.Ref<HTMLDivElement>;
  forwardedRef?: React.Ref<HTMLInputElement>;
}

export const PureDateInput: React.FC<DateInputProps & DateInputRefs> = ({
  containerRef,
  disabled,
  forwardedRef,
  getOpenDialogAriaText = getTextFieldAriaText,
  inputFormat,
  InputProps,
  label,
  openPicker: onOpen,
  rawValue,
  renderInput,
  TextFieldProps = {},
  validationError,
}) => {
  const utils = useUtils();
  const PureDateInputProps = React.useMemo(
    () => ({
      ...InputProps,
      readOnly: true,
    }),
    [InputProps]
  );

  const inputValue = getDisplayDate(utils, rawValue, inputFormat);

  return renderInput({
    label,
    disabled,
    ref: containerRef,
    inputRef: forwardedRef,
    error: validationError,
    InputProps: PureDateInputProps,
    inputProps: {
      disabled,
      'aria-readonly': true,
      'aria-label': getOpenDialogAriaText(rawValue, utils),
      value: inputValue,
      onClick: onOpen,
      onKeyDown: onSpaceOrEnter(onOpen),
    },
    ...TextFieldProps,
  });
};

PureDateInput.propTypes = {
  acceptRegex: PropTypes.instanceOf(RegExp),
  getOpenDialogAriaText: PropTypes.func,
  mask: PropTypes.string,
  OpenPickerButtonProps: PropTypes.object,
  openPickerIcon: PropTypes.node,
  renderInput: PropTypes.func.isRequired,
  rifmFormatter: PropTypes.func,
};
