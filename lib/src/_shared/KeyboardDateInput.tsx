import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Rifm } from 'rifm';
import { useUtils } from './hooks/useUtils';
import { DateInputProps } from './PureDateInput';
import { KeyboardIcon } from './icons/KeyboardIcon';
import {
  makeMaskFromFormat,
  maskedDateFormatter,
  getDisplayDate,
} from '../_helpers/text-field-helper';

export const KeyboardDateInput: React.FC<DateInputProps> = ({
  rawValue,
  validationError,
  KeyboardButtonProps,
  InputAdornmentProps,
  openPicker: onOpen,
  onChange,
  InputProps,
  mask,
  maskChar = '_',
  refuse = /[^\d]+/gi,
  format,
  disabled,
  rifmFormatter,
  TextFieldComponent = TextField,
  keyboardIcon = <KeyboardIcon />,
  variant,
  emptyLabel,
  invalidLabel,
  labelFunc,
  hideOpenPickerButton,
  ignoreInvalidInputs,
  ...other
}) => {
  const utils = useUtils();
  const getInputValue = () =>
    getDisplayDate(rawValue, utils, {
      format,
      emptyLabel,
      invalidLabel,
      labelFunc,
    });

  const [innerInputValue, setInnerInputValue] = React.useState<string | null>(getInputValue());

  const inputMask = mask || makeMaskFromFormat(format, maskChar);
  // prettier-ignore
  const formatter = React.useMemo(
    () => maskedDateFormatter(inputMask, maskChar, refuse),
    [inputMask, maskChar, refuse]
  );

  React.useEffect(() => {
    if (rawValue === null || utils.isValid(rawValue)) {
      setInnerInputValue(getInputValue());
    }
  }, [rawValue]); // eslint-disable-line

  const position =
    InputAdornmentProps && InputAdornmentProps.position ? InputAdornmentProps.position : 'end';

  const handleChange = (text: string) => {
    const finalString = text === '' || text === inputMask ? null : text;
    setInnerInputValue(finalString);

    const date = finalString === null ? null : utils.parse(finalString, format);
    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    onChange(date, finalString || undefined);
  };

  return (
    <Rifm
      key={inputMask}
      value={innerInputValue || ''}
      onChange={handleChange}
      refuse={refuse}
      format={rifmFormatter || formatter}
    >
      {({ onChange, value }) => (
        <TextFieldComponent
          variant={variant as any}
          disabled={disabled}
          error={Boolean(validationError)}
          helperText={validationError}
          data-mui-test="keyboard-date-input"
          {...other}
          value={value}
          onChange={onChange}
          InputProps={{
            ...InputProps,
            [`${position}Adornment`]: hideOpenPickerButton ? (
              undefined
            ) : (
              <InputAdornment position={position} {...InputAdornmentProps}>
                <IconButton
                  data-mui-test="open-picker-from-keyboard"
                  disabled={disabled}
                  {...KeyboardButtonProps}
                  onClick={onOpen}
                >
                  {keyboardIcon}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </Rifm>
  );
};

export default KeyboardDateInput;
