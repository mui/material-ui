import * as React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useUtils } from './hooks/useUtils';
import { ExtendMui } from '../typings/helpers';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { getDisplayDate } from '../_helpers/text-field-helper';
import { InputAdornmentProps } from '@material-ui/core/InputAdornment';

export type NotOverridableProps =
  | 'openPicker'
  | 'inputValue'
  | 'onChange'
  | 'format'
  | 'validationError'
  | 'format'
  | 'rawValue'
  | 'forwardedRef';

export interface DateInputProps
  extends ExtendMui<TextFieldProps, 'onError' | 'onChange' | 'value'> {
  rawValue: ParsableDate;
  format: string;
  onChange: (date: MaterialUiPickersDate | null, keyboardInputValue?: string) => void;
  openPicker: () => void;
  validationError?: React.ReactNode;
  /** Dynamic formatter of text field value @DateIOType */
  labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
  /** Override input component */
  TextFieldComponent?: React.ComponentType<TextFieldProps>;
  /**
   * Message displaying in text field, if null passed
   * @default ' '
   */
  emptyLabel?: string;
  /**
   * Message displaying in text field if date is invalid (doesn't work in keyboard mode)
   * @default 'unknown'
   */
  invalidLabel?: string;
  /** Icon displaying for open picker button */
  keyboardIcon?: React.ReactNode;
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
   * Refuse values regexp
   * @default /[^\d]+/gi
   */
  refuse?: RegExp;
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
  hideOpenPickerButton?: boolean;
  // ?? TODO when it will be possible to display "empty" date in datepicker use it instead of ignoring invalid inputs
  ignoreInvalidInputs?: boolean;
}

export type ExportedDateInputProps = Omit<DateInputProps, NotOverridableProps>;

export const PureDateInput: React.FC<DateInputProps> = ({
  onChange,
  format,
  rifmFormatter,
  refuse,
  mask,
  rawValue,
  maskChar,
  validationError,
  InputProps,
  openPicker: onOpen,
  TextFieldComponent = TextField,
  variant,
  emptyLabel,
  invalidLabel,
  labelFunc,
  hideOpenPickerButton,
  ignoreInvalidInputs,
  KeyboardButtonProps,
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
    format,
    emptyLabel,
    invalidLabel,
    labelFunc,
  });

  return (
    <TextFieldComponent
      variant={variant as any}
      error={Boolean(validationError)}
      helperText={validationError}
      {...other}
      // do not overridable
      onClick={onOpen}
      value={inputValue}
      InputProps={PureDateInputProps}
      onKeyDown={e => {
        // space
        if (e.keyCode === 32) {
          e.stopPropagation();
          onOpen();
        }
      }}
    />
  );
};

PureDateInput.displayName = 'PureDateInput';
