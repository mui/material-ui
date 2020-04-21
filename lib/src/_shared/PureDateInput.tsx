import * as React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { ExtendMui } from '../typings/helpers';
import { onSpaceOrEnter } from '../_helpers/utils';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { useUtils, MuiPickersAdapter } from './hooks/useUtils';
import { InputAdornmentProps } from '@material-ui/core/InputAdornment';
import { getDisplayDate, getTextFieldAriaText } from '../_helpers/text-field-helper';

export interface DateInputProps<TInputValue = ParsableDate, TDateValue = MaterialUiPickersDate>
  extends ExtendMui<TextFieldProps, 'onError' | 'onChange' | 'value'> {
  rawValue: TInputValue;
  parsedDateValue: TDateValue;
  inputFormat: string;
  onChange: (date: TDateValue, keyboardInputValue?: string) => void;
  openPicker: () => void;
  readOnly?: boolean;
  validationError?: React.ReactNode;
  /** Override input component */
  TextFieldComponent?: React.ComponentType<TextFieldProps>;
  /**
   * Message displaying in read-only text field when null passed
   * @default ' '
   */
  emptyInputText?: string;
  /** Icon displaying for open picker button */
  openPickerIcon?: React.ReactNode;
  /**
   * Custom mask. Can be used to override generate from format. (e.g. __/__/____ __:__)
   */
  mask?: string;
  /**
   * Char string that will be replaced with number (for "_" mask will be "__/__/____")
   * @default '_'
   */
  maskChar?: string;
  /**
   *Regular expression to detect "accepted" symbols
   * @default /\dap/gi
   */
  acceptRegex?: RegExp;
  /**
   * Props to pass to keyboard input adornment
   * @type {Partial<InputAdornmentProps>}
   */
  InputAdornmentProps?: Partial<InputAdornmentProps>;
  /**
   * Props to pass to keyboard adornment button
   * @type {Partial<IconButtonProps>}
   */
  KeyboardButtonProps?: Partial<IconButtonProps>;
  /** Custom formatter to be passed into Rifm component */
  rifmFormatter?: (str: string) => string;
  /**
   * Do not render open picker button (renders only text field with validation)
   * @default false
   */
  disableOpenPicker?: boolean;
  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format
   * @default false
   */
  disableMaskedInput?: boolean;
  /** Get aria-label text for control that opens datepicker dialog. Aria-label have to include selected date. */
  getOpenDialogAriaText?: (value: ParsableDate, utils: MuiPickersAdapter) => string;
  // ?? TODO when it will be possible to display "empty" date in datepicker use it instead of ignoring invalid inputs
  ignoreInvalidInputs?: boolean;
  open: boolean;
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
  | 'parsedDateValue'
  | 'open'
>;

export interface DateInputRefs {
  containerRef?: React.Ref<HTMLDivElement>;
  forwardedRef?: React.Ref<HTMLInputElement>;
}

export const PureDateInput: React.FC<DateInputProps & DateInputRefs> = ({
  onChange,
  inputFormat,
  rifmFormatter,
  acceptRegex: refuse,
  mask,
  rawValue,
  maskChar,
  validationError,
  InputProps,
  openPicker: onOpen,
  TextFieldComponent = TextField,
  variant,
  emptyInputText: emptyLabel,
  openPickerIcon,
  disableOpenPicker: hideOpenPickerButton,
  ignoreInvalidInputs,
  KeyboardButtonProps,
  disableMaskedInput,
  parsedDateValue,
  forwardedRef,
  containerRef,
  open,
  getOpenDialogAriaText = getTextFieldAriaText,
  ...other
}) => {
  const utils = useUtils();
  const PureDateInputProps = React.useMemo(
    () => ({
      ...InputProps,
      readOnly: true,
    }),
    [InputProps]
  );

  const inputValue = getDisplayDate(rawValue, utils, {
    inputFormat,
    emptyInputText: emptyLabel,
  });

  return (
    <TextFieldComponent
      ref={containerRef}
      inputRef={forwardedRef}
      variant={variant}
      error={Boolean(validationError)}
      helperText={validationError}
      {...other}
      aria-label={getOpenDialogAriaText(rawValue, utils)}
      // do not overridable
      onClick={onOpen}
      value={inputValue}
      InputProps={PureDateInputProps}
      onKeyDown={onSpaceOrEnter(onOpen)}
    />
  );
};

PureDateInput.displayName = 'PureDateInput';
