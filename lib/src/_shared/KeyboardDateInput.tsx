import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Rifm } from 'rifm';
import { useUtils } from './hooks/useUtils';
import { CalendarIcon } from './icons/CalendarIcon';
import { DateInputProps, DateInputRefs } from './PureDateInput';
import { createDelegatedEventHandler } from '../_helpers/utils';
import {
  maskedDateFormatter,
  getDisplayDate,
  checkMaskIsValidForCurrentFormat,
  getTextFieldAriaText,
} from '../_helpers/text-field-helper';

export const KeyboardDateInput: React.FC<DateInputProps & DateInputRefs> = ({
  disableMaskedInput,
  rawValue,
  validationError,
  KeyboardButtonProps,
  InputAdornmentProps,
  openPicker: onOpen,
  onChange,
  InputProps,
  mask,
  acceptRegex = /[\d]/gi,
  inputFormat,
  disabled,
  rifmFormatter,
  TextFieldComponent = TextField,
  openPickerIcon = <CalendarIcon />,
  variant,
  emptyInputText: emptyLabel,
  disableOpenPicker: hideOpenPickerButton,
  ignoreInvalidInputs,
  onFocus,
  onBlur,
  parsedDateValue,
  forwardedRef,
  containerRef,
  open,
  readOnly,
  inputProps: inputPropsPassed,
  getOpenDialogAriaText = getTextFieldAriaText,
  ...other
}) => {
  const utils = useUtils();
  const isFocusedRef = React.useRef(false);

  const getInputValue = React.useCallback(
    () =>
      getDisplayDate(rawValue, utils, {
        inputFormat,
        emptyInputText: emptyLabel,
      }),
    [emptyLabel, inputFormat, rawValue, utils]
  );

  const formatHelperText = utils.getFormatHelperText(inputFormat);
  const [innerInputValue, setInnerInputValue] = React.useState<string | null>(getInputValue());
  const shouldUseMaskedInput = React.useMemo(() => {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (!mask || disableMaskedInput) {
      return false;
    }

    return checkMaskIsValidForCurrentFormat(mask, inputFormat, acceptRegex, utils);
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);

  const formatter = React.useMemo(
    () =>
      shouldUseMaskedInput && mask ? maskedDateFormatter(mask, acceptRegex) : (st: string) => st,
    [shouldUseMaskedInput, mask, acceptRegex]
  );

  React.useEffect(() => {
    // We do not need to update the input value on keystroke
    // Because library formatters can change inputs from 12/12/2 to 12/12/0002
    if ((rawValue === null || utils.isValid(rawValue)) && !isFocusedRef.current) {
      setInnerInputValue(getInputValue());
    }
  }, [rawValue, utils, inputFormat, getInputValue]);

  const handleChange = (text: string) => {
    const finalString = text === '' || text === mask ? null : text;
    setInnerInputValue(finalString);

    const date = finalString === null ? null : utils.parse(finalString, inputFormat);
    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    onChange(date, finalString || undefined);
  };

  const adornmentPosition = InputAdornmentProps?.position || 'end';
  const inputProps = {
    ref: containerRef,
    inputRef: forwardedRef,
    type: shouldUseMaskedInput ? 'tel' : 'text',
    disabled,
    placeholder: formatHelperText,
    variant: variant,
    error: Boolean(validationError),
    helperText: formatHelperText || validationError,
    'data-mui-test': 'keyboard-date-input',
    ...other,
    inputProps: {
      ...inputPropsPassed,
      readOnly,
    },
    onFocus: createDelegatedEventHandler(() => (isFocusedRef.current = true), onFocus),
    onBlur: createDelegatedEventHandler(() => (isFocusedRef.current = false), onBlur),
    InputProps: {
      ...InputProps,
      [`${adornmentPosition}Adornment`]: hideOpenPickerButton ? (
        undefined
      ) : (
        <InputAdornment position={adornmentPosition} {...InputAdornmentProps}>
          <IconButton
            edge={adornmentPosition}
            data-mui-test="open-picker-from-keyboard"
            disabled={disabled}
            aria-label={getOpenDialogAriaText(rawValue, utils)}
            {...KeyboardButtonProps}
            onClick={onOpen}
          >
            {openPickerIcon}
          </IconButton>
        </InputAdornment>
      ),
    },
  };

  if (!shouldUseMaskedInput) {
    return (
      <TextFieldComponent
        value={innerInputValue || ''}
        onChange={e => handleChange(e.currentTarget.value)}
        {...inputProps}
      />
    );
  }

  return (
    <Rifm
      key={mask}
      value={innerInputValue || ''}
      onChange={handleChange}
      accept={acceptRegex}
      format={rifmFormatter || formatter}
    >
      {({ onChange, value }) => (
        <TextFieldComponent
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...inputProps}
        />
      )}
    </Rifm>
  );
};

export default KeyboardDateInput;
